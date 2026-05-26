import { z } from "zod";
import { copilotAnswer } from "@auralis/core";
import { assertRateLimit, json } from "../../../lib/api";
const Body = z.object({ question: z.string().min(1).max(2000), context: z.record(z.string(), z.unknown()).default({}) });
export async function POST(req: Request) { const limited = await assertRateLimit(req); if (limited) return limited; const body = Body.parse(await req.json()); const answer = await copilotAnswer(body.question, body.context); return json({ ...answer.result, aiProvenance: answer.provenance }); }
