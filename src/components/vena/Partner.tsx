import { StretchText } from "./StretchText";
import { useNoSnap } from "./lib";
import { ContactForm } from "./ContactForm";

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
 * Partner With Us: one section, the pitch and the form side by side.
 *
 * The page used to make its case over six screens and then hand off to
 * /contact to find a form. It is now a single screen with the form in it, so
 * the ask and the means of answering it are in the same view and there is no
 * button whose only job is to go looking for the next step.
 *
 * It is the same ContactForm the /contact page uses, not a second copy.
 *
 * The audiences are set with the numerals doing the structural work: each is
 * at the site's stat size in the soft accent with the label over its right
 * shoulder, and the rows step in one at a time. No rules.
 *
 * Everything that used to sit on this page is parked in
 * archive/PartnerSections.tsx, including the closing CTA.
 */
export function Partner() {
  // The form runs past a phone screen, and mandatory snapping would put
  // its last fields out of easy reach.
  useNoSnap();
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20">
      <div className="container-x grid gap-10 md:grid-cols-[0.82fr_1.18fr] md:items-center md:gap-12">
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
            Evaluate VeriTrack in your operating room or ICU through a structured pilot. Tell us
            about your setting and the team will follow up.
          </p>

          <div className="mt-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Who this is for
            </div>
            <ul className="mt-4 space-y-1 text-left md:mt-5 md:space-y-1.5">
              {audiences.map((a, i) => (
                <li
                  key={a}
                  style={{ "--step": i } as React.CSSProperties}
                  className="flex items-center pl-[calc(var(--step)*0.5rem)] md:pl-[calc(var(--step)*0.9rem)]"
                >
                  <span
                    aria-hidden
                    className="select-none font-display text-[26px] font-bold leading-none tracking-[-0.04em] tabular-nums text-[color:var(--accent-soft)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ml-2.5 font-display text-[14px] font-bold leading-tight tracking-tight text-[color:var(--paper)] md:text-[15px]">
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
