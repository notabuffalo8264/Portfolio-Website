import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "About Christopher Kopiwoda.",
};

const mechanicalSkills = ["CAD", "FEA", "Manufacturing", "Thermal Analysis", "Mechanism Design", "Tolerance Stackups"];
const softwareSkills = ["Backend APIs", "Automation", "TypeScript", "Python", "Data Processing", "Testing"];
const researchSkills = ["Materials Characterization", "Experiment Design", "Lab Instrumentation", "Data Interpretation", "Technical Writing"];

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="card p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full bg-surface-muted px-3 py-1 text-sm">{item}</span>
        ))}
      </div>
    </article>
  );
}

export default function AboutPage() {
  return (
    <main className="container-page space-y-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">About</h1>
        <p className="max-w-3xl text-foreground/80">
          I build systems at the intersection of mechanical engineering, software, and applied research. My work focuses on turning technical constraints into practical, testable solutions with clear impact.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[220px_1fr]">
        <div className="relative h-56 overflow-hidden rounded-2xl border border-border">
          <Image src="/placeholders/profile.svg" alt="Profile placeholder" fill className="object-cover" />
        </div>
        <article className="card p-5">
          <h2 className="text-lg font-semibold">Roles I&apos;m Looking For</h2>
          <p className="mt-3 text-foreground/85">
            Mechanical Design Engineer, R&D Engineer, and Software/Automation Engineer roles where cross-disciplinary execution and measurable outcomes are valued.
          </p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <SkillGroup title="Mechanical" items={mechanicalSkills} />
        <SkillGroup title="Software" items={softwareSkills} />
        <SkillGroup title="Research" items={researchSkills} />
      </section>
    </main>
  );
}
