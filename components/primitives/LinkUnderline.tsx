import { cn } from "@/lib/cn";

/**
 * Quiet text link with a bronze hairline underline that grows 0→100% on hover
 * (360ms). The pseudo-element is defined in globals.css as `.avan-underline`.
 */
export function LinkUnderline({
  href,
  className,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      className={cn(
        "avan-underline font-sans transition-colors duration-fast ease-standard hover:text-bronze-600 " +
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-600 focus-visible:ring-offset-2 " +
          "focus-visible:ring-offset-[color:var(--avan-surface-base)]",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
