// Sections taken off the About page on 15 Oct 2026 during the code cleanup.
// Nothing renders these. They are kept so they can be put back instead of
// rebuilt: copy the pieces you want into src/components/about/ and add the
// section to the page. See archive/README.md for the steps.
//
// The imports are the ones the original file had; some may be unused here.
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { StretchText } from "@/components/shared/StretchText";

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
