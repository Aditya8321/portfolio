import { NextResponse } from "next/server";
import { Resend } from "resend";
import DOMPurify from "isomorphic-dompurify";
import { contactSchema } from "@/lib/contact-schema";
import { rateLimit, getClientIp, maybeSweep } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024; // 16 KB hard cap

function safe(value: string): string {
  // Strip all HTML; DOMPurify with no allowed tags = plain text
  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

function htmlSafe(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, "<br/>");
}

export async function POST(request: Request) {
  maybeSweep();

  try {
    // Block oversized bodies before parsing
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Payload too large." },
        { status: 413 }
      );
    }

    // Rate limit per IP: 3 messages per 10 minutes
    const ip = getClientIp(request.headers);
    const limited = rateLimit({
      key: `contact:${ip}`,
      limit: 3,
      windowMs: 10 * 60 * 1000
    });
    if (!limited.allowed) {
      const retryAfter = Math.ceil(limited.resetIn / 1000);
      return NextResponse.json(
        {
          ok: false,
          error: `Too many submissions. Please try again in ${Math.ceil(
            retryAfter / 60
          )} minute(s).`
        },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfter) }
        }
      );
    }

    // Parse + validate
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON." },
        { status: 400 }
      );
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { ok: false, error: first?.message || "Invalid form data." },
        { status: 400 }
      );
    }

    // Honeypot trip - pretend success so we don't tip off bots.
    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    // Sanitize all string fields
    const name = safe(parsed.data.name);
    const email = safe(parsed.data.email);
    const subject = safe(parsed.data.subject || "New message from adityashah.work");
    const message = safe(parsed.data.message);

    // Env config (fail-open in dev so the form still renders/tests cleanly)
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "as22008@nyu.edu";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey) {
      console.warn(
        "[contact] RESEND_API_KEY not set - skipping send. Submission was valid.",
        { name, email, subject }
      );
      return NextResponse.json({
        ok: true,
        dev: true,
        note: "RESEND_API_KEY not configured; message was validated but not delivered."
      });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Aditya Portfolio <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[adityashah.work] ${subject}`,
      text: `From: ${name} <${email}>\nIP: ${ip}\n\n${message}`,
      html: `<!doctype html>
        <html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#05070d; color:#dde2f0; padding:32px;">
          <div style="max-width:560px; margin:0 auto; background:#0a0e1a; border:1px solid #1a2236; border-radius:14px; padding:28px;">
            <div style="color:#5eead4; font-family: ui-monospace, monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.18em;">adityashah.work · contact form</div>
            <h1 style="color:#f4f6fc; font-size:18px; margin:8px 0 16px;">${htmlSafe(subject)}</h1>
            <table style="font-size:13px; line-height:1.6; color:#b8c0d8; margin-bottom:16px;">
              <tr><td style="padding-right:10px;color:#5eead4;">From</td><td>${htmlSafe(name)} &lt;${htmlSafe(email)}&gt;</td></tr>
              <tr><td style="padding-right:10px;color:#5eead4;">IP</td><td>${htmlSafe(ip)}</td></tr>
            </table>
            <hr style="border:none; border-top:1px solid #1a2236;" />
            <div style="color:#dde2f0; font-size:14px; line-height:1.7; margin-top:14px; white-space:pre-wrap;">${htmlSafe(message)}</div>
          </div>
        </body></html>`
    });

    if (error) {
      console.error("[contact] resend error:", error);
      return NextResponse.json(
        {
          ok: false,
          error:
            "Couldn't deliver the message right now. Please try again later or email me directly."
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unhandled:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
