"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title="A timeline of roles, research, and rigor."
          description="From research at Nirma University to MSFE at NYU Tandon, IAQF, and Traxys this summer."
        />

        <div className="relative mt-14">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-white/10 to-transparent sm:left-1/2" />

          <ol className="space-y-12">
            {experience.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.li
                  key={`${item.company}-${idx}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="relative grid gap-4 sm:grid-cols-2"
                >
                  {/* Dot */}
                  <span
                    className={cn(
                      "absolute left-4 top-3 z-10 -translate-x-1/2 sm:left-1/2",
                      "flex h-3 w-3 items-center justify-center"
                    )}
                  >
                    <span className="absolute inset-0 animate-glow-pulse rounded-full bg-accent/40 blur-sm" />
                    <span
                      className={cn(
                        "relative h-2.5 w-2.5 rounded-full ring-2 ring-ink-950",
                        item.current
                          ? "bg-accent"
                          : item.upcoming
                            ? "bg-warm"
                            : "bg-ink-300"
                      )}
                    />
                  </span>

                  {/* Card */}
                  <div
                    className={cn(
                      "ml-10 sm:ml-0",
                      isLeft ? "sm:pr-10 sm:text-right" : "sm:col-start-2 sm:pl-10"
                    )}
                  >
                    <div className="glass p-5 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                          {item.start} → {item.current ? "Present" : item.end}
                        </span>
                        {item.upcoming && (
                          <span className="rounded-full border border-warm/30 bg-warm/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-warm">
                            Incoming
                          </span>
                        )}
                        {item.current && (
                          <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 font-display text-xl text-ink-50">{item.role}</h3>
                      <div className="mt-1 text-sm text-ink-200">
                        {item.company} · <span className="text-ink-300">{item.location}</span>
                      </div>

                      <ul
                        className={cn(
                          "mt-4 space-y-2 text-sm text-ink-200",
                          isLeft ? "sm:ml-auto sm:text-right" : ""
                        )}
                      >
                        {item.bullets.map((b, i) => (
                          <li key={i} className="text-pretty leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div
                        className={cn(
                          "mt-4 flex flex-wrap gap-1.5",
                          isLeft ? "sm:justify-end" : ""
                        )}
                      >
                        {item.tags.map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* spacer on the other side */}
                  <div className={cn(isLeft ? "" : "sm:col-start-1")} />
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
