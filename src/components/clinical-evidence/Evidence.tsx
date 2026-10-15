import { type ReactNode } from "react";
import { Check } from "lucide-react";
import { TiltCard } from "@/components/shared/TiltCard";
import { StretchText } from "@/components/shared/StretchText";
import { useCountUp } from "@/components/shared/lib";
import evidence from "@content/clinical-evidence.json";

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
// Methodology rows are drawn from the validation copy already on this page —
// no new clinical claims introduced.
// [VERIFY] research card images are illustrative product/tech visuals, not
// study-specific figures — confirm or replace before launch.
const { hero, validation, research, methodology } = evidence;

// A study with `"fit": "contain"` has a labelled schematic rather than a photo —
// cropping it cuts the diagram in half, so it is contained and padded instead.
// Same `fit` escape hatch the journey filmstrip in SignalJourney.tsx uses.
const imageFit = (fit?: string) => (fit === "contain" ? "object-contain p-2" : "object-cover");

// Research pipeline. Deliberately a plain static section — no pinning, no
// scroll-driven motion. All five studies are visible at once.
function ResearchPipeline() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
      <div className="container-x">
        <div className="mx-auto max-w-[520px] text-center reveal">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            {research.eyebrow}
          </div>
          <StretchText
            as="h2"
            className="font-display text-[clamp(26px,2.8vw,40px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            segments={[
              { text: research.title },
              { text: research.titleAccent, className: "text-[color:var(--accent)]" },
            ]}
          />
          <p className="mx-auto mt-5 max-w-[420px] text-xs leading-relaxed text-[color:var(--paper)]/70 md:text-[13px]">
            {research.body}
          </p>
        </div>

        <div className="mt-8 grid gap-x-5 gap-y-7 sm:grid-cols-2 md:mt-10 md:grid-cols-3">
          {research.studies.map((r, i) => (
            <article key={r.title} className="group reveal flex flex-col">
              <div className="relative overflow-hidden rounded-none bg-white">
                <img
                  src={r.image}
                  alt={r.alt}
                  className={`h-28 w-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.04] md:h-32 ${imageFit(r.fit)}`}
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
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] pt-32 pb-12 md:pt-40">
        <div className="container-x">
          <div className="mx-auto max-w-[760px] text-center reveal">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
              {hero.eyebrow}
            </div>
            <StretchText
              as="h1"
              className="mt-4 font-display text-[clamp(30px,4.4vw,58px)] font-bold leading-[1.04] tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: hero.title },
                {
                  text: hero.titleAccent,
                  className: "text-[color:var(--accent)]",
                },
              ]}
            />
            <p className="mx-auto mt-6 max-w-[560px] text-sm leading-relaxed text-[color:var(--mute)]">
              {hero.body}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-[11px] md:text-xs">
              {/* A stat with a `value` counts up to it; one with only a `label` is plain text. */}
              {hero.stats.map((stat) => (
                <HeroStat key={stat.label ?? stat.suffix}>
                  {stat.value !== undefined ? (
                    <>
                      <Counter to={stat.value} linear={stat.linear} />
                      {stat.suffix}
                    </>
                  ) : (
                    stat.label
                  )}
                </HeroStat>
              ))}
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
                {validation.eyebrow}
              </div>
              <StretchText
                as="h2"
                className="font-display text-[clamp(26px,2.8vw,40px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
                segments={[
                  { text: validation.title },
                  { text: validation.titleAccent, className: "text-[color:var(--accent)]" },
                ]}
              />
              <p className="mt-5 max-w-[480px] text-xs leading-relaxed text-[color:var(--paper)] md:text-[13px]">
                {validation.body}
              </p>
            </div>
            <div className="reveal relative mx-auto aspect-square w-full max-w-[480px]">
              {/* the whole constellation slowly rotates */}
              <div className="absolute inset-0 [animation:spin_44s_linear_infinite] motion-reduce:[animation:none]">
                <div className="absolute inset-[13%] rounded-full border border-dashed border-[color:var(--line)]" />
                {validation.sites.map((s, i) => {
                  const angle = (i / validation.sites.length) * 2 * Math.PI - Math.PI / 2;
                  const x = 50 + 40 * Math.cos(angle);
                  const y = 50 + 40 * Math.sin(angle);
                  return (
                    <div
                      key={s.image}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                    >
                      {/* counter-rotate so each logo stays upright while it orbits */}
                      <div className="[animation:spin_44s_linear_infinite_reverse] motion-reduce:[animation:none]">
                        <img
                          src={s.image}
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
              {methodology.eyebrow}
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(26px,2.8vw,40px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[{ text: methodology.title }]}
            />
            <p className="mt-5 max-w-[460px] text-xs leading-relaxed text-[color:var(--paper)] md:text-[13px]">
              {methodology.body}
            </p>
          </div>
          <TiltCard className="reveal rounded-none border border-[color:var(--line)] bg-[color:var(--ink)] p-6 md:p-7">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              {methodology.cardEyebrow}
            </div>
            <dl className="mt-5 divide-y divide-[color:var(--line)]">
              {methodology.rows.map(({ term, definition }) => (
                <div key={term} className="flex gap-4 py-3.5 first:pt-0 last:pb-0">
                  <dt className="w-24 shrink-0 font-display text-[12px] font-bold leading-snug tracking-tight text-[color:var(--paper)] md:w-28">
                    {term}
                  </dt>
                  <dd className="text-[12px] leading-relaxed text-[color:var(--paper)]/70">
                    {definition}
                  </dd>
                </div>
              ))}
            </dl>
          </TiltCard>
        </div>
      </section>
    </>
  );
}
