import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AllocationDonut, AssetIcon, Button, Card, CardContent, CardHeader, CardTitle, ConfidenceMeter, EligibilityChip, ErrorState, KpiStat, ProofCard, RatingSeal, RiskRadar, StateWrapper, cssVariables } from "../src";

const hash = `0x${"a".repeat(64)}`;
function Preview() {
  return <main style={{ fontFamily: "Inter", background: "var(--paper)", color: "var(--ink)", padding: 24 }}>
    <style>{cssVariables}</style>
    <Card>
      <CardHeader><CardTitle>Auralis UI Preview</CardTitle></CardHeader>
      <CardContent>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <Button>Primary action</Button><Button variant="secondary">Secondary</Button><RatingSeal grade="A" />
          <EligibilityChip verdict="ELIGIBLE" /><AssetIcon symbol="USDY" /><AllocationDonut percent={64} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 16, marginTop: 16 }}>
          <KpiStat label="Risk-adjusted APY" value="4.82%" delta="+0.42%" />
          <ProofCard label="On-chain proof" hash={hash} />
        </div>
        <ConfidenceMeter value={87} />
        <RiskRadar values={[28, 35, 42, 24, 18, 31, 45]} />
        <StateWrapper status="stale"><p>Populated state with stale marker.</p></StateWrapper>
        <ErrorState message="Example retryable error" />
      </CardContent>
    </Card>
  </main>;
}

console.log(renderToStaticMarkup(<Preview />));
