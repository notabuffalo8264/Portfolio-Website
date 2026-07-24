import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume preview and download.",
};

const resumePath = "/downloads/resume/christopher-kopiwoda-resume.pdf";

export default function ResumePage() {
  return (
    <main className="container-page pt-32">
      <header className="content-width flex flex-col gap-8 border-b border-border pb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.06em]">Resume</h1>
          <p className="mt-6 max-w-xl text-foreground-secondary">A concise overview of education, experience, technical work, and leadership.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={resumePath} download className="button-primary">
            <Download size={16} /> Download
          </a>
          <a href={resumePath} target="_blank" rel="noreferrer" className="button-secondary">
            Open PDF <ExternalLink size={15} />
          </a>
        </div>
      </header>

      <section className="content-width mt-10 overflow-hidden rounded-[20px] border border-border bg-[#d7d9de] p-2 md:p-3">
        <iframe
          src={resumePath}
          title="Resume PDF"
          className="h-[75vh] w-full rounded-xl bg-white"
        />
      </section>
    </main>
  );
}
