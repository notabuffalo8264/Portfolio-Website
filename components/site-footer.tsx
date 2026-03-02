import { Github, Linkedin, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 text-sm text-foreground/80 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center gap-4">
          <a href="mailto:ckopiwoda@comcast.net" className="inline-flex items-center gap-2 hover:text-foreground" aria-label="Email">
            <Mail size={16} /> Email
          </a>
          <a href="https://github.com/notabuffalo8264" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground" aria-label="GitHub">
            <Github size={16} /> GitHub
          </a>
          <a href="https://linkedin.com/in/christopher-kopiwoda/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground" aria-label="LinkedIn">
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
        <p>© {new Date().getFullYear()} Christopher Kopiwoda. All rights reserved.</p>
      </div>
    </footer>
  );
}
