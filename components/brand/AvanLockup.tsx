import { cn } from "@/lib/cn";
import { GemMark } from "./GemMark";

/**
 * Horizontal AVAN GROUP lockup — gem + wordmark. Text uses currentColor so it
 * adapts to light/cream and dark/navy surfaces; the gem stays Sovereign Bronze.
 */
export function AvanLockup({
  className,
  showGem = true,
  gemClassName = "h-8",
}: {
  className?: string;
  showGem?: boolean;
  gemClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-current", className)}>
      {showGem && <GemMark className={cn("w-auto", gemClassName)} aria-hidden="true" title="" />}
      <span className="flex flex-col leading-none">
        <span className="font-serif text-2xl font-medium tracking-[0.15em]">AVAN</span>
        {/* Sub-label needs its own line-height room; hide it in the tightest bar
            widths where it collided with the link row. */}
        <span className="mt-0.5 hidden font-mono text-[9px] uppercase leading-none tracking-[0.3em] text-(--avan-text-eyebrow) sm:block">
          Group
        </span>
      </span>
    </span>
  );
}
