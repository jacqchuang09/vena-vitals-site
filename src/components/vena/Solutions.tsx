import { Link } from "@tanstack/react-router";
import { VisualPlaceholder } from "./lib";
import { TiltCard } from "./TiltCard";
import { StretchText } from "./StretchText";

const solutionGroups = [
  {
    title: "Hospital settings",
    body: "Clinical workflows where continuous pressure may matter during active care.",
    cards: [
      {
        eyebrow: "Operating room",
        title: "Anesthesiology",
        body: "Beat-to-beat arterial pressure through a case, with placement away from the surgical field.",
        href: "/solutions/anesthesiology",
      },
      {
        eyebrow: "Critical care",
        title: "ICU",
        body: "A near-term direction for continuous pressure visibility with less invasive access.",
        href: "/solutions/critical-care",
      },
    ],
  },
  {
    title: "Home and sleep settings",
    body: "Future and research-facing use cases outside the core operating-room proof story.",
    cards: [
      {
        eyebrow: "Home",
        title: "Home monitoring",
        body: "A future direction for continuous blood pressure visibility outside the hospital.",
        href: "/solutions/home-monitoring",
      },
      {
        eyebrow: "Sleep",
        title: "Sleep Medicine",
        body: "A research direction for nocturnal blood pressure signals alongside sleep studies.",
        href: "/solutions/sleep-medicine",
      },
    ],
  },
];

function DemoButton({ children = "Request a Demo" }: { children?: string }) {
  return (
    <Link
      to="/contact"
      className="group inline-flex items-center justify-center rounded-full bg-[color:var(--paper)] px-6 py-4 text-sm font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
    >
      {children}{" "}
      <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export function Solutions() {
  return (
    <>
      <section className="flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-center">
          <div className="mx-auto max-w-[390px] text-center reveal md:text-left">
            <StretchText
              as="h1"
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[{ text: "Where continuous blood pressure could be used." }]}
            />
            <p className="mx-auto mt-5 max-w-[340px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
              Solutions are the clinical settings and workflows. Clinical Evidence is the proof and
              data.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
              <DemoButton />
              <Link
                to="/clinical-evidence"
                className="group inline-flex items-center justify-center rounded-full border border-[color:var(--line)] px-6 py-4 text-sm font-semibold tracking-normal text-[color:var(--paper)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                See the evidence{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="reveal rounded-[32px] bg-[color:var(--ink-2)] p-4 shadow-[0_20px_60px_rgba(43,43,43,0.08)]">
            <VisualPlaceholder
              label="Hospital monitoring concept"
              className="!min-h-0 h-56 p-5 text-xs md:h-72"
            />
          </div>
        </div>
      </section>

      {solutionGroups.map((group, groupIndex) => (
        <section
          key={group.title}
          className={`flex min-h-screen items-center overflow-hidden py-16 md:py-20 hairline-b ${
            groupIndex % 2 === 0 ? "bg-[color:var(--ink-2)]" : "bg-[color:var(--ink)]"
          }`}
        >
          <div className="container-x">
            <div className="mx-auto max-w-[500px] text-center reveal">
              <StretchText
                as="h2"
                className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
                segments={[{ text: group.title }]}
              />
              <p className="mx-auto mt-5 max-w-[420px] text-xs leading-relaxed text-[color:var(--paper)]">
                {group.body}
              </p>
            </div>
            <div className="mx-auto mt-10 grid gap-5 md:grid-cols-2">
              {group.cards.map((card) => (
                <TiltCard
                  as={Link}
                  key={card.title}
                  to={card.href}
                  className={`group reveal rounded-[32px] p-7 shadow-[0_14px_44px_rgba(43,43,43,0.05)] transition hover:bg-[color:var(--accent-soft)] md:p-8 ${
                    groupIndex % 2 === 0 ? "bg-[color:var(--ink)]" : "bg-[color:var(--ink-2)]"
                  }`}
                >
                  <div className="text-xs font-semibold tracking-normal text-[color:var(--mute)]">
                    {card.eyebrow}
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold leading-tight tracking-tight text-[color:var(--paper)] group-hover:text-[color:var(--accent)]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-xs leading-relaxed text-[color:var(--paper)]">
                    {card.body}
                  </p>
                  <div className="mt-6 text-xs font-semibold tracking-normal text-[color:var(--paper)] transition group-hover:text-[color:var(--accent)]">
                    Explore{" "}
                    <span
                      aria-hidden
                      className="inline-block transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-[560px] text-center reveal">
            <StretchText
              as="h2"
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[{ text: "See it in your setting" }]}
            />
            <p className="mx-auto mt-5 max-w-[420px] text-xs leading-relaxed text-[color:var(--paper)]">
              Talk with the team about where continuous blood pressure could fit your workflow.
            </p>
            <div className="mt-8">
              <DemoButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
