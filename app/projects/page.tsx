import type { Metadata } from "next";
import { ProjectsBrowser } from "@/components/projects-browser";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Mechanical engineering, software, and research project portfolio.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="container-page space-y-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
        <p className="max-w-2xl text-foreground/80">
          A curated set of engineering, software, and research work with outcomes, tools, and implementation details.
        </p>
      </header>
      <ProjectsBrowser projects={projects} />
    </main>
  );
}
