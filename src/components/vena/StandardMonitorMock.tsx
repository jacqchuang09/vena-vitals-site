import { useEffect, useState } from "react";

// A generic, unbranded multi-parameter bedside monitor, built from SVG + CSS.
// It stands in for "the crowded standard monitor" next to VeriTrack's clean
// readout — deliberately dense (six waveforms, many small numbers) to make the
// contrast. It is an illustrative stylization, not a depiction of any real
// product, and carries no brand marks or trademark.

const COLORS = {
  ecg: "#3fd757",
  pleth: "#2fd4d4",
  abp: "#ff5c5c",
  pap: "#ecd23a",
  cvp: "#57a8ff",
  co2: "#e7e7e7",
};

const W = 1360; // wide, scrolled by the shared `waveform-line` animation (-680px)

// Each generator returns an SVG path across width W with `n` identical beats, so
// the -680px scroll (half of W) loops seamlessly. viewBox height is 40.
function ecg(n = 16) {
  const s = W / n;
  const b = 27;
  let d = `M0 ${b}`;
  for (let i = 0; i < n; i++) {
    const x = i * s;
    d += ` L${x + s * 0.14} ${b}`;
    d += ` Q${x + s * 0.19} ${b - 4} ${x + s * 0.24} ${b}`; // P
    d += ` L${x + s * 0.31} ${b} L${x + s * 0.34} ${b + 4} L${x + s * 0.37} ${b - 20}`; // QR
    d += ` L${x + s * 0.4} ${b + 7} L${x + s * 0.43} ${b}`; // S
    d += ` Q${x + s * 0.56} ${b - 6} ${x + s * 0.69} ${b}`; // T
    d += ` L${x + s} ${b}`;
  }
  return d;
}
function pulse(n: number, base: number, amp: number, notch = true) {
  const s = W / n;
  let d = `M0 ${base}`;
  for (let i = 0; i < n; i++) {
    const x = i * s;
    d += ` C${x + s * 0.08} ${base - amp}, ${x + s * 0.22} ${base - amp}, ${x + s * 0.33} ${base - amp * 0.55}`;
    if (notch) {
      d += ` C${x + s * 0.42} ${base - amp * 0.3}, ${x + s * 0.46} ${base - amp * 0.45}, ${x + s * 0.55} ${base - amp * 0.38}`;
    }
    d += ` C${x + s * 0.74} ${base - amp * 0.12}, ${x + s * 0.9} ${base}, ${x + s} ${base}`;
  }
  return d;
}
function cvp(n = 16) {
  const s = W / n;
  const b = 26;
  let d = `M0 ${b}`;
  for (let i = 0; i < n; i++) {
    const x = i * s;
    d += ` Q${x + s * 0.12} ${b - 5} ${x + s * 0.25} ${b - 2}`;
    d += ` Q${x + s * 0.38} ${b + 1} ${x + s * 0.5} ${b - 4}`;
    d += ` Q${x + s * 0.7} ${b - 1} ${x + s} ${b}`;
  }
  return d;
}
function co2(n = 8) {
  const s = W / n;
  const b = 34;
  const top = 13;
  let d = `M0 ${b}`;
  for (let i = 0; i < n; i++) {
    const x = i * s;
    d += ` L${x + s * 0.12} ${b} L${x + s * 0.2} ${top + 3} L${x + s * 0.6} ${top} L${x + s * 0.63} ${b} L${x + s} ${b}`;
  }
  return d;
}

const WAVES: { key: keyof typeof COLORS; label: string; d: string; sw?: number }[] = [
  { key: "ecg", label: "II", d: ecg() },
  { key: "pleth", label: "Pleth", d: pulse(16, 30, 19) },
  { key: "abp", label: "ABP", d: pulse(16, 31, 22) },
  { key: "pap", label: "PAP", d: pulse(16, 33, 12) },
  { key: "cvp", label: "CVP", d: cvp() },
  { key: "co2", label: "CO₂", d: co2(), sw: 1.6 },
];

