# Security policy

## Reporting a vulnerability

Please do not open a public issue for a suspected vulnerability. Email
`security@zenovay.com` with a clear description, reproduction steps, affected
files or versions, and the impact you observed. We will acknowledge the report
and coordinate remediation and disclosure.

## Repository scope

This repository contains public integration code and documentation only. A
Zenovay website tracking code is designed to be present in browser-delivered
code and is not an API secret. Never commit API keys, service credentials,
payment-provider secrets, personal data, private endpoints, or production test
accounts.

Examples use placeholders and mocks. Automated tests must never send events to
production Zenovay tracking codes.

## Supported versions

Security fixes are applied to the latest release. Integration guides record
the upstream version or commit that was last verified.
