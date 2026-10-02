import { getCopy } from "@/content";
import { ogContentType, ogLocale, ogSize, renderOg } from "@/lib/og/render";

type Props = { params: Promise<{ locale: string }> };

export async function generateImageMetadata({ params }: Props) {
  const c = getCopy(await ogLocale(params));
  return [{ id: "card", alt: `${c.privacy.title} — ${c.site.name}`, size: ogSize, contentType: ogContentType }];
}

export default async function Image({ params }: Props) {
  const c = getCopy(await ogLocale(params));
  return renderOg({
    eyebrow: c.site.name,
    title: c.privacy.title,
    subtitle: c.privacy.updated,
    strap: c.site.strap,
  });
}
