import { useEffect, useRef, useState } from "react";

export type StudySlide = {
  src: string;
  /** Described for screen readers; the caption alone does not explain the plot. */
  alt: string;
  caption: string;
};

/**
 * Figures from the operating-room studies, as a scrolling filmstrip.
 *
 * Each figure takes a little under two thirds of the track, so the next one is
 * always partly visible. That edge is the affordance: it shows there is more
 * and invites a drag, instead of relying on arrow buttons. Trackpad,
 * shift-wheel, touch swipe and the dots all scroll the same track, and scroll
 * position is the only source of truth for which figure is current.
 *
 * The figures sit directly on the page with no panel behind them. They are
 * already white plots, so a hairline ring separates them from the page rather
 * than a filled container.
 */
export function StudyCarousel({ slides, footnote }: { slides: StudySlide[]; footnote?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Measure against the first card rather than the track, since a card is
        // narrower than the viewport here.
        const card = track.children[0] as HTMLElement | undefined;
        if (!card) return;
        const step = card.offsetWidth + 20; // card + gap-5
        setIndex(() => Math.max(0, Math.min(count - 1, Math.round(track.scrollLeft / step))));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    const card = track?.children[0] as HTMLElement | undefined;
    if (!track || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: i * (card.offsetWidth + 20),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollTo(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollTo(index + 1);
    }
  };

  return (
    <div
      className="reveal"
      role="group"
      aria-roledescription="carousel"
      aria-label="Operating room study figures"
    >
      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <figure
            key={s.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className={`w-[80%] shrink-0 snap-start transition-opacity duration-500 sm:w-[64%] lg:w-[58%] ${
              i === index ? "opacity-100" : "opacity-55"
            }`}
          >
            <img
              src={s.src}
              alt={s.alt}
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
              className="max-h-[260px] w-full select-none rounded-[16px] bg-white object-contain ring-1 ring-[color:var(--line)] md:max-h-[330px]"
            />
            <figcaption className="mt-4 max-w-[52ch] text-[12.5px] font-semibold leading-snug tracking-tight text-[color:var(--paper)] md:text-[13.5px]">
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Figure ${i + 1} of ${count}`}
            aria-current={i === index ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 ${
              i === index
                ? "w-8 bg-[color:var(--accent)]"
                : "w-4 bg-[color:var(--paper)]/15 hover:bg-[color:var(--paper)]/35"
            }`}
          />
        ))}
      </div>

      {footnote ? (
        <p className="mt-5 text-center text-[11px] leading-relaxed text-[color:var(--mute)]">
          {footnote}
        </p>
      ) : null}
    </div>
  );
}
