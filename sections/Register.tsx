import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Heading } from "@/components/primitives/Heading";
import { EditorialImage } from "@/components/composite/EditorialImage";
import type { Copy } from "@/content";

export function Register({ copy }: { copy: Copy["register"] }) {
  return (
    <Section id="register" surface="canvas" labelledBy="register-h">
      <div className="grid gap-14 lg:grid-cols-[1fr_18rem] lg:items-start lg:gap-16">
        <div>
          <Reveal className="flex max-w-3xl flex-col gap-5">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <Heading id="register-h" level="l">
              {copy.head}
            </Heading>
          </Reveal>

          <Stagger className="mt-12 flex max-w-3xl flex-col">
            {copy.litany.map((line) => (
              <StaggerItem
                key={line}
                className="flex items-baseline gap-5 border-b border-hairline py-5 last:border-b-0"
              >
                <span aria-hidden className="mt-1 block h-2 w-2 shrink-0 rotate-45 border border-gilt" />
                <p className="font-sans text-body-lg text-fg">{line}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="hidden lg:block lg:sticky lg:top-28">
          <EditorialImage src="/imgs/seal.jpg" alt={copy.imageAlt} ratio="1 / 1" sizes="288px" />
        </Reveal>
      </div>
    </Section>
  );
}
