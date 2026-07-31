import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { TiltCard } from "./TiltCard";
import { StretchText } from "./StretchText";
import { useCountUp } from "./lib";
import { advisors, type Advisor } from "./people";

// NOTE: "300+" patient counts are flagged [VERIFY] in the source reference and
// must be confirmed by the Vena Vitals team before this becomes final public
// copy (the home page currently uses 600+ — reconcile the two).

// Inline number that counts up from `from` to `to` when scrolled into view.
function Counter({
  from = 0,
  to,
  linear = false,
}: {
  from?: number;
  to: number;
  linear?: boolean;
}) {
  const { ref, value } = useCountUp(to - from, { linear });
  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className="tabular-nums">
      {Math.round(from + value)}
    </span>
  );
}

function HeroStat({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-[color:var(--accent)]/25 bg-[color:var(--accent-soft)] px-4 py-2 font-semibold text-[color:var(--paper)] shadow-[0_2px_10px_rgba(216,74,74,0.08)]">
      <Check
        size={14}
        strokeWidth={3}
        className="shrink-0 text-[color:var(--accent)]"
        aria-hidden
      />
      {children}
    </span>
  );
}

// Hospital / academic validation sites. [VERIFY] confirm each logo maps to an
// active study site and that Vena Vitals has permission to display it.
const sites = [
  { src: "/assets/brand/uci.webp", alt: "UC Irvine" },
  { src: "/assets/brand/ucsf.svg", alt: "UCSF" },
  { src: "/assets/brand/baptist.png", alt: "Baptist Health" },
  { src: "/assets/brand/arksans.webp", alt: "Arkansas" },
  { src: "/assets/brand/bernards.svg", alt: "St. Bernards" },
];

// Definition-list rows for the Methodology panel. Drawn from the validation
// copy already on this page — no new clinical claims introduced.
const methodology: [string, string][] = [
  [
    "Reference",
    "Radial arterial line (invasive intra-arterial catheter), the clinical gold standard for continuous pressure.",
  ],
  ["Protocol", "AAMI ISO 81060-2 methodology for comparison against an arterial reference."],
  ["Accuracy", "Design-freeze study data within ISO 81060-3 standards."],
  ["Setting", "Head-to-head, beat-to-beat, in OR patients under general anesthesia."],
];

// [VERIFY] card images are illustrative product/tech visuals, not study-specific
// figures — confirm or replace before launch.
const research = [
  {
    title: "Head-to-head vs arterial line",
    body: "Prospective comparison in surgical patients across multiple OR settings.",
    img: "/assets/technology/veritrack-system.jpg",
  },
  {
    title: "CHF BP variability",
    body: "Characterizing blood pressure variability in congestive heart failure patients.",
    img: "/assets/technology/hospital-device-monitor.png",
  },
  {
    title: "Motion-artifact neural network",
    body: "Algorithm development to filter motion artifact from continuous waveform data.",
    img: "/assets/technology/sensor-mechanism.png",
    // Labelled schematic rather than a photo — cropping it cuts the diagram in
    // half, so it is contained and padded instead. Same `fit` escape hatch the
    // journey filmstrip in SignalJourney.tsx uses.
    fit: "object-contain p-2",
  },
  {
    title: "ER beat-to-beat",
    body: "Feasibility of continuous noninvasive BP in the emergency department setting.",
    img: "/assets/technology/veritrack-wearable-iso.jpg",
  },
  {
    title: "Stroke / dementia BPV",
    body: "Blood pressure variability as a biomarker in stroke and dementia populations.",
    img: "/assets/technology/stretch-sensor.png",
  },
];

// Research pipeline as a scroll-driven stack. The section pins to the viewport
// while each study card rises from below and covers the one before it, so the
// cards replace each other one by one as the page scrolls. Under
// prefers-reduced-motion the pinning is dropped and the cards render as a plain
// vertical list.
//
// The layout is: a tall `track` div whose extra height IS the scroll budget,
// containing a `sticky` viewport-height stage. Progress through the track maps
// to a float index into `research`.
const SCROLL_PER_CARD_VH = 95; // scroll budget per card: dwell + swap
const HOLD = 0.5; // fraction of a card's slot where it sits perfectly still
const GAP = 22; // percent of card height held empty between consecutive cards

// Position of the strip for a given float index, as a CSS transform. Shared by
// the first paint and the scroll loop so they can't disagree.
const cardTransform = (i: number, settled: number) =>
  `translate3d(0,${(-(settled - i) * (100 + GAP)).toFixed(2)}%,0)`;

