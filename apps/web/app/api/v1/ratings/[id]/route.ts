import { getRatingWithAI, json, assertRateLimit } from "../../../../../lib/api";
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) { const limited = await assertRateLimit(req); if (limited) return limited; const { id } = await params; const rating = await getRatingWithAI(id); return rating ? json(rating) : json({ error: "not_found" }, { status: 404 }); }
