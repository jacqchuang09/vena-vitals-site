import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type StudySlide = {
  src: string;
  /** Described for screen readers; the caption alone does not explain the plot. */
  alt: string;
  caption: string;
};

/**
 * Figures from the operating-room studies, chart left and caption right.
 *
 * Built on native scroll snapping rather than a swap between mounted slides, so
 * the track is genuinely scrollable: trackpad, shift-wheel, touch swipe and
 * keyboard all work, and dragging follows the finger instead of jumping at a
 * threshold. Arrows and dots scroll the same track, so every route through the
 * carousel produces the same motion.
 *
 * The figures are wide (roughly 2:1, one near 4:1) with axis labels that stop
 * being legible when boxed into a square, so the image track takes the larger
 * share and each figure keeps its own aspect ratio rather than being cropped.
 */
export function StudyCarousel({ slides, footnote }: { slides: StudySlide[]; footnote?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(i, track.children.length - 1));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: next * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }, []);

  // The scroll position is the source of truth, so a swipe, a wheel and an
  // arrow press all land on the same state.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const i = Math.round(track.scrollLeft / track.clientWidth);
        setIndex((prev) => (prev === i ? prev : i));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollTo(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollTo(index + 1);
    }
  };

  const arrow =
    "grid h-10 w-10 place-items-center rounded-full bg-[color:var(--ink)] text-[color:var(--paper)] ring-1 ring-[color:var(--line)] transition duration-200 hover:text-[color:var(--accent)] hover:ring-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] disabled:pointer-events-none disabled:opacity-30";

  return (
    <div
      className="reveal rounded-[28px] bg-[color:var(--ink-2)] p-5 md:p-8"
      role="group"
      aria-roledescription="carousel"
      aria-label="Operating room study figures"
    >
      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <div
            key={s.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="grid w-full shrink-0 snap-center items-center gap-6 md:grid-cols-[1.55fr_1fr] md:gap-10"
          >
            <img
              src={s.src}
              alt={s.alt}
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
              className="max-h-[300px] w-full select-none rounded-[14px] bg-white object-contain md:max-h-[380px]"
            />
            <div>
              <div className="font-mono text-[11px] tabular-nums text-[color:var(--mute)]">
                {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </div>
              <p className="mt-3 max-w-[38ch] font-display text-base font-bold leading-snug tracking-tight text-[color:var(--paper)] md:text-lg">
                {s.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-center gap-4 md:mt-8">
        <button
          type="button"
          onClick={() => scrollTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous figure"
          className={arrow}
        >
          <ChevronLeft size={18} aria-hidden />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Figure ${i + 1} of ${count}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] ${
                i === index
                  ? "w-7 bg-[color:var(--accent)]"
                  : "w-2 bg-[color:var(--paper)]/20 hover:bg-[color:var(--paper)]/45"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollTo(index + 1)}
          disabled={index === count - 1}
          aria-label="Next figure"
          className={arrow}
        >
          <ChevronRight size={18} aria-hidden />
        </button>
      </div>

      {footnote ? (
        <p className="mt-5 text-center text-[11px] leading-relaxed text-[color:var(--mute)]">
          {footnote}
        </p>
      ) : null}
    </div>
  );
}
