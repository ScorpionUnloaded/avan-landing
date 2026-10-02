import { serializeJsonLd } from "@/lib/seo/jsonld";

/** Structured data block. A data script, not executed, so the CSP does not apply. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
  );
}
