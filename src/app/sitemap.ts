import type { MetadataRoute } from "next";
import projectsData from "@/content/projects.json";
import { auditedProjects } from "@/lib/portfolio";

export const dynamic = "force-static";

const baseUrl = "https://pranaysuyash.com";
const auditedSlugs = new Set(auditedProjects.map((project) => project.slug));

const coreRoutes: MetadataRoute.Sitemap = [
  { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
  { url: `${baseUrl}/work`, changeFrequency: "weekly", priority: 0.95 },
  { url: `${baseUrl}/workflows`, changeFrequency: "weekly", priority: 0.94 },
  { url: `${baseUrl}/hire-me`, changeFrequency: "monthly", priority: 0.92 },
  { url: `${baseUrl}/proof`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${baseUrl}/work-with-me`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${baseUrl}/document-workflows`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${baseUrl}/work/medpiper-workflow`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${baseUrl}/work/sentineltwin`, changeFrequency: "weekly", priority: 0.86 },
  { url: `${baseUrl}/systems`, changeFrequency: "weekly", priority: 0.82 },
  { url: `${baseUrl}/labs`, changeFrequency: "monthly", priority: 0.52 },
  { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.86 },
  { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.72 },
  {
    url: `${baseUrl}/books/no-claim-without-evidence`,
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    url: `${baseUrl}/books/no-claim-without-evidence/sample`,
    changeFrequency: "monthly",
    priority: 0.55,
  },
  { url: `${baseUrl}/accessibility`, changeFrequency: "yearly", priority: 0.4 },
  { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${baseUrl}/refund-policy`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${baseUrl}/delivery-policy`, changeFrequency: "yearly", priority: 0.3 },
];

const projectRoutes: MetadataRoute.Sitemap = projectsData.projects.map((project) => ({
  url: `${baseUrl}/work/${project.slug}`,
  changeFrequency: auditedSlugs.has(project.slug) ? "monthly" : "yearly",
  priority: auditedSlugs.has(project.slug) ? 0.84 : 0.35,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...coreRoutes, ...projectRoutes];
  const seen = new Set<string>();

  return routes.filter((route) => {
    if (seen.has(route.url)) return false;
    seen.add(route.url);
    return true;
  });
}
