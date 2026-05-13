"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

type Filter = "All" | "Featured" | ProjectCategory;

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("Featured");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    if (filter === "Featured") return projects.filter((p) => p.featured);
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  const counts: Record<Filter, number> = useMemo(() => {
    const obj = { All: projects.length, Featured: projects.filter((p) => p.featured).length } as Record<Filter, number>;
    for (const c of projectCategories) {
      obj[c] = projects.filter((p) => p.category === c).length;
    }
    return obj;
  }, []);

  const filters: Filter[] = ["Featured", "All", ...projectCategories];

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Projects"
          title="Twenty-plus quant projects across trading, risk, portfolios, and AI."
          description="Each project is built around a real research question - methodology, code, and reproducible results. Filter by domain to dig in."
        />

        {/* Filter bar */}
        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                  active
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-white/[0.06] bg-white/[0.02] text-ink-200 hover:border-white/15 hover:text-ink-50"
                )}
              >
                {f === "Featured" && <Sparkles className="h-3 w-3" />}
                <span>{f}</span>
                <span
                  className={cn(
                    "font-mono text-[10px] tabular-nums",
                    active ? "text-accent/80" : "text-ink-400"
                  )}
                >
                  {counts[f]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition hover:border-accent/30 hover:bg-white/[0.035]"
              >
                {/* image */}
                {p.image ? (
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.05] bg-ink-900">
                    <Image
                      src={p.image}
                      alt={p.imageAlt || p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center opacity-90 transition group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.05]">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-ink-800 to-warm/5" />
                    <div className="absolute inset-0 grid-bg opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-5xl italic text-ink-100/40">
                        {p.category.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip text-[10px] !uppercase">{p.category}</span>
                    {p.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-display text-lg leading-snug text-ink-50">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-200">
                    {p.oneLiner}
                  </p>

                  <details className="group/d mt-3">
                    <summary className="cursor-pointer list-none text-xs text-accent hover:text-accent-glow">
                      <span className="inline-flex items-center gap-1">
                        More detail
                        <span className="transition group-open/d:rotate-90">→</span>
                      </span>
                    </summary>
                    <div className="mt-3 space-y-3 text-xs text-ink-300">
                      <p className="text-pretty leading-relaxed">{p.description}</p>
                      <ul className="space-y-1">
                        {p.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex gap-2 text-ink-200 before:mt-1.5 before:h-1 before:w-1 before:flex-none before:rounded-full before:bg-accent"
                          >
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>

                  <div className="mt-auto pt-4">
                    <div className="flex flex-wrap gap-1">
                      {p.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] uppercase tracking-wider text-ink-300"
                        >
                          {t}
                          <span className="ml-1.5 text-ink-600 last:hidden">·</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-10 text-center text-sm text-ink-300">
          Full project code &amp; READMEs are on GitHub -{" "}
          <a
            href="https://github.com/Aditya8321"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            github.com/Aditya8321
          </a>
        </p>
      </div>
    </section>
  );
}
