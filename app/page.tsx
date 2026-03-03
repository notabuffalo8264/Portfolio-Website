import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedProjects } from "@/lib/projects";

const coreCompetencies = [
  "Computer Aided Design (CAD): SolidWorks / NX / Fusion 360",
  "Finite Element Analysis (FEA): Abaqus",
  "Programming Languages: MATLAB, Python / Java / C++",
  "Office 365: Word / Excel / PowerPoint / Outlook / OneNote / Teams / Word",
  "Software Developement: Github / n8n / Agentic Workflows",
];

export default async function Home() {
  const featured = await getFeaturedProjects(6);

  return (
    <main className="container-page space-y-16">
      <section className="space-y-6 pt-6">
        <p className="text-sm uppercase tracking-[0.18em] text-foreground/70">Portfolio</p>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
          Christopher Kopiwoda
        </h1>
        <p className="max-w-3xl text-lg text-foreground/80 md:text-xl">
          Mechanical Engineering major and Materials Science minor engaged in materials research, mechanical design, and software development.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
            View Projects
          </Link>
          <Link href="/resume" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-surface-muted">
            Download Resume
          </Link>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-accent hover:underline">See all</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section>
        <article className="card space-y-4 p-5">
          <div>
            <h3 className="text-lg font-semibold">Core Competencies</h3>
            <p className="mt-1 text-sm text-foreground/70">A shortened list of my technical acpabilities.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {coreCompetencies.map((competency) => (
              <div key={competency} className="rounded-xl border border-border bg-surface-muted px-3 py-2 text-sm text-foreground/90">
                {competency}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Interested in collaborating?</h2>
          <p className="mt-1 text-foreground/80">
            I'm always open to opportunities in mechanical design, materials research, and software development.
          </p>
        </div>
        <a href="mailto:your@email.com" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
          Get in Touch
        </a>
      </section>
    </main>
  );
}
