"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null
});

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {/* 3D canvas */}
      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>

      {/* Gradient + grid overlays */}
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] bg-grid-fade" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="container-x relative z-10 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start gap-8"
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/[0.05] py-1.5 pl-1.5 pr-4 backdrop-blur-md">
            <span className="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
              {site.status.badge}
            </span>
            <span className="text-xs text-ink-200">{site.status.text}</span>
          </div>

          {/* Headline */}
          <h1 className="h-display max-w-4xl text-balance">
            <span className="block">
              <span className="text-ink-50">{site.name}</span>
            </span>
            <span className="block bg-gradient-to-r from-accent via-accent-glow to-warm bg-clip-text font-display italic text-transparent">
              quant research at the intersection
            </span>
            <span className="block text-ink-100">of RL, LLMs &amp; derivatives.</span>
          </h1>

          {/* Sub */}
          <p className="body-lg max-w-2xl text-pretty">
            NYU Tandon MSFE · IAQF 2026 Winner · Incoming AI Automation Intern at{" "}
            <span className="text-ink-50">Traxys Group</span>. I build rigorous, risk-aware
            systems for modern markets - from delta-hedged options to multi-asset VaR engines
            to LLM-powered financial intelligence.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href="#projects" className="btn-primary">
              See the work
              <ArrowDown className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="ml-2 flex items-center gap-1 text-ink-300">
              <a
                aria-label="GitHub"
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 transition hover:bg-white/[0.04] hover:text-accent"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                aria-label="LinkedIn"
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 transition hover:bg-white/[0.04] hover:text-accent"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                aria-label="Email"
                href={`mailto:${site.email}`}
                className="rounded-full p-2 transition hover:bg-white/[0.04] hover:text-accent"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md sm:grid-cols-4"
          >
            {site.heroStats.map((s) => (
              <div key={s.label} className="bg-ink-950/40 px-5 py-4">
                <div className="font-mono text-2xl font-medium tabular-nums text-ink-50">
                  {s.value}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                  {s.suffix}
                </div>
                <div className="mt-1 text-xs leading-snug text-ink-300">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          aria-label="Scroll to about"
          className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest text-ink-300 hover:text-accent"
        >
          <span className="font-mono">Scroll</span>
          <span className="h-8 w-px animate-glow-pulse bg-gradient-to-b from-accent/80 to-transparent" />
        </a>
      </div>
    </section>
  );
}
