# MakerKit

## Status

- Status: `guide-only`
- Public docs checked: 2026-07-18
- Maintainer: Zenovay
- Upstream docs: https://makerkit.dev/docs/next-supabase-turbo/analytics

MakerKit documents a provider-agnostic analytics service and App Events, but
the current full kit is commercial. This guide is not an official MakerKit
integration and requires maintainer/current-licensee verification.

## Install

Implement MakerKit's documented custom `AnalyticsService` with
`@zenovay/tracker`. Initialize one client provider with the public Zenovay code
and `{ cookieless: true }`; implement page view, `trackEvent`, and `identify`
by delegating to the matching public helpers. Do not add a server strategy
until Zenovay documents a suitable server API.

## Page views and SPA navigation

Let the tracker capture the initial view. Use MakerKit's analytics provider
navigation lifecycle for later unique URLs, with a previous-URL guard.

## Events

Map MakerKit App Events to `track`, send `goal('signup_completed')` on the
successful signup event, and call `identify` with the authenticated stable ID.
Connect Stripe in Zenovay or call `revenue` only after payment confirmation.

## Privacy and first-party tracking

Cookieless is explicit. Connect replay consent to the kit's consent layer if
enabled. Use the dashboard-generated first-party custom-domain configuration.

## Local development and production

Enable Allow Localhost. Add the public code to MakerKit's validated client
environment and deployment. Update CSP.

## Verification

The creator should run the kit's current typecheck, tests, and build; confirm
App Events, signup, identity, route navigation, and Stripe attribution on an
isolated site before changing status to `verified`.

## Troubleshooting

Check provider registration, client-only initialization, duplicate providers,
the dashboard localhost toggle, CSP, and stable user IDs.

## Removal

Unregister the provider and App Events bridge, remove the package and client
variable, delete CSP entries and calls, and disconnect optional revenue setup.

## Upstream proposal

Title: `feat(analytics): add Zenovay provider`

Offer an opt-in provider covering cookieless traffic, App Events, signup,
identity, and Stripe-attributed revenue, maintained and supported by Zenovay.
