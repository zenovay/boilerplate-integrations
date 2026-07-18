# Open SaaS

## Status

- Status: `community`
- Upstream commit: `cd29faa2452554ded682a33baaf8c5bc9294c7dd`
- Last verified: 2026-07-18
- Maintainer: Zenovay
- Upstream: https://github.com/wasp-lang/open-saas

## Install

In the `app OpenSaaS` head array in `main.wasp`, add the canonical cookieless
script once:

```wasp
head: [
  "<script defer data-id='ZV_REPLACE_WITH_YOUR_CODE' data-cookieless='true' src='https://api.zenovay.com/z.js'></script>"
],
```

For a generated deployment, substitute a public build variable rather than
committing a real production code to a reusable template.

## Page views and SPA navigation

The tracker records the initial load. In `src/client/App.tsx`, observe
`useLocation()` and call `window.zenovay?.('page')` only after a unique later
location. The existing location logic provides a stable insertion point.

## Events

After signup, send `goal('signup_completed')` and identify the Wasp user by its
stable ID. Track checkout start from the pricing action. Connect Open SaaS's
Stripe or Polar account in Zenovay for reliable revenue; use browser revenue
only after confirmed checkout.

## Privacy and first-party tracking

This guide is cookieless and can run independently of the Google Analytics
cookie-consent path. Use the dashboard-generated custom-domain snippet for
first-party tracking.

## Local development and production

Enable Allow Localhost for the Zenovay site. Set the public code during Wasp
generation/deployment and update any CSP. No Plausible API credential is
required for Zenovay browser tracking.

## Verification

Run `wasp build` on the template, inspect the generated head for one script,
and navigate between landing and pricing once. Use an isolated site for the
Live View check.

## Troubleshooting

- Two analytics systems: Zenovay can coexist with Plausible/GA; remove one only by choice.
- Duplicate page view: skip the first `useLocation` effect.
- No local event: enable Allow Localhost.
- Admin analytics still reads Plausible/GA: this browser integration does not invent a Zenovay reporting API.

## Removal

Remove the head entry, location effect, event/identity calls, public build
value, and CSP entries. Disconnect payment providers in Zenovay if unused.

## Upstream proposal

Title: `feat(analytics): add optional Zenovay guide`

Description: Adds a cookieless Zenovay browser integration covering page
views, SPA routing, signup, identity, and payment attribution without changing
Open SaaS's existing admin reporting providers.
