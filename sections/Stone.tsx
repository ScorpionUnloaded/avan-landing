import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { TenetRow } from "@/components/composite/TenetRow";
import { StoneGem } from "@/components/composite/StoneGem";
import { EditorialImage } from "@/components/composite/EditorialImage";
import type { Copy } from "@/content";

export function Stone({ copy }: { copy: Copy["stone"] }) {
  return (
    <Section id="stone" surface="inverse" labelledBy="stone-h">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
        <div className="flex flex-col gap-6">
          <Reveal className="flex flex-col gap-6">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <Heading id="stone-h" level="l">
              {copy.head}
            </Heading>
          </Reveal>

          <div className="mt-4 grid gap-x-10 sm:grid-cols-2">
            {copy.tenets.map((tenet, i) => (
              <Reveal key={tenet.label} delay={i * 0.06}>
                <TenetRow {...tenet} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <Text className="mt-4 font-serif text-display-m italic" as="p">
              {copy.closing}
            </Text>
          </Reveal>
        </div>

        <div className="order-first flex justify-center lg:order-last">
          <div className="relative">
            {/* Candlelight behind the stone — the gem should glow, not float in flat navy. */}
            <span
              aria-hidden
              className="glow-gilt absolute -inset-20 rounded-full"
            />
            <StoneGem className="relative h-64 md:h-80 lg:h-[28rem]" />
          </div>
        </div>
      </div>

      <Reveal delay={0.15} className="mt-16">
        <EditorialImage src="/imgs/bronze.jpg" alt={copy.imageAlt} ratio="21 / 9" overlay="dark" />
      </Reveal>
    </Section>
  );
}
