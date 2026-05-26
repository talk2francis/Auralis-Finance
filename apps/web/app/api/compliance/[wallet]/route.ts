import { getAllAssets } from "@auralis/adapters";
import { runComplianceWorkflow } from "@auralis/core";
import { assertRateLimit, JurisdictionSchema, json, WalletSchema } from "../../../../lib/api";
export async function GET(req: Request, { params }: { params: Promise<{ wallet: string }> }) { const { wallet } = await params; const parsed = WalletSchema.parse(wallet); const limited = await assertRateLimit(req, parsed); if (limited) return limited; const url = new URL(req.url); const jurisdiction = JurisdictionSchema.parse(url.searchParams.get("jurisdiction") ?? "NG"); return json(runComplianceWorkflow(parsed, jurisdiction, await getAllAssets())); }
