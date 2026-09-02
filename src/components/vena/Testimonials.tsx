import { StretchText } from "./StretchText";

// Only attributed, approved quotes belong here. An unnamed "Anesthesiologist,
// user research" quote and an empty third slot used to sit beside Rinehart to
// balance a 3-up grid; both read as filler, so the section now shows however
// many real quotes exist and the layout adapts to the count.
// [EDIT NEEDED: add further approved, attributed testimonials here.]
const quotes = [
  {
    name: "Joseph Rinehart, MD",
    role: "Anesthesiology, Clinical Advisor",
    img: "/assets/clinical/joseph.jpeg",
    text: "A thin bandage-like patch for monitoring blood pressure continuously could revolutionize not just in-hospital monitoring, but outpatient monitoring as well; this is an exciting concept!",
  },
];

export function Testimonials() {
  return (
    <section className="relative flex min-h-screen items-center bg-[color:var(--ink-2)] py-8 md:py-12 hairline-b">
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
              <blockquote className="mt-6 max-w-[320px]">
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
