# React

## Status

- Status: `verified`
- Supported version: React 19.2 with Vite 8.1
- Last verified: 2026-07-18
- Maintainer: Zenovay
- Example: [`../../examples/react-vite`](../../examples/react-vite)
- Upstream docs: https://react.dev/reference/react/useEffect

## Install

```bash
pnpm add @zenovay/tracker
```

Set `VITE_ZENOVAY_TRACKING_CODE` in local and deployment environments. It is
public browser configuration. In one root-mounted component, call
`init(code, { cookieless: true })` from `useEffect`. The example uses the
private workspace lifecycle helper, which delegates to the same public npm
package.

## Page views and SPA navigation

The tracker records the initial page view. Subscribe to the chosen router and
call `page()` only when `pathname + search + hash` changes. Keep the previous
URL in a ref to prevent Strict Mode and router re-renders from double counting.

## Events

```tsx
import { goal, identify, revenue, track } from '@zenovay/tracker'

track('pricing_cta_clicked', { plan: 'pro' })
goal('signup_completed')
identify(user.id, { email: user.email, plan: user.plan })
revenue(49, 'USD', { order_id: order.id })
```

## Privacy and first-party tracking

Pass `{ cookieless: true }`. Forward a consent-manager decision with
`window.zenovay?.('consent', 'granted')` when replay consent is required. For first-party tracking,
copy the generated custom-domain configuration from the dashboard; pass its
script URL/API URL only as shown there.

## Local development and production

Enable the site's **Allow Localhost** toggle for development. Add the public
environment variable to the production host and include the Zenovay origin in
CSP `script-src` and `connect-src`.

## Verification

`pnpm --filter @zenovay/example-react-vite typecheck` and `build` are CI gates.
Unit tests also prove the script is loaded once and command calls queue. Use an
isolated site for any manual Live View check.

## Troubleshooting

- `window is not defined`: call `init` from an effect, never module scope.
- Two scripts: mount one provider and remove any old script tag.
- Two SPA page views: initialize the URL ref before subscribing.
- No local event: enable Allow Localhost in the dashboard.

## Removal

Remove the provider, package, router hook, public environment variable, CSP
entries, and Zenovay event calls.
