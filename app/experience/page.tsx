import type { Metadata } from "next";
import { ExperienceEntry } from "@/lib/types";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional, research, leadership activities, and skills.",
};

const professionalExperience: ExperienceEntry[] = [
  {
    role: "Math Learning Center Supervisor",
    org: "Michigan State University · East Lansing, MI",
    dates: "September 2025 — Present",
    bullets: [
      "Supervising MLC operations, coordinating tutors and managing resources to support student needs.",
    ],
  },
  {
    role: "Backend Developer",
    org: "Community Clockwork (Startup) · Chicago, IL (Remote)",
    dates: "May 2025 — August 2025",
    bullets: [
      "Created agentic workflows for HOA task automation using pretrained AI models, Pydantic, FastAPI, Docker, and Postgres.",
      "Migrated from Google Cloud Functions to a Celery + Redis solution in Python.",
    ],
  },
  {
    role: "Undergraduate Learning Assistant (ULA)",
    org: "Michigan State University · East Lansing, MI",
    dates: "August 2024 — May 2025",
    bullets: [
      "Taught recitations in MTH 124 (Survey of Calculus I), providing in-class and out-of-class support.",
    ],
  },
  {
    role: "Engineering Intern",
    org: "Jerome Resources · Plainfield, IL",
    dates: "May 2024 — August 2024",
    bullets: [
      "Developed and updated CAD blueprints for company facilities.",
      "Conducted comprehensive research to identify key sources of food waste in Chicago and Milwaukee.",
      "Participated in a week-long site visit in Idaho to gain hands-on experience with anaerobic digestion processes, converting cow manure into renewable energy (methane).",
      "Completed and passed a rigorous safety certification course in a professional setting with no prior preparation.",
    ],
  },
  {
    role: "Engineering Intern",
    org: "Sloan Valve Company · Franklin Park, IL",
    dates: "July 2022 — August 2022",
    bullets: [
      "Identified and resolved malfunctions in a specialized diaphragm life testing machine.",
      "Documented wear-and-tear analysis for diaphragms undergoing testing.",
      "Executed valve flushing procedures on various toilet bowls and processed data to compare distinctions and commonalities among different brands and models.",
    ],
  },
];

const researchExperience: ExperienceEntry[] = [
  {
    role: "Research Assistant",
    org: "Dr. Zevalkink Group · Michigan State University",
    dates: "August 2025 — Present",
    bullets: [
      "Optimizing Optical Floating Zone Furnace techniques for Bi2Se3 single crystal growth.",
      "Synthesizing and characterizing CoSb3 and Bi2Te3 single crystals for thermoelectric materials research requested by NASA.",
    ],
  },
  {
    role: "MSE 490 Independent Study",
    org: "Michigan State University",
    dates: "January 2025 — May 2025",
    bullets: [
      "Calibrated Optical Floating Zone Furnace and grew Bi2Se3 single crystals, including material preparation and XRD analysis.",
      "Developed a user manual for an Optical Floating Zone Furnace, including mirror alignment, interface usage, and ampule-based crystal growth workflows.",
    ],
  },
];

const leadershipActivities: ExperienceEntry[] = [
  {
    role: "University Undergraduate Research and Arts Forum Presenter (UURAF)",
    org: "Michigan State University",
    dates: "April 2025",
    bullets: ["Presented undergraduate research outcomes in a university forum setting."],
  },
  {
    role: "MSU Designathon Winner",
    org: "Accessibility and Inclusion Track + Organizer's Favorite",
    dates: "March 2025",
    bullets: ["Awarded for solutions in accessibility and inclusion challenges."],
  },
  {
    role: "Spartahack X Hackathon Winner",
    org: "Sustainability Track (498 participants from 38 schools)",
    dates: "February 2025",
    bullets: ["Won sustainability track in a multi-school hackathon."],
  },
  {
    role: "Executive Board Member",
    org: "Pool Club (Registered Student Organization)",
    dates: "November 2024 — Present",
    bullets: ["Serving on the student organization executive board."],
  },
];

const skillGroups = [
  {
    title: "Engineering & Design",
    items: ["NX", "Fusion 360", "Abaqus", "CAD", "FEA"],
  },
  {
    title: "Software & Programming",
    items: ["Python", "Java", "C++", "MATLAB"],
  },
  {
    title: "Productivity & Automation",
    items: ["Word", "Excel", "n8n", "Agentic Workflows"],
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
        <p className="max-w-3xl text-foreground/80">Expanded experience and technical contributions beyond the one-page resume.</p>
      </header>

      <Timeline title="Professional Experience" entries={professionalExperience} />
      <Timeline title="Research Experience" entries={researchExperience} />

      <Timeline title="Leadership & Activities" entries={leadershipActivities} />

      <section className="space-y-4">
        <h2 className="section-title">Skills</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.title} className="card p-5">
              <h3 className="text-base font-semibold">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full bg-surface-muted px-3 py-1 text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
