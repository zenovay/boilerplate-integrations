# Tailwind Next.js Starter Blog

## Status

- Status: `community`
- Upstream commit: `b45bef66b40c63b6f57c15ee8cd090682238df4c`
- Last verified: 2026-07-18
- Maintainer: Zenovay
- Upstream: https://github.com/timlrx/tailwind-nextjs-starter-blog

## Install

This starter delegates analytics to Pliny. Once the
[`../pliny`](../pliny) provider is available, add to `data/siteMetadata.js`:

```js
zenovayAnalytics: {
  trackingCode: process.env.NEXT_PUBLIC_ZENOVAY_TRACKING_CODE,
  cookieless: true,
},
```

Set the public variable in local and deployment environments. Add
`https://api.zenovay.com` to the CSP `script-src` and `connect-src` directives
in `next.config.js`.

## Page views and SPA navigation

Pliny loads the tracker once in the root layout. The initial page is automatic;
the provider sends only unique later App Router navigations.

## Events

Client components can send `track`, `goal`, `identify`, and `revenue` through
`window.zenovay` or `@zenovay/tracker`. A blog commonly tracks newsletter
signup as a goal. Identify only signed-in users.

## Privacy and first-party tracking

Cookieless is enabled in metadata. Use the dashboard-generated first-party
script URL when eligible; keep it in the same config field.

## Local development and production

Pliny analytics render only in production. Enable Allow Localhost and run a
production preview for local event verification.

## Verification

Run the starter's lint/type/build checks with the patched Pliny package and
inspect generated HTML for one `z.js` script.

## Troubleshooting

- Nothing in dev: use a production build/preview.
- CSP refusal: update both script and connection policies.
- Doubled views: remove any separate hard-coded Zenovay tag.
- No local event: enable Allow Localhost.

## Removal

Delete the metadata block, environment variable, CSP additions, and event
calls. Remove the Pliny provider only if no other project uses it.

## Upstream proposal

Title: `docs(analytics): add Zenovay configuration example`

Description: Documents the optional Pliny Zenovay provider with cookieless
defaults, environment setup, CSP values, event examples, and removal steps.
