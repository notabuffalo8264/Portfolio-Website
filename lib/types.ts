export const projectCategories = [
  "Mechanical Engineering",
  "Software",
  "Research",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectLinks = {
  github?: string;
  demo?: string;
  devpost?: string;
  pdf?: string;
};

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  date: string;
  inProduction?: boolean;
  category: ProjectCategory;
  featured: boolean;
  summary: string;
  tags: string[];
  heroImage: string;
  heroAspect?: string;
  heroFit?: "cover" | "contain";
  heroPosition?: string;
  heroFrameless?: boolean;
  cardImageFit?: "cover" | "contain";
  cardImagePosition?: string;
  links?: ProjectLinks;
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
  projectSlug?: string;
  projectLabel?: string;
  projectSlug2?: string;
  projectLabel2?: string;
};
