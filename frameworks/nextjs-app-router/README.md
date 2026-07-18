# Next.js App Router

## Status

- Status: `verified`
- Supported version: Next.js 16.2, React 19.2
- Last verified: 2026-07-18
- Maintainer: Zenovay
- Example: [`../../examples/nextjs-saas`](../../examples/nextjs-saas)
- Upstream docs: https://nextjs.org/docs/app/api-reference/functions/use-pathname

## Install

```bash
pnpm add @zenovay/tracker
```

Set `NEXT_PUBLIC_ZENOVAY_TRACKING_CODE`. Add one `'use client'` provider from
the root layout and initialize in `useEffect`; never access `window` in the
server layout.

## Page views and SPA navigation

Use `usePathname()` and `useSearchParams()` in the client provider. The tracker
captures the initial load, so initialize the previous URL first and call
`page()` only on a subsequent unique URL. Wrap a component using
`useSearchParams` in `Suspense` if the application's rendering mode requires it.

## Events

In client components:

```ts
import { goal, identify, revenue, track } from '@zenovay/tracker'

track('checkout_started', { plan: 'pro' })
goal('signup_completed')
identify(user.id, { email: user.email })
revenue(49, 'USD', { order_id: order.id })
```

Use Stripe or another supported dashboard integration for authoritative
server-side revenue where possible; do not expose payment secrets to the
client.

## Privacy and first-party tracking

Initialize with `{ cookieless: true }`. Connect consent decisions through
`window.zenovay?.('consent', 'granted')` if needed. Use the dashboard-generated first-party
snippet/configuration on eligible plans.

## Local development and production

Enable Allow Localhost for the Zenovay site, then set the public variable in
`.env.local`. Set the same public variable in the deployment environment. Add
Zenovay to CSP `script-src` and `connect-src`.

## Verification

CI runs `next build` and TypeScript against the example. In DevTools, ensure
the root provider creates one script and one request per client navigation.

## Troubleshooting

- Build-time `window` error: the provider must be a client component.
- Duplicate page views: do not manually emit the initial URL.
- Missing production code: confirm the `NEXT_PUBLIC_` value exists at build time.
- Blocked requests: update CSP and test without an ad blocker or use verified first-party tracking.

## Removal

Delete the client provider and root-layout import, remove the package and
public variable, delete event calls, and remove Zenovay-only CSP entries.
