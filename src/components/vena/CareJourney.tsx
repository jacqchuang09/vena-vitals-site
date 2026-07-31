import { useState } from "react";
import { Activity, BellRing, Cloud } from "lucide-react";
import { TiltCard } from "./TiltCard";

const stages = [
  {
    icon: Activity,
    label: "Capture",
    title: "Measure blood pressure continuously.",
    body: "The wearable sensor captures pulse changes from the skin and converts them into blood pressure trends.",
    metric: "1,000+",
    metricLabel: "beats per hour",
  },
  {
    icon: BellRing,
    label: "Detect",
    title: "See changes between routine checks.",
    body: "Continuous data helps care teams review low blood pressure, high blood pressure, and recovery trends as they develop.",
    metric: "24/7",
    metricLabel: "continuous view",
  },
  {
    icon: Cloud,
    label: "Record",
    title: "Send structured data to the care team.",
    body: "Readings can support monitoring, treatment adjustment, post-procedure follow-up, and research workflows.",
    metric: "1",
    metricLabel: "clear timeline",
  },
] as const;

export function CareJourney() {
  const [active, setActive] = useState(0);
  const current = stages[active];
  const Icon = current.icon;

  return (
    <section id="care-journey" className="relative bg-[color:var(--ink)] py-24 md:py-32 hairline-b">
      <div className="container-x">
        <div className="reveal max-w-3xl">
          <h2 className="section-heading mt-6 text-[color:var(--paper)]">
            From measurement to <span className="text-[color:var(--accent)]">action.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-[color:var(--paper)] md:text-lg">
            Vēna is built to make continuous blood pressure data easy to capture, review, and use in
            care decisions.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-[0.72fr_1fr] md:items-stretch">
          <div className="reveal grid gap-2 md:h-[450px] md:grid-rows-3">
            {stages.map((stage, index) => {
              const StageIcon = stage.icon;
              const selected = active === index;
              return (
                <TiltCard
                  as="button"
                  key={stage.label}
                  onClick={() => setActive(index)}
                  className={`group grid grid-cols-[44px_1fr] items-center gap-4 border p-5 text-left transition md:h-full ${
                    selected
                      ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--paper)]"
                      : "border-transparent bg-[color:var(--ink-2)] text-[color:var(--paper)] hover:border-[color:var(--line)] hover:text-[color:var(--paper)]"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center border ${
                      selected
                        ? "border-[color:var(--accent)] text-[color:var(--accent)]"
                        : "border-[color:var(--line)] text-[color:var(--paper)]"
                    }`}
                  >
                    <StageIcon size={18} aria-hidden />
                  </span>
                  <span>
                    <span className="font-mono text-[10px] tracking-normal text-[color:var(--paper)]">
                      0{index + 1}
                    </span>
                    <span className="mt-1 block text-sm font-semibold tracking-normal">
                      {stage.label}
                    </span>
                  </span>
                </TiltCard>
              );
            })}
          </div>

          <div className="reveal flex flex-col justify-between rounded-[32px] border border-[color:var(--line)] bg-[color:var(--ink-2)] p-7 md:h-[450px] md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-[color:var(--line)] pb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--ink)] text-[color:var(--accent)]">
                <Icon size={22} aria-hidden />
              </div>
              <div className="text-right">
                <div className="font-display text-4xl font-bold leading-none tracking-tight text-[color:var(--accent)]">
                  {current.metric}
                </div>
                <div className="mt-2 text-xs tracking-normal text-[color:var(--paper)]">
                  {current.metricLabel}
                </div>
              </div>
            </div>

            <h3 className="mt-8 max-w-2xl font-display text-2xl leading-[1.06] tracking-tight text-[color:var(--paper)] md:text-3xl">
              {current.title}
            </h3>
            <p className="mt-5 max-w-xl leading-relaxed text-[color:var(--paper)]">
              {current.body}
            </p>

            <div className="mt-8 flex flex-wrap gap-2 border-t border-[color:var(--line)] pt-5">
              {["skin-worn", "continuous", "structured data"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[color:var(--line)] px-3 py-2 text-[10px] font-semibold tracking-normal text-[color:var(--paper)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
