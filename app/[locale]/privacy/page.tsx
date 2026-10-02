import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HouseDocument } from "@/components/composite/HouseDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCopy } from "@/content";
import { isLocale, type Locale } from "@/lib/locale";
import { buildMetadata } from "@/lib/i18n/metadata";
import { pageGraph } from "@/lib/seo/jsonld";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const m = getCopy(locale).privacy.meta;
  return buildMetadata({ locale, route: "privacy", title: m.title, description: m.description });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getCopy(locale);
  return (
    <>
      <HouseDocument copy={c} doc={c.privacy} locale={locale} currentPath="/privacy" />
      <JsonLd data={pageGraph({ locale, route: "privacy", name: c.privacy.title })} />
    </>
  );
}
