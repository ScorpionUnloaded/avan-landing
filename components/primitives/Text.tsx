import { cn } from "@/lib/cn";

type Size = "lg" | "base" | "caption";

const sizeClasses: Record<Size, string> = {
  lg: "text-body-lg",
  base: "text-body",
  caption: "text-caption",
};

/** Body / caption text. `tone="soft"` uses the secondary ink. */
export function Text({
  size = "base",
  tone = "default",
  as: Tag = "p",
  className,
  children,
}: {
  size?: Size;
  tone?: "default" | "soft";
  as?: "p" | "span" | "div";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-sans max-w-measure",
        sizeClasses[size],
        // Inverse surfaces re-scope --avan-fg-muted, so "soft" adapts automatically.
        tone === "soft" ? "text-fg-muted" : "",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
