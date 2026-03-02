import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { formatDate } from "@/lib/format";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

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

  const heroFitClass = project.heroFit === "contain" ? "object-contain p-2" : "object-cover";
  const hasCustomAspect = Boolean(project.heroAspect && project.heroAspect.trim().length > 0);
  const heroWrapperClass = hasCustomAspect
    ? project.heroFit === "contain"
      ? "relative w-full overflow-hidden rounded-2xl border border-border bg-surface-muted p-2"
      : "relative w-full overflow-hidden rounded-2xl border border-border"
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
