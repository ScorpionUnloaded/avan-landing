import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Divider } from "@/components/primitives/Divider";
import { EditorialImage } from "@/components/composite/EditorialImage";
import type { Copy } from "@/content";

export function Provenance({ copy }: { copy: Copy["provenance"] }) {
  return (
    <Section id="provenance" surface="cream" labelledBy="provenance-h">
      {/* Asymmetric editorial spread: monumental head left, measured text offset
          right — a composed page, not a centered stack. */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="flex flex-col gap-6 lg:col-span-6">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <Heading id="provenance-h" level="l">
            {copy.head}
          </Heading>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-7 lg:col-span-5 lg:col-start-8 lg:pt-4">
          <Text size="lg">{copy.body}</Text>
          <Divider weight="rule" className="w-16" />
          <Text tone="soft">{copy.support}</Text>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-20">
        <EditorialImage src="/imgs/facade.jpg" alt={copy.imageAlt} />
      </Reveal>
    </Section>
  );
}
