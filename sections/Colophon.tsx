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
    <footer id="colophon" data-surface="inverse" className="surface-depth bg-canvas py-section text-fg">
      <Container>
        <Reveal className="flex flex-col gap-14">
          <Heading level="l" italic as="p" className="text-fg">
            {copy.closing}
          </Heading>

          <Divider className="bg-hairline" />

          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <div className="flex flex-col gap-6">
              <AvanLockup gemClassName="h-9" />
              <div className="flex flex-col gap-1">
                {copy.lines.map((line) => (
                  <p key={line} className="font-mono text-caption text-fg-muted">
                    {line}
                  </p>
                ))}
              </div>
              <p className="font-sans text-overline uppercase text-eyebrow">{copy.micro}</p>
            </div>

            <div className="flex flex-col items-start gap-8 md:items-end">
              <nav aria-label={copy.navLabel}>
                <ul className="flex flex-wrap gap-x-8 gap-y-3">
                  {copy.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={targetHref[link.target]?.(locale) ?? "#"}
                        className="avan-underline font-sans text-overline uppercase text-fg-muted transition-colors duration-fast hover:text-eyebrow"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <PfiMark variant="white" className="h-16 w-auto opacity-90" />
            </div>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
