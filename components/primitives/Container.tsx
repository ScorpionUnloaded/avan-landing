import { cn } from "@/lib/cn";

/** The brand's page column (A2.3): 1200px of content inside responsive outer margins. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-page px-margin", className)}>{children}</div>;
}
