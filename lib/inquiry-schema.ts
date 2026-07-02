import { z } from "zod";

export const INQUIRY_NATURES = [
  "Capital",
  "Advisory",
  "Institutional",
  "Cultural",
  "Other",
] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Your name.").max(120),
  email: z.string().trim().email("A working email, so we can reply."),
  nature: z.enum(INQUIRY_NATURES),
  note: z.string().trim().max(2000).optional().default(""),
  // Honeypot — must stay empty. Bots fill it; humans never see it.
  company: z.string().max(0).optional().default(""),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type InquiryResponse = { ok: boolean; error?: string };
