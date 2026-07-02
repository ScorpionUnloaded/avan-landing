import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Heading } from "@/components/primitives/Heading";
import { AvanLockup } from "@/components/brand/AvanLockup";
import { PfiMark } from "@/components/brand/PfiMark";
import { Divider } from "@/components/primitives/Divider";
import { homeAnchor, localeHref, type Locale } from "@/lib/locale";
import type { Copy } from "@/content";

const targetHref: Record<string, (locale: Locale) => string> = {
  prive: (l) => homeAnchor(l, "#privé"),
  pfi: (l) => localeHref(l, "/pfi"),
  legal: (l) => localeHref(l, "/legal"),
  privacy: (l) => localeHref(l, "/privacy"),
};

export function Colophon({ copy, locale }: { copy: Copy["colophon"]; locale: Locale }) {
  return (
    <footer
      id="colophon"
      className="avan-dark avan-depth bg-ink-950 py-section-y-sm text-[color:var(--avan-text-on-inverse)] md:py-section-y"
    >
      <Container>
        <Reveal className="flex flex-col gap-14">
          <Heading level="l" italic as="p" className="text-cream">
            {copy.closing}
          </Heading>

          <Divider className="bg-[color:var(--avan-border-hairline-dark)]" />

          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <div className="flex flex-col gap-6">
              <AvanLockup gemClassName="h-9" />
              <div className="flex flex-col gap-1">
                {copy.lines.map((line) => (
                  <p key={line} className="font-mono text-caption text-cream/60">
                    {line}
                  </p>
                ))}
              </div>
              <p className="font-mono text-overline uppercase text-bronze-400">{copy.micro}</p>
            </div>

            <div className="flex flex-col items-start gap-8 md:items-end">
              <nav aria-label="Footer">
                <ul className="flex flex-wrap gap-x-8 gap-y-3">
                  {copy.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={targetHref[link.target]?.(locale) ?? "#"}
                        className="avan-underline font-mono text-overline uppercase text-cream/75 transition-colors duration-fast hover:text-bronze-400"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <PfiMark className="h-16 w-auto opacity-90" />
            </div>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
