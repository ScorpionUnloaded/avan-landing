import { ImageResponse } from "next/og";
import { palette, roles } from "@/lib/tokens";

// Edge runtime: renders on-demand (not prerendered at build), which also avoids a
// Windows-only @vercel/og prerender bug in the Node runtime.
export const runtime = "edge";

export const alt = "AVAN Group — a patrimonial house. Ordo Ex Intelligentia.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const thesis: Record<string, string> = {
  en: "Value, held across generations.",
  fr: "La valeur, tenue de génération en génération.",
};

const strap: Record<string, string> = {
  en: "A patrimonial house — finance · technology · capital · culture.",
  fr: "Une maison patrimoniale — finance · technologie · capital · culture.",
};

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw === "fr" ? "fr" : "en";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: palette["ink-950"].hex,
          padding: "72px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            color: palette["bronze-400"].hex,
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          AVAN GROUP · ORDO EX INTELLIGENTIA
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 210,
              lineHeight: 1,
              letterSpacing: 20,
              color: palette.cream.hex,
              fontFamily: "Georgia, serif",
              fontWeight: 500,
            }}
          >
            AVAN
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ width: 120, height: 3, background: palette["bronze-400"].hex }} />
            <div
              style={{
                fontSize: 30,
                color: roles.dark.fg,
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
              }}
            >
              {thesis[locale]}
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 20,
            color: roles.dark["fg-muted"],
            fontFamily: "monospace",
            letterSpacing: 2,
          }}
        >
          {strap[locale]}
        </div>
      </div>
    ),
    size,
  );
}
