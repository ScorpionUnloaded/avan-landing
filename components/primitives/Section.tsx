import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * canvas  — the cream field (dark theme: ink)
 * raised  — cream-raised, a quieter step for tables and figures
 * inverse — the Ink Navy authority beat; re-scopes every semantic role
 */
export type Surface = "canvas" | "raised" | "inverse";

const surfaceClasses: Record<Surface, string> = {
  canvas: "bg-canvas text-fg",
  raised: "bg-raised text-fg",
  inverse: "surface-depth bg-canvas text-fg",
};

/** A page movement: full-bleed surface, audit-grade vertical rhythm, the brand's page column. */
export function Section({
  id,
  surface = "canvas",
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
      data-surface={surface === "inverse" ? "inverse" : undefined}
      className={cn("py-section", surfaceClasses[surface], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
