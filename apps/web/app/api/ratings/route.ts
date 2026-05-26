import { getRatings, json, assertRateLimit } from "../../../lib/api";
export async function GET(req: Request) { const limited = await assertRateLimit(req); if (limited) return limited; return json(await getRatings()); }
