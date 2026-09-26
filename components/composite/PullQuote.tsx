/** Manifesto pull-quote. Rendered on the dark surface. */
export function PullQuote({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <figure className="relative mx-auto max-w-4xl text-center">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-serif text-[10rem] leading-none text-bronze-400/25"
      >
        &ldquo;
      </span>
      <blockquote className="relative font-serif text-display-l font-normal italic leading-[1.15]">
        {quote}
      </blockquote>
      <figcaption className="mt-10 font-mono text-overline uppercase text-(--avan-text-eyebrow)">
        {attribution}
      </figcaption>
    </figure>
  );
}
