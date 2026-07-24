import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background-deep py-10">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7 px-5 text-sm text-foreground-secondary md:flex-row md:items-end md:justify-between md:px-8 lg:px-12">
        <div>
          <p className="technical-label mb-4">Connect</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <a href="mailto:ckopiwoda@comcast.net" className="focus-ring inline-flex items-center gap-2 rounded-sm transition hover:text-foreground" aria-label="Email Christopher Kopiwoda">
            <Mail size={15} /> Email <ArrowUpRight size={13} />
          </a>
          <a href="https://github.com/notabuffalo8264" target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-sm transition hover:text-foreground" aria-label="GitHub">
            <Github size={15} /> GitHub <ArrowUpRight size={13} />
          </a>
          <a href="https://linkedin.com/in/christopher-kopiwoda/" target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-sm transition hover:text-foreground" aria-label="LinkedIn">
            <Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} />
          </a>
          </div>
        </div>
        <p className="font-mono text-xs text-foreground-muted">© {new Date().getFullYear()} Christopher Kopiwoda</p>
      </div>
    </footer>
  );
}
