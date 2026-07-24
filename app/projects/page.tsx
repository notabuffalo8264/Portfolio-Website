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
    <main className="container-page pt-32">
      <header className="content-width">
        <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.06em]">Projects</h1>
      </header>
      <div className="content-width mt-8 md:mt-10">
        <ProjectsBrowser projects={projects} />
      </div>
    </main>
  );
}
