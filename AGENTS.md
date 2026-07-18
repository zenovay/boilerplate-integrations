# AGENTS.md

This is a public Zenovay repository. Never commit credentials, customer data,
production tracking codes, test accounts, private endpoints, internal-only
service names, or source copied from private Zenovay repositories.

## Public integration contract

- Prefer `@zenovay/tracker` or the documented script at
  `https://api.zenovay.com/z.js`.
- Script installs use the public site tracking code in `data-id`.
- Do not create another analytics SDK in this repository.
- Cookieless examples use `data-cookieless="true"` or
  `init(code, { cookieless: true })`.
- The dashboard's Allow Localhost setting is authoritative for local events.
- First-party tracking instructions must point to the dashboard-generated
  custom-domain snippet.

## Status rules

Use only `verified`, `community`, `guide-only`, `planned`, `blocked-private`,
or `deprecated`. `verified` requires a recorded automated test or upstream
build against the version/commit listed in the guide.

## Required checks

Run `pnpm check` before committing. Review staged files individually, run the
secret scan again, and confirm catalog evidence links support every material
claim.

## Git workflow

Use conventional commits on `main`. Create pull requests for external
contributions. Never open upstream pull requests or contact maintainers
without explicit authorization.
