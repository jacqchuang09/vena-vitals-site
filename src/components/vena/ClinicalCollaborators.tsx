import { StretchText } from "./StretchText";
import { advisors } from "./people";

/**
 * The clinical people behind a page, as circular portraits. These used to open
 * a bio dialog on click; they are now plain, non-interactive cards.
 *
 * Which advisors appear is chosen per page through `names`, so a setting page
 * can show only the advisor whose field it covers while About still lists the
 * whole board. Omitting `names` shows everyone.
 *
 * Lifted out of Evidence.tsx so it can sit on a solution page instead.
 */
export function ClinicalCollaborators({
  eyebrow = "Meet our",
  title = "Clinical ",
  titleAccent = "collaborators.",
  names,
  background = "bg-[color:var(--ink)]",
}: {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  names?: readonly string[];
  /** Set by the page, which alternates section backgrounds down the stack. */
  background?: string;
}) {
  const people = names ? advisors.filter((a) => names.includes(a.name)) : advisors;

  return (
    <section
      className={`relative flex min-h-screen items-center overflow-hidden py-16 md:py-20 hairline-b ${background}`}
    >
      <div className="container-x">
        <div className="mx-auto max-w-[560px] text-center reveal">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            {eyebrow}
          </div>
          <StretchText
            as="h2"
            className="font-display text-[clamp(26px,2.8vw,40px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            segments={[
              { text: title },
              { text: titleAccent, className: "text-[color:var(--accent)]" },
            ]}
          />
        </div>
        <div
          className={`mx-auto mt-12 grid items-start gap-x-6 gap-y-10 ${
            people.length > 1 ? "max-w-[900px] sm:grid-cols-2 lg:grid-cols-4" : "max-w-[280px]"
          }`}
        >
          {people.map((a) => (
            <div key={a.name} className="reveal flex flex-col items-center text-center">
              <span className="relative block aspect-square w-32 overflow-hidden rounded-full bg-[color:var(--ink-2)] shadow-[0_10px_30px_-12px_rgba(43,43,43,0.3)] ring-1 ring-[color:var(--line)] md:w-36">
                <img
                  src={"avatar" in a ? a.avatar : a.img}
                  alt={a.name}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </span>
              <div className="mt-4 font-display text-sm font-bold tracking-tight text-[color:var(--paper)]">
                {a.name}
              </div>
              <div className="mt-1 text-[11px] leading-snug text-[color:var(--paper)]/60">
                {a.sub ? `${a.role}, ${a.sub}` : a.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
