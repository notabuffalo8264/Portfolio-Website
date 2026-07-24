import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
  const allProjects = await getAllProjects();
  const projectIndex = allProjects.findIndex((item) => item.slug === project.slug);
  const previousProject = projectIndex > 0 ? allProjects[projectIndex - 1] : null;
  const nextProject = projectIndex >= 0 && projectIndex < allProjects.length - 1 ? allProjects[projectIndex + 1] : null;
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
    <main className="container-page pt-32">
      <header className="content-width">
        <Link href="/projects" className="focus-ring inline-flex items-center gap-2 rounded-sm text-sm text-foreground-secondary transition hover:text-foreground">
          <ArrowLeft size={15} /> Project archive
        </Link>
        <p className="technical-label mt-12 text-accent-bright">
          {project.category} / {formatDate(project.date)}
        </p>
        <h1 className="mt-5 max-w-5xl text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.96] tracking-[-0.055em]">{project.title}</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground-secondary">{project.summary}</p>
        {importantLinks.length > 0 && (
          <div className="mt-7 flex flex-wrap items-center gap-2">
            {importantLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="button-secondary"
              >
                {linkLabels[link.key] ?? formatLinkLabel(link.key)} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}
        <div className="mt-7 flex flex-wrap gap-2 border-t border-border pt-5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-foreground-muted">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="content-width mt-12">
        <div
          className={heroWrapperClass.replaceAll("rounded-2xl", "rounded-[24px]")}
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
      </div>

      <section className="reading-width mt-16">
        <article className="mdx-content">{mdx.content}</article>
      </section>

      <nav aria-label="Project navigation" className="content-width mt-20 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
        {previousProject ? (
          <Link href={`/projects/${previousProject.slug}`} className="focus-ring group bg-surface p-6 transition hover:bg-surface-raised md:p-8">
            <span className="technical-label flex items-center gap-2"><ArrowLeft size={13} /> Previous</span>
            <span className="mt-3 block text-xl font-medium tracking-tight">{previousProject.title}</span>
          </Link>
        ) : <span className="hidden bg-surface md:block" />}
        {nextProject ? (
          <Link href={`/projects/${nextProject.slug}`} className="focus-ring group bg-surface p-6 text-right transition hover:bg-surface-raised md:p-8">
            <span className="technical-label flex items-center justify-end gap-2">Next <ArrowRight size={13} /></span>
            <span className="mt-3 block text-xl font-medium tracking-tight">{nextProject.title}</span>
          </Link>
        ) : <span className="hidden bg-surface md:block" />}
      </nav>
    </main>
  );
}
