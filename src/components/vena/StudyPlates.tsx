import { useEffect, useRef, useState } from "react";
import { StretchText } from "./StretchText";

export type StudyFigure = {
  src: string;
  /** Described for screen readers; the caption alone does not explain the plot. */
  alt: string;
  caption: string;
};

/**
 * Operating-room figures, presented as a sequence of full-screen plates.
 *
 * This is not a carousel. It is the same primitive the rest of the site is
 * built from: each figure gets its own full-height panel and the page's own
 * scroll-snap carries the reader from one to the next, so a single scroll
 * gesture brings the next figure up and settles it. Nothing is pinned, nothing
 * is transformed, and no figure is ever half-visible.
 *
 * A running band stays fixed above the plates with the section heading and the
 * reader's position in the series, so plates 2 through 5 are never orphaned
 * from their title. The band is sticky with its own height cancelled out of the
 * flow, which is what lets every plate carry the same top padding.
 *
 * The plates opt into the page's snap through `.study-plate` in styles.css,
 * since they are nested and the global rule only reaches `main > section`.
 * Entry motion is the site-wide `.reveal` utility, which already honours
 * prefers-reduced-motion, so there is no separate reduced-motion branch here.
 */
export function StudyPlates({
  eyebrow,
  title,
  titleAccent,
  figures,
  footnote,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  figures: StudyFigure[];
  footnote?: string;
}) {
  const plates = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const total = figures.length;

  // Whichever plate is crossing the middle of the window is the current one.
  // The inset root margin narrows the observer to that middle band, so exactly
  // one plate qualifies at a time and no scroll listener is needed.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = plates.current.indexOf(e.target as HTMLElement);
          if (i >= 0) setActive(i);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    plates.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [total]);

  const goTo = (i: number) => {
    plates.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative bg-[color:var(--ink-2)] hairline-b"
      aria-label="Operating room study figures"
    >
      {/* Running band. The negative bottom margin removes its height from the
          flow so the first plate is padded exactly like the other four. */}
      <div
        className="sticky z-20 flex h-[var(--plate-band)] items-center border-b border-[color:var(--line)]/40 bg-[color:var(--ink-2)]"
        style={{ top: "var(--nav-h)", marginBottom: "calc(var(--plate-band) * -1)" }}
      >
        <div className="container-x flex items-center justify-between gap-5">
          <div className="flex min-w-0 items-baseline gap-3">
            <span className="hidden shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)] md:inline">
              {eyebrow}
            </span>
            <StretchText
              as="h2"
              className="truncate font-display text-[13.5px] font-bold leading-none tracking-tight text-[color:var(--paper)] sm:text-[clamp(15px,1.7vw,22px)]"
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

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden text-[11px] font-semibold tabular-nums text-[color:var(--paper)] sm:inline">
              {String(active + 1).padStart(2, "0")}
              <span className="text-[color:var(--mute)]"> / {String(total).padStart(2, "0")}</span>
            </span>
            <div className="flex items-center gap-1">
              {figures.map((f, i) => (
                <button
                  key={f.src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to figure ${i + 1} of ${total}`}
                  aria-current={i === active ? "true" : undefined}
                  className="group cursor-pointer py-2 outline-none"
                >
                  <span
                    className={`block h-[3px] rounded-full transition-all duration-300 ease-out group-hover:bg-[color:var(--accent)] group-focus-visible:ring-2 group-focus-visible:ring-[color:var(--accent)]/50 ${
                      i <= active
                        ? "w-4 bg-[color:var(--accent)] sm:w-7"
                        : "w-2.5 bg-[color:var(--paper)]/15 sm:w-4"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {figures.map((f, i) => (
        <article
          key={f.src}
          ref={(el) => {
            plates.current[i] = el;
          }}
          className="study-plate flex flex-col justify-center"
        >
          <div className="container-x">
            <figure className="reveal">
              <div className="overflow-hidden rounded-[26px] bg-[color:var(--ink)] p-4 shadow-[0_18px_50px_rgba(43,43,43,0.06)] ring-1 ring-[color:var(--line)] md:p-6">
                <div className="overflow-x-auto md:overflow-x-visible">
                  <img
                    src={f.src}
                    alt={f.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    draggable={false}
                    className="mx-auto h-[clamp(190px,30vh,320px)] w-auto max-w-none select-none object-contain md:h-[clamp(240px,44vh,470px)] md:w-full md:max-w-full"
                  />
                </div>
              </div>

              {/* Number in the gutter, caption ranged left beside it: a plate in
                  a figure section, rather than a line centred under a slide. */}
              <figcaption className="mt-6 grid grid-cols-[2.25rem_1fr] items-baseline gap-y-3">
                <span className="text-[12px] font-semibold tabular-nums text-[color:var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="max-w-[62ch] text-[13px] font-medium leading-relaxed tracking-tight text-[color:var(--paper)] text-pretty md:text-[14px]">
                  {f.caption}
                </p>
                {footnote && i === total - 1 ? (
                  <p className="col-start-2 max-w-[62ch] text-[11px] leading-relaxed text-[color:var(--mute)]">
                    {footnote}
                  </p>
                ) : null}
              </figcaption>
            </figure>
          </div>
        </article>
      ))}
    </section>
  );
}
