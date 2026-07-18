# Boilerplate catalog

`boilerplates.json` is a source-backed research catalog, not a claim to have
found every boilerplate on the internet. Discovery combined GitHub topics,
repository search, official product sites, public documentation, and source
inspection until results were mostly duplicates, inactive projects, or generic
templates without a SaaS integration surface.

## Priority score

Each score is out of 100:

| Dimension                                                    | Weight |
| ------------------------------------------------------------ | -----: |
| SaaS, founder, indie, agency, or commercial-builder audience |     15 |
| Existing analytics provider abstraction                      |     15 |
| Payment/subscription integration                             |     10 |
| Recommends competing analytics products                      |     10 |
| Public source and contribution accessibility                 |     10 |
| Recent activity and maintenance                              |     10 |
| Adoption, reputation, and documentation quality              |     10 |
| Ease of a native Zenovay implementation                      |     10 |
| Likelihood of maintainer acceptance/public contact path      |      5 |
| Zenovay value beyond page views                              |      5 |

Stars are one adoption signal, never the score. Commercial kits with a focused
SaaS audience and a provider interface can rank above larger generic starters.

## Evidence rules

- GitHub repository pages support public license, language, activity, and star
  signals at the stated check date.
- Provider or architecture claims link to public source or official docs.
- Unknown fields remain empty; they are never guessed.
- Commercial/private projects are `guide-only` or `blocked-private` until a
  legitimate current source checkout can be tested.

Validate with `pnpm validate`.
