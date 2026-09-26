import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HouseDocument } from "@/components/composite/HouseDocument";
import { getCopy } from "@/content";
import { isLocale, type Locale } from "@/lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
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

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getCopy(locale);
  return <HouseDocument copy={c} doc={c.privacy} locale={locale} currentPath="/privacy" />;
}
