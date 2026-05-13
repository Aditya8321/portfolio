"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <div className="flex items-center gap-3">
        <span className="h-eyebrow">{eyebrow}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
      </div>
      <h2 className="h-section mt-3 text-balance">{title}</h2>
      {description && (
        <p className="body-lg mt-4 text-pretty text-ink-300">{description}</p>
      )}
    </motion.div>
  );
}
