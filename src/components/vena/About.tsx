import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { StretchText } from "./StretchText";
import { HomeVideo } from "./HomeSections";

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

// Company timeline. [VERIFY] the backing, hospital-site, and 510(k) details with
// the Vena Vitals team before launch; markers other than 2019 are narrative
// stages rather than confirmed dates.
const milestones = [
  {
    marker: "2019",
    title: "Founded at UC Irvine",
    desc: "Vēna Vitals spins out of Michelle Khine's lab to close the gap between the blood-pressure cuff and the invasive arterial line.",
  },
  {
    marker: "Science",
    title: "Peer-reviewed foundation",
    desc: "Grounded in soft wearable pressure-sensing research published in Advanced Healthcare Materials (Kim et al., 2019).",
  },
  {
    marker: "Backing",
    title: "Accelerators & grants",
    desc: "Selected by Y Combinator and MedTech Innovator, with support from EvoNexus, NIH, and NSF.",
  },
  {
    marker: "Clinic",
    title: "Into the operating room",
    desc: "VeriTrack is tested head-to-head against the radial arterial line in OR patients under general anesthesia.",
  },
  {
    marker: "Scale",
    title: "6+ hospital sites",
    desc: "Validation expands across academic and community hospitals, from UC Irvine to UCSF and beyond.",
  },
  {
    marker: "510(k)",
    title: "FDA submission",
    desc: "Regulatory submission for the continuous, noninvasive blood-pressure monitoring system.",
  },
  {
    marker: "Next",
    title: "Pilots & new settings",
    desc: "Advancing toward pilot deployments and continuous monitoring beyond the operating room.",
  },
];

// Candid company moments for the rotating scroll. [VERIFY] captions with the
// Vena Vitals team before launch.
const moments = [
  { src: "/assets/about/team/team-3.jpg", caption: "In the operating room" },
  { src: "/assets/about/team/pitch-2023.jpg", caption: "Pitch. Launch. Grow. 2023" },
  { src: "/assets/about/team/team-2.jpg", caption: "Scrubbed in on a study day" },
  { src: "/assets/about/team/footgolf.jpg", caption: "Team footgolf, off the clock" },
];

// Our-story section. The section stays one viewport tall and pins while the
// timeline travels inside a fixed window on the right — scrolling reads as
// moving down the timeline rather than scrolling the page past it. Each
// milestone pops up as it rises into the window.
//
// Keeping the whole thing inside a pinned, viewport-height frame also preserves
// the site-wide rule that no section is taller than the screen.
const TIMELINE_SCROLL_VH = 520; // scroll budget on top of the pinned viewport

function StorySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Also treat phones as "static": scroll-jacking a pinned window is poor UX
    // on touch, and the pinned layout doesn't fit a narrow single column.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    let lastTime = 0;
    let current = 0;
    let target = 0;
    let primed = false;

    const readTarget = () => {
      const track = trackRef.current;
      if (!track) return null;
      const distance = track.offsetHeight - window.innerHeight;
      if (distance <= 0) return null;
      const scrolled = -track.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, scrolled / distance));
    };

    const paint = (p: number) => {
      const list = listRef.current;
      const win = windowRef.current;
      if (!list || !win) return;
      const winH = win.clientHeight;
      const q = p;
      // How far the list can travel before its last entry reaches the window.
      // The list's leading and trailing pads are equal, so the run-in and the
      // run-out are the same length of empty rail and take the same scrolling —
      // the ease at the top is mirrored at the bottom, and the snap stop at the
      // track's end holds you there afterwards.
      const travel = Math.max(0, list.scrollHeight - winH);
      const offset = q * travel;
      list.style.transform = `translate3d(0,${-offset.toFixed(2)}px,0)`;

      // Pop each entry in as it rises into the window. `offsetTop` is static
      // within the list, so its position inside the window is offsetTop - offset.
      // The ramp is deliberately short — an entry goes from absent to fully
      // present across ~12% of the window height, so it reads as arriving
      // rather than fading up from a ghost that was always sitting there.
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const top = el.offsetTop - offset;
        const o = Math.min(1, Math.max(0, (winH * 0.86 - top) / (winH * 0.12)));
        const eased = o * o * (3 - 2 * o);
        // Each side drifts in from its own edge, toward the rail.
        const dx = (1 - eased) * (i % 2 === 0 ? -20 : 20);
        const dy = (1 - eased) * 26;
        el.style.opacity = String(eased);
        el.style.transform = `translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0) scale(${(0.955 + 0.045 * eased).toFixed(3)})`;
      });

      if (fillRef.current) fillRef.current.style.transform = `scaleY(${q.toFixed(4)})`;
    };

    // Damped follow, so wheel and trackpad steps don't land as hard jumps.
    const SMOOTH = 0.2;
    const tick = (now: number) => {
      const dt = lastTime ? Math.min(64, now - lastTime) : 16.67;
      lastTime = now;
      const next = readTarget();
      if (next !== null) target = next;
      const k = 1 - Math.pow(1 - SMOOTH, dt / 16.67);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0002) current = target;
      paint(current);
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!primed || frame) return;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };

    const initial = readTarget();
    current = initial ?? 0;
    target = current;
    paint(current);
    primed = true;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  // Static mode (phone / reduced-motion): clear any inline transforms and
  // opacities the scroll loop wrote during the brief non-reduced first frame,
  // so entries render at their natural flow position and full opacity.
  useEffect(() => {
    if (!reduced) return;
    itemRefs.current.forEach((el) => {
      if (el) {
        el.style.opacity = "";
        el.style.transform = "";
      }
    });
    if (listRef.current) listRef.current.style.transform = "";
  }, [reduced]);

  return (
    <section className="relative bg-[color:var(--ink-2)] hairline-b">
      <div
        ref={trackRef}
        className="relative"
        style={reduced ? undefined : { height: `calc(100vh + ${TIMELINE_SCROLL_VH}vh)` }}
      >
        {/* Snap stop at the end of the track. The site snaps `main > section` at
            its start with scroll-snap-stop: always, which is what makes you
            scroll again to enter a section — but a section this tall has no snap
            point between its start and the next section 620vh later, so one hard
            flick could carry straight past the whole timeline. This marker sits
            exactly where the stage unpins (the timeline complete), forcing a stop
            there so leaving takes a second deliberate scroll, mirroring entry. */}
        {!reduced && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-px"
            style={{ bottom: "100vh", scrollSnapAlign: "start", scrollSnapStop: "always" }}
          />
        )}
        <div
          className={
            reduced
              ? "py-16 md:py-20"
              : "sticky top-0 flex h-screen items-center overflow-hidden pt-[var(--nav-h)] pb-10"
          }
        >
          <div className="container-x grid w-full gap-10 md:grid-cols-[0.74fr_1.26fr] md:items-center md:gap-16">
            <div className="mx-auto max-w-[400px] text-center reveal md:mx-0 md:text-left">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                Our story
              </div>
              <StretchText
                as="h2"
                className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
                segments={[
                  { text: "From a university lab to " },
                  { text: "the operating room.", className: "text-[color:var(--accent)]" },
                ]}
              />
              <p className="mt-5 max-w-[370px] text-xs leading-relaxed text-[color:var(--paper)] md:text-[13px]">
                Vēna Vitals began at UC Irvine, where Michelle Khine's lab developed a soft,
                stretchable material that captures highly sensitive data while moving like skin.
                Since 2019 the team has worked to close the gap between the cuff and the arterial
                line.
              </p>
            </div>

            {/* The window the timeline travels through. The rail runs down the
                centre of this column with entries alternating either side of it.
                Masked top and bottom so entries dissolve at the edges rather
                than being cut. */}
            <div className="reveal relative min-w-0">
              <div className="absolute bottom-0 left-[7px] top-0 w-px bg-[color:var(--line)] md:left-1/2 md:-translate-x-1/2" />
              <div
                ref={fillRef}
                // Static mode shows every entry at once, so the accent rail runs
                // full height; the scroll loop drives it otherwise.
                style={{ transform: reduced ? "scaleY(1)" : "scaleY(0)" }}
                className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-[color:var(--accent)] md:left-1/2 md:-translate-x-1/2"
              />
              <div
                ref={windowRef}
                className={
                  reduced
                    ? ""
                    : "h-[330px] overflow-hidden md:h-[400px] [mask-image:linear-gradient(to_bottom,transparent_0,#000_5%,#000_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0,#000_5%,#000_92%,transparent_100%)]"
                }
              >
                {/* Leading pad so the first entry starts below the frame and
                    pops in on scroll, rather than sitting there at rest. */}
                <ol
                  ref={listRef}
                  // Pads are equal top and bottom, and small enough that two
                  // entries are in frame at rest at both ends — the timeline
                  // opens on two events and finishes on two, rather than a lone
                  // entry marooned in empty rail.
                  className={`space-y-9 md:space-y-11 ${reduced ? "" : "pb-[26px] pt-[26px]"}`}
                >
                  {milestones.map((m, i) => (
                    <li
                      key={m.title}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      className="relative pl-10 md:grid md:grid-cols-2 md:gap-x-8 md:pl-0"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full bg-[color:var(--accent)] ring-4 ring-[color:var(--ink-2)] md:left-1/2 md:-translate-x-1/2"
                      />
                      {/* Odd entries sit left of the rail, even entries right. */}
                      <div
                        className={
                          i % 2 === 0
                            ? "md:col-start-1 md:pr-7 md:text-right"
                            : "md:col-start-2 md:pl-7"
                        }
                      >
                        <div className="font-display text-lg font-bold tracking-tight text-[color:var(--accent)]">
                          {m.marker}
                        </div>
                        <h3 className="mt-2 font-display text-sm font-bold leading-tight tracking-tight text-[color:var(--paper)] md:text-base">
                          {m.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-[color:var(--paper)]/70">
                          {m.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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

            <div className="mx-auto mt-12 grid max-w-[560px] gap-10 text-left md:mt-14 md:max-w-none md:grid-cols-2 md:gap-12">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                  Company
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[color:var(--paper)] md:text-[13px]">
                  Vena Vitals is a data-driven digital health company focused on advancing
                  continuous health monitoring. Our technologies are grounded in science and
                  supported by clinical research. We believe better access to continuous monitoring
                  can help create a more complete understanding of health and support better care
                  for more people.
                </p>
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                  Mission
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[color:var(--paper)] md:text-[13px]">
                  To transform physiological data into actionable, personalized insights that enable
                  early detection, proactive care, and more effective management of health
                  conditions.
                </p>
              </div>
            </div>
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

      {/* Same full-bleed company video used on the home page. */}
      <HomeVideo />

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20">
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
