import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { Project, ProjectCategory, ProjectFrontmatter, projectCategories } from "@/lib/types";

const contentDirectory = path.join(process.cwd(), "content", "projects");

function normalizeFrontmatter(frontmatter: Record<string, unknown>): ProjectFrontmatter {
  const category = frontmatter.category as ProjectCategory;
  if (!projectCategories.includes(category)) {
    throw new Error(`Invalid project category: ${String(frontmatter.category)}`);
  }

  return {
    title: String(frontmatter.title ?? "Untitled Project"),
    slug: String(frontmatter.slug ?? ""),
    date: String(frontmatter.date ?? "1970-01-01"),
    category,
    featured: Boolean(frontmatter.featured),
    summary: String(frontmatter.summary ?? ""),
    impact: String(frontmatter.impact ?? ""),
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
    heroImage: String(frontmatter.heroImage ?? "/placeholders/project-1.svg"),
    links: (frontmatter.links ?? {}) as ProjectFrontmatter["links"],
    tools: Array.isArray(frontmatter.tools) ? frontmatter.tools.map(String) : [],
    role: String(frontmatter.role ?? "Contributor"),
  };
}

export const getAllProjects = cache(async (): Promise<Project[]> => {
  const files = await fs.readdir(contentDirectory);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const projects = await Promise.all(
    mdxFiles.map(async (file) => {
      const fullPath = path.join(contentDirectory, file);
      const raw = await fs.readFile(fullPath, "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = normalizeFrontmatter(data);
      return { ...frontmatter, content } satisfies Project;
    })
  );

  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getProjectsByCategory(category: ProjectCategory): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.category === category);
}
