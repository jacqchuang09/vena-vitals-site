import { useState } from "react";
import {
  BatteryLow,
  Bluetooth,
  Check,
  Factory,
  Gauge,
  Radar,
  Repeat,
  ShieldCheck,
  X,
} from "lucide-react";
import { StretchText } from "./StretchText";
import { TiltCard } from "./TiltCard";
import { SignalJourney } from "./SignalJourney";
import { SensorExploded } from "./SensorExploded";
import { SignalGraphs, CountUpStat, StatStrip } from "./SignalGraphs";
import { MonitorMock } from "./MonitorMock";
import { StandardMonitorMock } from "./StandardMonitorMock";

const advantages = [
  {
    icon: Radar,
    title: "Sensitivity",
    points: [
      "Wrinkled device provides 600% more surface area than traditional capacitive sensors",
      "Micro-rigid flexibility enables advanced structures beyond the parallel plate",
    ],
  },
  {
    icon: Gauge,
    title: "Dynamic Range",
    points: ["Soft substrate and flexible structural design enables a wider range of motion"],
  },
  {
    icon: ShieldCheck,
    title: "Skin Compatibility",
    points: [
      "Skin-safe biocompatible material conforms to the skin for a superior mechanical interface between sensor and body",
    ],
  },
  {
    icon: Repeat,
    title: "Robustness",
    points: ["Wrinkled structures enable repeated bending, flexing, and stretching"],
  },
  {
    icon: Bluetooth,
    title: "Wireless, no cables",
    points: [
      "Streams over Bluetooth to the bedside iPad monitor. Nothing tethered to the patient, nothing crossing the surgical field",
    ],
  },
  {
    icon: Factory,
    title: "Manufacturing",
    points: ["Low-cost scalability without the need for cleanrooms or photolithography"],
  },
  {
    icon: BatteryLow,
    title: "Low Powered",
    points: ["Compatible with low-powered IC components, allowing for minimal power requirements"],
  },
];

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
  ["Complication risk", [true, "None"], [false, "10-13%"], [true, "None"]],
  ["Infection risk", [true, "None"], [false, "0.6% per placement"], [true, "None"]],
  ["Requires arm access", [true, "No"], [false, "Yes"], [false, "Yes"]],
  ["Waveform output", [true, "Yes"], [true, "Yes"], [false, "No"]],
  [
    "Cable-free",
    [true, "Yes, Bluetooth wireless"],
    [false, "No, pressure tubing to transducer"],
    [false, "No, cuff tubing to machine"],
  ],
  [
    "High-BMI / hypertensive patients",
    [true, "Validated (BMI 17-48)"],
    [true, "Yes"],
    [false, "Limited accuracy"],
  ],
  [
    "Surgical field disruption",
    [true, "None, foot placement"],
    [false, "Potential arm dependency"],
    [false, "Repeated cuff inflation"],
  ],
  [
    "Patient comfort",
    [true, "Minimal"],
    [false, "Procedural pain"],
    [false, "Arm pain from inflation"],
  ],
  [
    "Accuracy vs. arterial line",
    [true, "0.03 mmHg mean bias"],
    [null, "Gold standard"],
    [false, "Varies; unreliable at extremes"],
  ],
];

function MediaFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={`relative overflow-hidden rounded-[28px] ${className}`}>{children}</figure>
  );
}

