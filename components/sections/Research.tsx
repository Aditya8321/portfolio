"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { publications } from "@/data/publications";
import { FileText, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Research() {
  return (
    <section id="research" className="section">
      {/* subtle background accent */}
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-10 mx-auto h-96 max-w-4xl bg-grid-fade opacity-50" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Research & Publications"
          title="Peer-reviewed papers and award-winning research."
          description="One IAQF competition win and three peer-reviewed publications across IEEE and ICICT venues."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {publications.map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className={cn(
                "group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition hover:border-accent/30 hover:bg-white/[0.04]",
                p.status === "Winner" && "ring-1 ring-warm/30"
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest",
                    p.status === "Winner"
                      ? "border border-warm/30 bg-warm/10 text-warm"
                      : p.status === "Published"
                        ? "border border-accent/30 bg-accent/10 text-accent"
                        : "border border-ink-600/50 bg-ink-800/50 text-ink-200"
                  )}
                >
                  {p.status === "Winner" && <Award className="h-3 w-3" />}
                  {p.status}
                </span>
                <span className="font-mono text-[11px] text-ink-300">{p.year}</span>
              </div>

              <h3 className="mt-4 font-display text-xl leading-snug text-ink-50">
                {p.title}
              </h3>
              <div className="mt-2 text-sm text-accent">{p.venue}</div>
              <div className="mt-1 text-xs text-ink-300">{p.authors}</div>

              <p className="mt-4 text-sm leading-relaxed text-ink-200">{p.abstract}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              {(p.pdf || p.external) && (
                <div className="mt-5 flex flex-wrap items-center gap-3 pt-4">
                  {p.pdf && (
                    <a
                      href={p.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-glow"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Read PDF
                    </a>
                  )}
                  {p.external && (
                    <a
                      href={p.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-ink-300 hover:text-accent"
                    >
                      External link →
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
