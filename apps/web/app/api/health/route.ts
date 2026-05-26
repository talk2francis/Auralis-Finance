import { json } from "../../../lib/api";
export async function GET() { return json({ ok: true, app: "auralis", phase: "p1", chainId: 5000, time: new Date(0).toISOString() }); }
