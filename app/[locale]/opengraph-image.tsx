import { ImageResponse } from "next/og";

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

export default function OpengraphImage({ params }: { params: { locale: string } }) {
  const locale = params.locale === "fr" ? "fr" : "en";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0E1722",
          padding: "72px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            color: "#C5A572",
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
              color: "#F4F1EA",
              fontFamily: "Georgia, serif",
              fontWeight: 500,
            }}
          >
            AVAN
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ width: 120, height: 3, background: "#C5A572" }} />
            <div
              style={{
                fontSize: 30,
                color: "#ECEAE2",
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
            color: "#9FA8B4",
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
