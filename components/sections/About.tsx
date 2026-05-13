"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="About" title="Markets are messy. The math should be precise." />

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-pretty body-lg"
          >
            <p>
              I&apos;m a Financial Engineering graduate student at NYU Tandon (4.0/4.0 GPA),
              focused on the intersection of <em>reinforcement learning</em>,{" "}
              <em>large language models</em>, and <em>derivatives</em>. My work sits at the
              point where rigorous quantitative methodology meets modern AI - and I care a lot
              about <span className="text-ink-50">getting both right</span>.
            </p>
            <p>
              This year I captained <span className="text-ink-50">Team Sharpe Minds</span> to
              win the 15th Annual <span className="text-accent">IAQF</span> Student
              Competition with a paper on stablecoin risk under the GENIUS Act. I teach Deep
              Learning in Finance as a Graduate TA, and I&apos;m heading to{" "}
              <span className="text-ink-50">Traxys Group</span> this summer as their AI
              Automation intern in NYC.
            </p>
            <p>
              Before NYU, I was at Nirma University in India where I co-authored three
              peer-reviewed papers in IEEE and ICICT venues - on TinyML UAV surveillance,
              Q-learning collision avoidance, and ML for stock prediction. Some of those ideas
              quietly inform the way I think about <span className="text-ink-50">tail risk,
              feedback loops, and signal robustness</span> in markets today.
            </p>
            <p className="text-ink-300">
              Outside of research, I&apos;m building a public catalogue of quant projects
              spanning <span className="text-accent">trading</span>,{" "}
              <span className="text-accent">risk</span>, and{" "}
              <span className="text-accent">portfolio analytics</span> - all open source on
              GitHub.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 via-accent-glow/10 to-warm/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/80">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/profile.jpg"
                  alt={`Portrait of ${site.name}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 380px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    Currently
                  </div>
                  <div className="mt-1 text-sm text-ink-50">
                    NYU Tandon · New York City
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/[0.06] bg-ink-900/40 p-3 transition hover:border-accent/40"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  GitHub
                </div>
                <div className="mt-1 truncate text-sm text-ink-100">{site.githubHandle}</div>
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/[0.06] bg-ink-900/40 p-3 transition hover:border-accent/40"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  LinkedIn
                </div>
                <div className="mt-1 truncate text-sm text-ink-100">{site.linkedinHandle}</div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
