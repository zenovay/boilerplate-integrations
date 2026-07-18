# supastarter

## Status

- Status: `guide-only`
- Public docs checked: 2026-07-18
- Maintainer: Zenovay
- Upstream docs: https://supastarter.dev/docs/nextjs/analytics/overview

The current kit is commercial. Public docs confirm a generic analytics module
and custom provider path; exact filenames must be verified in a licensed copy.

## Install

Create a provider following the documented custom-provider interface. Load
`@zenovay/tracker` once, expose Zenovay's `track` helper, and render its script
component/provider from the analytics module. Use the kit's public client env
schema for the Zenovay tracking code.

## Page views and SPA navigation

Skip the automatic initial view; send only unique later router URLs.

## Events

Use the generic module for custom events. Add signup `goal`, authenticated-user
`identify`, and confirmed-checkout `revenue`; connect the configured payment
provider in Zenovay where supported.

## Privacy and first-party tracking

Initialize cookieless and connect existing consent state if needed. Use only
the custom-domain configuration generated in Zenovay.

## Local development and production

Enable Allow Localhost, set the client variable per environment, and update CSP.

## Verification

Run the licensed kit's tests/build and verify route, event, signup, identity,
revenue, SSR, duplicate-load, and removal scenarios before marking verified.

## Troubleshooting

Check the selected provider export, public env validation, client-only boundary,
duplicate analytics script, CSP, and localhost setting.

## Removal

Remove the provider/export, dependency, public value, calls, and CSP entries.

## Upstream proposal

Title: `feat(analytics): add Zenovay provider`

Zenovay will maintain an optional native provider and support users; existing
providers remain unchanged.