function ProductClip({ src, className = "" }: { src: string; className?: string }) {
  return (
    <video
      src={src}
      className={`mx-auto aspect-video w-full max-w-none object-contain mix-blend-multiply brightness-[1.03] contrast-[1.22] saturate-[1.06] ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}

function TechnicalDetail() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-normal text-[color:var(--accent)] transition hover:text-white"
        aria-expanded={open}
      >
        <span
          aria-hidden
          className={`inline-block text-[9px] transition-transform ${open ? "" : "rotate-180"}`}
        >
          ▲
        </span>
        {open ? "Hide technical detail" : "Show technical detail"}
      </button>
      {open && (
        <p className="mt-3 max-w-[460px] text-[11px] leading-relaxed text-white/75 md:text-xs">
          The sensing element is a wrinkled-gold (wAu) capacitive stack: a dielectric layer,
          silicone elastomer, air gap, and PDMS spacer. Each arterial pulse compresses the
          micropillar structure and changes the capacitance. An onboard algorithm converts those
          capacitance changes into continuous SBP, DBP, and MAP values with beat-to-beat resolution.
        </p>
      )}
    </div>
  );
}

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
          <Check size={14} className="mt-0.5 shrink-0 text-[color:var(--accent)]" aria-hidden />
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

export function Technology() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20">
        <div className="container-x grid gap-8 md:grid-cols-[0.72fr_1.28fr] md:items-center">
          <div className="mx-auto max-w-[440px] text-center reveal md:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Meet VeriTrack
            </div>
            <StretchText
              as="h1"
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Arterial-line insight. " },
                { text: "Bandage form factor.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[420px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
              VeriTrack is built on a soft capacitive sensing stack developed at UC Irvine and
              grounded in peer-reviewed materials science. It captures beat-to-beat arterial
              pressure without puncturing skin, inflating a cuff, or occupying the arm.
            </p>
          </div>
          <MediaFrame className="reveal md:pr-4">
            <ProductClip
              src="/assets/untitled-design/8-bounce.mp4"
              className="w-[92%] translate-x-[6%]"
            />
          </MediaFrame>
        </div>
      </section>

      <SignalJourney />

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <video
          src="/assets/technology/sensor-stretching.mp4"
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.68)_52%,rgba(0,0,0,0.7)_100%)]"
        />
        <div className="relative container-x grid gap-8 md:grid-cols-[1fr_1.05fr] md:items-center md:gap-12">
          <div className="mx-auto max-w-[480px] reveal text-center [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] md:mx-0 md:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Sensing Mechanism
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-white"
              segments={[
                { text: "Soft enough to wear. " },
                { text: "Accurate enough to trust.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mt-5 text-xs leading-relaxed text-white/85 md:text-[13px]">
              The VeriTrack sensor sits over the dorsalis pedis artery on the foot. Its soft,
              stretchable material detects the subtle deflections of the artery beneath the skin
              with every heartbeat, converting that motion into a continuous blood pressure
              waveform: systolic, diastolic, and mean arterial pressure, beat to beat. It moves with
              the patient through position changes and motion without losing signal. Biocompatible
              materials mean no skin irritation over the course of a case.
            </p>
            <TechnicalDetail />
          </div>
          <div className="reveal [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
            <ul className="divide-y divide-white/15">
              {advantages.map((advantage) => {
                const Icon = advantage.icon;
                return (
                  <li key={advantage.title} className="group">
                    <div className="flex cursor-default items-center gap-3 py-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[color:var(--accent)] transition group-hover:bg-[color:var(--accent)] group-hover:text-white">
                        <Icon size={15} aria-hidden />
                      </span>
                      <span className="text-[13px] font-semibold text-white">
                        {advantage.title}
                      </span>
                      <span
                        aria-hidden
                        className="ml-auto text-[10px] text-white/50 transition-transform duration-300 group-hover:rotate-180"
                      >
                        ▼
                      </span>
                    </div>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                      <ul className="space-y-1.5 overflow-hidden pl-11">
                        {advantage.points.map((pt) => (
                          <li
                            key={pt}
                            className="flex gap-1.5 pb-1 text-[11px] leading-snug text-white/80 last:pb-3"
                          >
                            <span aria-hidden className="text-[color:var(--accent)]">
                              •
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Exploded view — renders its own section shell because the pinned stage
          needs a tall scroll track and no overflow-hidden ancestor. */}
      <SensorExploded />

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
                Shown beside a simultaneous arterial-line trace, the VeriTrack waveform resolves
                each beat: systolic upstroke, dicrotic notch, and the transitions in between. In
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
                  <th className="py-2.5 pr-3" />
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
                    <th className="py-2.5 pr-3 align-top text-[10.5px] font-semibold tracking-normal text-[color:var(--paper)] transition-colors group-hover:text-[color:var(--accent)]">
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
              pressure sensing with a soft wearable sensor, the basis for the clinical system used
              in operating rooms today.
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
    </>
  );
}
