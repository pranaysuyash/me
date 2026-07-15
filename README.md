# Pranay Suyash — Product systems portfolio

Portfolio and commercial site for product engineering work across document intelligence, operational workflows, local-first AI, and spatial or simulation-heavy systems.

**Live:** [pranaysuyash.com](https://pranaysuyash.com)

## Product intent

The site is client-first. It is designed to:

- explain the kinds of systems Pranay can own end to end;
- show flagship product surfaces before the broader project archive;
- expose architecture, constraints, trade-offs, screenshots, and outcomes rather than technology badges alone;
- offer separate India INR and Global USD engagement price books;
- collect problem-first project briefs with regional scope guidance and explicit privacy notice;
- support original digital publications and software products without mixing them with consulting delivery;
- keep employment experience and writing available as secondary paths.

## Tech stack

- **Framework:** Next.js 15, App Router, static export
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 and repository-owned UI primitives
- **Animations:** Framer Motion with reduced-motion support
- **Icons:** Lucide React
- **State:** React state and Zustand where needed

## Architecture

The site exports static HTML and assets to `out/`. It has no application server, database, API routes, or public admin application.

Most portfolio content lives in `src/content/projects.json`. The sitemap is generated from that canonical project data through `src/app/sitemap.ts`. High-signal product narratives can use dedicated routes, such as `src/app/work/sentineltwin/page.tsx`, when a generic project record cannot communicate the system accurately.

The global shell provides:

- Person and WebSite structured data;
- generated sitemap and robots routes;
- Cloudflare security and cache headers;
- skip navigation, visible focus treatment, and reduced-motion behavior;
- privacy, terms, refund, and digital-delivery policies;
- a branded 404 route.

### Third-party and platform services

| Service | Purpose |
| --- | --- |
| Cloudflare Pages | Static hosting, production domain, and security layer |
| Cloudflare `/cdn-cgi/trace` | Same-origin country hint for regional pricing |
| FormBold | Contact-form submissions |
| Cal.com | 15-minute and 30-minute booking links |
| Dodo Payments | Merchant of Record for enabled digital-product checkout and fulfilment |
| GitHub Actions | Typecheck, static build, and exported-route contract checks |

Regional service pricing always includes a manual India / Global switch. Country detection is a convenience, not a hard access rule.

## Getting started

Use Node.js 22.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Verification:

```bash
npm run typecheck
npm run build
```

Preview the static export:

```bash
npx serve out -l 3000
```

## Environment configuration

```text
NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL=
```

Keep this variable blank until the final PDF and EPUB have been uploaded to Dodo, regional pricing and tax are correct, and a real test payment delivers both files. When blank, the ebook page remains sample-first and does not render a purchase button.

## Project structure

```text
├── .github/workflows/  # Typecheck, static build, and route verification
├── public/             # Static assets and Cloudflare _headers
├── src/
│   ├── app/            # Routes, policies, metadata routes, and case studies
│   ├── components/     # Shared React components
│   │   ├── layout/     # Navbar, footer, and page layout
│   │   ├── legal/      # Shared policy-page presentation
│   │   └── ui/         # Repository-owned UI primitives
│   ├── content/        # Project and experience data
│   └── lib/            # Shared positioning and product configuration
├── docs/               # Current and historical product documentation
└── tools/              # Helper utilities
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run typecheck` | Run strict TypeScript checking |
| `npm run build` | Generate the static site in `out/` |
| `npm run deploy:cloudflare` | Build and deploy `out/` to the `pranay` Cloudflare Pages project |
| `npm run format` | Format the repository with Prettier |

## Deployment

The canonical manual deployment command is:

```bash
npm run deploy:cloudflare
```

See `DEPLOYMENT_GUIDE.md` for route checks, regional-pricing verification, ebook publication gates, policy checks, form validation, security headers, and rollback steps.

## License

MIT
