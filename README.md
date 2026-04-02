# Pranay Suyash — Portfolio

Personal portfolio site showcasing projects, experience, and consulting services.

**Live:** [pranaysuyash.com](https://pranaysuyash.com)

## Tech Stack

- **Framework:** Next.js 15 (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui components
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State:** Zustand

## Architecture

This is a fully static site — no server, no database, no API routes. All content is sourced from JSON files in `src/content/`. The build produces a plain `out/` folder deployable to S3, Cloudflare Pages, GitHub Pages, or any static host.

### Third-party services

| Service                          | Purpose                                    |
| -------------------------------- | ------------------------------------------ |
| [FormBold](https://formbold.com) | Contact form submissions (serverless)      |
| [Cal.com](https://cal.com)       | Booking/scheduling (15-min & 30-min calls) |

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build static export
npm run build

# Preview static build locally
npx serve out -l 3000
```

## Project Structure

```
├── public/              # Static assets (images, robots.txt, sitemap.xml)
├── src/
│   ├── app/             # Next.js pages (all static)
│   ├── components/      # React components
│   │   ├── ui/          # shadcn/ui primitives
│   │   └── layout/      # Navbar, footer, page layout
│   └── content/         # JSON data (projects, services, experience, etc.)
├── docs/                # Documentation
│   ├── audits/          # Portfolio & technical audits
│   ├── decisions/       # Architecture decisions
│   ├── marketing/       # Marketing & outreach docs
│   ├── personas/        # Target audience personas
│   ├── strategy/        # Strategy & planning docs
│   └── archive/         # Historical/reference docs
└── tools/               # Reusable helper utilities
```

## Scripts

| Command             | Description                   |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start dev server              |
| `npm run build`     | Build static export to `out/` |
| `npm run lint`      | Run ESLint                    |
| `npm run typecheck` | Run TypeScript type checking  |
| `npm run format`    | Format code with Prettier     |

## Deployment

The site is a static export. Deploy the `out/` folder to any static host:

```bash
npm run build
# Upload out/ to S3 + CloudFront, Cloudflare Pages, GitHub Pages, etc.
```

## License

MIT
