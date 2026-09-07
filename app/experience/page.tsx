import type { Metadata } from "next";
import Link from "next/link";
import { CapabilitiesGrid } from "@/components/capabilities-grid";
import { homeContent } from "@/lib/home-content";
import { ExperienceEntry } from "@/lib/types";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience, research, leadership, awards, activities, and technical capabilities.",
};

const education: ExperienceEntry[] = [
  {
    role: "B.S. Mechanical Engineering",
    org: "Michigan State University · East Lansing, MI",
    dates: "Expected May 2027",
    bullets: [
      "Minor in Materials Science Engineering",
      "GPA: 3.82 / 4.00",
      "Honors College",
      "Tau Beta Pi and Pi Tau Sigma Honor Societies",
      "Planning to continue directly into an M.S. in Mechanical Engineering after completing the B.S.",
    ],
  },
];

const professionalExperience: ExperienceEntry[] = [
  {
    role: "Mechanical Engineering Intern",
    org: "Grayhill, Inc. · La Grange, IL",
    dates: "May 18, 2026 — August 7, 2026",
    bullets: [
      "Designed a Creo-based continuity tester capable of checking approximately 56 electrical components in about 15 seconds, using 3D-printed prototypes and manufacturing drawings.",
      "Built and soldered the electrical hardware for a 48-channel Chatterbox vibration-test monitoring system for approximately $80 in parts, avoiding another roughly $20,000 commercial purchase.",
      "Programmed the Arduino-based Chatterbox to detect switch-state changes exceeding 10 µs, built a Python GUI, and validated timing with an oscilloscope and signal generator.",
      "Developed Python static-analysis scripts to evaluate joystick-holder tipping force and guide mechanical dimensions.",
      "Supported EMC testing, board programming, surface-mount soldering, optical encoder testing, troubleshooting, and resin/FDM 3D printing.",
    ],
  },
  {
    role: "Math Learning Center Supervisor",
    org: "Michigan State University · East Lansing, MI",
    dates: "September 2, 2025 — May 1, 2026",
    bullets: [
      "Selected for advancement from Undergraduate Learning Assistant to Supervisor without applying for the role.",
      "Supervised approximately 20 tutors across two semesters while coordinating Math Learning Center operations and resources.",
    ],
  },
  {
    role: "Backend Developer",
    org: "Community Clockwork (Startup) · Chicago, IL (Remote)",
    dates: "May 26, 2025 — August 8, 2025",
    bullets: [
      "Created agentic workflows for HOA task automation using pretrained AI models, Pydantic, FastAPI, Docker, and PostgreSQL.",
      "Migrated backend infrastructure from Google Cloud Functions to a Celery + Redis architecture in Python.",
      "Helped build a working startup prototype before the team paused the project due to school and full-time work commitments.",
    ],
  },
  {
    role: "Undergraduate Learning Assistant (ULA)",
    org: "Michigan State University · East Lansing, MI",
    dates: "August 26, 2024 — April 26, 2025",
    bullets: [
      "Taught four MTH 124 (Survey of Calculus I) recitation sections across two semesters, with approximately 20–30 students per section.",
      "Provided in-class and out-of-class instruction and support before being selected for advancement to Math Learning Center Supervisor.",
    ],
  },
  {
    role: "Engineering Intern",
    org: "Jerome Resources · Plainfield, IL",
    dates: "May 20, 2024 — August 9, 2024",
    bullets: [
      "Developed and updated CAD blueprints for company facilities.",
      "Researched Chicago and Milwaukee food-waste sources for anaerobic-digestion projects and built Python web scrapers to collect brewery data.",
      "Participated in a week-long Idaho site visit focused on converting agricultural waste into renewable methane and completed a professional safety certification.",
    ],
  },
  {
    role: "Engineering Intern",
    org: "Sloan Valve Company · Franklin Park, IL",
    dates: "July 11, 2022 — August 12, 2022",
    bullets: [
      "Performed controlled drain-line carry testing across flushometer valve and toilet-bowl combinations, analyzing pressure and flow data in Excel.",
      "Performed flow-meter calibration, reviewed test outliers, and authored a four-page Drain Line Carry Testing Guide documenting the full procedure.",
      "Diagnosed malfunctions in a diaphragm life-testing machine and documented component wear during long-term testing.",
    ],
  },
  {
    role: "Engineering Intern",
    org: "General Assembly & Manufacturing Corp. · Cary, IL",
    dates: "July 7, 2021 — August 3, 2021",
    bullets: [
      "Shadowed a lead engineer and participated in engineering design and manufacturing problem-solving discussions.",
      "Supported manufacturing documentation by logging, preparing, and uploading images of production components.",
    ],
  },
];

