"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const focusable = mobilePanelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md" aria-label="Christopher Kopiwoda, home">
          <span className="grid size-8 place-items-center rounded-[9px] border border-border-strong bg-surface/80 font-mono text-xs font-semibold text-accent-bright">
            CK
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:inline">Christopher Kopiwoda</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`focus-ring relative rounded-sm py-2 text-sm transition ${
                    isActive ? "text-foreground" : "text-foreground-secondary hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive && <span className="absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-4 rounded-full bg-accent" />}
                </Link>
              );
            })}
        </nav>

        <button
          type="button"
          className="focus-ring grid size-11 place-items-center rounded-[10px] border border-border bg-surface/80 md:hidden"
          aria-label="Open navigation"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </button>
      </div>

      {open && (
        <div
          ref={mobilePanelRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 bg-background/98 p-5 backdrop-blur-xl md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="technical-label">Navigation</span>
            <button
              ref={closeButtonRef}
              type="button"
              className="focus-ring grid size-11 place-items-center rounded-[10px] border border-border bg-surface"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="mt-12 flex flex-col">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="focus-ring flex items-center justify-between border-b border-border py-5 text-3xl font-medium tracking-tight"
              >
                {item.label}
                <span className="font-mono text-xs text-foreground-muted">0{index + 1}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
