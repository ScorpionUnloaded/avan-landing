import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { GEM_STROKES, GEM_VIEWBOX } from "@/lib/brand/gem";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { palette, roles } from "@/lib/tokens";

/**
 * Open Graph cards, one per route and locale, drawn in the house's own faces
 * (Cormorant Garamond, Hanken Grotesk — OFL subsets in ./fonts) and palette
 * (lib/tokens). Rendered at build time on the Node runtime.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const FONT_DIR = path.join(process.cwd(), "lib/og/fonts");
type Fonts = NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"];
let fonts: Promise<Fonts> | undefined;

function loadFonts(): Promise<Fonts> {
  fonts ??= Promise.all([
    readFile(path.join(FONT_DIR, "CormorantGaramond-Medium.woff")),
    readFile(path.join(FONT_DIR, "CormorantGaramond-Italic.woff")),
    readFile(path.join(FONT_DIR, "HankenGrotesk-Medium.woff")),
  ]).then(([serif, serifItalic, sans]) => [
    { name: "Cormorant", data: serif, weight: 500 as const, style: "normal" as const },
    { name: "Cormorant", data: serifItalic, weight: 400 as const, style: "italic" as const },
    { name: "Hanken", data: sans, weight: 500 as const, style: "normal" as const },
  ]);
  return fonts;
}

/** Resolves a route's locale param, falling back to the default. */
export async function ogLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : defaultLocale;
}

const INK = palette["ink-950"].hex;
const GILT = palette["bronze-400"].hex;
const CREAM = palette.cream.hex;
const MUTED = roles.dark["fg-muted"];

export async function renderOg({
  eyebrow,
  title,
  subtitle,
  strap,
  wordmark = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  strap: string;
  /** Set the title as the monumental AVAN wordmark rather than a headline. */
  wordmark?: boolean;
}) {
  const gemHeight = 470;
  const gemWidth = (gemHeight * GEM_VIEWBOX.width) / GEM_VIEWBOX.height;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: INK,
          backgroundImage: `radial-gradient(circle at 82% 30%, ${GILT}33 0%, ${INK}00 55%)`,
          padding: "64px 72px",
          fontFamily: "Hanken",
        }}
      >
        <svg
          width={gemWidth}
          height={gemHeight}
          viewBox={`0 0 ${GEM_VIEWBOX.width} ${GEM_VIEWBOX.height}`}
          style={{ position: "absolute", right: 110, top: (ogSize.height - gemHeight) / 2 }}
        >
          <g fill="none" stroke={GILT} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
            {GEM_STROKES.map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
            ))}
          </g>
        </svg>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 780 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 56, height: 2, backgroundColor: GILT }} />
            <div style={{ fontSize: 20, letterSpacing: 6, color: GILT, textTransform: "uppercase" }}>
              {eyebrow}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div
              style={{
                fontFamily: "Cormorant",
                fontWeight: 500,
                color: CREAM,
                lineHeight: 1.02,
                ...(wordmark
                  ? { fontSize: 200, letterSpacing: 30 }
                  : { fontSize: 84, letterSpacing: -0.5 }),
              }}
            >
              {title}
            </div>
            {subtitle ? (
              <div
                style={{
                  fontFamily: "Cormorant",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 38,
                  lineHeight: 1.2,
                  color: CREAM,
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>

          <div style={{ fontSize: 20, letterSpacing: 1, color: MUTED }}>{strap}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}
