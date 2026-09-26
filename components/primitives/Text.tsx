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
        "font-sans max-w-prose68",
        sizeClasses[size],
        // On dark surfaces, --avan-text-secondary is remapped in the .avan-dark scope.
        tone === "soft" ? "text-(--avan-text-secondary)" : "",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
