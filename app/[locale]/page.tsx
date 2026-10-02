import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/composite/Nav";
import { Hero } from "@/sections/Hero";
import { Provenance } from "@/sections/Provenance";
import { Rivers } from "@/sections/Rivers";
import { Layers } from "@/sections/Layers";
import { Stone } from "@/sections/Stone";
import { Register } from "@/sections/Register";
import { Figures } from "@/sections/Figures";
import { Voice } from "@/sections/Voice";
import { Prive } from "@/sections/Prive";
import { Colophon } from "@/sections/Colophon";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCopy } from "@/content";
import { isLocale, type Locale } from "@/lib/locale";
import { buildMetadata } from "@/lib/i18n/metadata";
import { pageGraph } from "@/lib/seo/jsonld";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const { site } = getCopy(locale);
  return buildMetadata({
    locale,
    route: "home",
    title: site.title,
    description: site.description,
    absoluteTitle: true,
  });
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getCopy(locale);

  return (
    <>
      <Nav copy={c.nav} locale={locale} currentPath="" />
      <main id="main">
        <Hero copy={c.hero} />
        <Provenance copy={c.provenance} />
        <Rivers copy={c.rivers} />
        <Layers copy={c.layers} />
        <Stone copy={c.stone} />
        <Register copy={c.register} />
        <Figures copy={c.figures} />
        <Voice copy={c.voice} />
        <Prive copy={c.prive} micro={c.microcopy} />
      </main>
      <Colophon copy={c.colophon} locale={locale} />
      <JsonLd data={pageGraph({ locale, route: "home", name: c.site.title })} />
    </>
  );
}
