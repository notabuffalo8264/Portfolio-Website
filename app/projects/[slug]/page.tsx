import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { formatDate } from "@/lib/format";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { ProjectLinks } from "@/lib/types";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const linkLabels: Record<string, string> = {
  github: "GitHub",
  demo: "Demo",
  devpost: "Devpost",
  pdf: "PDF",
};

function formatLinkLabel(key: string): string {
  return key
    .replace(/[-_]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getImportantLinks(links?: ProjectLinks) {
  if (!links) {
    return [];
  }

  const priority = ["github", "devpost", "demo", "pdf"] as const;
  const seen = new Set<string>();
  const prioritized: { key: string; href: string }[] = [];

  for (const key of priority) {
    const href = links[key];
    if (href && href.trim()) {
      prioritized.push({ key, href });
    }
  }

  prioritized.forEach((item) => seen.add(item.key));

  const extras = Object.entries(links)
    .filter(([key, href]) => !seen.has(key) && Boolean(href && href.trim()))
    .map(([key, href]) => ({ key, href: String(href) }));

  return [...prioritized, ...extras];
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const mdx = await compileMDX({
    source: project.content,
    options: { parseFrontmatter: false },
    components: mdxComponents,
  });

  const heroFrameless = Boolean(project.heroFrameless);
  const heroFitClass = project.heroFit === "contain"
    ? heroFrameless
      ? "object-contain"
      : "object-contain p-2"
    : "object-cover";
  const importantLinks = getImportantLinks(project.links);
  const hasCustomAspect = Boolean(project.heroAspect && project.heroAspect.trim().length > 0);
  const heroWrapperClass = hasCustomAspect
    ? heroFrameless
      ? "relative w-full"
      : project.heroFit === "contain"
        ? "relative w-full overflow-hidden rounded-2xl border border-border bg-surface-muted p-2"
        : "relative w-full overflow-hidden rounded-2xl border border-border"
    : heroFrameless
      ? "relative h-64 w-full md:h-96"
      : project.heroFit === "contain"
        ? "relative h-64 overflow-hidden rounded-2xl border border-border bg-surface-muted p-2 md:h-96"
        : "relative h-64 overflow-hidden rounded-2xl border border-border md:h-96";

  return (
    <main className="container-page space-y-8">
      <header className="space-y-4">
        <p className="text-sm text-foreground/70">
          {project.category} · {formatDate(project.date)}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">{project.title}</h1>
        <p className="max-w-3xl text-foreground/85">{project.summary}</p>
        {importantLinks.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {importantLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium transition hover:bg-surface-muted"
              >
                {linkLabels[link.key] ?? formatLinkLabel(link.key)}
              </a>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-surface-muted px-3 py-1 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className={heroWrapperClass}
        style={hasCustomAspect ? { aspectRatio: project.heroAspect } : undefined}
      >
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className={heroFitClass}
          style={{ objectPosition: project.heroPosition }}
          priority
        />
      </div>

      <section>
        <article className="mdx-content rounded-2xl border border-border bg-surface p-6">{mdx.content}</article>
      </section>
    </main>
  );
}
