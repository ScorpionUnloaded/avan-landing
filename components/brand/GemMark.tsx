import { cn } from "@/lib/cn";
import { GEM_STROKES, GEM_STROKE_WIDTH, GEM_VIEWBOX } from "@/lib/brand/gem";

/**
 * AVAN Group primary symbol — the Avan Yeqara gem. Master vector, do not redraw.
 * 14 vertices, bilaterally symmetric. Strokes in currentColor, which defaults to
 * the gilt token; set a text colour to use the black or white variants.
 */
export function GemMark({
  className,
  stroke = "currentColor",
  strokeWidth = GEM_STROKE_WIDTH,
  title = "AVAN Group — the Avan Yeqara",
  ...rest
}: React.SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox={`0 0 ${GEM_VIEWBOX.width} ${GEM_VIEWBOX.height}`}
      role="img"
      aria-label={title}
      className={cn("block text-gilt", className)}
      {...rest}
    >
      <title>{title}</title>
      <g fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {GEM_STROKES.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
    </svg>
  );
}
