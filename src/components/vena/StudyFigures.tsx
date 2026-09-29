import { useRef, useState } from "react";
import { StretchText } from "./StretchText";

export type StudyFigure = {
  src: string;
  /** Described for screen readers; the caption alone does not explain the plot. */
  alt: string;
  caption: string;
};

/**
 * Operating-room figures: one plate at a time, in a single section.
 *
 * All five figures live in one full-height section, like every other section
 * on this site, so the page's scroll-snap treats it as one stop and nothing
 * needs to be pinned or transformed to hold a position.
 *
 * Moving between them is meant to be obvious before anything is clicked. The
 * index is a contact sheet, so a reader can see what they are choosing between
 * rather than five numerals; hovering a thumbnail previews that figure in the
 * plate and leaving puts the chosen one back, so exploring costs nothing and
 * commits nothing. The plate itself advances on click and on swipe, and the
 * whole index is a tablist, so arrow keys, Home and End work too.
 *
 * The plate is a fixed box and every figure is contained inside it, so all
 * five occupy the same space and neither the caption nor the section moves as
 * they change. The figures keep their own aspect ratios, since their axis
 * labels stop being legible once they are cropped to a common shape.
 */
export function StudyFigures({
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
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const swipeX = useRef<number | null>(null);
  const total = figures.length;

  // Hovering the index previews without committing, so a reader can sweep the
  // contact sheet and still land back on the figure they actually chose.
  const shown = preview ?? selected;
  const current = figures[shown];

  const step = (delta: number) => setSelected((i) => (i + delta + total) % total);

  // Roving focus, so the index is navigable from the keyboard alone.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const fwd = e.key === "ArrowDown" || e.key === "ArrowRight";
    const back = e.key === "ArrowUp" || e.key === "ArrowLeft";
    if (!fwd && !back && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const next =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? total - 1
          : (selected + (fwd ? 1 : -1) + total) % total;
    setSelected(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
      <div className="container-x">
        <div className="max-w-[700px] reveal">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            {eyebrow}
          </div>
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

        <div className="reveal mt-8 grid gap-6 md:mt-10 md:grid-cols-[1fr_9rem] md:gap-10">
          <figure>
            {/* The plate advances on click and on swipe. Keyboard users get the
                same moves from the index, which is a proper tablist. */}
            <div
              role="tabpanel"
              id={`study-panel-${shown}`}
              aria-labelledby={`study-tab-${shown}`}
              onClick={() => step(1)}
              onTouchStart={(e) => (swipeX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                const from = swipeX.current;
                swipeX.current = null;
                if (from === null) return;
                const dx = e.changedTouches[0].clientX - from;
                if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
              }}
              className="group relative h-[clamp(210px,30vh,300px)] cursor-pointer overflow-hidden rounded-[26px] bg-[color:var(--ink)] p-4 shadow-[0_18px_50px_rgba(43,43,43,0.06)] ring-1 ring-[color:var(--line)] transition-shadow hover:shadow-[0_22px_60px_rgba(43,43,43,0.1)] md:h-[clamp(280px,46vh,430px)] md:p-6"
            >
              <div className="relative h-full w-full">
                {figures.map((f, i) => (
                  <img
                    key={f.src}
                    src={f.src}
                    alt={f.alt}
                    aria-hidden={i !== shown}
                    loading={i === 0 ? "eager" : "lazy"}
                    draggable={false}
                    style={{ opacity: i === shown ? 1 : 0 }}
                    className="absolute inset-0 h-full w-full select-none object-contain transition-opacity duration-300 ease-out"
                  />
                ))}
              </div>

              {/* Hover hint. It says what a click does, on a surface that gives
                  no other sign of being clickable. */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-[color:var(--paper)] px-3 py-1.5 text-[10px] font-semibold text-[color:var(--ink)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:bottom-5 md:right-5"
              >
                Next figure <span className="translate-y-[-0.5px]">→</span>
              </span>
            </div>

            {/* Reserved for the longest caption, so choosing a different figure does
                not re-centre the section under it. */}
            <figcaption className="mt-5 min-h-[4.4rem] max-w-[62ch] text-[13px] font-medium leading-relaxed tracking-tight text-[color:var(--paper)] text-pretty md:min-h-[3.2rem] md:text-[14px]">
              {current.caption}
            </figcaption>
          </figure>

          {/* Contact sheet. A column in the margin on a wide screen, a strip
              under the plate on a narrow one. */}
          <ol
            role="tablist"
            aria-label="Operating room study figures"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            onMouseLeave={() => setPreview(null)}
            className="flex flex-row gap-2.5 md:flex-col md:justify-center md:gap-3"
          >
            {figures.map((f, i) => {
              const on = i === shown;
              return (
                <li key={f.src} className="min-w-0 flex-1 md:flex-none">
                  <button
                    type="button"
                    role="tab"
                    id={`study-tab-${i}`}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    aria-selected={i === selected}
                    aria-controls={`study-panel-${i}`}
                    aria-label={`Figure ${i + 1} of ${total}. ${f.caption}`}
                    tabIndex={i === selected ? 0 : -1}
                    onClick={() => setSelected(i)}
                    onMouseEnter={() => setPreview(i)}
                    onFocus={() => setPreview(i)}
                    onBlur={() => setPreview(null)}
                    className="group flex w-full cursor-pointer items-center gap-2.5 outline-none"
                  >
                    <span
                      aria-hidden
                      className={`hidden shrink-0 text-[11px] font-semibold tabular-nums transition-colors md:block ${
                        on ? "text-[color:var(--accent)]" : "text-[color:var(--mute)]"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`block aspect-[16/9] w-full overflow-hidden rounded-[9px] bg-[color:var(--ink)] p-1 transition duration-200 ${
                        on
                          ? "opacity-100 ring-2 ring-[color:var(--accent)]"
                          : "opacity-55 ring-1 ring-[color:var(--line)] group-hover:opacity-100 group-focus-visible:opacity-100 group-focus-visible:ring-2 group-focus-visible:ring-[color:var(--accent)]/60"
                      }`}
                    >
                      <img
                        src={f.src}
                        alt=""
                        loading="lazy"
                        draggable={false}
                        className="h-full w-full select-none object-contain"
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {footnote ? (
          <p className="reveal mt-7 text-[11px] leading-relaxed text-[color:var(--mute)]">
            {footnote}
          </p>
        ) : null}
      </div>
    </section>
  );
}
