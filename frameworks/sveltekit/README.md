# SvelteKit

## Status

- Status: `verified`
- Supported version: SvelteKit 2.70, Svelte 5.56
- Last verified: 2026-07-18
- Maintainer: Zenovay
- Example: [`../../examples/sveltekit`](../../examples/sveltekit)
- Upstream docs: https://svelte.dev/docs/kit/$app-navigation#afterNavigate

## Install

```bash
pnpm add @zenovay/tracker
```

Set `PUBLIC_ZENOVAY_TRACKING_CODE`. In the root `+layout.svelte`, initialize
inside `onMount`; do not call browser APIs during SSR.

## Page views and SPA navigation

Register `afterNavigate` during component initialization. The tracker records
the initial page, so initialize the URL guard in `onMount` and notify only for
subsequent unique destinations.

## Events

Import `track`, `goal`, `identify`, and `revenue` from `@zenovay/tracker` in
browser components. Send a stable authenticated user ID and fire revenue only
after payment confirmation.

## Privacy and first-party tracking

Use `{ cookieless: true }` and forward any replay-consent decision through
`window.zenovay?.('consent', 'granted')`. On Scale or Enterprise, copy the custom-domain configuration from
the dashboard rather than guessing URLs.

## Local development and production

Enable Allow Localhost for the site. `PUBLIC_` variables reach browser code;
set the value for each deployed environment and update CSP.

## Verification

CI runs `svelte-check` and the production Vite build. Verify one script and one
page event for each client navigation with an isolated site.

## Troubleshooting

- SSR error: move initialization into `onMount`.
- Initial page doubled: do not emit it from `afterNavigate`.
- Variable missing: use the public env namespace.
- Events absent locally: enable Allow Localhost in Zenovay.

## Removal

Remove the root-layout lifecycle code, package, environment variable, event
calls, and Zenovay-only CSP entries.
