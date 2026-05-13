"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { contactSchema } from "@/lib/contact-schema";
import { Github, Linkedin, Mail, MapPin, CheckCircle2, AlertCircle, Send } from "lucide-react";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; note?: string }
  | { state: "error"; message: string };

export default function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ state: "submitting" });
    setFieldErrors({});

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !errs[field]) errs[field] = issue.message;
      }
      setFieldErrors(errs);
      setStatus({
        state: "error",
        message: parsed.error.issues[0]?.message ?? "Invalid form data."
      });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data)
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setStatus({
          state: "error",
          message: json.error || "Something went wrong. Please try again."
        });
        return;
      }
      setStatus({ state: "success", note: json.note });
      form.reset();
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Please try again or email me directly."
      });
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something interesting together."
          description="Recruiting, research collaboration, or just want to talk about derivatives - drop a line."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="glass-strong p-6">
              <h3 className="font-display text-xl text-ink-50">Direct</h3>
              <div className="mt-5 space-y-3 text-sm">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-3 text-ink-200 hover:text-accent"
                >
                  <Mail className="h-4 w-4 text-accent" />
                  <span className="font-mono">{site.email}</span>
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-ink-200 hover:text-accent"
                >
                  <Linkedin className="h-4 w-4 text-accent" />
                  <span className="font-mono">/in/{site.linkedinHandle}</span>
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-ink-200 hover:text-accent"
                >
                  <Github className="h-4 w-4 text-accent" />
                  <span className="font-mono">{site.githubHandle}</span>
                </a>
                <div className="flex items-center gap-3 text-ink-300">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>{site.location}</span>
                </div>
              </div>
            </div>

            <div className="glass p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                Open to
              </div>
              <ul className="mt-2 space-y-1.5 text-sm text-ink-200">
                <li>· Spring 2027 internships</li>
                <li>· Summer 2027 full-time opportunities</li>
                <li>· AI in Finance roles</li>
                <li>· Risk &amp; Portfolio Analytics roles</li>
                <li>· Research collaboration on RL × derivatives</li>
              </ul>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-strong p-6 sm:p-8"
            aria-busy={status.state === "submitting"}
          >
            {/* Honeypot - visually hidden, accessible bots will fill it */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                top: 0,
                width: 1,
                height: 1,
                overflow: "hidden"
              }}
            >
              <label>
                Website (leave blank)
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                required
                autoComplete="name"
                error={fieldErrors.name}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                error={fieldErrors.email}
              />
            </div>
            <Field
              className="mt-4"
              label="Subject"
              name="subject"
              autoComplete="off"
              optional
              error={fieldErrors.subject}
            />
            <Field
              className="mt-4"
              label="Message"
              name="message"
              required
              textarea
              rows={6}
              error={fieldErrors.message}
            />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-sm text-xs text-ink-400">
                Your message is sent over TLS and rate-limited. I respond within a few days.
                No tracking, no list signup.
              </p>
              <button
                type="submit"
                disabled={status.state === "submitting"}
                className="btn-primary"
              >
                {status.state === "submitting" ? "Sending…" : "Send message"}
                <Send className="h-4 w-4" />
              </button>
            </div>

            {status.state === "success" && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm">
                <CheckCircle2 className="h-5 w-5 flex-none text-accent" />
                <div>
                  <div className="font-medium text-accent">Message sent.</div>
                  <div className="mt-0.5 text-ink-200">
                    {status.note ?? "I'll get back to you soon. Thanks for reaching out."}
                  </div>
                </div>
              </div>
            )}
            {status.state === "error" && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm">
                <AlertCircle className="h-5 w-5 flex-none text-red-300" />
                <div>
                  <div className="font-medium text-red-200">Couldn&apos;t send.</div>
                  <div className="mt-0.5 text-ink-200">{status.message}</div>
                </div>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  textarea,
  rows,
  autoComplete,
  className,
  error
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  textarea?: boolean;
  rows?: number;
  autoComplete?: string;
  className?: string;
  error?: string;
}) {
  const id = `f-${name}`;
  const baseInput =
    "w-full rounded-lg border border-white/[0.07] bg-ink-900/60 px-3.5 py-2.5 text-sm text-ink-50 placeholder:text-ink-400 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/30";
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-widest text-ink-300"
      >
        <span>{label}</span>
        {optional && <span className="text-ink-500">optional</span>}
      </label>
      <div className="mt-1.5">
        {textarea ? (
          <textarea
            id={id}
            name={name}
            required={required}
            rows={rows ?? 5}
            maxLength={4000}
            className={`${baseInput} resize-y min-h-[120px]`}
            placeholder="Tell me what you're working on…"
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            required={required}
            autoComplete={autoComplete}
            maxLength={type === "email" ? 120 : 160}
            className={baseInput}
          />
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </div>
  );
}
