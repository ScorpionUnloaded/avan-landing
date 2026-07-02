import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Text } from "@/components/primitives/Text";
import { StatStrip } from "@/components/composite/StatStrip";
import type { Copy } from "@/content";

export function Figures({ copy }: { copy: Copy["figures"] }) {
  return (
    <Section id="figures" surface="cream-raised" labelledBy="figures-h">
      <Reveal className="flex flex-col gap-10">
        <Eyebrow as="h2">{copy.eyebrow}</Eyebrow>
        <StatStrip stats={copy.stats} />
        <Text size="caption" tone="soft" className="max-w-md">
          {copy.footnote}
        </Text>
      </Reveal>
    </Section>
  );
}
