import { cn } from "@/lib/cn";

type Variant = "solid" | "hairline" | "ghost";

const base =
  // min-h-touch: the brand's 44px minimum target (WCAG 2.2 SC 2.5.8). Type is the
  // brand's button role (sm, medium, 0.06em); press is the 0.96 / 100ms token.
  "inline-flex min-h-touch items-center justify-center gap-2 rounded-sm px-6 py-3 font-sans text-button uppercase " +
  "transition-[transform,background-color,color,border-color] duration-fast ease-standard " +
  "active:scale-[0.96] " +
  "disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  solid: "bg-action text-on-action hover:bg-action-hover motion-safe:hover:-translate-y-px",
  hairline:
    "border border-hairline text-current hover:border-gilt hover:text-eyebrow motion-safe:hover:-translate-y-px",
  ghost: "text-current hover:text-eyebrow",
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
