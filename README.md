# adityashah.work - Portfolio

Personal portfolio for **Aditya Shah** - NYU Tandon MSFE, IAQF 2026 Winner, incoming Traxys Group AI Automation Intern.

Built with **Next.js 15 (App Router)** · **React 19** · **TypeScript** · **Tailwind CSS** · **React Three Fiber** · **Framer Motion** · **Resend**.

---

## Quickstart (local)

```bash
cd site
npm install
npm run dev        # http://localhost:3000
```

Production build:
```bash
npm run build && npm start
```

---

## Project structure

```
site/
├── app/
│   ├── api/contact/route.ts   # Contact form endpoint (Resend + rate limit + Zod)
│   ├── layout.tsx             # Root layout, fonts, metadata
│   ├── page.tsx               # Single-page assembly
│   ├── globals.css            # Tailwind + design tokens
│   ├── robots.ts, sitemap.ts  # SEO
├── components/
│   ├── Nav.tsx                # Sticky nav with mobile drawer
│   ├── Footer.tsx
│   ├── sections/              # Hero, About, Experience, Research, Projects, Skills, Education, Contact
│   ├── three/HeroScene.tsx    # React Three Fiber 3D scene
│   └── ui/SectionHeading.tsx
├── data/                      # All content lives here - no DB, no CMS
│   ├── site.ts
│   ├── experience.ts
│   ├── publications.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── education.ts
├── lib/
│   ├── contact-schema.ts      # Zod schema, shared client+server
│   ├── rate-limit.ts          # In-memory IP rate limiter
│   └── utils.ts
├── public/                    # Profile photo, resume, papers, certs, project plots
├── next.config.mjs            # Security headers + CSP
├── tailwind.config.ts
└── package.json
```

To edit content, change the files in `data/`. No code changes needed.

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx  # from resend.com
CONTACT_TO_EMAIL=as22008@nyu.edu            # where messages land
CONTACT_FROM_EMAIL=contact@adityashah.work  # any verified sender on Resend
NEXT_PUBLIC_SITE_URL=https://adityashah.work
```

**If `RESEND_API_KEY` is not set, the contact form will validate inputs but skip the email send (useful in dev).**

---

## Setting up Resend (contact form)

1. Sign up at <https://resend.com> - free tier is 100 emails/day, 3,000/month.
2. Go to **Domains → Add Domain** and add `adityashah.work`. Resend will give you 3 DNS records (SPF / DKIM / MX).
3. Add those DNS records in GoDaddy (DNS Management). Wait ~5 min for verification.
4. Once verified, you can use any address on `adityashah.work` as the From (e.g., `contact@adityashah.work`, `hi@adityashah.work`).
5. Create an **API Key** under Settings → API Keys (give it `Sending Access`).
6. Paste it as `RESEND_API_KEY` in Vercel env vars.

**Skip Resend setup temporarily:** leave `CONTACT_FROM_EMAIL` as `onboarding@resend.dev` - that pre-verified sender works with no DNS, ideal for early testing.

---

## Deploying to Vercel

1. Push the **`site/`** folder to a GitHub repo. (Source folders `papers/`, `projects/`, `certificates/` at the workspace root are *not* part of the deployed site - only what's inside `site/public/` ships.)
2. Go to <https://vercel.com/new>, import the repo, set **Root Directory** = `site` (since the Next app lives in the subfolder), framework: **Next.js** (auto-detected).
3. Add env vars (Settings → Environment Variables):
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy. You'll get a `*.vercel.app` URL.

---

## Pointing GoDaddy domain → Vercel

1. In Vercel: **Project → Settings → Domains → Add Domain** → enter `adityashah.work` and `www.adityashah.work`. Vercel will show DNS records you need.
2. In GoDaddy: **My Products → DNS** for `adityashah.work`.
3. Update / add these records:

   | Type  | Name | Value                        | TTL    |
   |-------|------|------------------------------|--------|
   | A     | @    | `76.76.21.21`                | 600 s  |
   | CNAME | www  | `cname.vercel-dns.com`       | 1 hr   |

   Delete any conflicting A or CNAME records on `@` and `www` first.
4. Wait 5–60 min for DNS propagation. Vercel will automatically issue an SSL cert.
5. Once propagated, both `adityashah.work` and `www.adityashah.work` will serve the site over HTTPS.

---

## Security posture

This portfolio takes security seriously:

- **Strict CSP** (`next.config.mjs`): denies all by default; only `'self'`, Google Fonts (style+font src), Vercel Analytics, and inline scripts (required for Next.js hydration).
- **HSTS** with 2-year max-age + preload eligible.
- **`X-Frame-Options: DENY`** + `frame-ancestors 'none'` - site cannot be iframed.
- **`X-Content-Type-Options: nosniff`**, **`Referrer-Policy: strict-origin-when-cross-origin`**, **`Permissions-Policy`** locks down camera/mic/geolocation/FLoC.
- **Contact form**:
  - Body size hard-capped at 16 KB (rejects oversized payloads before parsing).
  - Server-side **Zod validation** (separate from client validation - never trusts client).
  - **DOMPurify** sanitization of all string fields (strips all HTML).
  - **HTML-entity-encoded** before being embedded in the email template.
  - **IP-based rate limiting**: 3 messages per 10 minutes (in-memory sliding window).
  - **Honeypot field** (`website`) - bots fill it, humans don't. Trips silently to avoid tipping off scrapers.
  - **Generic error messages** - no internal info leaked on failure.
- **No client-side secrets**, no `dangerouslySetInnerHTML` except for the JSON-LD `<Person>` schema (static, no user input).
- **No third-party analytics** other than Vercel's privacy-friendly Analytics (`@vercel/analytics`). Easy to remove from `app/layout.tsx` if you don't want it.

### After deploying, verify with:

```bash
# Security headers test
curl -I https://adityashah.work

# Run securityheaders.com or
# https://observatory.mozilla.org/analyze/adityashah.work
```

Target: **A+** on both.

---

## What's where, content-wise

| Section | Edit |
|---|---|
| Tagline, name, email, socials, hero stats | `data/site.ts` |
| Experience timeline | `data/experience.ts` |
| Papers (IAQF + IEEE + ICICT) | `data/publications.ts` |
| Projects grid | `data/projects.ts` |
| Skills (5 categories) | `data/skills.ts` |
| Education + Certifications | `data/education.ts` |
| 3D scene tuning | `components/three/HeroScene.tsx` |
| Color tokens (ink + accent) | `tailwind.config.ts` |

---

## What to do next

- [ ] Add `RESEND_API_KEY` to Vercel and verify the contact form with a test message
- [ ] Replace any placeholder bullets in `data/experience.ts` if you want a different framing
- [ ] Set up Resend DNS records on GoDaddy (SPF + DKIM) for `contact@adityashah.work`
- [ ] Point `adityashah.work` to Vercel (DNS records above)
- [ ] Optional: add an OG share image at `public/og/og-image.png` (1200×630)
- [ ] Optional: push the GitHub repos for the quant projects so the Projects section links resolve

---

## License

Personal portfolio code - © 2026 Aditya Shah. The Next.js scaffold and design choices are MIT-licensed if you'd like to use them as a starting point for your own site.
