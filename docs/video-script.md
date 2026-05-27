# Auralis Demo Video Script

Purpose: provide the ≥2-minute demo video script and storyboard centered on the USDY closed loop.

Related docs: [Judge Guide](./JUDGE_GUIDE.md), [Tutorial](./TUTORIAL.md), [Architecture](./ARCHITECTURE.md), [Business Model](./BUSINESS_MODEL.md), [Contracts](./CONTRACTS.md).

Target length: 2:20–2:45. Tone: precise, calm, no hype. Show the live product more than slides.

## Storyboard

| Time | Screen | Voiceover |
|---:|---|---|
| 0:00–0:15 | Landing page | “Tokenized real-world assets are moving on-chain, but users still lack a clear answer to three questions: what is the risk, may this wallet hold it, and can I verify the decision?” |
| 0:15–0:35 | Product overview / app nav | “Auralis is the AI risk and compliance layer for Mantle RWAs. It rates assets, checks eligibility, and manages decisions under policy guardrails.” |
| 0:35–1:00 | USDY rating detail | “Here is USDY, a real Mantle RWA. Auralis computes a deterministic seven-dimension rating: asset, issuer, liquidity, peg, oracle, contract, and concentration risk. AI explains the result, but the score comes from code.” |
| 1:00–1:20 | Verify rating proof | “The rating is auditable. Auralis recomputes the rating hash and verifies it against the Mantle Rating Registry.” |
| 1:20–1:45 | Compliance scan | “Next, we scan a wallet and jurisdiction. USDY is classified as a Treasury RWA, so Auralis applies jurisdiction-specific restrictions and produces an eligibility verdict.” |
| 1:45–2:05 | Attestation/proof | “The report becomes a privacy-preserving attestation: verdict and hash on-chain, sensitive inputs off-chain. The user signs; Auralis never signs for them.” |
| 2:05–2:30 | Simulator + policy | “Now the agent simulates a rebalance. The policy engine checks concentration, slippage, confidence, liquidity, cooldown, and human approval before any execution.” |
| 2:30–2:45 | Decisions / explorer | “Finally, the decision proof is logged on Mantle. The result is not just an AI answer — it is a verifiable risk and compliance trail.” |

## Full voiceover draft

“Tokenized real-world assets are moving on-chain, but most users still lack a clear answer to three questions: what is the risk, may this wallet hold it, and can I verify the decision later?

Auralis is the AI risk and compliance layer for Mantle RWAs. It rates assets, checks wallet eligibility, and manages portfolio decisions under deterministic guardrails.

Here we open USDY, a real Mantle RWA. Auralis computes a seven-dimension rating: asset risk, issuer risk, liquidity, peg, oracle freshness, contract risk, and concentration. The AI explains the result in plain language, but the score and grade come from deterministic code.

Now we verify the rating. Auralis recomputes the rating hash and checks it against the Mantle Rating Registry. This is the key design principle: AI output must be auditable.

Next we run a compliance scan. The wallet declares a jurisdiction, Auralis classifies USDY as a Treasury RWA, applies jurisdiction-specific rules, and returns an eligibility verdict. For restricted cases, it explains why and what needs manual review or issuer whitelist status.

If the user wants a reusable proof, they mint an attestation. Only the verdict and report hash go on-chain; sensitive inputs stay off-chain. The user signs the transaction. Auralis never holds funds and never signs for the user.

Now we simulate a rebalance. The agent proposes; the deterministic policy engine checks max asset exposure, protocol concentration, slippage, confidence, liquidity, cooldown, and human-approval thresholds. If the proposal violates policy, it is blocked before execution.

Finally, we inspect the decision proof. The decision hash is recorded on Mantle, creating a permanent trail of what the agent proposed, what policy allowed, and what the user approved.

That is Auralis: AI-assisted RWA risk and compliance, with deterministic decisions and Mantle as the settlement layer for trust.”

## Capture checklist

- Browser width 1440px, zoom 100%.
- Start on landing page, not localhost if live deployment is ready.
- Keep wallet popups short; do not expose private keys or seed phrases.
- Show Mantle mainnet addresses or explorer proof briefly.
- Use captions for every major step.
- End on decision proof or contracts table, not a blank page.

## Backup plan

If live wallet signing fails during recording, show the deterministic API and proof surfaces, then disclose the limitation in the final known-limitations section. Do not fake a transaction.
