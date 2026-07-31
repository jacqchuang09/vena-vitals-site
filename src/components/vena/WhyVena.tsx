import { Link } from "@tanstack/react-router";
import { useCountUp, VisualPlaceholder } from "./lib";
import { TiltCard } from "./TiltCard";

type Stat = {
  target: number;
  prefix?: string;
  suffix?: string;
  l: string;
};

const stats: Stat[] = [
  { target: 1000, suffix: "+", l: "blood pressure pulse events captured each hour" },
  { target: 3, prefix: "<", suffix: " mmHg", l: "Mean error in validation studies" },
  { target: 24, suffix: "/7", l: "Skin-worn comfort, day and night" },
  { target: 0, l: "Cuff inflations during monitoring" },
];

function StatNumber({ target, prefix = "", suffix = "" }: Stat) {
  const { ref, value } = useCountUp(target);
  const compactUnit = suffix.trim() === "mmHg";
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="stat-num flex min-w-0 flex-wrap items-baseline gap-x-2 tabular-nums text-[color:var(--accent)]"
    >
      <span className="whitespace-nowrap">
        {prefix}
        {value.toLocaleString()}
        {!compactUnit ? suffix : ""}
      </span>
      {compactUnit ? (
        <span className="text-[0.34em] tracking-[0.08em] text-[color:var(--accent)]/85">
          {suffix.trim()}
        </span>
      ) : null}
    </div>
  );
}

const capabilities = [
  {
    n: "01",
    t: "Continuous blood pressure trends",
    d: "Systolic, diastolic, mean arterial pressure, and pulse are captured by a soft sensor worn over an arterial site.",
  },
  {
    n: "02",
    t: "No cuff inflation",
    d: "The sensor is worn on the skin and avoids repeated cuff cycles during monitoring.",
  },
  {
    n: "03",
    t: "Data for clinical review",
    d: "Readings can be sent to a phone, monitor, cloud dashboard, health record workflow, or research database.",
  },
];

export function WhyVena() {
  return (
    <section className="relative bg-[color:var(--ink-2)] py-28 md:py-40 hairline-b">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
          <div className="reveal lg:col-span-5">
            <h2 className="section-heading mt-6 text-[color:var(--paper)]">
              More blood pressure data,
              <br />
              <span className="text-[color:var(--accent)]">fewer interruptions.</span>
            </h2>
            <p className="mt-8 text-[color:var(--paper)] leading-relaxed max-w-xl">
              Intermittent cuff readings can miss important changes. Continuous monitoring helps
              teams review trends and respond with more context.
            </p>
            <div className="mt-10">
              <Link
                to="/technology"
                className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] px-5 py-3 text-xs font-semibold tracking-normal text-[color:var(--paper)] hover:border-[color:var(--accent)]"
              >
                See how it works{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
          <div className="flex aspect-[5/4] items-center justify-center overflow-hidden rounded-[32px] bg-[color:var(--ink)] p-5 text-center text-sm text-[color:var(--mute)] reveal lg:col-span-7">
            <VisualPlaceholder label="Sensor visual placeholder" className="h-full" />
          </div>
        </div>

        {/* capabilities */}
        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {capabilities.map((c) => (
            <TiltCard
              key={c.n}
              className="group relative rounded-[28px] bg-[color:var(--ink)] p-8 md:p-10 reveal transition-colors duration-300 hover:bg-[color:var(--accent-soft)]"
            >
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[color:var(--accent)] transition-transform duration-500 group-hover:scale-x-100" />
              <div className="eyebrow transition-colors group-hover:text-[color:var(--accent)]">
                {c.n}
              </div>
              <h3 className="font-display text-lg md:text-xl text-[color:var(--paper)] mt-4 leading-tight">
                {c.t}
              </h3>
              <p className="mt-4 text-sm text-[color:var(--paper)] leading-relaxed">{c.d}</p>
            </TiltCard>
          ))}
        </div>

        {/* stats strip */}
        <div className="mt-24 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <TiltCard
              key={s.l}
              className="group min-w-0 rounded-[28px] bg-[color:var(--ink)] p-6 md:p-8 reveal transition-colors hover:bg-[color:var(--accent-soft)]"
            >
              <StatNumber {...s} />
              <div className="mt-3 text-xs text-[color:var(--paper)] leading-snug">{s.l}</div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
