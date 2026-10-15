import { Link } from "@tanstack/react-router";
import { StretchText } from "@/components/shared/StretchText";

// The team. Titles are taken verbatim from Vēna's own decks
// (VenaVitals_intro_materials.pptx and VenaVitals_background-510k.pptx), where
// all six appear identically.
//
// Bios are the gap. Only Ray Liu has sourced biography content — the bullets
// below are verbatim from intro_materials slide 8. Nobody else has written bio
// text in the company Drive, so their `bio` is null and the card renders a
// "Biography to confirm" state rather than inventing one.
//
// [EDIT NEEDED: biographies for Michelle Khine, Josh Kim, Jared Olivo, Sophia
// Lin, and Eugene Lee.]
// [EDIT NEEDED: "Head of Mech E" is deck shorthand — confirm "Head of
// Mechanical Engineering" is the right public title for Jared Olivo.]
// [EDIT NEEDED: source decks title Michelle Khine "Scientific Advisor
// Co-Founder", which is narrower than the "Co-founder" used here, and name Josh
// Kim as "Joshua Kim". Confirm which form should be public.]
// Shape mirrors the advisor cards on the Clinical Evidence page: `role` is the
// eyebrow, `title` the affiliation line under the name, `bio` the body, `url`
// the "View profile" link. `title` and `url` are null for everyone until the
// team supplies them — the dialog omits those rows rather than inventing them.
// [EDIT NEEDED: affiliation/title lines and profile URLs (LinkedIn or
// equivalent) for all six team members.]
type Member = {
  name: string;
  role: string;
  img: string;
  title: string | null;
  bio: string | null;
  url: string | null;
};

const team: Member[] = [
  {
    name: "Ray Liu",
    role: "CEO & Co-founder",
    img: "/assets/team/ray.jpg",
    title: null,
    url: null,
    bio: "Two health tech exits, to Cigna and Vizient, across 20+ years in devices and digital health. Launched GE's patient monitoring products and developed Cigna's digital health solution, and set up the QMS for GE's ultrasound factory in China, which passed FDA inspections. MBA, Harvard Business School.",
  },
  {
    name: "Michelle Khine",
    role: "Co-founder",
    img: "/assets/team/michelle.jpg",
    title: null,
    url: null,
    bio: null,
  },
  {
    name: "Josh Kim",
    role: "Co-founder & CTO",
    img: "/assets/team/josh.jpg",
    title: null,
    url: null,
    bio: null,
  },
  {
    name: "Sophia Lin, PhD",
    role: "Head of Clinical Affairs",
    img: "/assets/team/sophia.jpg",
    title: null,
    url: null,
    bio: null,
  },
  {
    name: "Eugene Lee, PhD",
    role: "Head of Data Science",
    img: "/assets/team/eugene.jpg",
    title: null,
    url: null,
    bio: null,
  },
  {
    name: "Jared Olivo",
    role: "Head of Mechanical Engineering",
    img: "/assets/team/jared.jpg",
    title: null,
    url: null,
    bio: null,
  },
];

// All six at once. This used to be three collapsible groups — Founders, The
// team, Clinical advisory board — with Founders open on load, which hid most
// of the people behind a click and listed the founders twice.

// Candid company moments for the rotating scroll. [VERIFY] captions with the
// Vena Vitals team before launch.
const moments = [
  { src: "/assets/about/team/team-3.jpg", caption: "In the operating room" },
  { src: "/assets/about/team/pitch-2023.jpg", caption: "Pitch. Launch. Grow. 2023" },
  { src: "/assets/about/team/team-2.jpg", caption: "Scrubbed in on a study day" },
  { src: "/assets/about/team/footgolf.jpg", caption: "Team footgolf, off the clock" },
];

