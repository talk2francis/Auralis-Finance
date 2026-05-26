import { z } from "zod";
import { getAllAssets } from "@auralis/adapters";
import { runComplianceWorkflow } from "@auralis/core";
import { assertRateLimit, JurisdictionSchema, json, persist, WalletSchema } from "../../../../lib/api";
const Body = z.object({ wallet: WalletSchema, jurisdiction: JurisdictionSchema });
export async function POST(req: Request) { const body = Body.parse(await req.json()); const limited = await assertRateLimit(req, body.wallet); if (limited) return limited; const report = runComplianceWorkflow(body.wallet, body.jurisdiction, await getAllAssets()); const storage = await persist("compliance_reports", { id: report.reportId, wallet: body.wallet, report_json: report, check_hash: report.reportHash }); return json({ ...report, storage }); }