function Wave({ color, d, dur, sw = 1.8 }: { color: string; d: string; dur: string; sw?: number }) {
  return (
    <div className="h-[26px] overflow-hidden md:h-[30px]">
      <svg
        viewBox="0 0 1360 40"
        preserveAspectRatio="none"
        className="waveform-line h-full w-[1360px]"
        style={{ animationDuration: dur }}
        aria-hidden
      >
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// One numeric parameter block: big value(s), small range, small label.
function Param({
  color,
  value,
  sub,
  label,
}: {
  color: string;
  value: string;
  sub?: string;
  label: string;
}) {
  return (
    <div className="flex items-start justify-between gap-1 border-b border-white/5 px-2 py-1 last:border-b-0">
      <div className="min-w-0">
        <div
          className="text-[6px] font-semibold uppercase tracking-wide md:text-[7px]"
          style={{ color }}
        >
          {label}
        </div>
        <div
          className="font-display text-[15px] font-bold leading-none tabular-nums md:text-[19px]"
          style={{ color }}
        >
          {value}
        </div>
      </div>
      {sub ? (
        <div className="whitespace-pre text-right text-[6px] leading-tight text-white/35 md:text-[7px]">
          {sub}
        </div>
      ) : null}
    </div>
  );
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));
const drift = (n: number, step: number, lo: number, hi: number) =>
  clamp(n + Math.round((Math.random() - 0.5) * 2 * step), lo, hi);

export function StandardMonitorMock() {
  const [hr, setHr] = useState(60);
  const [abp, setAbp] = useState({ s: 120, d: 70 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setHr((p) => drift(p, 2, 55, 66));
      setAbp((p) => ({ s: drift(p.s, 3, 112, 128), d: drift(p.d, 2, 64, 76) }));
    }, 2800);
    return () => window.clearInterval(id);
  }, []);
  const map = Math.round(abp.d + (abp.s - abp.d) / 3);

  return (
    <div className="mx-auto w-full max-w-[460px]">
      {/* Bezel — no brand marks */}
      <div className="rounded-[14px] bg-gradient-to-b from-[#26262a] to-[#111113] p-2 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)] ring-1 ring-black/50 md:rounded-[16px] md:p-2.5">
        {/* Screen */}
        <div className="overflow-hidden rounded-[7px] bg-[#050607]">
          {/* Top status bar */}
          <div className="flex items-center justify-between bg-[#0c0d10] px-2 py-1 text-[6px] text-white/45 md:text-[7px]">
            <span>Adult</span>
            <span className="text-white/30">Monitoring</span>
            <span>Profiles</span>
          </div>

          <div className="grid grid-cols-[1.55fr_1fr]">
            {/* Waveforms */}
            <div className="flex flex-col gap-1 border-r border-white/5 p-1.5">
              {WAVES.map((w, i) => (
                <div key={w.key} className="relative">
                  <span
                    className="absolute left-1 top-0 z-10 text-[5.5px] font-semibold md:text-[6.5px]"
                    style={{ color: COLORS[w.key] }}
                  >
                    {w.label}
                  </span>
                  <Wave color={COLORS[w.key]} d={w.d} sw={w.sw} dur={`${6 + i * 0.6}s`} />
                </div>
              ))}
            </div>

            {/* Parameters */}
            <div className="flex flex-col">
              <Param color={COLORS.ecg} value={String(hr)} sub={"120\n50"} label="HR" />
              <Param color={COLORS.pleth} value="95" sub={"Pulse 60"} label="SpO₂" />
              <Param color={COLORS.abp} value={`${abp.s}/${abp.d}`} sub={`(${map})`} label="ABP" />
              <Param color={COLORS.pap} value="28/15" sub={"(21)"} label="PAP" />
              <Param color={COLORS.cvp} value="(9)" sub={"mmHg"} label="CVP" />
              <Param color={COLORS.co2} value="30" sub={"awRR 30"} label="etCO₂" />
            </div>
          </div>

          {/* Bottom strip: NBP + score + clock */}
          <div className="flex items-center justify-between border-t border-white/5 bg-[#0a0b0e] px-2 py-1">
            <div>
              <div className="text-[5.5px] font-semibold text-[#ff8fa0] md:text-[6.5px]">NBP</div>
              <div className="font-display text-[13px] font-bold leading-none tabular-nums text-[#ff8fa0] md:text-[16px]">
                120/80 <span className="text-[9px] md:text-[11px]">(90)</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[5.5px] font-semibold text-[#3fd757] md:text-[6.5px]">
                STIndx
              </div>
              <div className="font-display text-[13px] font-bold leading-none tabular-nums text-[#3fd757] md:text-[16px]">
                1.7
              </div>
            </div>
            <div className="font-display text-[16px] font-bold leading-none tabular-nums text-white/85 md:text-[20px]">
              18:51
            </div>
          </div>

          {/* Soft-button toolbar */}
          <div className="flex items-stretch gap-px bg-[#0c0d10] px-1 py-0.5 text-[5px] text-white/40 md:text-[6px]">
            {[
              "Silence",
              "Alarms",
              "Suspend",
              "Zero",
              "Enter Values",
              "Recorder",
              "Trend",
              "Main Setup",
            ].map((t, i) => (
              <span
                key={t}
                className={`flex-1 rounded-[3px] px-0.5 py-1 text-center ${
                  i === 0 ? "bg-[#f0c33a] font-semibold text-black" : "bg-white/5"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
