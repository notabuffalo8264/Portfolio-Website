import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedProjects } from "@/lib/projects";

const mechanicalSkills = ["SolidWorks", "ANSYS", "GD&T", "Thermal Modeling", "Prototype Fabrication"];
const softwareSkills = ["TypeScript", "Python", "Node.js", "Automation", "Data Pipelines"];

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
          Mechanical design engineer and software builder focused on research-driven systems, automation, and prototype-to-deployment execution.
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

      <section className="grid gap-6 md:grid-cols-2">
        <article className="card p-5">
          <h3 className="text-lg font-semibold">Mechanical Engineering Tools</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {mechanicalSkills.map((skill) => (
              <span key={skill} className="rounded-full bg-surface-muted px-3 py-1 text-sm">{skill}</span>
            ))}
          </div>
        </article>
        <article className="card p-5">
          <h3 className="text-lg font-semibold">Software Stack</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {softwareSkills.map((skill) => (
              <span key={skill} className="rounded-full bg-surface-muted px-3 py-1 text-sm">{skill}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Let&apos;s build something meaningful.</h2>
          <p className="mt-1 text-foreground/80">Interested in engineering, software, or applied research collaborations.</p>
        </div>
        <a href="mailto:you@example.com" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
          Contact Me
        </a>
      </section>
    </main>
  );
}
