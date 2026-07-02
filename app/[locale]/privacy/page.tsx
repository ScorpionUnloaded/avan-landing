import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HouseDocument } from "@/components/composite/HouseDocument";
import { getCopy } from "@/content";
import { isLocale, type Locale } from "@/lib/locale";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const m = getCopy(locale).privacy.meta;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: locale === "en" ? "/privacy" : "/fr/privacy",
      languages: { en: "/privacy", fr: "/fr/privacy" },
    },
  };
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const c = getCopy(params.locale);
  return <HouseDocument copy={c} doc={c.privacy} locale={params.locale} currentPath="/privacy" />;
}
