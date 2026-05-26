import { Button, Card, CardContent, CardHeader, CardTitle, RiskRadar } from "@auralis/ui";

export default async function AssetDetail({ params }: { params: Promise<{ assetId: string }> }) {
  const { assetId } = await params;
  return <div><h1 className="font-display text-4xl">{assetId.toUpperCase()}</h1><Card className="mt-6"><CardHeader><CardTitle>Risk profile</CardTitle></CardHeader><CardContent><RiskRadar values={[28,35,42,24,18,31,45]} /><div className="mt-6 flex flex-wrap gap-3"><Button>Add to simulator</Button><Button variant="secondary">Set exposure cap</Button><Button variant="secondary">Run eligibility check</Button><Button variant="secondary" disabled title="Contracts deploy pending">Anchor rating on-chain</Button></div></CardContent></Card></div>;
}
