# Astro

## Status

- Status: `verified`
- Supported version: Astro 7.1
- Last verified: 2026-07-18
- Maintainer: Zenovay
- Example: [`../../examples/astro`](../../examples/astro)
- Upstream docs: https://docs.astro.build/en/reference/directives-reference/#isinline

## Install

Set `PUBLIC_ZENOVAY_TRACKING_CODE`. In the shared layout head, add the canonical
script with `data-id={trackingCode}`, `data-cookieless="true"`, and `is:inline`.
No package is required for the script-tag approach.

## Page views and SPA navigation

Full document navigation is automatic. If Astro view transitions are enabled,
listen for Astro's navigation lifecycle and call `zenovay('page')` once per
new URL; keep a previous-URL guard.

## Events

Browser scripts can call:

```js
window.zenovay?.('track', 'pricing_cta_clicked', { plan: 'pro' })
window.zenovay?.('goal', 'signup_completed')
window.zenovay?.('identify', user.id, { email: user.email })
window.zenovay?.('revenue', 49, 'USD', { order_id: order.id })
```

## Privacy and first-party tracking

The example is explicitly cookieless. Send replay consent only after the site's
consent policy allows it. Eligible plans should use the dashboard-generated
custom-domain snippet for first-party tracking.

## Local development and production

Enable Allow Localhost in the Zenovay site settings. Astro public variables are
embedded at build time, so set the variable in the deployment environment.

## Verification

CI runs `astro check` and `astro build`. Inspect the generated HTML for one
`z.js` tag, then use an isolated site for a manual Live View check.

## Troubleshooting

- Empty code: use the `PUBLIC_` prefix and set it before build.
- Script duplicated across nested layouts: keep it only in the highest shared layout.
- SPA double count: guard view-transition events by URL.
- CSP error: allow Zenovay in both script and connection policies.

## Removal

Delete the layout script, public variable, browser event calls, and CSP entries.
