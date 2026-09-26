import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/motion/Reveal";
import { PullQuote } from "@/components/composite/PullQuote";
import { VoiceBackdrop } from "@/components/composite/VoiceBackdrop";
import type { Copy } from "@/content";

export function Voice({ copy }: { copy: Copy["voice"] }) {
  return (
    <Section id="voice" surface="inverse" className="relative overflow-hidden">
      <VoiceBackdrop />
      <Reveal className="relative">
        <PullQuote quote={copy.quote} attribution={copy.attribution} />
      </Reveal>
    </Section>
  );
}
