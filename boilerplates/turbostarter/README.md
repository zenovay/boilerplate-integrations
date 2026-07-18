# TurboStarter

## Status

- Status: `guide-only`
- Public docs checked: 2026-07-18
- Maintainer: Zenovay
- Upstream docs: https://www.turbostarter.dev/docs/web/analytics/configuration

## Install

Implement the documented client strategy in `@workspace/analytics-web`: a
`Provider` that initializes `@zenovay/tracker` in cookieless mode and a `track`
function that delegates to Zenovay. Export its client env schema and select the
provider using the kit's existing export pattern. No server strategy is
claimed because this repository does not invent a Zenovay server API.

## Page views and SPA navigation

The Provider owns one route listener, skips the initial automatic view, and
deduplicates later URLs.

## Events

Map TurboStarter's `track` contract directly. Add explicit signup goal and user
identification at auth success. Connect the payment provider in Zenovay or send
revenue only from confirmed checkout browser state.

## Privacy and first-party tracking

Use cookieless mode and existing consent UI. Use the dashboard-generated
first-party configuration on eligible plans.

## Local development and production

Enable Allow Localhost, add the public variable to the web app, and update CSP.

## Verification

The maintainer or licensee must run the current monorepo tests and builds and
verify provider selection, SSR, navigation, event, identity, revenue, and
removal flows before changing status.

## Troubleshooting

Check provider exports, environment schema, `.client` boundaries, duplicate
wrappers, CSP, and the Allow Localhost setting.

## Removal

Restore the previous provider export, delete Zenovay files/dependency/env/CSP,
and remove application event calls.

## Upstream proposal

Title: `feat(analytics-web): add Zenovay provider`

Adds an opt-in client strategy for cookieless traffic, conversion, identity,
and revenue analytics; Zenovay maintains it and supports users.
