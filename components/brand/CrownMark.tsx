import { cn } from "@/lib/cn";

/**
 * Heraldic crown, drawn in the gem's own language: fine bronze monoline,
 * sharp geometry, strict bilateral symmetry (axis x=230), lozenge finials.
 * Per the Brand Token Sheet: "a restrained heraldic crown with fine gold
 * linework; avoid oversized luxury, cartoon royalty, or ornamental excess."
 */
export function CrownMark({
  className,
  stroke = "currentColor",
  strokeWidth = 6,
  title = "",
  ...rest
}: React.SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 460 220"
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn("block text-gilt", className)}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <g fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Band */}
        <line x1="80" y1="170" x2="380" y2="170" />
        <line x1="80" y1="205" x2="380" y2="205" />
        <line x1="80" y1="170" x2="80" y2="205" />
        <line x1="380" y1="170" x2="380" y2="205" />

        {/* Center spike + lozenge finial */}
        <line x1="215" y1="170" x2="230" y2="58" />
        <line x1="245" y1="170" x2="230" y2="58" />
        <polygon points="230,58 222,42 230,26 238,42" />

        {/* Mid spikes */}
        <line x1="135" y1="170" x2="150" y2="88" />
        <line x1="165" y1="170" x2="150" y2="88" />
        <polygon points="150,88 144,76 150,64 156,76" />
        <line x1="295" y1="170" x2="310" y2="88" />
        <line x1="325" y1="170" x2="310" y2="88" />
        <polygon points="310,88 304,76 310,64 316,76" />

        {/* Outer points */}
        <line x1="88" y1="170" x2="98" y2="124" />
        <line x1="108" y1="170" x2="98" y2="124" />
        <polygon points="98,124 93,114 98,104 103,114" />
        <line x1="352" y1="170" x2="362" y2="124" />
        <line x1="372" y1="170" x2="362" y2="124" />
        <polygon points="362,124 357,114 362,104 367,114" />
      </g>
    </svg>
  );
}
