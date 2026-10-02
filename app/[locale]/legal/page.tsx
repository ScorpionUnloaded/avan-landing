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
}: PageProps<"/[locale]/legal">): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const m = getCopy(locale).legal.meta;
  return buildMetadata({ locale, route: "legal", title: m.title, description: m.description });
}

export default async function LegalPage({ params }: PageProps<"/[locale]/legal">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getCopy(locale);
  return (
    <>
      <HouseDocument copy={c} doc={c.legal} locale={locale} currentPath="/legal" />
      <JsonLd data={pageGraph({ locale, route: "legal", name: c.legal.title })} />
    </>
  );
}
