"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Tech & Tooling"
          title="The toolbox behind the work."
          description="From classical financial econometrics to modern deep learning - the technologies and methods I reach for when building markets infrastructure."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="glass p-6"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 font-display text-xl text-ink-50">{group.category}</h3>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-white/[0.05] bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-ink-100 transition hover:border-accent/30 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
