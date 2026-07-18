# Achromatic

## Status

- Status: `blocked-private`
- Public docs checked: 2026-07-18
- Maintainer: Zenovay
- Upstream docs: https://www.achromatic.dev/docs/starter-kits

Achromatic's current Next.js 16 starter kits are commercial. No proprietary
source was accessed or reconstructed.

## Install

Pending legitimate source access or maintainer cooperation. The expected safe
path is one App Router client provider using `@zenovay/tracker`, but exact
paths and environment schemas are intentionally not guessed.

## Page views and SPA navigation

Required behavior: automatic initial view, then one event per unique client
navigation.

## Events

Required coverage: custom event, signup goal, stable authenticated-user
identification, and confirmed Stripe revenue.

## Privacy and first-party tracking

Required defaults: cookieless mode, existing consent integration, and the
dashboard-generated first-party configuration.

## Local development and production

Required checks: Allow Localhost, client env validation, SSR safety, CSP, and
deployment variables.

## Verification

Blocked until the creator or a licensee can run the current typecheck, tests,
build, and browser scenarios. Do not label this verified based on public docs.

## Troubleshooting

To be authored against real current source after access is granted.

## Removal

Must list exact files, package, environment schema, CSP, event hooks, and
payment connection after implementation.

## Upstream proposal

Title: `feat: offer Zenovay as an analytics provider`

Zenovay would prepare and maintain the integration after the maintainer confirms
the current extension point. No partnership is implied by this backlog entry.