const researchExperience: ExperienceEntry[] = [
  {
    role: "NASA Michigan Space Grant Consortium Undergraduate Research Fellow",
    org: "Michigan State University · East Lansing, MI",
    dates: "May 2026 — December 2026",
    bullets: [
      "Awarded a NASA Michigan Space Grant Consortium (MSGC) Undergraduate Research Fellowship.",
      "Fellowship research continues the Bi₂Se₃ crystal-growth work in the Zevalkink Group during Fall 2026.",
      "Research focuses on thermoelectric materials, process development, and optical traveling zone crystal growth.",
    ],
    projectSlug: "bi2se3-ofz-ampule-growth-process",
    projectLabel: "Bi2Se3 Optical Traveling Zone Crystal Growth",
  },
  {
    role: "Research Assistant",
    org: "Dr. Zevalkink Group · Michigan State University",
    dates: "August 2025 — Present",
    bullets: [
      "Developing an ampule-based optical traveling zone process for Bi₂Se₃ crystal growth using an Optical Floating Zone furnace.",
      "Prepare high-purity materials, vacuum-seal quartz ampules, perform XRD characterization, and iterate growth parameters.",
      "Calibrated furnace behavior and established approximately 40% optical power as a reproducible Bi₂Se₃ melting threshold for the research configuration.",
    ],
    projectSlug: "bi2se3-ofz-ampule-growth-process",
    projectLabel: "Bi2Se3 Optical Traveling Zone Crystal Growth",
  },
  {
    role: "MSE 490 Independent Study",
    org: "Michigan State University",
    dates: "January 2025 — May 2025",
    bullets: [
      "Calibrated the Optical Floating Zone furnace and developed the initial Bi₂Se₃ ampule-growth process, including material preparation and XRD analysis.",
      "Authored an Optical Floating Zone Furnace Operator Manual covering setup, alignment, controls, safety, and ampule-based growth workflows.",
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
    bullets: [
      "Presented undergraduate Bi₂Se₃ crystal-growth research at MSU's University Undergraduate Research and Arts Forum.",
    ],
    projectSlug: "bi2se3-ofz-ampule-growth-process",
    projectLabel: "Bi2Se3 Optical Traveling Zone Crystal Growth",
  },
  {
    role: "MSU Designathon Winner",
    org: "Michigan State University",
    dates: "March 2025",
    bullets: [
      "Won the Accessibility & Inclusivity Design Track and the Organizer's Favorite Award with Yolkey.",
    ],
    projectSlug: "yolkey",
    projectLabel: "Yolkey",
  },
  {
    role: "SpartaHack X Sustainability Track Winner",
    org: "Michigan State University",
    dates: "February 2025",
    bullets: [
      "Won the Sustainability Track with Ghomeo at a hackathon with 498 participants from 38 schools.",
    ],
    projectSlug: "ghomeo",
    projectLabel: "Ghomeo",
  },
  {
    role: "Engineering Outreach Volunteer",
    org: "College of Engineering · Michigan State University",
    dates: "February 2025, February 2026",
    bullets: [
      "Supported Engineering Exploration Day and Introduce a Girl to Engineering Day as a track helper.",
      "Assisted with a hands-on Materials Science Engineering activity station for visiting K–12 and prospective students.",
    ],
  },
  {
    role: "Executive Board Member",
    org: "Pool Club (Registered Student Organization)",
    dates: "November 2024 — Present",
    bullets: [
      "Serve on the executive board of an MSU registered student organization.",
    ],
  },
  {
    role: "Founder, Chicago Chapter",
    org: "Kids Serving Kids",
    dates: "May 2021 — February 2026",
    bullets: [
      "Established and led the Chicago chapter of the organization.",
    ],
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
      Awarded a NASA Michigan Space Grant Consortium ({" "}
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
    <section className="grid gap-8 border-t border-border pt-10 lg:grid-cols-[0.35fr_1fr]">
      <div>
        <p className="technical-label text-accent-bright">{title}</p>
      </div>
      <div>
        {entries.map((entry) => (
          <article key={`${entry.role}-${entry.org}`} className="relative border-t border-border py-7 first:border-t-0 first:pt-0 md:pl-8">
            <span className={`absolute left-0 top-8 hidden size-2 rounded-full border md:block ${entry.dates.includes("Present") ? "border-accent bg-accent" : "border-border-strong bg-background"}`} />
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <h3 className="max-w-2xl text-xl font-semibold tracking-tight">
                {entry.role === "Undergraduate Learning Assistant (ULA)" ? (
                  <UlaRoleTitle />
                ) : entry.role === "University Undergraduate Research and Arts Forum Presenter (UURAF)" ? (
                  <UurafRoleTitle />
                ) : (
                  entry.role
                )}
              </h3>
              <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">{entry.dates}</p>
            </div>
            <p className="mt-2 text-sm font-medium text-foreground-secondary">{entry.org}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-foreground-secondary marker:text-accent">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>
                  {title === "Education" && bullet === "Honors College" ? (
                    <HonorsCollegeTooltip />
                  ) : title === "Education" && bullet === "Tau Beta Pi and Pi Tau Sigma Honor Societies" ? (
                    <HonorSocietiesTooltipLine />
                  ) : bullet === "Awarded a NASA Michigan Space Grant Consortium (MSGC) Undergraduate Research Fellowship." ? (
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
                  className="focus-ring inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground-secondary transition hover:border-accent/40 hover:text-foreground"
                >
                  {entry.projectLabel ?? "View project"}
                </Link>
                {entry.projectSlug2 ? (
                  <Link
                    href={`/projects/${entry.projectSlug2}`}
                    className="focus-ring inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground-secondary transition hover:border-accent/40 hover:text-foreground"
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
    <main className="container-page space-y-20 pt-32">
      <header className="content-width border-b border-border pb-14">
        <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.06em]">Experience</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">A more complete view of my professional experience, research, leadership, awards, and technical work beyond my one-page resume.</p>
      </header>

      <div className="content-width space-y-20">
        <Timeline title="Education" entries={education} />
        <Timeline title="Professional Experience" entries={professionalExperience} />
        <Timeline title="Research Experience" entries={researchExperience} />
        <Timeline title="Leadership & Activities" entries={leadershipActivities} />
      </div>

      <section className="content-width border-t border-border pt-10">
        <p className="technical-label text-accent-bright">Capabilities</p>
        <h2 className="section-title mt-5">Skills and tools</h2>
        <CapabilitiesGrid groups={homeContent.capabilities} />
      </section>
    </main>
  );
}
