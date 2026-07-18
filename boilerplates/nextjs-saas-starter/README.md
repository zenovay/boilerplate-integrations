# Next.js SaaS Starter

## Status

- Status: `community`
- Upstream commit: `6e33e58b1e553a41fe22e6b941a7229a002de361`
- Last verified: 2026-07-18
- Maintainer: Zenovay
- Upstream: https://github.com/nextjs/saas-starter

## Install

Add `@zenovay/tracker@0.1.0`, copy the client provider from
[`../../examples/nextjs-saas/app/zenovay-provider.tsx`](../../examples/nextjs-saas/app/zenovay-provider.tsx),
and render it once inside `app/layout.tsx`. Set
`NEXT_PUBLIC_ZENOVAY_TRACKING_CODE`.

## Page views and SPA navigation

The provider skips the automatic initial page view and sends only unique later
App Router URLs using `usePathname` and `useSearchParams`.

## Events

After a successful login/signup action, call `goal('signup_completed')` and
`identify(user.id, { email: user.email })`. Track checkout start from the plan
action. Connect the starter's Stripe account in Zenovay for authoritative
revenue, or call `revenue` after the checkout route confirms payment.

## Privacy and first-party tracking

The provider sets `cookieless: true`. Forward replay consent if required. Use
the dashboard-generated custom-domain setup on eligible plans.

## Local development and production

Enable Allow Localhost, set the public variable in `.env.local`, and add it to
the production deployment. Add CSP values if the starter gains a CSP.

## Verification

Run `next build`, TypeScript, signup/checkout tests, and inspect the browser for
one tracker script and no duplicate navigation events.

## Troubleshooting

- Build error: keep all tracker calls in the client provider.
- Missing code: `NEXT_PUBLIC_` values must exist at build time.
- Duplicate events: remove any second script/provider.
- Stripe revenue absent: finish the Zenovay Stripe connection and identify users consistently.

## Removal

Remove the provider/layout import, package, public variable, calls, CSP entries,
and Stripe connection if it was created only for this integration.

## Upstream proposal

Title: `feat: add optional Zenovay analytics provider`

Description: Adds a small cookieless App Router provider and documentation for
page views, signup, identity, and Stripe-attributed revenue. No secrets or
server SDK are introduced.
