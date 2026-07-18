# ixartz SaaS Boilerplate

## Status

- Status: `community`
- Upstream commit: `5d0ce02cbdaa8562c2362bba80022833f2a764f5`
- Last verified: 2026-07-18
- Maintainer: Zenovay
- Upstream: https://github.com/ixartz/SaaS-Boilerplate

## Install

Add `@zenovay/tracker@0.1.0`. Create a client-only provider using the Next.js
example and render it once from `src/app/[locale]/layout.tsx`. Set
`NEXT_PUBLIC_ZENOVAY_TRACKING_CODE` in the project's typed environment schema
and deployments. Keep the existing Sentry instrumentation; Zenovay adds web,
conversion, and revenue analytics rather than replacing error capture.

## Page views and SPA navigation

Track the locale-qualified pathname and search parameters, skipping the
automatic initial page view and repeated URLs.

## Events

Send a signup goal and identify the stable user ID after the boilerplate's auth
success. Track checkout start in the Pro billing flow and connect Stripe in
Zenovay for revenue attribution.

## Privacy and first-party tracking

Initialize in cookieless mode. Keep Sentry's own privacy configuration
separate. Use the Zenovay dashboard-generated first-party configuration.

## Local development and production

Enable Allow Localhost. Add the public variable to Playwright only when a test
uses a mocked tracker; automated tests must not send production events. Update
CSP and deployment values.

## Verification

Run lint, typecheck, unit tests, Playwright with request interception, and
`next build`. Confirm one tracker load and no duplicate locale navigation.

## Troubleshooting

- Sentry works but Zenovay does not: verify the separate public Zenovay value.
- Locale change doubles: dedupe the complete localized URL.
- No localhost data: enable the site setting.
- Payment unmatched: identify with the same application user used by checkout.

## Removal

Remove the provider/layout import, package, env schema/value, event calls, CSP
entries, and optional payment connection. Leave Sentry unchanged.

## Upstream proposal

Title: `feat: add optional Zenovay analytics integration`

Description: Adds cookieless traffic, conversion, identity, and revenue
tracking alongside the existing Sentry monitoring setup, with no backend
secrets or private API dependency.
