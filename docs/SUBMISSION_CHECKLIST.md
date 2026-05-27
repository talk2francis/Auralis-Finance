# Auralis Submission Checklist

Purpose: keep the final Mantle AI × RWA hackathon submission tight, honest, and judge-ready.

Related docs: [Judge Guide](./JUDGE_GUIDE.md), [Tutorial](./TUTORIAL.md), [Video Script](./video-script.md), [Contracts](./CONTRACTS.md), [Testing](./TESTING.md), [Security](./SECURITY.md).

## Required links

- GitHub repository: `https://github.com/talk2francis/Auralis-Finance`
- Live app: add the final Vercel URL before submission.
- Demo video: add the final uploaded video URL before submission.
- X thread: add the final build/demo thread URL before submission.

## Contract evidence

| Contract | Mantle mainnet address |
|---|---|
| AuralisAgentRegistry | `0x2939Df04CAfcd310f764d928559f2BF9F284a2f4` |
| AuralisRatingRegistry | `0xF59c877C83E6519A606810b4d8DA52Ccf34d5A22` |
| AuralisComplianceAttestor | `0xe4eE2b0984FF9F604bF03d0521808037Ea5d3b34` |
| AuralisPolicyGuard | `0xFaD41c7d7e777853CF7aC04641Df0D88B27A7b0E` |

All four are recorded in `packages/contracts/deployments/mantle.json` and referenced from [Contracts](./CONTRACTS.md).

## Judge fast path

1. Open the live app.
2. Open `/ratings` and click USDY.
3. Verify the rating hash/proof framing.
4. Open `/app/compliance` and run the US wallet scan.
5. Inspect eligibility verdicts and attestation design.
6. Open `/app/simulator` and confirm policy blocking/pass behavior.
7. Open `/app/decisions` and `/app/agent` for proof and agent design.
8. Open `/methodology`, `/security`, `/docs`, and `/faq` for public trust surfaces.

## Final verification gates

Latest local evidence:

```text
pnpm -F @auralis/web build      # passed; Sentry/OTEL warning only
18 route smoke checks           # 200 on local dev server
4 API smoke checks              # 200 on local dev server
US compliance scan              # 8 verdicts, 2 restricted, 0 denied
Simulator API                   # proposal true, policy blocked intentionally imbalanced weights
Decision API                    # generated deterministic decision hash
hardhat coverage                # 11 passing; high coverage
slither                         # 23 contracts, 12 reviewed findings, no custody/autonomous-execution issue
```

## Known limitations to disclose

- Some external market/risk inputs use deterministic demo adapters until production data-provider credits are connected.
- Sourcify is used as source-verification fallback where Mantle Explorer/Blockscout API returned non-JSON during Hardhat verification.
- Gas sponsorship/paymaster UX is described as intended where configured; fallback remains user-signed wallet transactions.
- Auralis is compliance tooling and risk information, not legal, tax, investment, or financial advice.

## Final do-not-break rules

- Do not touch Apogee.
- Do not run any new mainnet write/deploy without explicit fresh approval.
- Do not commit `.env` or private keys.
- Do not add autonomous signing or server wallet execution.
- Do not fake a transaction in the demo video.
