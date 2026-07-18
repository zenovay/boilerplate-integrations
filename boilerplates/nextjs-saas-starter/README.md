# Next.js SaaS Starter

## Status

- Status: `verified`
- Upstream commit: `6e33e58b1e553a41fe22e6b941a7229a002de361`
- Prepared branch: `zenovay/cookieless-analytics`
- Prepared commit: `846f6dfc9590ba9ca76b404b3fec96dc34432651`
- Last verified: 2026-07-18
- Maintainer: Zenovay
- Upstream: https://github.com/nextjs/saas-starter

## Install

Apply the patch from the upstream repository root:

```bash
git apply 0001-feat-add-optional-Zenovay-analytics.patch
```

The patch is in [`patches/`](patches/). It installs
`@zenovay/tracker@0.1.0`, adds the client provider, mounts it once in the root
layout, documents event helpers, and adds
`NEXT_PUBLIC_ZENOVAY_TRACKING_CODE` to the environment example.

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

The patch was checked against the recorded upstream commit:

```bash
pnpm install
pnpm exec tsc --noEmit
```

TypeScript passes. `pnpm build` also compiles the application and passes its
TypeScript phase, but the starter's `/pricing` prerender then calls Stripe and
requires a real test key. No production or personal Stripe key was used for
this public integration check. With a configured Stripe test environment,
inspect the browser for one tracker script and no duplicate navigation events.

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
