import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { LayerPanel } from "@/components/composite/LayerPanel";
import { EditorialImage } from "@/components/composite/EditorialImage";
import type { Copy } from "@/content";

export function Layers({ copy }: { copy: Copy["layers"] }) {
  return (
    <Section id="layers" surface="raised" labelledBy="layers-h">
      <div className="grid gap-14 lg:grid-cols-[1fr_1px_1fr] lg:gap-16">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <Heading id="layers-h" level="l">
            {copy.head}
          </Heading>
          <Text size="lg">{copy.body}</Text>
        </Reveal>

        <div aria-hidden className="hidden bg-hairline lg:block" />

        <Reveal delay={0.1} className="flex flex-col justify-center gap-12">
          {copy.panels.map((panel) => (
            <LayerPanel key={panel.label} {...panel} />
          ))}
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-16">
        <EditorialImage src="/imgs/ledger.jpg" alt={copy.imageAlt} ratio="21 / 9" />
      </Reveal>
    </Section>
  );
}
