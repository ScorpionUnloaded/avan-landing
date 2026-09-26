import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { InquiryForm } from "@/components/composite/InquiryForm";
import { InViewTracker } from "@/components/motion/InViewTracker";
import type { Copy } from "@/content";

export function Prive({ copy, micro }: { copy: Copy["prive"]; micro: Copy["microcopy"] }) {
  return (
    <Section id="privé" surface="canvas" labelledBy="prive-h">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <Heading id="prive-h" level="l">
            {copy.head}
          </Heading>
          <Text size="lg">{copy.body}</Text>

          {/* The protocol — the terms under which an inquiry is received,
              stated where the hesitation happens (plan §J.3, trust density). */}
          <dl className="mt-4 flex flex-col gap-5 border-t border-hairline pt-7">
            {copy.protocol.map((p) => (
              <div key={p.term} className="grid gap-1.5">
                <dt className="font-sans text-overline uppercase text-eyebrow">
                  {p.term}
                </dt>
                <dd className="max-w-md font-sans text-caption text-fg-muted">
                  {p.line}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <InquiryForm copy={copy} micro={micro} />
        </Reveal>
      </div>
      <InViewTracker event="prive_view" />
    </Section>
  );
}
