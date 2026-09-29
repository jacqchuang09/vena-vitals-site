import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Bluetooth, Check, Clock, HeartPulse, MoveDown, ScanLine, Target } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { IPadFrame } from "./IPadFrame";
import { StretchText } from "./StretchText";
import { SurgeryComparison } from "./SurgeryComparison";
import { useCountUp } from "./lib";

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

const audiences = [
  {
    tag: "For Clinicians",
    title: "Anesthesiology & Critical Care",
    body: "Continuous, non-invasive BP monitoring for the OR and ICU. See the clinical data, waveform accuracy, and use cases.",
    to: "/solutions/anesthesiology",
    label: "View Clinical Data",
    image: "/assets/home/veritrack-or-foot.jpg",
    imageAlt:
      "The VeriTrack wrap on a patient's foot, draped and positioned clear of the surgical field in an operating room",
    mediaPos: "bottom" as const,
  },
  {
    tag: "For Researchers",
    title: "Sleep Medicine",
    body: "Studying autonomic response, sleep-disordered breathing, or nocturnal hypertension? VeriTrack enables beat-to-beat BP monitoring outside the hospital.",
    to: "/solutions/sleep-medicine",
    label: "Explore Sleep Research",
    image: "/assets/home/veritrack-home-foot.jpg",
    imageAlt:
      "The VeriTrack wrap worn on a foot resting on a sofa at home, with a blanket and a side table in the background",
    mediaPos: "top" as const,
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

const problemStats = [
  {
    icon: Clock,
    method: "Cuff",
    stats: [
      { v: "3-5 min", l: "between each reading" },
      { v: null, l: "Misses events between readings" },
    ],
  },
];

export function HomeProblem() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-[0.86fr_1.14fr] md:items-center">
          <div className="mx-auto max-w-[420px] text-center reveal md:mx-0 md:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Problem &amp; Solution
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Blood pressure insights every second, " },
                { text: "not intermittently.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[400px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
              The standard cuff reads every 3 to 5 minutes. Between readings, a patient can lose
              significant blood volume or undergo a dangerous pressure drop that goes undetected
              until the next cycle. The alternative, arterial line cannulation, provides continuous,
              beat-to-beat data but comes with significant risks and delays.
            </p>
            <div className="mx-auto mt-6 grid max-w-[400px] gap-4 md:mx-0">
              {problemStats.map((card) => {
                const Icon = card.icon;
                return (
                  <TiltCard
                    key={card.method}
                    className="rounded-[26px] bg-[color:var(--ink)] p-5 text-left shadow-[0_14px_44px_rgba(43,43,43,0.05)] md:p-6"
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={15} className="text-[color:var(--accent)]" aria-hidden />
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--paper)]">
                        {card.method}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
                      {card.stats.map((s, i) => (
                        <div key={i} className="min-w-[90px]">
                          {s.v ? (
                            <div className="font-display text-lg font-bold leading-none text-[color:var(--accent)] md:text-xl">
                              {s.v}
                            </div>
                          ) : null}
                          <div className="mt-1 max-w-[130px] text-[10.5px] leading-snug text-[color:var(--mute)]">
                            {s.l}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>

          {/* Right-aligned in its column so the frame sits against the section edge. */}
          <div className="reveal mx-auto w-full max-w-[520px] md:ml-auto md:mr-0">
            <IPadFrame>
              <video
                src="/assets/home/veritrack-app.mp4"
                poster="/assets/home/veritrack-app-poster.jpg"
                className="block aspect-[1280/894] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="The VeriTrack app on a bedside iPad, showing a live arterial waveform with systolic, diastolic and mean pressure"
              />
            </IPadFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

const overviewPoints = [
  {
    icon: HeartPulse,
    title: "Beat-to-beat resolution",
    body: "Every heartbeat, not every few minutes. Continuous trends instead of waiting between intermittent cuff readings, so pressure drops are visible as they happen, not after the next cycle.",
  },
  {
    icon: Check,
    title: "Non-invasive placement",
    body: "No cannulation, no infection risk. Wrapped on in seconds and removed cleanly after the case. No arterial access, no line-care burden, no procedural delay.",
  },
  {
    icon: Target,
    title: "Wireless",
    body: "A soft wrap on the foot, with the sensor streaming over Bluetooth to the bedside iPad. Nothing tethering the patient to the monitor, no occupied arm, no catheter, and entirely out of the surgical field.",
  },
];

export function HomeOverview() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
      <div className="container-x grid gap-8 md:grid-cols-[1.14fr_0.86fr] md:items-center">
        <div className="reveal order-last md:order-first">
          <div className="mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-full bg-[color:var(--ink-2)] shadow-[0_30px_70px_-28px_rgba(43,43,43,0.5)] ring-1 ring-[color:var(--line)] md:max-w-[460px]">
            <video
              src="/assets/home/veritrack-placement-circle.mp4"
              poster="/assets/home/veritrack-placement-circle.jpg"
              className="block h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="The VeriTrack wrap being fastened onto a patient's foot"
            />
          </div>
        </div>

        <div className="mx-auto max-w-[440px] text-center reveal md:mx-0 md:text-left">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            The Solution
          </div>
          <StretchText
            as="h2"
            className="mt-3 font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            segments={[
              { text: "VeriTrack advances continuous " },
              { text: "beat-to-beat", className: "whitespace-nowrap text-[color:var(--accent)]" },
              { text: " blood pressure monitoring." },
            ]}
          />
          <p className="mx-auto mt-5 max-w-[420px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
            VeriTrack is a soft, wireless wearable that wraps around the foot. Its sensor seats over
            the dorsalis pedis artery and measures blood pressure with every heartbeat, delivering
            the continuous hemodynamic visibility of an arterial line without the procedural risk,
            placement delay, or invasive cannulation.
          </p>
          <div className="mx-auto mt-6 grid max-w-[440px] gap-4 text-left md:mx-0">
            {overviewPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
                    <Icon size={13} aria-hidden />
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-[color:var(--paper)]">
                      {point.title}
                    </div>
                    <div className="mt-0.5 text-[11px] leading-relaxed text-[color:var(--mute)]">
                      {point.body}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-7 text-center md:text-left">
            <Link
              to="/technology"
              className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--paper)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
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
      </div>
    </section>
  );
}

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
                className="reveal rounded-[30px] bg-white p-6 text-center"
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

const evidenceStats = [
  { from: 0, to: 600, suffix: "+", label: "subjects tested" },
  { from: 0, to: 6, suffix: "+", linear: true, label: "study sites" },
  { from: 18, to: 89, prefix: "18-", label: "ages · BMI 17-48" },
  { from: 30, to: 300, prefix: "30-", label: "mmHg BP range" },
];

// Number that counts up from `from` to `to` when it scrolls into view.
function CountStat({
  from = 0,
  to,
  prefix = "",
  suffix = "",
  linear = false,
  label,
}: {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  linear?: boolean;
  label: string;
}) {
  const { ref, value } = useCountUp(to - from, { linear });
  return (
    <div>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="font-display text-[clamp(20px,2.6vw,36px)] font-bold leading-none tabular-nums text-[color:var(--accent)]"
      >
        {prefix}
        {Math.round(from + value)}
        {suffix}
      </div>
      <div className="mt-2 text-[10px] font-medium leading-snug text-[color:var(--paper)] md:text-xs">
        {label}
      </div>
    </div>
  );
}

export function HomeEvidenceStrip() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[color:var(--ink-2)] py-6 md:py-20 hairline-b">
      <div className="container-x w-full">
        <div className="grid grid-cols-[0.42fr_1.58fr] items-center gap-4 md:grid-cols-[0.58fr_1.42fr] md:gap-8">
          <div className="mx-auto max-w-[250px] text-left reveal md:max-w-[360px]">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)] md:mb-3 md:text-[11px]">
              Clinical Testing
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(20px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Evaluated where it matters: " },
                { text: "the operating room.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mt-3 max-w-[260px] text-[10px] leading-relaxed text-[color:var(--paper)] md:mt-4 md:max-w-[330px] md:text-xs">
              The investigational device tracked rapid blood pressure changes beat for beat in
              side-by-side operating room comparisons against the arterial line.
            </p>
            <Link
              to="/solutions/anesthesiology"
              className="group mt-4 inline-flex items-center gap-2 bg-[color:var(--paper)] px-4 py-2.5 text-[10px] font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)] md:mt-8 md:gap-3 md:px-6 md:py-4 md:text-xs"
            >
              See the full data{" "}
              <span
                aria-hidden
                className="inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
          <TiltCard
            max={4}
            lift={4}
            className="reveal rounded-[28px] bg-[color:var(--ink)] p-3 shadow-[0_24px_80px_rgba(43,43,43,0.055)] md:rounded-[34px] md:p-5"
          >
            <div className="rounded-[22px] bg-white p-3 md:rounded-[26px] md:p-4">
              <SurgeryComparison />
            </div>
            <p className="mt-2.5 text-[9px] leading-relaxed text-[color:var(--mute)] md:mt-3 md:text-[10px]">
              59 year old subject undergoing abdominal mass removal.
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-[10px] md:mt-3 md:gap-3 md:text-xs">
              <span className="flex items-center gap-2 rounded-full bg-[color:var(--ink-2)] px-3 py-1.5 text-[color:var(--mute)]">
                <span className="h-2 w-2 rounded-full bg-[#1f6fb2]" /> Arterial line
              </span>
              <span className="flex items-center gap-2 rounded-full bg-[color:var(--ink-2)] px-3 py-1.5 text-[color:var(--paper)]">
                <span className="h-2 w-2 rounded-full bg-[#1f6fb2]" /> Vena Vitals
              </span>
            </div>
          </TiltCard>
        </div>

        <div className="reveal mt-10 grid grid-cols-2 gap-x-6 gap-y-8 text-center md:mt-14 md:grid-cols-4 md:gap-8">
          {evidenceStats.map((s) => (
            <CountStat key={s.label} {...s} />
          ))}
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

export function HomeAudienceCards() {
  return (
    <section className="flex min-h-screen items-center bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
      <div className="container-x">
        <div className="mx-auto max-w-[460px] text-center reveal">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            Areas of Investigation
          </div>
          <StretchText
            as="h2"
            className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            segments={[
              { text: "From the OR to " },
              { text: "the bedside.", className: "text-[color:var(--accent)]" },
            ]}
          />
        </div>
        <div className="mx-auto mt-10 grid max-w-[860px] items-stretch gap-5 md:grid-cols-2">
          {audiences.map((audience) => {
            const media = (
              <div
                className={`overflow-hidden rounded-[22px] bg-black ${
                  audience.mediaPos === "bottom" ? "mt-6" : "mb-6"
                }`}
              >
                <img
                  src={audience.image}
                  alt={audience.imageAlt}
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                />
              </div>
            );
            return (
              <TiltCard
                as={Link}
                key={audience.title}
                to={audience.to}
                className="group reveal flex flex-col rounded-[32px] bg-[color:var(--ink-2)] p-7 transition hover:bg-[color:var(--accent-soft)] md:p-9"
              >
                {audience.mediaPos === "top" && media}
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                  {audience.tag}
                </div>
                <h3 className="mt-2 max-w-[300px] font-display text-base leading-tight tracking-tight text-[color:var(--paper)] group-hover:text-[color:var(--accent)]">
                  {audience.title}
                </h3>
                <p className="mt-4 max-w-[330px] text-xs leading-relaxed text-[color:var(--paper)]">
                  {audience.body}
                </p>
                <div className="mt-5 text-xs font-semibold tracking-normal text-[color:var(--accent)]">
                  {audience.label}{" "}
                  <span
                    aria-hidden
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
                {audience.mediaPos === "bottom" && <div className="mt-auto">{media}</div>}
              </TiltCard>
            );
          })}
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
                className="flex min-h-28 items-center justify-center rounded-[28px] bg-[color:var(--ink)] px-5 text-center text-xs font-semibold tracking-normal text-[color:var(--paper)]"
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

export function HomeFinalCta() {
  return (
    <section className="flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-24">
      <div className="container-x relative">
        <div className="mx-auto max-w-[560px] text-center reveal">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            Get Started
          </div>
          <h2 className="section-heading mt-3 text-[color:var(--paper)]">
            Evaluating continuous blood pressure for{" "}
            <span className="text-[color:var(--accent)]">your facility?</span>
          </h2>
        </div>
        <div className="reveal mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-[color:var(--paper)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
          >
            Request a Demo{" "}
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            to="/partner-with-us"
            className="group inline-flex items-center gap-3 border border-[color:var(--line)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--paper)] transition hover:border-[color:var(--line)] hover:bg-[color:var(--line)]"
          >
            Partner With Us{" "}
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
