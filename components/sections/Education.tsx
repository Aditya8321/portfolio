"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { education, certifications } from "@/data/education";
import { GraduationCap, Award, FileText, Image as ImageIcon } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Education & Certifications"
          title="Schools, certs, and the proof points behind them."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Education */}
          <div>
            <div className="mb-4 flex items-center gap-2 text-ink-300">
              <GraduationCap className="h-4 w-4 text-accent" />
              <span className="h-eyebrow">Education</span>
            </div>
            <div className="space-y-5">
              {education.map((edu, idx) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="glass p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl text-ink-50">{edu.institution}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                      {edu.start} → {edu.end}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-ink-200">
                    {edu.degree} · {edu.field}
                    <span className="text-ink-400"> · {edu.location}</span>
                  </div>
                  {edu.gpa && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                        GPA
                      </span>
                      <span className="font-mono text-sm text-accent">{edu.gpa}</span>
                    </div>
                  )}
                  <ul className="mt-4 space-y-1.5 text-sm text-ink-200">
                    {edu.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex gap-2 before:mt-2 before:h-1 before:w-1 before:flex-none before:rounded-full before:bg-accent"
                      >
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="mb-4 flex items-center gap-2 text-ink-300">
              <Award className="h-4 w-4 text-accent" />
              <span className="h-eyebrow">Certifications &amp; Awards</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {certifications.map((cert, idx) => {
                const link = cert.pdf || cert.image;
                const Icon = cert.pdf ? FileText : ImageIcon;
                const Wrapper = link
                  ? ("a" as const)
                  : ("div" as const);
                const props = link
                  ? {
                      href: link,
                      target: "_blank",
                      rel: "noopener noreferrer"
                    }
                  : {};
                return (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.45, delay: idx * 0.04 }}
                  >
                    <Wrapper
                      {...(props as object)}
                      className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-accent/30 hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center gap-2 text-ink-300 group-hover:text-accent">
                        {link && <Icon className="h-3.5 w-3.5" />}
                        <span className="font-mono text-[10px] uppercase tracking-widest">
                          {cert.year}
                        </span>
                      </div>
                      <div className="mt-2 font-medium text-ink-50">{cert.name}</div>
                      <div className="text-xs text-ink-300">{cert.issuer}</div>
                      {cert.description && (
                        <div className="mt-3 text-xs leading-relaxed text-ink-200">
                          {cert.description}
                        </div>
                      )}
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
