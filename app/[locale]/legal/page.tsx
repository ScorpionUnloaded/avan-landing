import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HouseDocument } from "@/components/composite/HouseDocument";
import { getCopy } from "@/content";
import { isLocale, type Locale } from "@/lib/locale";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const m = getCopy(locale).legal.meta;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: locale === "en" ? "/legal" : "/fr/legal",
      languages: { en: "/legal", fr: "/fr/legal" },
    },
  };
}

export default function LegalPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const c = getCopy(params.locale);
  return <HouseDocument copy={c} doc={c.legal} locale={params.locale} currentPath="/legal" />;
}
