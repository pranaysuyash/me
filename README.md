# Pranay Suyash — Product systems portfolio

Portfolio and commercial site for product engineering work across document intelligence, operational workflows, local-first AI, and spatial or simulation-heavy systems.

**Live:** [pranaysuyash.com](https://pranaysuyash.com)

## Product intent

The site is client-first. It is designed to:

- explain the kinds of systems Pranay can own end to end;
- show a small set of flagship case studies before the broader project archive;
- expose architecture, constraints, trade-offs, screenshots, and outcomes rather than technology badges alone;
- offer separate India INR and Global USD engagement price books;
- collect problem-first project briefs with regional scope guidance;
- keep employment experience and writing available as secondary paths.

## Tech stack

- **Framework:** Next.js 15, App Router, static export
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 and shadcn/ui primitives
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State:** React state and Zustand where needed

## Architecture

The site exports static HTML and assets to `out/`. It has no application server, database, or API routes.

Most portfolio content lives in `src/content/projects.json`. High-signal commercial and product narratives can also use dedicated routes, such as `src/app/work/sentineltwin/page.tsx`, when a generic project record cannot communicate the system accurately.

### Third-party and platform services

| Service | Purpose |
| --- | --- |
| Cloudflare Pages | Static hosting and production domain |
| Cloudflare `/cdn-cgi/trace` | Same-origin country hint for regional pricing |
| FormBold | Contact-form submissions |
| Cal.com | 15-minute and 30-minute booking links |
| GitHub Actions | Static build and critical-route checks |

Regional pricing always includes a manual India / Global switch. Country detection is a convenience, not a hard access rule.

## Getting started

Use Node.js 22.

```bash
npm ci
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

## Project structure

```text
├── .github/workflows/  # Static build and route verification
├── public/             # Static assets, robots.txt, sitemap.xml
├── src/
│   ├── app/            # Next.js routes and case studies
│   ├── components/     # Shared React components
│   │   ├── layout/     # Navbar, footer, page layout
│   │   └── ui/         # UI primitives
│   ├── content/        # Project and experience data
│   └── lib/            # Shared positioning and utility values
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

See `DEPLOYMENT_GUIDE.md` for route checks, regional-pricing verification, form validation, and rollback steps.

## License

MIT
