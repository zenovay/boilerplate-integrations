# Paddle Next.js Starter Kit

## Status

- Status: `verified`
- Upstream commit: `a8c5168e5411af7a4a4c8521d0a8a342ce0307ac`
- Prepared branch: `zenovay/paddle-revenue-analytics`
- Last verified: 2026-07-19
- Maintainer: Zenovay
- Upstream: https://github.com/PaddleHQ/paddle-nextjs-starter-kit

This is a tested community patch. It is not bundled or endorsed by Paddle.

## Install

Apply the patch from the upstream repository root:

```bash
git apply 0001-feat-add-optional-Zenovay-revenue-analytics.patch
```

The patch is in [`patches/`](patches/). Set
`NEXT_PUBLIC_ZENOVAY_TRACKING_CODE=ZV_YOUR_CODE` to enable it. It installs the
public `@zenovay/tracker` package, initializes first-party tracking, and records
App Router navigation. Nothing is loaded when the value is absent.

## Events

The checkout identifies the Paddle customer as soon as Paddle knows them —
`checkout.customer.created` fires when the email is entered, with
`checkout.customer.updated` and `checkout.completed` as follow-ups — by both
email and Paddle customer ID. Identification deduplicates per transaction and
identity, so a later, richer identity (email-only → Paddle customer ID) is
still sent. The identify request is kept alive across Paddle's immediate
success-page redirect. Connect Paddle under the website's **Revenue >
Integrations** settings so Zenovay can create a signed webhook destination.
Paddle's `transaction.completed` webhook is the revenue source of truth; the
browser callback does not record a second purchase.

## Privacy and first-party tracking

The provider uses Zenovay's default persistent first-party visitor identifier,
which is what keeps the checkout page and the post-payment `/checkout/success`
redirect attributed to one visitor. If you want Zenovay's cookieless mode,
enable it for the website in the Zenovay dashboard first, then pass
`{ cookieless: true }` to `init` — the client flag alone creates window-scoped
IDs and breaks checkout-to-success attribution when the server-side setting is
off. Do not send payment details or Paddle checkout form contents as event
properties.

## Local development and production

Local event ingestion is controlled by the Zenovay website setting. Use an
isolated site and a Paddle sandbox for checkout verification. Production uses
the same public tracking code variable with an approved Paddle domain.

## Verification

The patch was built against the recorded upstream commit:

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm build
```

The existing `react-hooks/exhaustive-deps` warning in Paddle's throttled
checkout update callback remains unchanged. The build and tests pass.

An isolated Paddle sandbox checkout was also completed after connecting the
Zenovay webhook integration. It appeared once in Zenovay as a $5 transaction
with $5 MRR and a $5 average order value.

## Troubleshooting

- No pageviews: confirm the public tracking code is present in the built app.
- No local events: enable local ingestion for the isolated Zenovay site.
- No revenue: confirm the Paddle integration is connected in Zenovay, its
  sandbox/live mode matches the Paddle account, and Paddle delivered a signed
  `transaction.completed` webhook.
- Missing attribution: confirm the checkout uses the patched client component
  so its customer ID and email are identified before the success redirect.

## Removal

Reverse the patch or remove the tracker dependency, provider, root layout
mount, checkout callback calls, public environment value, and README row.
