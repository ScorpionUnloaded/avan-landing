import { cn } from "@/lib/cn";

/**
 * AVAN Group primary symbol — the Avan Yeqara gem. Master vector, do not redraw.
 * 14 vertices, bilaterally symmetric. Stroke defaults to Sovereign Bronze #C5A572.
 */
export function GemMark({
  className,
  stroke = "#C5A572",
  strokeWidth = 6,
  title = "AVAN Group — the Avan Yeqara",
  ...rest
}: React.SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 461 1000"
      role="img"
      aria-label={title}
      className={cn("block", className)}
      {...rest}
    >
      <title>{title}</title>
      <g fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <line x1="230.5" y1="40.0" x2="400.4" y2="239.3" />
        <line x1="230.5" y1="40.0" x2="60.6" y2="239.3" />
        <line x1="230.5" y1="40.0" x2="329.0" y2="273.8" />
        <line x1="230.5" y1="40.0" x2="132.0" y2="273.8" />
        <line x1="230.5" y1="40.0" x2="230.5" y2="340.3" />
        <line x1="400.4" y1="239.3" x2="329.0" y2="273.8" />
        <line x1="400.4" y1="239.3" x2="420.4" y2="483.2" />
        <line x1="60.6" y1="239.3" x2="132.0" y2="273.8" />
        <line x1="60.6" y1="239.3" x2="40.6" y2="483.2" />
        <line x1="329.0" y1="273.8" x2="230.5" y2="340.3" />
        <line x1="132.0" y1="273.8" x2="230.5" y2="340.3" />
        <line x1="329.0" y1="273.8" x2="420.4" y2="483.2" />
        <line x1="132.0" y1="273.8" x2="40.6" y2="483.2" />
        <line x1="230.5" y1="340.3" x2="40.6" y2="483.2" />
        <line x1="230.5" y1="340.3" x2="420.4" y2="483.2" />
        <line x1="230.5" y1="340.3" x2="353.0" y2="669.7" />
        <line x1="230.5" y1="340.3" x2="108.1" y2="669.7" />
        <line x1="230.5" y1="340.3" x2="230.5" y2="746.0" />
        <line x1="40.6" y1="483.2" x2="12.0" y2="685.0" />
        <line x1="420.4" y1="483.2" x2="449.0" y2="685.0" />
        <line x1="449.0" y1="685.0" x2="353.0" y2="669.7" />
        <line x1="353.0" y1="669.7" x2="230.5" y2="746.0" />
        <line x1="353.0" y1="669.7" x2="230.5" y2="960.0" />
        <line x1="12.0" y1="685.0" x2="108.1" y2="669.7" />
        <line x1="108.1" y1="669.7" x2="230.5" y2="746.0" />
        <line x1="108.1" y1="669.7" x2="230.5" y2="960.0" />
        <line x1="12.0" y1="685.0" x2="230.5" y2="960.0" />
        <line x1="449.0" y1="685.0" x2="230.5" y2="960.0" />
        <line x1="230.5" y1="746.0" x2="230.5" y2="960.0" />
      </g>
    </svg>
  );
}
