import { Link } from "@tanstack/react-router";
import { StretchText } from "./StretchText";
import { Waveform } from "./Waveform";

// Decomposed from the single "Built for ..." sentence this replaces — no new
// audiences introduced.
const audiences = [
  "Clinical leaders",
  "Operating room teams",
  "Critical care teams",
  "Supply chain",
  "Value-analysis committees",
];

/**
 * Partner With Us: a cover and a closing CTA, nothing between.
 *
 * The cover is the one page on this site that leads with the signal itself.
 * A live arterial trace runs edge to edge behind the headline, masked away at
 * both gutters so it reads as the page's own texture rather than a panel
 * dropped onto it, and the audiences sit under a rule as a masthead line
 * instead of in a card. That is deliberate: every other hero here is centred
 * text above a button, and this page is the one asking a hospital to commit.
 *
 * The trace is the same Waveform canvas the product mockups use, so it is the
 * real arterial shape rather than a decorative squiggle. It already pauses off
 * screen and draws a single static beat under prefers-reduced-motion.
 *
 * The four sections that used to sit between these two are parked in
 * archive/PartnerSections.tsx.
 */
export function Partner() {
  return (
    <>
      <section className="grain relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        {/* The trace, running through the headline band. Masked at both edges
            so it fades out rather than stopping at a hard line. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-[34vh] -translate-y-1/2 opacity-[0.22] [-webkit-mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]"
        >
          <Waveform color="var(--accent)" bpm={62} speed={0.22} lineWidth={2.5} />
        </div>

        <div className="container-x relative">
          <div className="reveal max-w-[880px]">
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
              Partner with us
            </div>
            <StretchText
              as="h1"
              className="font-display text-[clamp(32px,4.6vw,60px)] font-bold leading-[1.02] tracking-[-0.03em] text-[color:var(--paper)] text-balance"
              segments={[
                { text: "Bring continuous, noninvasive blood pressure to " },
                { text: "your facility.", className: "text-[color:var(--accent)]" },
              ]}
            />
          </div>

          <p className="reveal mt-6 max-w-[42ch] text-[13px] leading-relaxed text-[color:var(--paper)]/75 md:text-sm">
            Evaluate VeriTrack in your operating room or ICU through a structured pilot.
          </p>

          <div className="reveal mt-8">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--paper)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
            >
              Start a pilot conversation{" "}
              <span
                aria-hidden
                className="inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          {/* Masthead line rather than a boxed list: a rule, a label, and the
              audiences running across it. */}
          <div className="reveal mt-12 border-t border-[color:var(--line)]/70 pt-6 md:mt-16">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--mute)]">
              Who this is for
            </div>
            <ul className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-3">
              {audiences.map((a, i) => (
                <li key={a} className="flex items-baseline gap-2">
                  <span className="text-[10px] font-semibold tabular-nums text-[color:var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] font-medium tracking-tight text-[color:var(--paper)]">
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Closing CTA. There's a single lead form site-wide (/contact); this
          page makes the case and hands off to it rather than carrying its own
          duplicate form. */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-[560px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Get started
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Start an evaluation " },
                { text: "conversation.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[440px] text-xs leading-relaxed text-[color:var(--paper)]">
              Tell us about your facility and evaluation interest, and the team will follow up with
              pilot and evidence-packet details.
            </p>
            <div className="mt-9">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--paper)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
              >
                Request a demo{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
