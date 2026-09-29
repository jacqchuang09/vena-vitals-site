import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { StudyFigure } from "./StudyFigures";
import { StretchText } from "./StretchText";

/**
 * Study figures as a swipeable track, one slide filling the frame.
 *
 * Deliberately a different instrument from StudyFigures, which pins a single
 * plate and picks between figures from a contact sheet in the margin. Here the
 * slides sit side by side on a horizontal scroll-snap track that the reader
 * drags, swipes or steps through with the arrows underneath, and the caption
 * rides beside its figure rather than under it.
 *
 * The track is native overflow scrolling with snap points, so dragging,
 * two-finger swiping and the scrollbar all work without any of it being
 * scripted; the arrows just scroll by one frame. That also means the position
 * is read back off the element rather than held in state that could disagree
 * with what is on screen.
 *
 * These figures are close to 4:3, unlike the wide operating-room strips, which
 * is why the caption sits in a column beside the plate instead of below it.
 */
export function StudyGallery({
  eyebrow,
  title,
  titleAccent,
  slides,
  footnote,
  background = "bg-[color:var(--ink-2)]",
}: {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  slides: StudyFigure[];
  footnote?: string;
  background?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);
  const total = slides.length;

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setAt(Math.round(el.scrollLeft / el.clientWidth));
  };

  const go = (to: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.min(total - 1, Math.max(0, to));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section
      className={`relative flex min-h-screen items-center overflow-hidden py-16 md:py-20 hairline-b ${background}`}
    >
      <div className="container-x">
        {title ? (
          <div className="max-w-[700px] reveal">
            {eyebrow ? (
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                {eyebrow}
              </div>
            ) : null}
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-[1.1] tracking-tight text-[color:var(--paper)] text-balance"
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
        ) : null}

        <div
          className={`reveal ${title ? "mt-8 md:mt-10" : ""}`}
          role="group"
          aria-roledescription="carousel"
          aria-label="Sleep study figures"
        >
          {/* The track. No gutter bleed: a slide is exactly the width of the
              frame, so the next one is never partly on screen. */}
          <div
            ref={track}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((s, i) => (
              <div
                key={s.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${total}`}
                className="w-full shrink-0 snap-start"
              >
                <div className="grid gap-5 md:grid-cols-[1.45fr_1fr] md:items-center md:gap-8">
                  <div className="flex h-[clamp(200px,28vh,300px)] items-center justify-center overflow-hidden rounded-[22px] bg-[color:var(--ink)] p-3 shadow-[0_18px_50px_rgba(43,43,43,0.06)] ring-1 ring-[color:var(--line)] md:h-[clamp(300px,48vh,440px)] md:p-5">
                    <img
                      src={s.src}
                      alt={s.alt}
                      loading={i === 0 ? "eager" : "lazy"}
                      draggable={false}
                      className="h-full w-full select-none object-contain"
                    />
                  </div>

                  <figure className="md:max-w-[34ch]">
                    <figcaption className="text-[13px] font-medium leading-relaxed tracking-tight text-[color:var(--paper)] text-pretty md:text-[15px]">
                      <span className="mr-2 font-semibold tabular-nums text-[color:var(--accent)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.caption}
                    </figcaption>
                  </figure>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation. Stepping the track rather than setting an index, so
              the buttons and a drag can never disagree about where it is. */}
          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(at - 1)}
              disabled={at === 0}
              aria-label="Previous figure"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-[color:var(--line)] transition enabled:hover:bg-[color:var(--paper)] enabled:hover:text-[color:var(--ink)] disabled:cursor-default disabled:opacity-30"
            >
              <ArrowLeft className="size-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => go(at + 1)}
              disabled={at === total - 1}
              aria-label="Next figure"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-[color:var(--line)] transition enabled:hover:bg-[color:var(--paper)] enabled:hover:text-[color:var(--ink)] disabled:cursor-default disabled:opacity-30"
            >
              <ArrowRight className="size-4" strokeWidth={2} />
            </button>

            <div aria-hidden className="ml-1 h-px flex-1 bg-[color:var(--line)]">
              <div
                className="h-px bg-[color:var(--accent)] transition-[width] duration-300 ease-out"
                style={{ width: `${((at + 1) / total) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold tabular-nums text-[color:var(--paper)]">
              {String(at + 1).padStart(2, "0")}
              <span className="text-[color:var(--mute)]"> / {String(total).padStart(2, "0")}</span>
            </span>
          </div>

          {footnote ? (
            <p className="mt-5 text-[11px] leading-relaxed text-[color:var(--mute)]">{footnote}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
