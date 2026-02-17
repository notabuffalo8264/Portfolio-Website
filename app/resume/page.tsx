import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume preview and download.",
};

export default function ResumePage() {
  return (
    <main className="container-page space-y-6">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Resume</h1>
        <p className="text-foreground/80">Replace the file at /public/resume.pdf to update this page.</p>
      </header>

      <div className="flex flex-wrap gap-3">
        <a href="/resume.pdf" download className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
          Download Resume
        </a>
        <a href="/resume.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-surface-muted">
          Open in New Tab
        </a>
      </div>

      <section className="card overflow-hidden p-2">
        <iframe
          src="/resume.pdf"
          title="Resume PDF"
          className="h-[70vh] w-full rounded-xl"
        />
      </section>
    </main>
  );
}
