import fs from "node:fs/promises";
import path from "node:path";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { CapabilitiesGrid } from "@/components/capabilities-grid";
import { FeaturedProject } from "@/components/home/featured-project";
import { HomeHero } from "@/components/home/home-hero";
import { mdxComponents } from "@/components/mdx-components";
import { Reveal } from "@/components/reveal";
import { homeContent } from "@/lib/home-content";
import { getFeaturedProjects } from "@/lib/projects";

async function getOverviewContent() {
  const overviewPath = path.join(process.cwd(), "content", "home", "overview.mdx");
  const source = await fs.readFile(overviewPath, "utf-8");

  return compileMDX<{ title: string }>({
    source,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });
}

export default async function Home() {
  const [featured, overview] = await Promise.all([
    getFeaturedProjects(6),
    getOverviewContent(),
  ]);

  return (
    <main>
      <HomeHero />

      <section id="overview" className="container-page">
        <div className="content-width">
          <Reveal>
            <p className="technical-label text-accent-bright">01 / Overview</p>
            <h2 className="section-title mt-5 max-w-5xl">{overview.frontmatter.title}</h2>
          </Reveal>
          <Reveal className="mt-8 max-w-5xl lg:ml-12">
            <article className="mdx-content text-lg leading-8 lg:text-xl lg:leading-9">{overview.content}</article>
          </Reveal>
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
          <CapabilitiesGrid groups={homeContent.capabilities} />
        </div>
      </section>
    </main>
  );
}
