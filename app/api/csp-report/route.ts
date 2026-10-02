/**
 * CSP violation sink (report-uri + Reporting API). Logs one line per report —
 * directive, blocked origin and page path, never query strings or full URLs —
 * so a real policy break shows up in the platform logs without collecting
 * anything about the visitor.
 */
export const runtime = "nodejs";

const MAX_BODY = 16 * 1024;

type Violation = { directive?: string; blocked?: string; page?: string };

function origin(value: unknown): string {
  if (typeof value !== "string" || !value) return "";
  try {
    const u = new URL(value);
    return u.origin === "null" ? u.protocol : u.origin;
  } catch {
    return value.slice(0, 40); // "inline", "eval", …
  }
}

function path(value: unknown): string {
  try {
    return typeof value === "string" ? new URL(value).pathname : "";
  } catch {
    return "";
  }
}

function parse(body: unknown): Violation[] {
  // Reporting API: [{ type: "csp-violation", body: {...} }]
  if (Array.isArray(body)) {
    return body
      .filter((r) => r?.type === "csp-violation")
      .map((r) => ({
        directive: r.body?.effectiveDirective,
        blocked: origin(r.body?.blockedURL),
        page: path(r.body?.documentURL),
      }));
  }
  // Legacy report-uri: { "csp-report": {...} }
  const r = (body as { "csp-report"?: Record<string, unknown> })?.["csp-report"];
  if (!r) return [];
  return [
    {
      directive: String(r["effective-directive"] ?? r["violated-directive"] ?? ""),
      blocked: origin(r["blocked-uri"]),
      page: path(r["document-uri"]),
    },
  ];
}

export async function POST(req: Request) {
  const text = await req.text();
  if (text.length > MAX_BODY) return new Response(null, { status: 413 });
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return new Response(null, { status: 400 });
  }
  for (const v of parse(body).slice(0, 10)) {
    console.warn(`[csp] ${v.directive} blocked ${v.blocked || "(none)"} on ${v.page || "?"}`);
  }
  return new Response(null, { status: 204 });
}
