# Contributing

Thank you for helping boilerplate maintainers offer Zenovay cleanly.

## Add or update an integration

1. Start from [`docs/integration-template.md`](docs/integration-template.md).
2. Use only the public script or `@zenovay/tracker` API.
3. Include page views, SPA navigation, a custom event, signup goal, user
   identification, revenue where applicable, cookieless mode, local and
   production behavior, verification, troubleshooting, and removal.
4. Add public evidence to `catalog/boilerplates.json`.
5. Use `verified` only after running the integration against the recorded
   upstream version or commit.
6. Run `pnpm check`.

## Pull requests

Keep changes focused. Explain what was tested and list the upstream version or
commit. Do not include production tracking codes, screenshots containing user
data, copied proprietary source, private correspondence, or contact details.

By contributing, you agree that your contribution is licensed under MIT.
