import { Check, X } from "lucide-react";
import { StretchText } from "./StretchText";
import { TiltCard } from "./TiltCard";
import { SignalGraphs, CountUpStat, StatStrip } from "./SignalGraphs";
import { MonitorMock } from "./MonitorMock";
import { StandardMonitorMock } from "./StandardMonitorMock";

// Sections lifted out of the Technology page on 29 Sep 2026, kept whole so they
// can be put back rather than rebuilt. Nothing renders these today.
//
// To restore one, import it in Technology.tsx and drop it into the fragment in
// the order below, which is where each used to sit:
//
//   Hero -> SignalJourney -> Sensing Mechanism
//        -> TechSignal -> TechAtAGlance -> TechSpecs -> TechIpScience
//
// The [VERIFY] notes that were on this copy still stand: the 0.03 mmHg mean
// bias, the five-hour capture, and the 10-13% / 0.6% figures in the comparison
// table were never confirmed by the Vena Vitals team.

/* ---------------------------- The Signal ---------------------------- */

export function TechSignal() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
      <div className="container-x">
        {/* The signal */}
        <div className="mx-auto grid max-w-[1080px] gap-8 md:grid-cols-[0.82fr_1.18fr] md:items-end md:gap-12">
          <div className="mx-auto max-w-[500px] text-center reveal md:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              The Signal
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "A " },
                { text: "continuous arterial waveform", className: "text-[color:var(--accent)]" },
                { text: ", not intermittent numbers." },
              ]}
            />
            <p className="mt-5 text-xs leading-relaxed text-[color:var(--paper)]">
              Shown beside a simultaneous arterial-line trace, the VeriTrack waveform resolves each
              beat: systolic upstroke, dicrotic notch, and the transitions in between. In
              head-to-head OR validation, the signal tracked across pre-induction, post-induction,
              vasopressor administration, and central line use, the exact states where a cuff goes
              silent. Mean bias against the arterial line: 0.03 mmHg, sustained across five-hour
              cases.
            </p>
            {/* [VERIFY] 0.03 mmHg / five-hour accuracy figures need Vena Vitals team confirmation before launch */}
            <div className="mt-7">
              <StatStrip>
                <CountUpStat
                  target={0.03}
                  decimals={2}
                  unit="mmHg"
                  label="mean bias vs arterial line"
                />
                <CountUpStat target={5} unit="hrs" label="continuous capture with motion" />
                <CountUpStat
                  target={300}
                  from={30}
                  prefix="30-"
                  unit="mmHg"
                  label="BP range validated"
                />
              </StatStrip>
            </div>
          </div>
          <SignalGraphs />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- At a glance --------------------------- */

