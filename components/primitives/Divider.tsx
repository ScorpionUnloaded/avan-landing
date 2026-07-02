import { cn } from "@/lib/cn";

/** Bronze rule. `weight="rule"` is the 3px brand divider; default is a 1px hairline. */
export function Divider({
  weight = "hairline",
  className,
}: {
  weight?: "hairline" | "rule";
  className?: string;
}) {
  return (
    <span
      role="presentation"
      className={cn(
        "block w-full",
        weight === "rule" ? "h-[3px] bg-bronze-400" : "h-px bg-[color:var(--avan-border-hairline)]",
        className,
      )}
    />
  );
}
