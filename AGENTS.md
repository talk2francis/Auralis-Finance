# Auralis Engineering Rules

- Never commit secrets, private keys, API keys, seed phrases, or real `.env` files.
- Never deploy to Mantle mainnet without explicit human approval in chat.
- Never put a signing key in a worker, route handler, cron job, CI job, or browser bundle.
- Run tests before touching contracts and never advance on a red build.
- Every on-chain action must be user-signed; no autonomous transaction execution.
