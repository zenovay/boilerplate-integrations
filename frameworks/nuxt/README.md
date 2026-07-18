# Nuxt

## Status

- Status: `verified`
- Supported version: Nuxt 4.4, Vue 3.5
- Last verified: 2026-07-18
- Maintainer: Zenovay
- Example: [`../../examples/nuxt`](../../examples/nuxt)
- Upstream docs: https://nuxt.com/docs/guide/directory-structure/plugins

## Install

```bash
pnpm add @zenovay/tracker
```

Set `NUXT_PUBLIC_ZENOVAY_TRACKING_CODE` and map it to a public runtime-config
key. Create `plugins/zenovay.client.ts`, initialize there with cookieless mode,
and keep all browser access in the `.client` plugin.

## Page views and SPA navigation

The tracker records the initial page. Register a `page:finish` hook and call
`page()` only when the resulting path, query, or hash differs from the previous
URL. The repository example contains the complete hook.

## Events

Use `track`, `goal`, `identify`, and `revenue` from `@zenovay/tracker` in client
components or composables. Identify with the application's stable user ID;
record revenue after confirmed checkout.

## Privacy and first-party tracking

Pass `{ cookieless: true }`. Connect the consent helper to an existing CMP if
replay consent is required. Use only the dashboard-generated first-party
custom-domain configuration.

## Local development and production

Enable Allow Localhost in the site settings. Public runtime config is safe for
the tracking code. Set it separately in each deployment environment and update
CSP if one is present.

## Verification

CI runs `nuxt typecheck` and `nuxt build`. Confirm one tracker script and one
page event per completed navigation, then verify against an isolated site.

## Troubleshooting

- SSR `window` failure: keep the plugin filename ending in `.client.ts`.
- Missing variable: verify the `NUXT_PUBLIC_` name and runtime-config mapping.
- Duplicate events: do not send the initial page from the route hook.
- No local event: enable Allow Localhost in Zenovay.

## Removal

Delete the plugin and runtime-config key, remove the package and environment
variable, delete event calls, and remove Zenovay-only CSP entries.
