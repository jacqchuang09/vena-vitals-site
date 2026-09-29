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
 * needs to be pinned or transformed to hold a position. Only the current
 * figure is visible; the others are an index, not a filmstrip.
 *
 * The plate is a fixed box and every figure is contained inside it, so all
 * five occupy the same space and neither the caption nor the section moves as
 * they change. The figures keep their own aspect ratios, since their axis
 * labels stop being legible once they are cropped to a common shape.
 *
 * The index runs down the margin beside the plate on a wide screen and folds
 * into a row of numerals under it on a narrow one, which is the same markup
 * either way.
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
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = figures.length;
  const current = figures[active];

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
          : (active + (fwd ? 1 : -1) + total) % total;
    setActive(next);
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

        <div className="reveal mt-8 grid gap-6 md:mt-10 md:grid-cols-[1fr_7rem] md:gap-10">
          <figure
            role="tabpanel"
            id={`study-panel-${active}`}
            aria-labelledby={`study-tab-${active}`}
          >
            <div className="flex h-[clamp(210px,30vh,300px)] items-center overflow-hidden rounded-[26px] bg-[color:var(--ink)] p-4 shadow-[0_18px_50px_rgba(43,43,43,0.06)] ring-1 ring-[color:var(--line)] md:h-[clamp(280px,46vh,430px)] md:p-6">
              {/* A 4:1 strip chart scaled to fit a phone is unreadable, so on a
                  small screen it keeps its height and pans inside the frame. */}
              <div className="w-full overflow-x-auto md:h-full md:overflow-x-visible">
                {figures.map((f, i) => (
                  <img
                    key={f.src}
                    src={f.src}
                    alt={f.alt}
                    hidden={i !== active}
                    loading={i === 0 ? "eager" : "lazy"}
                    draggable={false}
                    className="mx-auto h-[clamp(160px,22vh,280px)] w-auto max-w-none select-none object-contain md:h-full md:max-h-full md:w-full md:max-w-full"
                  />
                ))}
              </div>
            </div>
            <figcaption className="mt-5 max-w-[62ch] text-[13px] font-medium leading-relaxed tracking-tight text-[color:var(--paper)] text-pretty md:text-[14px]">
              {current.caption}
            </figcaption>
          </figure>

          {/* Index. A column in the margin on a wide screen, a row of numerals
              under the plate on a narrow one. */}
          <ol
            role="tablist"
            aria-label="Operating room study figures"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex flex-row gap-5 md:flex-col md:justify-center md:gap-0"
          >
            {figures.map((f, i) => {
              const open = i === active;
              return (
                <li
                  key={f.src}
                  className="md:border-t md:border-[color:var(--line)]/60 md:last:border-b"
                >
                  <button
                    type="button"
                    role="tab"
                    id={`study-tab-${i}`}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    aria-selected={open}
                    aria-controls={`study-panel-${i}`}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setActive(i)}
                    className="group flex cursor-pointer items-center gap-2 py-1 outline-none md:w-full md:py-3.5"
                  >
                    {/* Rule running back toward the plate, on the open row only. */}
                    <span
                      aria-hidden
                      className={`hidden h-px flex-1 transition-colors duration-300 md:block ${
                        open ? "bg-[color:var(--accent)]" : "bg-transparent"
                      }`}
                    />
                    <span
                      className={`text-[12px] font-semibold tabular-nums transition-colors ${
                        open
                          ? "text-[color:var(--accent)]"
                          : "text-[color:var(--mute)] group-hover:text-[color:var(--paper)] group-focus-visible:text-[color:var(--paper)] group-focus-visible:underline"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
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
