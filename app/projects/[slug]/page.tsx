import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

      <div className="relative h-64 overflow-hidden rounded-2xl border border-border md:h-96">
        <Image src={project.heroImage} alt={project.title} fill className="object-cover" priority />
      </div>

      <section className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-start">
        <article className="mdx-content rounded-2xl border border-border bg-surface p-6">{mdx.content}</article>

        <aside className="card h-fit p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold">Project Details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-foreground/60">Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt className="text-foreground/60">Tools</dt>
              <dd className="mt-1 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span key={tool} className="rounded-full bg-surface-muted px-2.5 py-1 text-xs">
                    {tool}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-col gap-2 text-sm">
            {project.links.github ? (
              <Link href={project.links.github} target="_blank" rel="noreferrer" className="rounded-lg border border-border px-3 py-2 hover:bg-surface-muted">
                GitHub
              </Link>
            ) : null}
            {project.links.demo ? (
              <Link href={project.links.demo} target="_blank" rel="noreferrer" className="rounded-lg border border-border px-3 py-2 hover:bg-surface-muted">
                Live Demo
              </Link>
            ) : null}
            {project.links.pdf ? (
              <Link href={project.links.pdf} target="_blank" rel="noreferrer" className="rounded-lg border border-border px-3 py-2 hover:bg-surface-muted">
                PDF
              </Link>
            ) : null}
          </div>
        </aside>
      </section>
    </main>
  );
}
