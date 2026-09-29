import { Link } from "@tanstack/react-router";
import { StretchText } from "./StretchText";

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
 * The cover carries the site's own type scale, the same sizes the solution
 * heroes use. What makes it its own is the right-hand column: the audiences
 * are set as a ruled index with the numerals at display size in the accent,
 * rather than as small print inside a rounded card. It is the one list on the
 * site that is treated as content instead of as a panel.
 *
 * The four sections that used to sit between these two are parked in
 * archive/PartnerSections.tsx.
 */
export function Partner() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x grid gap-10 md:grid-cols-[0.82fr_1.18fr] md:items-center md:gap-14">
          <div className="mx-auto max-w-[400px] text-center reveal md:mx-0 md:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Partner with us
            </div>
            <StretchText
              as="h1"
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-[1.05] tracking-tight text-[color:var(--paper)] text-balance"
              segments={[
                { text: "Bring continuous, noninvasive blood pressure to " },
                { text: "your facility.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[340px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
              Evaluate VeriTrack in your operating room or ICU through a structured pilot.
            </p>
            <div className="mt-8">
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
          </div>

          {/* The audiences as a ruled index. The numeral carries the weight and
              the rule runs out to the edge of the column, so the list reads as
              a contents page rather than as five bullets in a box. */}
          <div className="reveal">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Who this is for
            </div>
            <ul className="mt-6">
              {audiences.map((a, i) => (
                <li
                  key={a}
                  className="grid grid-cols-[2.75rem_auto_1fr] items-center gap-4 border-t border-[color:var(--line)] py-4 last:border-b md:gap-5 md:py-5"
                >
                  <span className="font-display text-[clamp(20px,2vw,28px)] font-bold leading-none tracking-[-0.04em] tabular-nums text-[color:var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[14px] font-bold leading-tight tracking-tight text-[color:var(--paper)] md:text-[16px]">
                    {a}
                  </span>
                  <span aria-hidden className="h-px bg-[color:var(--line)]" />
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
