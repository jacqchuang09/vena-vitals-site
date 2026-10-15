// Sections taken off the Home page on 15 Oct 2026 during the code cleanup.
// Nothing renders these. They are kept so they can be put back instead of
// rebuilt: copy the pieces you want into src/components/home/ and add the
// section to the page. See archive/README.md for the steps.
//
// The imports are the ones the original file had; some may be unused here.
import { Fragment, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Bluetooth, Check, Clock, HeartPulse, MoveDown, ScanLine, Target } from "lucide-react";
import { TiltCard } from "@/components/shared/TiltCard";
import { IPadFrame } from "@/components/shared/IPadFrame";
import { StretchText } from "@/components/shared/StretchText";
import { SurgeryComparison } from "@/components/home/SurgeryComparison";
import { useCountUp } from "@/components/shared/lib";

const howSteps = [
  {
    icon: MoveDown,
    title: "Apply",
    body: "The soft wrap fits around the foot, seating the sensor over the dorsalis pedis artery.",
  },
  {
    icon: ScanLine,
    title: "Sense",
    body: "A capacitive sensor reads arterial pulse motion beat to beat.",
  },
  {
    icon: Bluetooth,
    title: "Stream",
    body: "The sensor streams blood pressure trends over Bluetooth to the bedside iPad.",
  },
];

const backers = [
  { name: "Y Combinator", href: "https://www.ycombinator.com/" },
  { name: "MedTech Innovator", href: "https://medtechinnovator.org/" },
  { name: "EvoNexus", href: "https://evonexus.org/" },
  { name: "National Institutes of Health", href: "https://www.nih.gov/" },
  { name: "National Science Foundation", href: "https://www.nsf.gov/" },
  { name: "UC Irvine", href: "https://www.uci.edu/" },
];

/**
 * Monitor with an arterial trace on it, drawn to sit beside the lucide icons:
 * same 24 grid, same 2px stroke, same round caps. Lucide has a monitor and it
 * has a heart rate line, but not the two together, which is the thing this
 * card is actually about.
 */

export function HomeSolution() {
  return (
    <section className="flex min-h-screen items-center bg-[color:var(--ink-2)] py-10 md:py-20 hairline-b">
      <div className="container-x">
        <div className="mx-auto max-w-[520px] text-center reveal">
          <StretchText
            as="h2"
            className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            segments={[{ text: "Three steps, plain and simple." }]}
          />
        </div>

        <div className="mx-auto mt-9 grid max-w-[900px] gap-4 md:grid-cols-3">
          {howSteps.map((step) => {
            const Icon = step.icon;
            return (
              <TiltCard
                as="article"
                key={step.title}
                className="reveal rounded-none bg-white p-6 text-center"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
                  <Icon size={18} aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-base font-bold tracking-tight text-[color:var(--paper)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[color:var(--mute)]">{step.body}</p>
              </TiltCard>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/technology"
            className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] px-5 py-3 text-xs font-semibold tracking-normal text-[color:var(--paper)] transition hover:border-[color:var(--accent)]"
          >
            Explore the technology{" "}
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Full-bleed company video. Named HomeVideo for historical reasons — it now
// renders on the About page only, ahead of the careers CTA.
export function HomeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play when the section scrolls into view, pause when it leaves. Starts muted
  // because browsers block autoplay with sound — controls stay on so the viewer
  // can unmute. Once they interact (unmute/scrub) we stop auto-pausing so we
  // don't fight the user.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let userEngaged = false;
    const markEngaged = () => {
      userEngaged = true;
    };
    video.addEventListener("volumechange", markEngaged);
    video.addEventListener("seeking", markEngaged);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else if (!userEngaged) {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(video);
    return () => {
      io.disconnect();
      video.removeEventListener("volumechange", markEngaged);
      video.removeEventListener("seeking", markEngaged);
    };
  }, []);

  return (
    // The video fills the whole viewport and the headline sits over it, bottom
    // left. No container, no frame.
    <section className="relative flex min-h-screen items-end overflow-hidden bg-black hairline-b">
      <video
        ref={videoRef}
        src="/assets/home/meet-vena.mp4"
        poster="/assets/home/meet-vena-poster.jpg"
        controls
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Scrim only along the bottom, so the type stays legible without
          dimming the whole frame. pointer-events-none keeps the video's own
          controls clickable underneath it. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="container-x relative pb-24 md:pb-28">
        <div className="max-w-[560px] reveal">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            Watch
          </div>
          <StretchText
            as="h2"
            className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-white"
            segments={[
              { text: "A closer look at " },
              { text: "the work.", className: "text-[color:var(--accent)]" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export function HomeBackedBy() {
  return (
    <section className="bg-[color:var(--ink-2)] py-32 hairline-b">
      <div className="container-x">
        <div className="reveal grid gap-10 lg:grid-cols-[220px_1fr] lg:items-center">
          <div className="text-center lg:text-left">
            <p className="text-xs leading-relaxed text-[color:var(--paper)]">
              Confirm logo permissions before public launch.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
            {backers.map((backer) => (
              <TiltCard
                as="a"
                key={backer.name}
                href={backer.href}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-28 items-center justify-center rounded-none bg-[color:var(--ink)] px-5 text-center text-xs font-semibold tracking-normal text-[color:var(--paper)]"
              >
                {backer.name}
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
