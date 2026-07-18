# HTML

## Status

- Status: `verified`
- Supported version: HTML Living Standard
- Last verified: 2026-07-18
- Maintainer: Zenovay
- Example: [`../../examples/html`](../../examples/html)

## Install

Add this once inside the shared `<head>`:

```html
<script
  defer
  data-id="ZV_REPLACE_WITH_YOUR_CODE"
  data-cookieless="true"
  src="https://api.zenovay.com/z.js"
></script>
```

There is no required environment variable for a static file. Replace the
placeholder at build time if your generator supports public environment
variables.

## Page views and SPA navigation

The initial page view is automatic. Traditional document navigation loads a
new page and needs no hook. If JavaScript changes the URL without a document
load, call `window.zenovay?.('page')` once after each unique navigation.

## Events

```js
window.zenovay?.('track', 'pricing_cta_clicked', { plan: 'pro' })
window.zenovay?.('goal', 'signup_completed')
window.zenovay?.('identify', user.id, { email: user.email, plan: user.plan })
window.zenovay?.('revenue', 49, 'USD', { order_id: order.id })
```

Only identify users after authentication, with a stable internal ID. Fire
revenue after confirmed checkout, not when the button is clicked.

## Privacy and first-party tracking

`data-cookieless="true"` disables tracker cookies and localStorage. If your
site uses consent-gated replay, call `zenovay('consent', 'granted')` or
`'denied'` from the consent manager. Scale and Enterprise users should copy
the first-party custom-domain snippet generated in the Zenovay dashboard.

## Local development and production

Enable **Allow Localhost** for the site in Zenovay before expecting local
events. In production, allow `https://api.zenovay.com` in `script-src` and
`connect-src` if the site has a CSP.

## Verification

The example is parsed by repository validation. In a browser, confirm one
`z.js` request, navigate once, fire one test event on an isolated Zenovay site,
then verify it in Live View.

## Troubleshooting

- No script: check CSP, ad blockers, and the exact `data-id` value.
- No localhost event: enable the dashboard setting.
- Doubled counts: remove duplicate tags and do not call `page` for the initial load.
- First-party failure: use the dashboard-generated URL only after domain verification.

## Removal

Delete the script tag, event calls, public build variable, CSP entries added
only for Zenovay, and the website from Zenovay if it is no longer needed.