export function TechAtAGlance() {
  return (
    <>
      {/* At a glance — VeriTrack's dedicated BP readout beside a generic,
          unbranded multi-parameter monitor. Both are stylized SVG/CSS mocks
          (MonitorMock = the VeriTrack app; StandardMonitorMock = an illustrative
          standard monitor, no brand marks), so there's no competitor product or
          fabricated real-device readout involved. */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x">
          <div className="mx-auto max-w-[560px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              At a glance
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Blood pressure, " },
                { text: "front and center.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[460px] text-xs leading-relaxed text-[color:var(--paper)]/70 md:text-[13px]">
              VeriTrack shows systolic, diastolic, and mean arterial pressure in large, dedicated
              type on the bedside tablet, right alongside the multi-parameter monitors anesthesia
              teams already watch.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-[1000px] items-stretch gap-5 md:mt-12 md:grid-cols-2">
            <figure className="reveal flex flex-col overflow-hidden rounded-[24px] bg-[color:var(--ink-2)] ring-1 ring-[color:var(--line)]">
              <div className="flex flex-1 items-center justify-center bg-[color:var(--ink)] p-5 md:p-7">
                <div className="w-full max-w-[460px] scale-90">
                  <StandardMonitorMock />
                </div>
              </div>
              <figcaption className="px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--paper)]/60">
                The bedside monitor you already use
              </figcaption>
            </figure>

            <figure className="reveal flex flex-col overflow-hidden rounded-[24px] bg-[color:var(--ink-2)] ring-1 ring-[color:var(--line)]">
              <div className="flex flex-1 items-center justify-center bg-[color:var(--ink)] p-5 md:p-7">
                {/* iPad frame around the app screen */}
                <div className="relative w-full max-w-[460px] scale-90 rounded-[24px] bg-gradient-to-b from-[#2a2a2e] to-[#141416] p-2.5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] ring-1 ring-black/50 md:rounded-[28px] md:p-3">
                  {/* front camera on the short edge */}
                  <span
                    aria-hidden
                    className="absolute left-[7px] top-1/2 z-10 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/20 md:left-2"
                  />
                  <div className="overflow-hidden rounded-[16px] bg-[#0b0d12] md:rounded-[20px]">
                    <MonitorMock />
                  </div>
                </div>
              </div>
              <figcaption className="px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">
                VeriTrack: continuous BP, in large type
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------- SPECS ------------------------------ */

// VeriTrack vs. arterial line vs. cuff. Each cell: [ok, text] where ok is
// true (✓), false (✗), or null (neutral). VeriTrack accuracy figure flagged.
// [VERIFY] 0.03 mmHg mean bias needs Vena Vitals team confirmation before launch.
const comparison: [
  string,
  [boolean | null, string],
  [boolean | null, string],
  [boolean | null, string],
][] = [
  [
    "Monitoring",
    [true, "Continuous, beat-to-beat"],
    [true, "Continuous, beat-to-beat"],
    [false, "Intermittent, every 3-5 min"],
  ],
  ["Invasive", [true, "No"], [false, "Yes, arterial catheter"], [true, "No"]],
  ["Setup time", [true, "Under 5 minutes"], [false, "5-20 minutes"], [true, "Under 1 minute"]],
  [
    "Complication & infection risk",
    [true, "None"],
    [false, "10-13% complications, 0.6% infection"],
    [true, "None"],
  ],
  ["Waveform output", [true, "Yes"], [true, "Yes"], [false, "No"]],
  [
    "Cable-free",
    [true, "Yes, Bluetooth wireless"],
    [false, "No, pressure tubing to transducer"],
    [false, "No, cuff tubing to machine"],
  ],
  [
    "Arm access & surgical field",
    [true, "Neither, foot placement"],
    [false, "Arm dependency, tubing in the field"],
    [false, "Occupies the arm, repeated inflation"],
  ],
  [
    "High-BMI / hypertensive patients",
    [true, "Validated (BMI 17-48)"],
    [true, "Yes"],
    [false, "Limited accuracy"],
  ],
  [
    "Accuracy vs. arterial line",
    [true, "0.03 mmHg mean bias"],
    [null, "Gold standard"],
    [false, "Varies; unreliable at extremes"],
  ],
];

function CompareCell({
  cell,
  highlight = false,
}: {
  cell: [boolean | null, string];
  highlight?: boolean;
}) {
  const [ok, text] = cell;
  return (
    <td className={`px-3 py-2.5 align-top ${highlight ? "bg-[color:var(--accent-soft)]/55" : ""}`}>
      <div className="flex items-start gap-1.5">
        {ok === true ? (
          <Check size={14} className="mt-0.5 shrink-0 text-[color:var(--ok)]" aria-hidden />
        ) : ok === false ? (
          <X size={14} className="mt-0.5 shrink-0 text-[color:var(--mute)]" aria-hidden />
        ) : (
          <span className="mt-0.5 w-3.5 shrink-0" aria-hidden />
        )}
        <span className={ok === false ? "text-[color:var(--mute)]" : "text-[color:var(--paper)]"}>
          {text}
        </span>
      </div>
    </td>
  );
}

export function TechSpecs() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
      <div className="container-x">
        <div className="mx-auto max-w-[560px] text-center reveal">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            SPECS
          </div>
          <StretchText
            as="h2"
            className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            segments={[
              { text: "How VeriTrack " },
              { text: "compares.", className: "text-[color:var(--accent)]" },
            ]}
          />
        </div>
        <div className="reveal mx-auto mt-8 max-w-[880px] overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left text-[11px]">
            <thead>
              <tr className="border-b border-[color:var(--line)]">
                <th className="py-2.5 pl-2 pr-3" />
                <th className="rounded-t-[14px] bg-[color:var(--accent-soft)] px-3 py-2.5 text-center font-display text-[13px] font-bold tracking-tight text-[color:var(--accent)]">
                  VeriTrack
                </th>
                <th className="px-3 py-2.5 text-center font-semibold text-[color:var(--paper)]">
                  Arterial Line
                </th>
                <th className="px-3 py-2.5 text-center font-semibold text-[color:var(--paper)]">
                  Cuff
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([row, vt, al, cuff]) => (
                <tr
                  key={row}
                  className="group border-b border-[color:var(--line)] transition-colors last:border-b-0 hover:bg-[color:var(--ink-2)]"
                >
                  <th className="py-2.5 pl-2 pr-3 align-top text-[10.5px] font-semibold tracking-normal text-[color:var(--paper)] transition-colors group-hover:text-[color:var(--accent)]">
                    {row}
                  </th>
                  <CompareCell cell={vt} highlight />
                  <CompareCell cell={al} />
                  <CompareCell cell={cuff} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- IP & Science --------------------------- */

export function TechIpScience() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
      <div className="container-x grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-center md:gap-12">
        <div className="reveal text-center md:text-left">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            IP &amp; Science
          </div>
          <StretchText
            as="h2"
            className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            segments={[
              { text: "Patents and " },
              { text: "peer-reviewed science.", className: "text-[color:var(--accent)]" },
            ]}
          />
          <p className="mx-auto mt-5 max-w-[460px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0 md:text-[13px]">
            VeriTrack is built on a suite of patents protecting the wrinkled-metal sensing
            technology, grounded in peer-reviewed research published in Advanced Healthcare
            Materials (Kim et al., 2019). The foundational paper demonstrated beat-to-beat blood
            pressure sensing with a soft wearable sensor, the basis for the clinical system used in
            operating rooms today.
          </p>
        </div>
        <TiltCard className="reveal rounded-[26px] bg-white p-6 md:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            Foundational paper
          </div>
          <div className="mt-3 font-display text-base font-bold tracking-tight text-[color:var(--paper)]">
            Kim et al., 2019
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[color:var(--paper)]">
            “Soft Wearable Pressure Sensors for Beat-to-Beat Blood Pressure Monitoring.”
          </p>
          <p className="mt-1 text-[11px] italic text-[color:var(--mute)]">
            Advanced Healthcare Materials
          </p>
          <a
            href="https://doi.org/10.1002/adhm.201900109"
            target="_blank"
            rel="noreferrer"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--paper)] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[color:var(--accent)]"
          >
            doi.org/10.1002/adhm.201900109{" "}
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </TiltCard>
      </div>
    </section>
  );
}
