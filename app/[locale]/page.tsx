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
import { getCopy } from "@/content";
import { isLocale } from "@/lib/locale";

export default function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
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
    </>
  );
}
