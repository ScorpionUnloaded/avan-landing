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
        "avan-underline font-sans transition-colors duration-fast ease-standard hover:text-eyebrow " +
          "" +
          "",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
