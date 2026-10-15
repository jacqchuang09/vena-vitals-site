import { StretchText } from "./StretchText";

// Only attributed, approved quotes belong here. An unnamed "Anesthesiologist,
// user research" quote and an empty third slot used to sit beside Rinehart to
// balance a 3-up grid; both read as filler, so the section now shows however
// many real quotes exist and the layout adapts to the count.
// [EDIT NEEDED: add further approved, attributed testimonials here.]
const allQuotes = [
  {
    name: "Joseph Rinehart, MD",
    role: "Anesthesiology, Clinical Advisor",
    img: "/assets/clinical/joseph.jpeg",
    text: "Currently in the operating room, if we need a continuous measure of blood pressure, the most common approach is to use an invasive arterial line. Not all patients necessarily need that level of intervention, however, but would still benefit from a continuous blood pressure measurement. This is where the Vena Vitals sensor may really have an opportunity to shine and fill in that gap in our current monitoring capabilities.",
  },
];

/**
 * Attributed quotes from the clinical people behind a page.
 *
 * This used to sit on the home page and show everyone. It now belongs to the
 * setting it speaks about, so `names` picks which quotes a page carries and
 * `background` lets that page keep its own alternating panels.
 */
export function Testimonials({
  names,
  background = "bg-[color:var(--ink-2)]",
}: {
  /** Which quotes to show. Omit for all of them. */
  names?: readonly string[];
  /** Set by the page, which alternates section backgrounds down the stack. */
  background?: string;
} = {}) {
  const quotes = names ? allQuotes.filter((q) => names.includes(q.name)) : allQuotes;
  if (!quotes.length) return null;

  return (
    <section
      className={`relative flex min-h-screen items-center py-8 md:py-12 hairline-b ${background}`}
    >
      <div className="container-x">
        <div className="mx-auto max-w-[430px] text-center reveal">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            Perspectives
          </div>
          <StretchText
            as="h2"
            className="font-display text-[clamp(22px,2.55vw,34px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            segments={[
              { text: "From the " },
              { text: "field.", className: "text-[color:var(--accent)]" },
            ]}
          />
        </div>

        <div
          className={`mx-auto mt-12 grid grid-cols-1 gap-12 md:mt-14 ${
            quotes.length > 1 ? "max-w-[900px] sm:grid-cols-3" : "max-w-[560px]"
          }`}
        >
          {quotes.map((q, i) => (
            <figure key={q.name ?? i} className="reveal flex flex-col items-center text-center">
              <span className="relative grid aspect-square w-24 place-items-center overflow-hidden rounded-full bg-[color:var(--ink)] shadow-[0_10px_30px_-12px_rgba(43,43,43,0.3)] ring-1 ring-[color:var(--line)] md:w-28">
                {"img" in q ? (
                  <img
                    src={q.img}
                    alt={q.name ?? ""}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="font-display text-4xl font-bold leading-none text-[color:var(--accent)]/40"
                  >
                    &ldquo;
                  </span>
                )}
              </span>
              {/* A lone quote gets the full column to read across. Three-up
                  keeps the narrow measure so the columns stay even. */}
              <blockquote
                className={`mt-6 ${quotes.length > 1 ? "max-w-[320px]" : "max-w-[520px]"}`}
              >
                <p className="text-xs leading-relaxed text-[color:var(--paper)] md:text-[13px]">
                  &ldquo;{q.text}&rdquo;
                </p>
                <figcaption className="mt-4">
                  <div className="font-display text-sm font-bold tracking-tight text-[color:var(--paper)]">
                    {q.name}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug text-[color:var(--paper)]/60">
                    {q.role}
                  </div>
                </figcaption>
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
