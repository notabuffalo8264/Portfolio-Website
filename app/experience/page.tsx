import Link from "next/link";
import type { Metadata } from "next";
import { ExperienceEntry } from "@/lib/types";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional, research, and leadership experience.",
};

const professionalExperience: ExperienceEntry[] = [
  {
    role: "Mechanical Design Engineer",
    org: "Advanced Systems Lab",
    dates: "2024 — Present",
    bullets: [
      "Led fixture and mechanism design for thermal and growth experiments.",
      "Standardized tolerance strategy to improve assembly repeatability.",
      "Partnered with software team to integrate automated data capture.",
    ],
  },
  {
    role: "Backend Engineer (Part-Time)",
    org: "Civic Ops Platform",
    dates: "2023 — 2024",
    bullets: [
      "Built workflow automation services and operational APIs.",
      "Reduced manual processing time with event-driven orchestration.",
    ],
  },
];

const researchExperience: ExperienceEntry[] = [
  {
    role: "Research Engineer",
    org: "Materials & Thermal Research Group",
    dates: "2022 — Present",
    bullets: [
      "Designed high-temperature fixtures and support tooling.",
      "Developed repeatable test protocols and analysis workflows.",
      "Produced documentation and data summaries for publication support.",
    ],
  },
];

const leadership: ExperienceEntry[] = [
  {
    role: "Project Lead",
    org: "Engineering Capstone Team",
    dates: "2023 — 2024",
    bullets: [
      "Coordinated cross-discipline design reviews and milestone planning.",
      "Managed technical scope and validation strategy.",
    ],
  },
  {
    role: "Mentor",
    org: "Peer Technical Mentorship Program",
    dates: "2022 — Present",
    bullets: ["Mentored students on CAD workflows, experiment design, and technical communication."],
  },
];

function Timeline({ title, entries }: { title: string; entries: ExperienceEntry[] }) {
  return (
    <section className="space-y-4">
      <h2 className="section-title">{title}</h2>
      <div className="space-y-4">
        {entries.map((entry) => (
          <article key={`${entry.role}-${entry.org}`} className="card p-5">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-semibold">{entry.role}</h3>
              <p className="text-sm text-foreground/70">{entry.dates}</p>
            </div>
            <p className="mt-1 font-medium text-foreground/85">{entry.org}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/85">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ExperiencePage() {
  return (
    <main className="container-page space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Experience</h1>
        <p className="max-w-3xl text-foreground/80">Professional engineering, major projects, research contributions, and leadership activities.</p>
      </header>

      <Timeline title="Professional Experience" entries={professionalExperience} />

      <section className="space-y-4">
        <h2 className="section-title">Major Projects</h2>
        <div className="card p-5 text-sm">
          <div className="grid gap-2 md:grid-cols-2">
            <Link href="/projects/hoa-manager-automation-backend" className="text-accent hover:underline">HOA Manager Automation Backend</Link>
            <Link href="/projects/thermal-fin-analysis-toolkit" className="text-accent hover:underline">Thermal Fin Analysis Toolkit</Link>
            <Link href="/projects/key-turn-assist-prototype" className="text-accent hover:underline">Mechanism Design: Key-Turn Assist Prototype</Link>
            <Link href="/projects/optical-floating-zone-furnace-fixture" className="text-accent hover:underline">Optical Floating Zone Furnace Ampule Growth Fixture</Link>
          </div>
        </div>
      </section>

      <Timeline title="Research Experience" entries={researchExperience} />
      <Timeline title="Leadership / Activities" entries={leadership} />
    </main>
  );
}
