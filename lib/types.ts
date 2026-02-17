export const projectCategories = [
  "Mechanical Engineering",
  "Software",
  "Research",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectLinks = {
  github?: string;
  demo?: string;
  pdf?: string;
};

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  date: string;
  category: ProjectCategory;
  featured: boolean;
  summary: string;
  impact: string;
  tags: string[];
  heroImage: string;
  links: ProjectLinks;
  tools: string[];
  role: string;
};

export type Project = ProjectFrontmatter & {
  content: string;
};

export type ExperienceEntry = {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
  links?: { label: string; href: string }[];
};
