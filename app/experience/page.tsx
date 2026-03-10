import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceEntry } from "@/lib/types";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional, research, leadership activities, and skills.",
};

const education: ExperienceEntry[] = [
  {
    role: "B.S. Mechanical Engineering",
    org: "Michigan State University · East Lansing, MI",
    dates: "Expected May 2027",
    bullets: [
      "Minor in Materials Science Engineering",
      "GPA: 3.86 / 4.00",
      "Honors College",
      "Tau Beta Pi and Pi Tau Sigma Honor Societies",
    ],
  },
];

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
  {
    role: "Engineering Intern",
    org: "General Assembly & Manufacturing Corp. · Cary, IL",
    dates: "July 2021 — August 2021",
    bullets: [
      "Shadowed a lead engineer and participated in design and manufacturing problem-solving sessions.",
      "Followed documentation and logging protocols while capturing, preparing, and uploading digital images of manufacturing components.",
    ],
  },
];

const researchExperience: ExperienceEntry[] = [
  {
    role: "NASA Michigan Space Grant Consortium Undergraduate Research Fellow",
    org: "Michigan State University · East Lansing, MI",
    dates: "May 2026 — December 2026 (Upcoming)",
    bullets: [
      "Selected for the NASA Michigan Space Grant Consortium (MSGC) Undergraduate Research Fellowship.",
      "Continuing thermoelectric materials research in the Zevalkink Group focused on crystal growth of Bi₂Se₃.",
      "Supporting NASA-related research initiatives in advanced energy and materials systems.",
    ],
    projectSlug: "bi2se3-ofz-ampule-growth-process",
    projectLabel: "Bi2Se3 Optical Traveling Zone Crystal Growth",
  },
  {
    role: "Research Assistant",
    org: "Dr. Zevalkink Group · Michigan State University",
    dates: "August 2025 — Present",
    bullets: [
      "Optimizing Optical Floating Zone Furnace techniques for Bi2Se3 single crystal growth.",
    ],
    projectSlug: "bi2se3-ofz-ampule-growth-process",
    projectLabel: "Bi2Se3 Optical Traveling Zone Crystal Growth",
  },
  {
    role: "MSE 490 Independent Study",
    org: "Michigan State University",
    dates: "January 2025 — May 2025",
    bullets: [
      "Calibrated Optical Floating Zone Furnace and grew Bi2Se3 single crystals, including material preparation and XRD analysis.",
      "Developed a user manual for an Optical Floating Zone Furnace, including mirror alignment, interface usage, and ampule-based crystal growth workflows.",
    ],
    projectSlug: "bi2se3-ofz-ampule-growth-process",
    projectLabel: "Bi2Se3 Optical Traveling Zone Crystal Growth",
    projectSlug2: "ofz-furnace-operator-manual",
    projectLabel2: "Optical Floating Zone Furnace Operator Manual",
  },
];

const leadershipActivities: ExperienceEntry[] = [
  {
    role: "University Undergraduate Research and Arts Forum Presenter (UURAF)",
    org: "Michigan State University",
    dates: "April 2025",
    bullets: ["Presented undergraduate research outcomes in a university forum setting."],
    projectSlug: "bi2se3-ofz-ampule-growth-process",
    projectLabel: "Bi2Se3 Optical Traveling Zone Crystal Growth",
  },
  {
    role: "MSU Designathon Winner",
    org: "Michigan State University",
    dates: "March 2025",
    bullets: [
      "Won the Accessibility and Inclusion Track",
      "Won the Organizer's Favorite Award",
    ],
    projectSlug: "yolkey",
    projectLabel: "Yolkey",
  },
  {
    role: "Spartahack X Hackathon Winner",
    org: "Michigan State University",
    dates: "February 2025",
    bullets: [
      "Won the sustainability track.",
      "Competed against 498 participants from 38 schools.",
    ],
    projectSlug: "ghomeo",
    projectLabel: "Ghomeo",
  },
  {
    role: "Engineering Outreach Volunteer",
    org: "College of Engineering · Michigan State University",
    dates: "Feb 2025, Feb 2026",
    bullets: [
      "Served as a track helper for MSU engineering outreach events including Engineering Exploration Day and Introduce a Girl to Engineering Day.",
      "Assisted with hands-on materials science engineering activity station for visiting K–12 and prospective students.",
    ],
  },
  {
    role: "Executive Board Member",
    org: "Pool Club (Registered Student Organization)",
    dates: "November 2024 — Present",
    bullets: ["Serving on the student organization executive board."],
  },
  {
    role: "Founder of Chicago Chapter",
    org: "Kids Serving Kids",
    dates: "May 2021 — February 2026",
    bullets: ["Established and led the Chicago chapter of the organization."],
  }
];