// Research pipeline. Deliberately a plain static section — no pinning, no
// scroll-driven motion. All five studies are visible at once.
function ResearchPipeline() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
      <div className="container-x">
        <div className="mx-auto max-w-[520px] text-center reveal">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            Research Pipeline
          </div>
          <StretchText
            as="h2"
            className="font-display text-[clamp(26px,2.8vw,40px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            segments={[
              { text: "Ongoing " },
              { text: "research.", className: "text-[color:var(--accent)]" },
            ]}
          />
          <p className="mx-auto mt-5 max-w-[420px] text-xs leading-relaxed text-[color:var(--paper)]/70 md:text-[13px]">
            Studies extending continuous, noninvasive monitoring across new patient populations and
            care settings.
          </p>
        </div>

        <div className="mt-8 grid gap-x-5 gap-y-7 sm:grid-cols-2 md:mt-10 md:grid-cols-3">
          {research.map((r, i) => (
            <article key={r.title} className="group reveal flex flex-col">
              <div className="relative overflow-hidden rounded-[16px] bg-white">
                <img
                  src={r.img}
                  alt=""
                  className={`h-28 w-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.04] md:h-32 ${
                    "fit" in r ? (r.fit as string) : "object-cover"
                  }`}
                  loading="lazy"
                />
              </div>
              <div className="mt-3">
                <div className="font-mono text-[11px] text-[color:var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-1.5 font-display text-sm font-bold leading-tight tracking-tight text-[color:var(--paper)] md:text-base">
                  {r.title}
                </h3>
                <p className="mt-2 text-[11px] leading-relaxed text-[color:var(--paper)]/70 md:text-xs">
                  {r.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Evidence() {
  const [selected, setSelected] = useState<Advisor | null>(null);
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] pt-32 pb-12 md:pt-40">
        <div className="container-x">
          <div className="mx-auto max-w-[760px] text-center reveal">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
              Clinical Validation
            </div>
            <StretchText
              as="h1"
              className="mt-4 font-display text-[clamp(30px,4.4vw,58px)] font-bold leading-[1.04] tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Beat-to-beat accuracy, " },
                {
                  text: "proven against the arterial line.",
                  className: "text-[color:var(--accent)]",
                },
              ]}
            />
            <p className="mx-auto mt-6 max-w-[560px] text-sm leading-relaxed text-[color:var(--mute)]">
              VeriTrack has been validated across 300+ operating room patients at 6+ academic and
              community hospital sites. In direct comparison against the invasive radial arterial
              line, the clinical gold standard for continuous pressure, VeriTrack tracked
              beat-to-beat hemodynamic changes across a wide range of patients and surgical cases.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-[11px] md:text-xs">
              <HeroStat>
                <Counter to={300} />+ OR patients
              </HeroStat>
              <HeroStat>
                <Counter to={6} linear />+ study sites
              </HeroStat>
              <HeroStat>Validated vs. radial arterial line</HeroStat>
            </div>
          </div>
        </div>
      </section>

      {/* Operating room validation */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div className="reveal">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                Validation Program
              </div>
              <StretchText
                as="h2"
                className="font-display text-[clamp(26px,2.8vw,40px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
                segments={[
                  { text: "Operating room " },
                  { text: "validation.", className: "text-[color:var(--accent)]" },
                ]}
              />
              <p className="mt-5 max-w-[480px] text-xs leading-relaxed text-[color:var(--paper)] md:text-[13px]">
                Our validation program spans 6+ academic and community hospital sites, including UC
                Irvine, University of Vermont Medical Center, UCSF, and Henry Ford, with studies
                comparing VeriTrack directly against the invasive radial arterial line in OR
                patients undergoing general anesthesia. The validation follows AAMI ISO 81060-2
                methodology for comparison against an arterial reference. Data from our
                design-freeze studies demonstrate accuracy within ISO 81060-3 standards. In cases
                where the arterial line dropped signal due to clotting or required repeated
                flushing, VeriTrack maintained a clean continuous trace. Full study results are
                forthcoming.
              </p>
            </div>
            <div className="reveal relative mx-auto aspect-square w-full max-w-[480px]">
              {/* the whole constellation slowly rotates */}
              <div className="absolute inset-0 [animation:spin_44s_linear_infinite] motion-reduce:[animation:none]">
                <div className="absolute inset-[13%] rounded-full border border-dashed border-[color:var(--line)]" />
                {sites.map((s, i) => {
                  const angle = (i / sites.length) * 2 * Math.PI - Math.PI / 2;
                  const x = 50 + 40 * Math.cos(angle);
                  const y = 50 + 40 * Math.sin(angle);
                  return (
                    <div
                      key={s.src}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                    >
                      {/* counter-rotate so each logo stays upright while it orbits */}
                      <div className="[animation:spin_44s_linear_infinite_reverse] motion-reduce:[animation:none]">
                        <img
                          src={s.src}
                          alt={s.alt}
                          className="h-16 w-auto max-w-[130px] object-contain transition-transform duration-300 hover:scale-110 md:h-20"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ongoing research — plain static section, no scroll effect. */}
      <ResearchPipeline />

      {/* Methodology */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
        <div className="container-x grid gap-10 md:grid-cols-2 md:items-center">
          <div className="reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Standards
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(26px,2.8vw,40px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[{ text: "Methodology." }]}
            />
            <p className="mt-5 max-w-[460px] text-xs leading-relaxed text-[color:var(--paper)] md:text-[13px]">
              Validation follows AAMI ISO 81060-2 methodology for comparison against an arterial
              reference. Head-to-head beat-to-beat comparison with the radial arterial line in the
              operating room.
            </p>
          </div>
          <TiltCard className="reveal rounded-[24px] border border-[color:var(--line)] bg-[color:var(--ink)] p-6 md:p-7">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Standards &amp; reference
            </div>
            <dl className="mt-5 divide-y divide-[color:var(--line)]">
              {methodology.map(([term, desc]) => (
                <div key={term} className="flex gap-4 py-3.5 first:pt-0 last:pb-0">
                  <dt className="w-24 shrink-0 font-display text-[12px] font-bold leading-snug tracking-tight text-[color:var(--paper)] md:w-28">
                    {term}
                  </dt>
                  <dd className="text-[12px] leading-relaxed text-[color:var(--paper)]/70">
                    {desc}
                  </dd>
                </div>
              ))}
            </dl>
          </TiltCard>
        </div>
      </section>

      {/* Clinical advisory board */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x">
          <div className="mx-auto max-w-[560px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Meet our
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(26px,2.8vw,40px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Clinical advisory " },
                { text: "board.", className: "text-[color:var(--accent)]" },
              ]}
            />
          </div>
          <div className="mx-auto mt-12 grid max-w-[900px] items-start gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {advisors.map((a) => (
              <button
                type="button"
                key={a.name}
                onClick={() => setSelected(a)}
                aria-label={`Read more about ${a.name}`}
                className="group reveal flex cursor-pointer flex-col items-center text-center outline-none"
              >
                <span className="relative block aspect-square w-32 overflow-hidden rounded-full bg-[color:var(--ink-2)] shadow-[0_10px_30px_-12px_rgba(43,43,43,0.3)] ring-1 ring-[color:var(--line)] transition duration-300 group-hover:ring-2 group-hover:ring-[color:var(--accent)]/50 group-focus-visible:ring-2 group-focus-visible:ring-[color:var(--accent)] md:w-36">
                  <img
                    src={"avatar" in a ? a.avatar : a.img}
                    alt={a.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </span>
                <div className="mt-4 font-display text-sm font-bold tracking-tight text-[color:var(--paper)]">
                  {a.name}
                </div>
                <div className="mt-1 text-[11px] leading-snug text-[color:var(--paper)]/60">
                  {a.sub ? `${a.role}, ${a.sub}` : a.role}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Advisor bio popup — text only, quick fade in */}
      <DialogPrimitive.Root open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[#141414]/40 backdrop-blur-[4px] duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[520px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] bg-white p-7 text-[color:var(--paper)] shadow-[0_40px_100px_-24px_rgba(43,43,43,0.4)] outline-none duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0 md:p-9">
            {selected && (
              <div className="flex flex-col">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                  {selected.role}
                </div>
                <DialogPrimitive.Title className="mt-2.5 font-display text-xl font-bold leading-tight tracking-tight text-[color:var(--paper)]">
                  {selected.name}
                </DialogPrimitive.Title>
                <div className="mt-2 text-[12px] font-medium leading-snug text-[color:var(--paper)]/55">
                  {selected.title}
                </div>
                <DialogPrimitive.Description className="mt-5 text-[13px] leading-relaxed text-[color:var(--paper)]/75">
                  {selected.bio}
                </DialogPrimitive.Description>
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[color:var(--accent)] transition-opacity hover:opacity-80"
                >
                  View profile
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>
            )}
            <DialogPrimitive.Close className="absolute right-4 top-4 grid h-8 w-8 cursor-pointer place-items-center rounded-full text-[color:var(--paper)]/60 outline-none transition hover:bg-[color:var(--ink-2)] hover:text-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
