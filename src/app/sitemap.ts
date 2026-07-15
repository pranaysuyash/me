import type { MetadataRoute } from "next";
import projectsData from "@/content/projects.json";

export const dynamic = "force-static";

const baseUrl = "https://pranaysuyash.com";

const coreRoutes: MetadataRoute.Sitemap = [
  { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
  { url: `${baseUrl}/work-with-me`, changeFrequency: "weekly", priority: 0.95 },
  { url: `${baseUrl}/work`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${baseUrl}/work/sentineltwin`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/hire-me`, changeFrequency: "monthly", priority: 0.65 },
  {
    url: `${baseUrl}/books/no-claim-without-evidence`,
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    url: `${baseUrl}/books/no-claim-without-evidence/sample`,
    changeFrequency: "monthly",
    priority: 0.55,
  },
  { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${baseUrl}/refund-policy`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${baseUrl}/delivery-policy`, changeFrequency: "yearly", priority: 0.3 },
];

const projectRoutes: MetadataRoute.Sitemap = projectsData.projects.map((project) => ({
  url: `${baseUrl}/work/${project.slug}`,
  changeFrequency: project.featured ? "monthly" : "yearly",
  priority: project.featured ? 0.82 : 0.55,
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
