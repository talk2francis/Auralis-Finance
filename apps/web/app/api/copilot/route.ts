import { z } from "zod";
import { copilotAnswer } from "@auralis/core";
import { assertRateLimit, json } from "../../../lib/api";

const Body = z.object({
  question: z.string().min(1).max(2000),
  context: z.record(z.string(), z.unknown()).default({}),
  stream: z.boolean().optional(),
});

export async function POST(req: Request) {
  const limited = await assertRateLimit(req);
  if (limited) return limited;
  const body = Body.parse(await req.json());
  const answer = await copilotAnswer(body.question, body.context);
  const reply = { ...answer.result, aiProvenance: answer.provenance };

  if (body.stream || req.headers.get("accept")?.includes("text/event-stream")) {
    const encoder = new TextEncoder();
    const sections = [
      `Summary: ${reply.summary}\n`,
      `Actions: ${reply.actions.join("; ") || "No action required."}\n`,
      `Outcome: ${reply.outcome}\n`,
      `Reasoning: ${reply.reasoningFactors.join("; ") || "Deterministic context."}\n`,
      `Caveats: ${reply.caveats.join("; ") || "Advisory only."}\n`,
    ];
    const stream = new ReadableStream({
      async start(controller) {
        for (const text of sections) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "chunk", text })}\n\n`));
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "final", reply })}\n\n`));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  }

  return json(reply);
}
