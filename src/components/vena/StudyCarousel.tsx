import { useEffect, useRef, useState } from "react";
import { StretchText } from "./StretchText";

export type StudySlide = {
  src: string;
  /** Described for screen readers; the caption alone does not explain the plot. */
  alt: string;
  caption: string;
};

// Page scroll spent on each figure. Also the dwell: a figure sits still for
// most of its slot and only moves during the handover to the next one.
const SCROLL_PER_SLIDE_VH = 85;
const HANDOVER = 0.42; // fraction of a slot spent moving rather than resting

/**
 * Operating-room figures, advanced by page scroll rather than by clicking.
 *
 * The section pins while the page scrolls past it, and each figure rolls up
 * from the bottom to replace the one before it. Only one figure is ever
 * visible: the stage clips, so the next sits below the frame until its turn.
 *
 * The stage is a fixed height and every figure is contained inside it, so all
 * five occupy the same vertical space and nothing reflows as they change. The
 * figures keep their own aspect ratios inside that box, since their axis labels
 * stop being legible if they are cropped to a common shape.
 *
 * This renders its own section shell rather than sitting inside one, because
 * the pinned stage needs a tall scroll track and no overflow-hidden ancestor.
 * Under prefers-reduced-motion the pinning is dropped for a plain list.
 */
export function StudyCarousel({
  eyebrow,
  title,
  titleAccent,
  slides,
  footnote,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  slides: StudySlide[];
  footnote?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const count = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = track.getBoundingClientRect();
        const span = track.offsetHeight - window.innerHeight;
        if (span <= 0) return;
        const t = Math.min(1, Math.max(0, -rect.top / span));
        setProgress(t * (count - 1));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [count, reduced]);

  const active = Math.round(progress);

  // Offset of a figure from the stage, in multiples of the stage height.
  // Easing the handover keeps each figure still for most of its slot.
  const offset = (i: number) => {
    const d = i - progress;
    if (d <= -1 || d >= 1) return d;
    const sign = Math.sign(d);
    const a = Math.abs(d);
    const eased = a <= HANDOVER ? 0 : (a - HANDOVER) / (1 - HANDOVER);
    return sign * eased * eased * (3 - 2 * eased);
  };

  const Figures = (
    <div className="relative mx-auto h-[clamp(200px,38vh,420px)] w-full max-w-[1000px] overflow-hidden">
      {slides.map((s, i) => (
        <figure
          key={s.src}
          aria-hidden={i !== active}
          className="absolute inset-0 flex flex-col items-center justify-center [overflow-anchor:none] will-change-transform"
          style={{ transform: `translate3d(0, ${offset(i) * 100}%, 0)` }}
        >
          <img
            src={s.src}
            alt={s.alt}
            loading={i === 0 ? "eager" : "lazy"}
            draggable={false}
            className="max-h-[clamp(150px,29vh,330px)] w-full select-none rounded-[16px] bg-white object-contain ring-1 ring-[color:var(--line)]"
          />
          <figcaption className="mt-4 max-w-[60ch] text-center text-[12.5px] font-semibold leading-snug tracking-tight text-[color:var(--paper)] md:text-[13.5px]">
            {s.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );

  const Heading = (
    <div className="mx-auto max-w-[620px] text-center">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
        {eyebrow}
      </div>
      <StretchText
        as="h2"
        className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
        segments={
          titleAccent
            ? [
                { text: `${title} ` },
                { text: titleAccent, className: "text-[color:var(--accent)]" },
              ]
            : [{ text: title }]
        }
      />
    </div>
  );

  const Progress = (
    <div className="mt-8 flex items-center justify-center gap-2" aria-hidden>
      {slides.map((s, i) => (
        <span
          key={s.src}
          className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
            i === active ? "w-8 bg-[color:var(--accent)]" : "w-4 bg-[color:var(--paper)]/15"
          }`}
        />
      ))}
    </div>
  );

  const Footnote = footnote ? (
    <p className="mt-5 text-center text-[11px] leading-relaxed text-[color:var(--mute)]">
      {footnote}
    </p>
  ) : null;

  // Reduced motion: no pinning, no transforms, just the figures in order.
  if (reduced) {
    return (
      <section className="relative bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x">
          {Heading}
          <div className="mx-auto mt-10 flex max-w-[1000px] flex-col gap-12">
            {slides.map((s) => (
              <figure key={s.src} className="flex flex-col items-center">
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="max-h-[340px] w-full rounded-[16px] bg-white object-contain ring-1 ring-[color:var(--line)]"
                />
                <figcaption className="mt-4 max-w-[60ch] text-center text-[13px] font-semibold leading-snug text-[color:var(--paper)]">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          {Footnote}
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-[color:var(--ink)] hairline-b">
      <div
        ref={trackRef}
        className="relative [overflow-anchor:none]"
        style={{ height: `calc(100vh + ${(count - 1) * SCROLL_PER_SLIDE_VH}vh)` }}
        role="group"
        aria-roledescription="carousel"
        aria-label="Operating room study figures"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-px"
          style={{ bottom: "100vh", scrollSnapAlign: "start", scrollSnapStop: "always" }}
        />
        <div className="sticky top-0 flex h-screen items-center pt-[var(--nav-h)] pb-10">
          <div className="container-x w-full">
            {Heading}
            <div className="mt-8 md:mt-10">{Figures}</div>
            {Progress}
            {Footnote}
          </div>
        </div>
      </div>
    </section>
  );
}
