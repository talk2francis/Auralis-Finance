export type ModelResponse = { text: string; modelId: string };

export async function callJsonModel(prompt: string): Promise<ModelResponse> {
  if (process.env.ELFA_API_KEY) {
    const out = await callElfa(prompt).catch(() => undefined);
    if (out) return out;
  }
  if (process.env.OPENAI_API_KEY) {
    const out = await callOpenAI(prompt).catch(() => undefined);
    if (out) return out;
  }
  return { text: JSON.stringify({ summary: "Offline deterministic fallback", rationale: "No model key available; deterministic engine output was used.", counterfactual: "Live model output can refine language, not scores.", actions: [], outcome: "fallback", reasoningFactors: ["deterministic-inputs"], caveats: ["AI disabled"] }), modelId: "offline/template" };
}

async function callElfa(prompt: string): Promise<ModelResponse> {
  // TODO(real-data): confirm ELFA chat endpoint when credit access is active.
  throw new Error(`ELFA unavailable for prompt length ${prompt.length}`);
}

async function callOpenAI(prompt: string): Promise<ModelResponse> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", messages: [{ role: "system", content: "Return JSON only." }, { role: "user", content: prompt }], response_format: { type: "json_object" } }),
  });
  if (!res.ok) throw new Error("OpenAI failed");
  const json = await res.json() as { choices?: { message?: { content?: string } }[]; model?: string };
  return { text: json.choices?.[0]?.message?.content ?? "{}", modelId: json.model ?? process.env.OPENAI_MODEL ?? "openai" };
}
