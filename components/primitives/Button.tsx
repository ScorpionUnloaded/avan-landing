import { cn } from "@/lib/cn";

type Variant = "solid" | "hairline" | "ghost";

const base =
  // min-h-[44px]: Apple HIG / WCAG 2.2 SC 2.5.8 minimum touch target — the
  // py-3 + 11px overline text alone computes to ~39px, short of the 44px floor.
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm px-6 py-3 font-mono text-overline uppercase " +
  "transition-[transform,background-color,color,border-color] duration-normal ease-standard " +
  "active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-bronze-600 focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-(--avan-surface-base) disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid: "bg-ink-900 text-cream hover:bg-ink-800 motion-safe:hover:-translate-y-px",
  hairline:
    "border border-(--avan-border-hairline) text-current hover:border-bronze-400 hover:text-bronze-600 motion-safe:hover:-translate-y-px",
  ghost: "text-current hover:text-bronze-600",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type AsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsAnchor = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Rectangular button. Renders an anchor when `href` is present, else a button. */
export function Button(props: AsButton | AsAnchor) {
  const { variant = "solid", className, children } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { variant: _v, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }
  const { variant: _v, className: _c, children: _ch, href: _h, ...rest } = props as AsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
