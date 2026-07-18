# Framework and platform backlog

The public script works anywhere that can add browser JavaScript. A dedicated
adapter is useful only when a framework has lifecycle, routing, or packaging
details worth maintaining.

| Ecosystem            | Status     | Recommended path                                                                       |
| -------------------- | ---------- | -------------------------------------------------------------------------------------- |
| HTML                 | verified   | Script in the shared document head.                                                    |
| React + Vite         | verified   | npm wrapper in one client provider.                                                    |
| Next.js App Router   | verified   | One client provider from the root layout.                                              |
| Next.js Pages Router | community  | `next/script` in `_app` plus router events.                                            |
| Astro                | verified   | npm client component or inline script in the base layout.                              |
| Nuxt                 | verified   | client-only plugin plus route hook.                                                    |
| Vue                  | community  | npm wrapper in the app bootstrap plus router hook.                                     |
| SvelteKit            | verified   | client layout lifecycle plus `afterNavigate`.                                          |
| Remix / React Router | community  | root document plus location hook.                                                      |
| Gatsby               | community  | browser APIs or root layout.                                                           |
| SolidStart           | community  | client bootstrap; never access `window` during SSR.                                    |
| Qwik                 | community  | root document or visible task.                                                         |
| Angular              | community  | script in `src/index.html`, router hook for SPA page views.                            |
| Laravel              | guide-only | Blade base layout; identify/events from browser code.                                  |
| Rails                | guide-only | application layout; Turbo navigation hook.                                             |
| Django               | guide-only | base template; browser event calls.                                                    |
| Phoenix              | guide-only | root layout; LiveView navigation hook needs verification.                              |
| WordPress            | guide-only | header injection; no official Zenovay plugin is claimed.                               |
| Webflow              | guide-only | project custom code.                                                                   |
| Shopify              | guide-only | theme integration; checkout access depends on Shopify plan and current platform rules. |
| Framer               | guide-only | custom code component/site settings.                                                   |
| Ghost                | guide-only | code injection in the site header.                                                     |

Server-side SDKs are not invented here. Backend frameworks use the browser
tracker for public analytics unless Zenovay documents a suitable server API.
