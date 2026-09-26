import { NextResponse } from "next/server";
import { inquirySchema, type InquiryInput } from "@/lib/inquiry-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Naive in-memory token bucket (per-IP) — enough friction for v1 without infra.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

type Inquiry = Omit<InquiryInput, "company">;

/** Notify the house via Resend (https://resend.com). Returns true on acceptance. */
async function deliverViaResend(inquiry: Inquiry, key: string, to: string): Promise<boolean> {
  const from = process.env.INQUIRY_FROM_EMAIL ?? "AVAN Group <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: inquiry.email,
      subject: `Private inquiry — ${inquiry.nature}`,
      text: [
        `Name:   ${inquiry.name}`,
        `Email:  ${inquiry.email}`,
        `Nature: ${inquiry.nature}`,
        "",
        inquiry.note || "(no note)",
        "",
        "— avan-landing /api/inquiry",
      ].join("\n"),
    }),
  });
  return res.ok;
}

/** Quiet acknowledgment to the principal, in the house voice. Failure is non-fatal. */
async function acknowledgeInquirer(inquiry: Inquiry, key: string): Promise<void> {
  const from = process.env.INQUIRY_FROM_EMAIL ?? "AVAN Group <onboarding@resend.dev>";
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [inquiry.email],
        subject: "Received — AVAN Group",
        text: [
          `${inquiry.name},`,
          "",
          "Your inquiry has been received and will be reviewed personally.",
          "If it is a fit, you will hear from us directly.",
          "",
          "AVAN GROUP",
          "Ordo Ex Intelligentia",
        ].join("\n"),
      }),
    });
  } catch {
    // The acknowledgment is a courtesy; the inquiry itself was already delivered.
  }
}

async function deliverViaWebhook(inquiry: Inquiry, url: string): Promise<boolean> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...inquiry, source: "avan-landing" }),
  });
  return res.ok;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  // Honeypot filled → silently accept without processing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { company: _hp, ...inquiry } = parsed.data;
  const resendKey = process.env.RESEND_API_KEY;
  const resendTo = process.env.INQUIRY_TO_EMAIL;
  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  const sinkConfigured = Boolean((resendKey && resendTo) || webhook);

  let delivered = false;

  if (resendKey && resendTo) {
    try {
      delivered = await deliverViaResend(inquiry, resendKey, resendTo);
    } catch {
      delivered = false;
    }
  }
  if (!delivered && webhook) {
    try {
      delivered = await deliverViaWebhook(inquiry, webhook);
    } catch {
      delivered = false;
    }
  }

  // A sink exists but every configured channel failed: tell the user rather than
  // silently losing a high-value inquiry — the form shows "try once more."
  if (sinkConfigured && !delivered) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  if (delivered && resendKey) {
    await acknowledgeInquirer(inquiry, resendKey);
  }

  if (!sinkConfigured && process.env.NODE_ENV !== "production") {
    // No sink configured: log a minimal, non-PII trace in development.
     
    console.log("[avan:inquiry] received (no sink configured)", { nature: inquiry.nature });
  }

  return NextResponse.json({ ok: true });
}
