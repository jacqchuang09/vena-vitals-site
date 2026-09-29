import { useState } from "react";
import { BatteryLow, Bluetooth, Factory, Gauge, Radar, Repeat, ShieldCheck } from "lucide-react";
import { StretchText } from "./StretchText";
import { SignalJourney } from "./SignalJourney";

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

function MediaFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={`relative overflow-hidden rounded-none ${className}`}>{children}</figure>
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

export function Technology() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20">
        {/* Video first, text second: the section leads with the device. */}
        <div className="container-x grid gap-8 md:grid-cols-[1.28fr_0.72fr] md:items-center">
          <MediaFrame className="reveal md:pl-4">
            <ProductClip
              src="/assets/untitled-design/8-bounce.mp4"
              className="w-[92%] translate-x-[6%]"
            />
          </MediaFrame>
          <div className="mx-auto max-w-[440px] text-center reveal md:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              The Science
            </div>
            <StretchText
              as="h1"
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-[1.05] tracking-tight text-[color:var(--paper)] text-balance"
              segments={[
                { text: "Applanation tonometry, " },
                { text: "reinvented.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[420px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
              VeriTrack is built on applanation tonometry - a proven technique for measuring
              arterial pressure through the skin. A soft capacitive sensing stack developed at UC
              Irvine translates subtle arterial wall motion into continuous, beat-to-beat blood
              pressure readings.
            </p>
          </div>
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
              The VeriTrack wrap fits around the foot, holding its sensor over the dorsalis pedis
              artery. The sensor's soft, stretchable material detects the subtle deflections of the
              artery beneath the skin with every heartbeat, converting that motion into a continuous
              blood pressure waveform: systolic, diastolic, and mean arterial pressure, beat to
              beat. The sensor sends that waveform to the bedside iPad over Bluetooth, so no cable
              runs from the patient to the display. It moves with the patient through position
              changes and motion without losing signal. Biocompatible materials mean no skin
              irritation over the course of a case.
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
    </>
  );
}
