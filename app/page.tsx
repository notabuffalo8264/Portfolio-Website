import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { FeaturedProject } from "@/components/home/featured-project";
import { HomeHero } from "@/components/home/home-hero";
import { Reveal } from "@/components/reveal";
import { homeContent } from "@/lib/home-content";
import { getFeaturedProjects } from "@/lib/projects";

export default async function Home() {
  const featured = await getFeaturedProjects(6);

  return (
    <main>
      <HomeHero />

      <section id="overview" className="container-page">
        <div className="content-width">
          <Reveal>
            <p className="technical-label text-accent-bright">01 / Engineering overview</p>
            <h2 className="section-title mt-5 max-w-4xl">Across physical systems and digital tools.</h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {homeContent.overview.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.07} className="bg-background p-6 md:p-8">
                <p className="font-mono text-xs text-accent-bright">0{index + 1}</p>
                <h3 className="mt-8 text-xl font-semibold">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 text-foreground-secondary">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page border-t border-border">
        <div className="content-width">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="technical-label text-accent-bright">02 / Selected work</p>
              <h2 className="section-title mt-5">Featured projects</h2>
            </div>
            <Link href="/projects" className="button-secondary w-fit">
              Explore all projects <ArrowRight size={16} />
            </Link>
          </Reveal>
          <div className="mt-8">
            {featured.map((project, index) => (
              <FeaturedProject key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page border-t border-border">
        <div className="content-width grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <p className="technical-label text-accent-bright">03 / Experience</p>
            <h2 className="section-title mt-5">Applied learning, research, and leadership.</h2>
            <Link href="/experience" className="button-secondary mt-8 w-fit">
              Full experience <ArrowRight size={16} />
            </Link>
          </Reveal>
          <div>
            {homeContent.experiencePreview.map((entry, index) => (
              <Reveal key={entry.role} delay={index * 0.06}>
                <article className="grid gap-3 border-t border-border py-7 first:border-t-0 md:grid-cols-[1fr_auto]">
                  <div>
                    <h3 className="text-xl font-medium tracking-tight">{entry.role}</h3>
                    <p className="mt-2 text-sm text-foreground-secondary">{entry.org}</p>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-foreground-muted">{entry.dates}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page bg-surface/40">
        <div className="content-width">
          <Reveal>
            <p className="technical-label text-accent-bright">04 / Toolkit</p>
            <h2 className="section-title mt-5">Capabilities</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {homeContent.capabilities.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.06} className="border-t border-border pt-6">
                <h3 className="text-lg font-medium">{group.title}</h3>
                <p className="mt-4 font-mono text-xs leading-7 text-foreground-muted">{group.items.join("  /  ")}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page bg-background-deep">
        <Reveal className="content-width relative overflow-hidden rounded-[24px] border border-border bg-surface px-6 py-12 md:px-12 md:py-16">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative max-w-4xl">
            <p className="technical-label text-accent-bright">05 / Contact</p>
            <h2 className="mt-5 text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1] tracking-[-0.055em]">
              {homeContent.contact.heading}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">{homeContent.contact.body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`mailto:${homeContent.contact.email}`} className="button-primary">
                <Mail size={16} /> Email Christopher
              </a>
              <a href={homeContent.contact.linkedin} target="_blank" rel="noreferrer" className="button-secondary">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href={homeContent.contact.github} target="_blank" rel="noreferrer" className="button-secondary">
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