export function About() {
  return (
    <>
      {/* Opening statement. This used to be the team photo under a dark
          gradient with white type over it; it is now type on the page's own
          white, so Company and Mission can sit under the headline and read as
          one statement. The photo is still at
          /assets/about/team/team-hero.jpg if it is wanted back. */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x relative">
          <div className="mx-auto max-w-[680px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
              About us
            </div>
            <StretchText
              as="h1"
              className="font-display text-[clamp(28px,3.4vw,48px)] font-bold leading-[1.05] tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Data-driven insights for " },
                { text: "better health monitoring.", className: "text-[color:var(--accent)]" },
              ]}
            />

            {/* One statement rather than labelled Company and Mission columns.
                Centred under the headline at the hero's own measure. */}
            <p className="mx-auto mt-8 max-w-[600px] text-xs leading-relaxed text-[color:var(--paper)] md:mt-10 md:text-[13px]">
              Vena Vitals is a data-driven digital health company focused on advancing continuous
              health monitoring. Our technologies are grounded in science and supported by clinical
              research. We believe better access to continuous monitoring can help create a more
              complete understanding of health and support better care for more people. Our mission
              is to transform physiological data into actionable, personalized insights that enable
              early detection, proactive care, and more effective management of health conditions.
            </p>
          </div>
        </div>
      </section>

      {/* "Our story" — hidden for now at the team's request. The section is
          intact in StorySection() above; restore by uncommenting this line. */}
      {/* <StorySection /> */}

      {/* People. One section, one flat grid of everyone. */}
      {/* Off-white against the white opening statement above it. With "Our
          story" hidden the two would otherwise run together as one block. */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
        <div className="container-x grid gap-10 md:grid-cols-[0.52fr_1.48fr] md:items-center">
          <div className="mx-auto max-w-[390px] text-center reveal md:mx-0 md:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Core team
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "The team behind " },
                { text: "VeriTrack.", className: "text-[color:var(--accent)]" },
              ]}
            />
          </div>

          <div className="min-w-0">
            <div className="reveal grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {team.map((p) => (
                <div key={p.name} className="flex flex-col items-center text-center">
                  <span className="relative block aspect-square w-20 overflow-hidden rounded-full bg-[color:var(--ink)] shadow-[0_10px_30px_-12px_rgba(43,43,43,0.3)] ring-1 ring-[color:var(--line)] sm:w-24 md:w-28">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </span>
                  <div className="mt-4 font-display text-sm font-bold leading-tight tracking-tight text-[color:var(--paper)]">
                    {p.name}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug text-[color:var(--paper)]/60">
                    {p.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* "Inside the company" — the moments marquee. Hidden for now at the
          team's request; kept in place rather than deleted. Remove the
          `hidden` to bring it back. */}
      <section className="relative hidden min-h-screen flex-col justify-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x">
          <div className="mx-auto max-w-[520px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Inside the company
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Life at " },
                { text: "Vēna Vitals.", className: "text-[color:var(--accent)]" },
              ]}
            />
          </div>
        </div>

        {/* Rotating scroll of company moments. Clip only on X (for the marquee)
            so the hovered card's lift + shadow are never cut off vertically. */}
        <div className="reveal group relative mt-12 w-full py-10 [overflow:clip_visible] md:mt-14">
          <div className="flex w-max gap-6 pr-6 [animation:marquee-x_50s_linear_infinite] motion-reduce:[animation:none]">
            {[...moments, ...moments].map((m, i) => (
              <figure key={i} className="moment-card group/card w-[280px] shrink-0 md:w-[400px]">
                <div className="overflow-hidden rounded-none bg-[color:var(--ink-2)] shadow-[0_1px_2px_rgba(43,43,43,0.05)] transition-shadow duration-300 group-hover/card:shadow-[0_30px_66px_-24px_rgba(43,43,43,0.5)]">
                  <img
                    src={m.src}
                    alt={m.caption}
                    className="h-52 w-full object-cover md:h-[300px]"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-4 px-1 text-xs font-semibold leading-snug text-[color:var(--accent)] md:text-[13px]">
                  {m.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[color:var(--ink)] to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[color:var(--ink)] to-transparent md:w-32" />
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-[560px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Careers
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Work " },
                { text: "with us.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[440px] text-xs leading-relaxed text-[color:var(--paper)]">
              We are a multidisciplinary team building clinical-grade wearables. If that is your
              kind of problem, we would like to meet you.
            </p>
            {/* One way out: there is no open-roles listing to point at, and
                the demo request lives on the partner page's form. */}
            <div className="mt-10 flex justify-center">
              <Link
                to="/partner-with-us"
                className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--paper)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
              >
                Contact us{" "}
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
