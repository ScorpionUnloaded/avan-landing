import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HouseDocument } from "@/components/composite/HouseDocument";
import { getCopy } from "@/content";
import { isLocale, type Locale } from "@/lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/legal">): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
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

export default async function LegalPage({ params }: PageProps<"/[locale]/legal">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getCopy(locale);
  return <HouseDocument copy={c} doc={c.legal} locale={locale} currentPath="/legal" />;
}
