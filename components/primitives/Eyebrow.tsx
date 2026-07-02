import { cn } from "@/lib/cn";
import { DrawnRule } from "@/components/motion/DrawnRule";

/**
 * Mono overline label, preceded by a drawn gold rule (the gilt lives in the
 * ornament — decorative bronze-400 — while the text stays AA-compliant
 * bronze-700 on light / bronze-400 on dark via the .avan-dark scope).
 */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "h2";
}) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-3 font-mono text-overline uppercase text-[color:var(--avan-text-eyebrow)]",
        className,
      )}
    >
      <DrawnRule />
      <span>{children}</span>
    </Tag>
  );
}
