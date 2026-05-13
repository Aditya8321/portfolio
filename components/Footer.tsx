import { site } from "@/data/site";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] py-12">
      <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-accent/30 bg-accent/10 font-mono text-sm text-accent">
            {site.initials}
          </span>
          <div>
            <div className="text-sm text-ink-100">{site.name}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-400">
              {site.domain} · {new Date().getFullYear()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-white/[0.06] p-2 text-ink-200 transition hover:border-accent/30 hover:text-accent"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-white/[0.06] p-2 text-ink-200 transition hover:border-accent/30 hover:text-accent"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="rounded-full border border-white/[0.06] p-2 text-ink-200 transition hover:border-accent/30 hover:text-accent"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="container-x mt-8 flex flex-col gap-2 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
        <div>
          Built with Next.js · React Three Fiber · Tailwind. Hosted on Vercel.
        </div>
        <div className="font-mono">
          “Markets are messy. The math should be precise.”
        </div>
      </div>
    </footer>
  );
}
