# Pranay Suyash Portfolio

A personal portfolio website for Pranay Suyash, showcasing projects, skills, and professional experience.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **API Routes**: GitHub integration, contact form
- **Content**: JSON-based with CRUD admin panel
- **Authentication**: GitHub OAuth (for admin access)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pranaysuyash/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Email (for contact form)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # GitHub OAuth (for admin access)
   GITHUB_ID=your-github-oauth-app-id
   GITHUB_SECRET=your-github-oauth-app-secret
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000

   # Admin access
   ADMIN_EMAILS=pranay.suyash@gmail.com
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

## Project Structure

- `/src/app/` - Next.js app router pages
- `/src/components/` - React components
  - `/ui/` - shadcn/ui components
  - `/layout/` - Layout components (navbar, footer, etc.)
- `/src/content/` - JSON data files for projects, timeline, etc.
- `/src/app/api/` - Next.js API routes
- `/public/` - Static assets

## Features

- **Dynamic Projects**: Showcase projects with detailed case study pages
- **Live GitHub Integration**: Displays pinned repositories
- **Medium RSS Feed**: Pulls latest articles from Medium
- **Contact Form**: Email integration with spam protection
- **Admin Panel**: CRUD operations for content management
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: System preference & toggle

## Admin Access

The `/admin` route is protected by GitHub OAuth. Only email addresses listed in the `ADMIN_EMAILS` environment variable can access the admin panel.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)