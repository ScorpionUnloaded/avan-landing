import { getCopy } from "@/content";
import { ogContentType, ogLocale, ogSize, renderOg } from "@/lib/og/render";

type Props = { params: Promise<{ locale: string }> };

export async function generateImageMetadata({ params }: Props) {
  const c = getCopy(await ogLocale(params));
  return [{ id: "card", alt: `${c.site.name} — ${c.hero.thesis}`, size: ogSize, contentType: ogContentType }];
}

export default async function Image({ params }: Props) {
  const c = getCopy(await ogLocale(params));
  return renderOg({
    eyebrow: `${c.site.name} · ${c.site.motto}`,
    title: c.hero.wordmark,
    subtitle: c.hero.thesis,
    strap: c.site.strap,
    wordmark: true,
  });
}
