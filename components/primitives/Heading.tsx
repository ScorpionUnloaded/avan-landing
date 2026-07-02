import { cn } from "@/lib/cn";

type Level = "xl" | "l" | "m";

const sizeClasses: Record<Level, string> = {
  xl: "text-display-xl",
  l: "text-display-l",
  m: "text-display-m",
};

/** Dynastic serif display heading. */
export function Heading({
  level = "l",
  as: Tag = "h2",
  italic = false,
  className,
  id,
  children,
}: {
  level?: Level;
  as?: "h1" | "h2" | "h3" | "p";
  italic?: boolean;
  className?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-serif font-medium text-balance",
        sizeClasses[level],
        italic && "italic font-normal",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
