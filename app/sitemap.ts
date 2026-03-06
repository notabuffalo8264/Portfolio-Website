import { MetadataRoute } from "next";
import { parseProjectDate } from "@/lib/format";
import { getAllProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://portfolio-example.vercel.app";
  const projects = await getAllProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/experience",
    "/resume",
    "/about",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: parseProjectDate(project.date),
  }));

  return [...staticRoutes, ...projectRoutes];
}
