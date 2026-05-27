# Connect `auralisfinance.xyz` to Vercel from Namecheap

Purpose: concise DNS steps for pointing the purchased Namecheap domain to the Auralis Vercel deployment.

Related docs: [Deployment](./DEPLOYMENT.md), [Submission Checklist](./SUBMISSION_CHECKLIST.md), [Phase 4 Assets](./PHASE4_ASSETS.md).

## Domain decision

Use one canonical public domain:

- Primary: `https://auralisfinance.xyz`
- Alias: `https://www.auralisfinance.xyz`
- Vercel preview URL: fallback only, not the public brand URL

We do **not** need a second purchased domain.

## Step 1 — Add domain in Vercel

In Vercel:

1. Open the Auralis project.
2. Go to **Settings → Domains**.
3. Add `auralisfinance.xyz`.
4. Add `www.auralisfinance.xyz` too.
5. Set `auralisfinance.xyz` as the primary/canonical domain if Vercel asks.

## Step 2 — Change Namecheap DNS

In Namecheap:

1. Login to Namecheap.
2. Go to **Domain List**.
3. Find `auralisfinance.xyz` → click **Manage**.
4. Open **Advanced DNS**.
5. Under **Host Records**, remove any conflicting parking/default records for `@` or `www`.
6. Add these records:

| Type | Host | Value | TTL |
|---|---|---|---|
| `A Record` | `@` | `76.76.21.21` | Automatic |
| `CNAME Record` | `www` | `cname.vercel-dns.com` | Automatic |

7. Save changes.

## Step 3 — Wait and verify

DNS usually resolves within minutes, but can take up to a few hours.

Verify locally:

```bash
nslookup auralisfinance.xyz
nslookup www.auralisfinance.xyz
curl -I https://auralisfinance.xyz
curl -I https://www.auralisfinance.xyz
```

Expected:

- `auralisfinance.xyz` resolves to Vercel.
- `www.auralisfinance.xyz` resolves through `cname.vercel-dns.com`.
- HTTPS works.
- One of apex/www redirects or canonicalizes to the primary domain.

## Step 4 — Final app env

In Vercel environment variables, set:

```text
NEXT_PUBLIC_APP_URL=https://auralisfinance.xyz
NEXT_PUBLIC_CHAIN_ID=5000
NEXT_PUBLIC_MANTLE_EXPLORER_URL=https://explorer.mantle.xyz
```

Also ensure the four public contract address vars match `packages/contracts/deployments/mantle.json`.

## Do not add

- Do not add private keys to Vercel.
- Do not add `DEPLOYER_PRIVATE_KEY` anywhere in Vercel.
- Do not create a second domain unless there is a branding/legal reason.
