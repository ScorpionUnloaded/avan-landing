import { cn } from "@/lib/cn";

/** Centered 1320px content column with responsive inline padding. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-container px-gutter-sm md:px-gutter", className)}>
      {children}
    </div>
  );
}