const skillGroups = [
  {
    title: "Engineering & Design",
    items: ["SolidWorks (CAD)", "NX (CAD)", "Fusion 360 (CAD)", "Abaqus (FEA)", "Blender", "3D Printing", "Technical Documentation"],
  },
  {
    title: "Software Development",
    items: ["Python", "MATLAB", "Java", "C++", "TypeScript"],
  },
  {
    title: "Tools & Workflow",
    items: ["Git", "GitHub", "VS Code", "Linux", "LaTeX", "n8n"],
  },
];

function TooltipTerm({ term, description }: { term: string; description: string }) {
  return (
    <span className="group relative inline-block cursor-help text-foreground underline decoration-dotted underline-offset-4 decoration-border transition-colors hover:text-accent">
      {term}
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-72 -translate-x-1/2 rounded-xl border border-border bg-surface/95 px-3 py-2 text-xs leading-relaxed text-foreground/90 opacity-0 shadow-lg backdrop-blur-sm transition duration-150 group-hover:opacity-100">
        {description}
      </span>
    </span>
  );
}

function HonorsCollegeTooltip() {
  return (
    <TooltipTerm
      term="Honors College"
      description="The MSU Honors College is a selective academic program for high-achieving students. It provides priority course enrollment, specialized honors sections, smaller class sizes, and expanded opportunities for undergraduate research and interdisciplinary study."
    />
  );
}

function HonorSocietiesTooltipLine() {
  return (
    <>
      <TooltipTerm
        term="Tau Beta Pi"
        description="Tau Beta Pi is the national engineering honor society, recognizing students with strong academic achievement and exemplary character."
      />{" "}
      and{" "}
      <TooltipTerm
        term="Pi Tau Sigma"
        description="Pi Tau Sigma is the international mechanical engineering honor society, recognizing high academic achievement in mechanical engineering."
      />{" "}
      Honor Societies
    </>
  );
}

function UlaRoleTitle() {
  return (
    <>
      Undergraduate Learning Assistant ({" "}
      <TooltipTerm
        term="ULA"
        description="An Undergraduate Learning Assistant supports instruction by helping lead class activities, assisting students, and reinforcing course material."
      />
      )
    </>
  );
}

function UurafRoleTitle() {
  return (
    <>
      University Undergraduate Research and Arts Forum Presenter ({" "}
      <TooltipTerm
        term="UURAF"
        description="UURAF is Michigan State University’s annual forum for presenting undergraduate research and creative scholarship."
      />
      )
    </>
  );
}

function MsgcBulletText() {
  return (
    <>
      Selected for the NASA Michigan Space Grant Consortium ({" "}
      <TooltipTerm
        term="MSGC"
        description="The Michigan Space Grant Consortium is a NASA-funded program that supports student research, education, and workforce development in science, engineering, and space-related fields."
      />
      ) Undergraduate Research Fellowship.
    </>
  );
}

function Timeline({ title, entries }: { title: string; entries: ExperienceEntry[] }) {
  return (
    <section className="space-y-4">
      <h2 className="section-title">{title}</h2>
      <div className="space-y-4">
        {entries.map((entry) => (
          <article key={`${entry.role}-${entry.org}`} className="card p-5">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-semibold">
                {entry.role === "Undergraduate Learning Assistant (ULA)" ? (
                  <UlaRoleTitle />
                ) : entry.role === "University Undergraduate Research and Arts Forum Presenter (UURAF)" ? (
                  <UurafRoleTitle />
                ) : (
                  entry.role
                )}
              </h3>
              <p className="text-sm text-foreground/70">{entry.dates}</p>
            </div>
            <p className="mt-1 font-medium text-foreground/85">{entry.org}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/85">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>
                  {title === "Education" && bullet === "Honors College" ? (
                    <HonorsCollegeTooltip />
                  ) : title === "Education" && bullet === "Tau Beta Pi and Pi Tau Sigma Honor Societies" ? (
                    <HonorSocietiesTooltipLine />
                  ) : bullet === "Selected for the NASA Michigan Space Grant Consortium (MSGC) Undergraduate Research Fellowship." ? (
                    <MsgcBulletText />
                  ) : (
                    bullet
                  )}
                </li>
              ))}
            </ul>
            {entry.projectSlug ? (
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/projects/${entry.projectSlug}`}
                  className="inline-flex items-center rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-foreground/85 transition hover:bg-surface hover:text-foreground"
                >
                  {entry.projectLabel ?? "View project"}
                </Link>
                {entry.projectSlug2 ? (
                  <Link
                    href={`/projects/${entry.projectSlug2}`}
                    className="inline-flex items-center rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-foreground/85 transition hover:bg-surface hover:text-foreground"
                  >
                    {entry.projectLabel2 ?? "View project"}
                  </Link>
                ) : null}
              </div>
            ) : null}
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

      <Timeline title="Education" entries={education} />
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
