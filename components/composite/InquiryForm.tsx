"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/primitives/Button";
import { GemMark } from "@/components/brand/GemMark";
import { inquirySchema, INQUIRY_NATURES } from "@/lib/inquiry-schema";
import { track } from "@/lib/analytics";
import type { Copy } from "@/content";

type Status = "idle" | "submitting" | "success" | "error";
type Nature = (typeof INQUIRY_NATURES)[number];

const fieldBase =
  "w-full rounded-sm border border-hairline bg-overlay px-4 py-3 font-sans text-body " +
  "text-fg caret-accent placeholder:text-fg-muted transition-colors duration-fast " +
  "hover:border-accent " +
  "focus-visible:border-strong";

const labelBase = "font-sans text-overline uppercase text-eyebrow";

export function InquiryForm({
  copy,
  micro,
}: {
  copy: Copy["prive"];
  micro: Copy["microcopy"];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedOnce, setTouchedOnce] = useState(false);
  // Self-qualification (plan §J.3): the chosen nature re-addresses the
  // reassurance beside the ask and the acknowledgment after it.
  const [nature, setNature] = useState<Nature>("Advisory");

  // Cross-page continuity: /pfi's CTA links here with ?nature=Institutional.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("nature");
    if (param && (INQUIRY_NATURES as readonly string[]).includes(param)) {
      // One-time sync from the URL (an external system) after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNature(param as Nature);
    }
  }, []);

  function handleFirstInteraction() {
    if (!touchedOnce) {
      setTouchedOnce(true);
      track("inquiry_start");
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const parsed = inquirySchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    track("inquiry_submit", { nature: parsed.data.nature });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json()) as { ok: boolean };
      if (!res.ok || !json.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="fade-rise flex min-h-[18rem] flex-col justify-center gap-6 border border-hairline bg-raised p-8"
      >
        <GemMark className="h-12 w-auto" aria-hidden="true" title="" />
        <p className="font-serif text-display-m italic">{copy.registers[nature].success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={handleFirstInteraction} noValidate className="flex flex-col gap-5">
      {/* Honeypot — visually hidden, off the tab order. Bots fill it; humans don't. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelBase}>
            {copy.fields.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={cn(fieldBase, errors.name && "border-error focus-visible:border-error ")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="font-sans text-caption text-error">
              {micro.nameInvalid}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelBase}>
            {copy.fields.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={cn(fieldBase, errors.email && "border-error focus-visible:border-error ")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="font-sans text-caption text-error">
              {micro.emailInvalid}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="nature" className={labelBase}>
          {copy.fields.nature}
        </label>
        <select
          id="nature"
          name="nature"
          value={nature}
          onChange={(e) => setNature(e.target.value as Nature)}
          className={cn(fieldBase, "avan-select cursor-pointer appearance-none")}
        >
          {copy.natures.map((n) => (
            <option key={n.value} value={n.value}>
              {n.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="note" className={labelBase}>
          {copy.fields.note}
        </label>
        <textarea id="note" name="note" rows={4} className={cn(fieldBase, "resize-none")} />
      </div>

      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="solid" disabled={status === "submitting"}>
          {status === "submitting" ? copy.submitting : copy.submit}
        </Button>
        <p
          key={status === "error" ? "error" : nature}
          aria-live="polite"
          className={cn(
            "fade-soft max-w-sm font-sans text-caption",
            status === "error" ? "text-error" : "text-fg-muted",
          )}
        >
          {status === "error" ? micro.submitError : copy.registers[nature].reassurance}
        </p>
      </div>
    </form>
  );
}
