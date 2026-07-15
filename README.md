# Pranay Suyash — career and product-systems platform

Professional portfolio, hiring surface, commercial services site, and digital-publication storefront for Pranay Suyash.

**Live:** [pranaysuyash.com](https://pranaysuyash.com)

## Product intent

The site serves two primary professional decisions:

1. **Hiring teams** evaluating senior product leadership, AI product, and product-systems fit.
2. **Founders and operators** evaluating a scoped document workflow, internal tool, local-first product, or advanced system engagement.

Writing and digital products support the professional thesis without competing with those two paths.

The site is designed to:

- position Pranay as a product leader who remains close to implementation;
- lead with verified professional outcomes and ownership rather than repository count;
- separate production transformations, commercial products, working product builds, active platforms, prototypes, and archived experiments;
- expose primary users, maturity, decisions, constraints, trade-offs, and current implementation boundaries;
- make MedPiper workflow evidence a first-class professional case study;
- focus the commercial wedge on document-heavy and workflow-heavy systems where AI output must remain reviewable;
- preserve earlier repositories in a claim-safe archive;
- sell the publication **No Claim Without Evidence** through a production Dodo checkout;
- keep career, commercial, and digital-product contracting roles explicit.

## Canonical evidence model

Public claims must not be copied directly from historical marketing fields.

- `src/lib/career.ts` is the canonical source for professional positioning, verified impact, experience, role fit, and the sanitized MedPiper case study.
- `src/lib/portfolio.ts` is the canonical source for the four audited independent product case studies and their maturity labels.
- `src/content/projects.json` remains the historical repository inventory used for archive discovery and static slugs. Audited project slugs are filtered out of archive presentation and rendered through `src/lib/portfolio.ts` instead.
- Dedicated routes may add product-specific visual storytelling, but may not broaden maturity or outcome claims beyond the audited source.

Do not add testimonials, customer counts, adoption metrics, production claims, certifications, or shipped capabilities without verifiable evidence and an explicit source boundary.

## Primary routes

| Route | Purpose |
| --- | --- |
| `/` | Senior professional positioning, hard proof, MedPiper case, and selected systems |
| `/hire-me` | Experience, target roles, availability, resume, and hiring conversion |
| `/work` | MedPiper professional case plus four audited product systems |
| `/work/medpiper-workflow` | Sanitized production workflow transformation case study |
| `/work/sig-ext-fastapi` | SignKit commercial local-first product case |
| `/work/metaextract` | MetaExtract working product-build case |
| `/work/echopanel` | EchoPanel working-prototype case |
| `/work/sentineltwin` | SentinelTwin active-platform case |
| `/work-with-me` | Commercial service hierarchy, pricing, and engagement model |
| `/document-workflows` | Focused document-workflow offer and delivery contract |
| `/systems` | Illustrative Three.js systems playground linked to audited cases |
| `/labs` | Claim-safe archive for earlier repositories and experiments |
| `/books/no-claim-without-evidence` | Production ebook sales page |
| `/contact` | Separate hiring and project enquiry modes |

## Tech stack

- **Framework:** Next.js 15 App Router with static export
- **Language:** TypeScript with strict checking
- **Styling:** Tailwind CSS v4 and repository-owned UI primitives
- **Typography:** Plus Jakarta Sans and JetBrains Mono
- **Interactive lab:** Three.js, CSS2D labels, and OrbitControls in a standalone static surface
- **State:** React state and Zustand where needed
- **Hosting:** Cloudflare Pages

## Architecture

The site exports static HTML and assets to `out/`. It has no application server, database, API routes, or public admin application.

The global shell provides:

- Person and WebSite structured data aligned to senior product leadership;
- generated sitemap and robots routes;
- Cloudflare security, redirect, and cache headers;
- skip navigation, visible focus treatment, and reduced-motion behaviour;
- privacy, terms, refund, and digital-delivery policies;
- a branded 404 route.

### Third-party and platform services

| Service | Purpose |
| --- | --- |
| Cloudflare Pages | Static hosting, production domain, redirects, and security layer |
| Cloudflare `/cdn-cgi/trace` | Same-origin country hint for regional pricing |
| FormBold | Hiring and project enquiry submissions |
| Cal.com | 15-minute and 30-minute booking links |
| Dodo Payments | Merchant of Record for ebook checkout, tax, receipt, and fulfilment |
| GitHub Actions | Typecheck, publication checks, static build, claim gates, route checks, and generated-resume validation |

Regional service pricing always includes a manual India / Global switch. Country detection is a convenience, not a hard access rule.

## Getting started

Use Node.js 22 and Python 3.12+.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Verification:

```bash
npm run typecheck
npm run book:validate
npm run build
```

`npm run build` first generates `public/pranay-suyash-resume.pdf` from the dependency-free source in `scripts/generate_resume_pdf.py`, then performs the Next.js static export.

Preview the exact static output:

```bash
npx serve out -l 3000
```

## Environment configuration

```text
NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL=
```

The production Dodo checkout is committed as the safe default in `src/lib/ebook.ts`. The environment variable is an optional build-time override for a future replacement checkout URL. It must never point to an untested or placeholder payment link.

## Project structure

```text
├── .github/workflows/       # Typecheck, publication, claim, route, PDF, and export gates
├── public/                  # Static assets, Cloudflare rules, web resume, generated PDF target
├── scripts/                 # Dependency-free generated-resume tooling
├── src/
│   ├── app/                 # Career, work, services, archive, policies, metadata, and book routes
│   ├── components/          # Shared layout, pricing, forms, legal, and UI primitives
│   ├── content/             # Historical repository inventory
│   └── lib/
│       ├── career.ts        # Canonical professional evidence and MedPiper case
│       ├── portfolio.ts     # Canonical audited product maturity and claims
│       ├── ebook.ts         # Production ebook configuration
│       └── brand.ts         # Shared brand language
├── book/                    # Canonical publication sources, tools, manifests, and QA evidence
├── dist/                    # Source-controlled customer PDF and EPUB deliverables
└── docs/                    # Strategy, audits, deployment, and historical documentation
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run typecheck` | Run strict TypeScript checking |
| `npm run resume:build` | Generate the two-page A4 PDF resume |
| `npm run book:validate` | Validate book source, package, navigation, and cleanup protection |
| `npm run build` | Generate the resume and static site in `out/` |
| `npm run deploy:cloudflare` | Build and deploy `out/` to the `pranay` Cloudflare Pages project |
| `npm run clean:safe` | Preview the fail-closed generated-file cleanup |
| `npm run format` | Format the repository with Prettier |

## Release contract

`.github/workflows/site-build.yml` fails when:

- a primary career, service, case-study, archive, policy, book, or lab route is missing;
- the homepage embeds the WebGL lab in the career hero;
- required maturity labels or professional evidence disappear;
- the MedPiper disclosure or measured outcome disappears;
- SignKit reintroduces unsupported backend, billing, certificate, or trial claims;
- the generated resume is not a valid two-page PDF;
- the production Dodo checkout or Buy action disappears;
- the product-lab module, redirects, or compatibility loader break;
- the generated sitemap omits required canonical routes.

See `DEPLOYMENT_GUIDE.md` for the full production and rollback procedure.

## License

MIT
