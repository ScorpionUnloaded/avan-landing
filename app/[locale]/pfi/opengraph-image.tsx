import { getCopy } from "@/content";
import { ogContentType, ogLocale, ogSize, renderOg } from "@/lib/og/render";

type Props = { params: Promise<{ locale: string }> };

export async function generateImageMetadata({ params }: Props) {
  const c = getCopy(await ogLocale(params));
  return [{ id: "card", alt: c.pfi.meta.title, size: ogSize, contentType: ogContentType }];
}

export default async function Image({ params }: Props) {
  const c = getCopy(await ogLocale(params));
  return renderOg({
    eyebrow: c.pfi.hero.eyebrow,
    title: c.pfi.hero.head,
    subtitle: c.pfi.standard.intro,
    strap: c.site.strap,
  });
}
