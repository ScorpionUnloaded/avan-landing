import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Surface = "cream" | "cream-raised" | "navy";

const surfaceClasses: Record<Surface, string> = {
  cream: "bg-cream text-ftext",
  "cream-raised": "bg-cream-raised text-ftext",
  navy: "bg-ink-950 text-(--avan-text-on-inverse)",
};

/** A page movement: full-bleed surface, audit-grade vertical rhythm, 1320px inner column. */
export function Section({
  id,
  surface = "cream",
  labelledBy,
  className,
  containerClassName,
  children,
}: {
  id: string;
  surface?: Surface;
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "scroll-mt-24 py-section-y-sm md:py-section-y",
        surfaceClasses[surface],
        surface === "navy" && "avan-dark avan-depth",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
