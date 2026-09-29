import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Expand, X } from "lucide-react";
import type { StudyFigure } from "./StudyFigures";
import { StretchText } from "./StretchText";

/**
 * Study figures as a spread: every figure on screen at once, caption beneath.
 *
 * With only a couple of figures there is nothing to page through, so this is
 * not a carousel and has no navigation. Both plates sit side by side, each
 * with its caption directly underneath, and the reader takes them in together
 * rather than holding the first in their head while they find the second.
 *
 * The plates are dense multi-panel plots and a half-width plate cannot be
 * read, so a plate opens full size on click. That is the only interaction, and
 * it is what the size of the thumbnails is buying.
 *
 * Plate heights are fixed and captions reserve a common height, so the two
 * columns stay aligned however long a caption runs.
 */
export function StudySpread({
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
  const [open, setOpen] = useState<StudyFigure | null>(null);

  return (
    <>
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
            className={`reveal grid gap-6 md:grid-cols-2 md:gap-10 ${title ? "mt-8 md:mt-10" : ""}`}
          >
            {slides.map((f, i) => (
              <figure key={f.src}>
                <button
                  type="button"
                  onClick={() => setOpen(f)}
                  aria-label={`Enlarge figure ${i + 1}: ${f.caption}`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-none bg-[color:var(--ink)] p-3 shadow-[0_18px_50px_rgba(43,43,43,0.06)] outline-none ring-1 ring-[color:var(--line)] transition duration-300 hover:shadow-[0_24px_64px_rgba(43,43,43,0.12)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] md:p-4"
                >
                  <img
                    src={f.src}
                    alt={f.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    draggable={false}
                    className="mx-auto h-[clamp(140px,19.5vh,210px)] w-full select-none object-contain md:h-[clamp(240px,38vh,360px)]"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[color:var(--paper)] px-3 py-1.5 text-[10px] font-semibold text-[color:var(--ink)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:bottom-4 md:right-4"
                  >
                    <Expand className="size-3" strokeWidth={2.5} /> Enlarge
                  </span>
                </button>

                {/* Caption underneath its own plate, with a reserved height so
                    the two columns stay level however long the text runs. */}
                <figcaption className="mt-4 min-h-[3.4rem] text-[13px] font-medium leading-relaxed tracking-tight text-[color:var(--paper)] text-pretty md:mt-5 md:min-h-[4rem] md:text-[14px]">
                  <span className="mr-2 font-semibold tabular-nums text-[color:var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Ruled off, so the source note reads as the section's rather than
              as a continuation of the last caption above it. */}
          {footnote ? (
            <p className="reveal mt-5 border-t border-[color:var(--line)]/60 pt-4 text-[11px] leading-relaxed text-[color:var(--mute)] md:mt-7 md:pt-5">
              {footnote}
            </p>
          ) : null}
        </div>
      </section>

      {/* A plate at full size. Same shell as the advisor bio popup. */}
      <DialogPrimitive.Root open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[#141414]/50 backdrop-blur-[4px] duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-none bg-white p-5 text-[color:var(--paper)] shadow-[0_40px_100px_-24px_rgba(43,43,43,0.4)] outline-none duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0 md:p-8">
            {open && (
              <>
                <DialogPrimitive.Title className="sr-only">{open.alt}</DialogPrimitive.Title>
                <img
                  src={open.src}
                  alt={open.alt}
                  className="mx-auto max-h-[68vh] w-full object-contain"
                />
                <DialogPrimitive.Description className="mx-auto mt-5 max-w-[70ch] text-[13px] font-medium leading-relaxed text-[color:var(--paper)] md:text-[14px]">
                  {open.caption}
                </DialogPrimitive.Description>
              </>
            )}
            <DialogPrimitive.Close className="absolute right-4 top-4 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white/80 text-[color:var(--paper)]/60 outline-none transition hover:bg-[color:var(--ink-2)] hover:text-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
