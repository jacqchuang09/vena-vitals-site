import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Clock, HeartPulse, Target } from "lucide-react";
import { TiltCard } from "@/components/shared/TiltCard";
import { IPadFrame } from "@/components/shared/IPadFrame";
import { StretchText } from "@/components/shared/StretchText";
import { SurgeryComparison } from "@/components/home/SurgeryComparison";
import { useCountUp } from "@/components/shared/lib";
import type home from "@content/home.json";

// Icon names used in content/home.json, mapped to their lucide components.
const icons = { Check, HeartPulse, Target } as const;

// Layout for each audience card, by position: where the photo sits and how it
// is cropped. The words and photos come from content/home.json.
const audienceLayout = [
  {
    mediaPos: "bottom" as const,
    // Already within a percent of the card's 16:9, so it sits centred.
    objectPos: "50% 50%",
  },
  {
    mediaPos: "top" as const,
    objectPos: "50% 50%",
  },
];

function VeriTrackIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      {/* Two arterial beats: systolic upstroke, fall, dicrotic bump, runoff. */}
      <path d="M4.5 12h1l2-5.5 1.5 5.5 1-2 2 2h1l2-5.5 1.5 5.5 1-2 2 2" />
    </svg>
  );
}

export function HomeProblem({ content }: { content: typeof home.problem }) {
  // The cuff and VeriTrack set against each other, a claim per row.
  const comparison = content.comparison;
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[0.86fr_1.14fr] md:items-center md:gap-8">
          <div className="mx-auto max-w-[420px] text-center reveal md:mx-0 md:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              {content.eyebrow}
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: content.title },
                { text: content.titleAccent, className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-4 max-w-[400px] text-xs leading-relaxed text-[color:var(--paper)] md:mt-5 md:mx-0">
              {content.body}
            </p>
            {/* Cuff against VeriTrack, two columns of the same card. No rule
                between them: the two headings and the colour carry the split. */}
            <TiltCard className="mx-auto mt-4 max-w-[430px] rounded-none bg-[color:var(--ink)] p-3.5 text-left shadow-[0_14px_44px_rgba(43,43,43,0.05)] md:mx-0 md:mt-6 md:p-6">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 md:gap-x-7 md:gap-y-4">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="shrink-0 text-[color:var(--mute)]" aria-hidden />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--mute)]">
                    {comparison.cuffLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <VeriTrackIcon className="shrink-0 text-[color:var(--accent)]" />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--accent)]">
                    {comparison.venaLabel}
                  </span>
                </div>

                {comparison.rows.map((row, i) => (
                  <Fragment key={i}>
                    <div
                      className={
                        i === 0
                          ? "font-display text-[13.5px] font-bold leading-tight tracking-tight text-[color:var(--paper)] md:text-base"
                          : "text-[10.5px] leading-snug text-[color:var(--mute)]"
                      }
                    >
                      {row.cuff}
                    </div>
                    <div
                      className={
                        i === 0
                          ? "font-display text-[13.5px] font-bold leading-tight tracking-tight text-[color:var(--accent)] md:text-base"
                          : "text-[10.5px] leading-snug text-[color:var(--paper)]"
                      }
                    >
                      {row.vena}
                    </div>
                  </Fragment>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* Right-aligned in its column so the frame sits against the section edge. */}
          <div className="reveal mx-auto w-full max-w-[520px] md:ml-auto md:mr-0">
            <IPadFrame>
              <video
                src={content.video}
                poster={content.poster}
                className="block h-full w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={content.alt}
              />
            </IPadFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeOverview({ content }: { content: typeof home.overview }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
      <div className="container-x grid gap-8 md:grid-cols-[1.14fr_0.86fr] md:items-center">
        <div className="reveal order-last md:order-first">
          <div className="mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-full bg-[color:var(--ink-2)] shadow-[0_30px_70px_-28px_rgba(43,43,43,0.5)] ring-1 ring-[color:var(--line)] md:max-w-[460px]">
            <video
              src={content.video}
              poster={content.poster}
              className="block h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={content.alt}
            />
          </div>
          <p className="mx-auto mt-3 max-w-[420px] text-center text-[10px] italic leading-relaxed text-[color:var(--mute)] md:max-w-[460px]">
            {content.footnote}
          </p>
        </div>

        <div className="mx-auto max-w-[440px] text-center reveal md:mx-0 md:text-left">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            {content.eyebrow}
          </div>
          <StretchText
            as="h2"
            className="mt-3 font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            segments={[
              { text: content.title },
              {
                text: content.titleAccent,
                className: "whitespace-nowrap text-[color:var(--accent)]",
              },
              { text: content.titleTail },
            ]}
          />
          <p className="mx-auto mt-5 max-w-[420px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
            {content.body}
          </p>
          <div className="mx-auto mt-6 grid max-w-[440px] gap-4 text-left md:mx-0">
            {content.points.map((point) => {
              const Icon = icons[point.icon as keyof typeof icons];
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
              to={content.href}
              className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--paper)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
            >
              {content.button}{" "}
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

export function HomeEvidenceStrip({ content }: { content: typeof home.evidence }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[color:var(--ink-2)] py-6 md:py-20 hairline-b">
      <div className="container-x w-full">
        {/* Two columns from md up. On a phone the chart is the wide element, so
            squeezing the copy into a 42% column beside it crushed the heading
            into the figure; it stacks under the text instead, like every other
            two-column section on this page. */}
        <div className="grid gap-6 md:grid-cols-[0.58fr_1.42fr] md:items-center md:gap-8">
          <div className="mx-auto max-w-[420px] text-left reveal md:max-w-[360px]">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              {content.eyebrow}
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(20px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: content.title },
                { text: content.titleAccent, className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mt-4 max-w-[400px] text-xs leading-relaxed text-[color:var(--paper)] md:mt-4 md:max-w-[330px]">
              {content.body}
            </p>
            <Link
              to={content.href}
              className="group mt-6 inline-flex items-center gap-2 bg-[color:var(--paper)] px-5 py-3 text-[11px] font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)] md:mt-8 md:gap-3 md:px-6 md:py-4 md:text-xs"
            >
              {content.button}{" "}
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
            className="reveal rounded-none bg-[color:var(--ink)] p-3 shadow-[0_24px_80px_rgba(43,43,43,0.055)] md:rounded-none md:p-5"
          >
            <div className="rounded-none bg-white p-3 md:rounded-none md:p-4">
              <SurgeryComparison labels={content.chart} />
            </div>
            <p className="mt-2.5 text-[9px] leading-relaxed text-[color:var(--mute)] md:mt-3 md:text-[10px]">
              {content.chart.caption}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-[10px] md:mt-3 md:gap-3 md:text-xs">
              <span className="flex items-center gap-2 rounded-full bg-[color:var(--ink-2)] px-3 py-1.5 text-[color:var(--mute)]">
                <span className="h-2 w-2 rounded-full bg-[#1f6fb2]" />
                {` ${content.chart.legendArterialLine}`}
              </span>
              <span className="flex items-center gap-2 rounded-full bg-[color:var(--ink-2)] px-3 py-1.5 text-[color:var(--paper)]">
                <span className="h-2 w-2 rounded-full bg-[#1f8c5a]" />
                {` ${content.chart.legendVena}`}
              </span>
            </div>
          </TiltCard>
        </div>

        {/* Five stats: two per row on phones with the odd last one centred
            across both columns, all five in one row from md up. */}
        <div className="reveal mt-10 grid grid-cols-2 gap-x-6 gap-y-8 text-center md:mt-14 md:grid-cols-5 md:gap-8 [&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:col-span-1">
          {content.stats.map((s) => (
            <CountStat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeAudienceCards({ content }: { content: typeof home.audiences }) {
  return (
    <section className="flex min-h-screen items-center bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
      <div className="container-x">
        <div className="mx-auto max-w-[460px] text-center reveal">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            {content.eyebrow}
          </div>
          <StretchText
            as="h2"
            className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            segments={[
              { text: content.title },
              { text: content.titleAccent, className: "text-[color:var(--accent)]" },
            ]}
          />
        </div>
        <div className="mx-auto mt-10 grid max-w-[860px] items-stretch gap-5 md:grid-cols-2">
          {content.cards.map((audience, i) => {
            const layout = audienceLayout[i % audienceLayout.length];
            const media = (
              <div
                className={`overflow-hidden rounded-none bg-black ${
                  layout.mediaPos === "bottom" ? "mt-6" : "mb-6"
                }`}
              >
                <img
                  src={audience.image}
                  alt={audience.alt}
                  className="aspect-video w-full object-cover"
                  style={{ objectPosition: layout.objectPos }}
                  loading="lazy"
                />
              </div>
            );
            return (
              <TiltCard
                as={Link}
                key={audience.title}
                to={audience.href}
                className="group reveal flex flex-col rounded-none bg-[color:var(--ink-2)] p-7 transition hover:bg-[color:var(--accent-soft)] md:p-9"
              >
                {layout.mediaPos === "top" && media}
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                  {audience.eyebrow}
                </div>
                <h3 className="mt-2 max-w-[300px] font-display text-base leading-tight tracking-tight text-[color:var(--paper)] group-hover:text-[color:var(--accent)]">
                  {audience.title}
                </h3>
                <p className="mt-4 max-w-[330px] text-xs leading-relaxed text-[color:var(--paper)]">
                  {audience.body}
                </p>
                <div className="mt-5 text-xs font-semibold tracking-normal text-[color:var(--accent)]">
                  {audience.button}{" "}
                  <span
                    aria-hidden
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
                {layout.mediaPos === "bottom" && <div className="mt-auto">{media}</div>}
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeFinalCta({ content }: { content: typeof home.finalCta }) {
  return (
    <section className="flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-24">
      <div className="container-x relative">
        <div className="mx-auto max-w-[560px] text-center reveal">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            {content.eyebrow}
          </div>
          <h2 className="section-heading mt-3 text-[color:var(--paper)]">
            {content.title}{" "}
            <span className="text-[color:var(--accent)]">{content.titleAccent}</span>
          </h2>
        </div>
        {/* One route out of this section now: the demo request lives on the
            partner page's form, so a second button sent people two ways. */}
        <div className="reveal mt-10 flex justify-center">
          <Link
            to={content.href}
            className="group inline-flex items-center gap-3 bg-[color:var(--paper)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
          >
            {content.button}{" "}
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
