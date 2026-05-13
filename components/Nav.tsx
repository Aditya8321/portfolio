"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#research", label: "Research" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.04] bg-ink-950/70 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a
          href="#top"
          className="group flex items-center gap-2 text-sm"
          aria-label="Aditya Shah - home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-accent/30 bg-accent/10 font-mono text-[12px] font-medium text-accent transition group-hover:border-accent/60 group-hover:bg-accent/20">
            {site.initials}
          </span>
          <span className="hidden font-medium text-ink-100 sm:inline">{site.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-ink-300 transition hover:bg-white/[0.04] hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/Aditya-Shah-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs"
          >
            Résumé
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-ink-200 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16" strokeLinecap="round" />
                <path d="M4 17h16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.05] bg-ink-950/95 backdrop-blur-xl md:hidden">
          <ul className="container-x flex flex-col gap-1 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-ink-200 hover:bg-white/[0.04] hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/Aditya-Shah-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block rounded-lg border border-white/10 px-3 py-2 text-sm text-ink-100 hover:border-accent/40 hover:text-accent"
              >
                Download Résumé →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
