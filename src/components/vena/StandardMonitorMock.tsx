import { useEffect, useState } from "react";

// A generic, unbranded multi-parameter bedside monitor, built from SVG + CSS.
// Modelled on the dense layout of a high-end anesthesia monitor (bed strip,
// four labelled waveforms, a right-hand numeric stack, an anesthetic-gas band,
// a mini-trend row, and a soft-button toolbar) so it reads as "the crowded
// standard monitor" beside VeriTrack's clean readout. It is an illustrative
// stylization — no brand marks, no trademark, not a real device's output.

const C = {
  ecg: "#74c043",
  pleth: "#37b9da",
  abp: "#ff3535",
  co2: "#c9c9c9",
  white: "#f2f2f2",
  nbp: "#e163cf",
  o2: "#74c043",
  n2o: "#6f97e6",
  bis: "#f2cf28",
  amber: "#e9b83a",
  cyanTab: "#37b9da",
};

const W = 1360; // scrolled by the shared `waveform-line` animation (-680px)

function ecg(n = 16) {
  const s = W / n;
  const b = 23;
  let d = `M0 ${b}`;
  for (let i = 0; i < n; i++) {
    const x = i * s;
    d += ` L${x + s * 0.16} ${b}`;
    d += ` q${s * 0.03} -3 ${s * 0.06} 0`; // P
    d += ` L${x + s * 0.3} ${b} L${x + s * 0.33} ${b + 3} L${x + s * 0.35} ${b - 18} L${x + s * 0.37} ${b + 6} L${x + s * 0.4} ${b}`; // QRS
    d += ` q${s * 0.09} -4 ${s * 0.18} 0`; // T
    d += ` L${x + s} ${b}`;
  }
  return d;
}
function pulseWave(n: number, base: number, amp: number) {
  const s = W / n;
  let d = `M0 ${base}`;
  for (let i = 0; i < n; i++) {
    const x = i * s;
    d += ` C${x + s * 0.08} ${base - amp}, ${x + s * 0.22} ${base - amp}, ${x + s * 0.34} ${base - amp * 0.5}`;
    d += ` C${x + s * 0.42} ${base - amp * 0.28}, ${x + s * 0.47} ${base - amp * 0.44}, ${x + s * 0.55} ${base - amp * 0.36}`;
    d += ` C${x + s * 0.74} ${base - amp * 0.12}, ${x + s * 0.9} ${base}, ${x + s} ${base}`;
  }
  return d;
}
function co2(n = 8) {
  const s = W / n;
  const b = 30;
  const top = 9;
  let d = `M0 ${b}`;
  for (let i = 0; i < n; i++) {
    const x = i * s;
    d += ` L${x + s * 0.14} ${b} C${x + s * 0.18} ${top + 2} ${x + s * 0.22} ${top} ${x + s * 0.28} ${top}`;
    d += ` L${x + s * 0.58} ${top - 1} C${x + s * 0.6} ${top - 1} ${x + s * 0.62} ${b} ${x + s * 0.64} ${b}`;
    d += ` L${x + s} ${b}`;
  }
  return d;
}

type WaveDef = { key: keyof typeof C; label: string; d: string; fill?: boolean; scale: string[] };
const WAVES: WaveDef[] = [
  { key: "ecg", label: "II", d: ecg(), scale: [] },
  { key: "pleth", label: "Pleth", d: pulseWave(16, 30, 20), scale: [] },
  { key: "abp", label: "ABP", d: pulseWave(16, 31, 22), scale: ["150", "75", "0"] },
  { key: "co2", label: "CO₂", d: co2(), fill: true, scale: ["30", "15", "0"] },
];

function Wave({ def, dur }: { def: WaveDef; dur: string }) {
  const color = C[def.key];
  return (
    <div className="relative flex-1 border-b border-white/[0.04]">
      <span
        className="absolute left-1 top-1 z-10 text-[5px] font-semibold md:text-[6px]"
        style={{ color }}
      >
        {def.label}
      </span>
      {def.scale.length > 0 ? (
        <div className="absolute left-1 top-4 z-10 flex flex-col gap-1 text-[3.5px] text-white/30 md:text-[4.5px]">
          {def.scale.map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>
      ) : null}
      <div className="h-full overflow-hidden">
        <svg
          viewBox="0 0 1360 40"
          preserveAspectRatio="none"
          className="waveform-line h-full w-[1360px]"
          style={{ animationDuration: dur }}
          aria-hidden
        >
          {def.fill ? (
            <path d={`${def.d} L1360 40 L0 40 Z`} fill={color} fillOpacity="0.5" stroke="none" />
          ) : null}
          <path
            d={def.d}
            fill="none"
            stroke={color}
            strokeWidth="1.7"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

// Numeric readout: label + tiny range on the left, big value on the right.
function Num({
  label,
  value,
  range,
  color,
  big = false,
}: {
  label: string;
  value: string;
  range?: string;
  color: string;
  big?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-1 leading-none">
      <div className="flex flex-col gap-[1px]">
        <span className="text-[5px] font-semibold md:text-[6.5px]" style={{ color }}>
          {label}
        </span>
        {range ? (
          <span className="whitespace-pre text-[3.5px] text-white/30 md:text-[4.5px]">{range}</span>
        ) : null}
      </div>
      <span
        className={`font-display font-bold tabular-nums ${big ? "text-[15px] md:text-[19px]" : "text-[12px] md:text-[15px]"}`}
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
}

// Small gas/index block for the middle band: label(s) stacked, values stacked.
function Gas({ color, rows }: { color: string; rows: [string, string][] }) {
  return (
    <div className="flex flex-col justify-center gap-[2px] leading-none">
      {rows.map(([label, value], i) => (
        <div key={i} className="flex items-baseline gap-1">
          <span className="w-8 text-[4.5px] font-semibold md:w-9 md:text-[5.5px]" style={{ color }}>
            {label}
          </span>
          <span
            className="font-display text-[9px] font-bold tabular-nums md:text-[11px]"
            style={{ color }}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

function Trend({
  label,
  value,
  color,
  bar,
}: {
  label: string;
  value: string;
  color: string;
  bar?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[1px] border-l border-white/[0.05] px-1.5 leading-none first:border-l-0">
      <span className="text-[4px] font-semibold md:text-[5px]" style={{ color }}>
        {label}
      </span>
      <div className="flex items-center gap-1">
        <span aria-hidden style={{ color }}>
          →
        </span>
        {bar ? (
          <span className="h-2 w-4 rounded-[1px]" style={{ background: color, opacity: 0.85 }} />
        ) : null}
        <span
          className="font-display text-[8px] font-bold tabular-nums md:text-[10px]"
          style={{ color }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));
const drift = (n: number, step: number, lo: number, hi: number) =>
  clamp(n + Math.round((Math.random() - 0.5) * 2 * step), lo, hi);

export function StandardMonitorMock() {
  const [hr, setHr] = useState(80);
  const [abp, setAbp] = useState({ s: 121, d: 82 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setHr((p) => drift(p, 2, 74, 86));
      setAbp((p) => ({ s: drift(p.s, 3, 114, 128), d: drift(p.d, 2, 76, 88) }));
    }, 2800);
    return () => window.clearInterval(id);
  }, []);
  const abpm = Math.round(abp.d + (abp.s - abp.d) / 3);

  const beds = ["Bed 1", "Bed 2", "Bed 3", "Bed 4", "Bed 5", "Bed 6", "Bed 7", "Bed 8"];

  return (
    <div className="mx-auto w-full max-w-[500px]">
      {/* Bezel — no brand marks */}
      <div className="rounded-[14px] bg-gradient-to-b from-[#2a2a2e] to-[#0f0f11] p-2 shadow-[0_22px_54px_-24px_rgba(0,0,0,0.75)] ring-1 ring-black/50 md:rounded-[18px] md:p-2.5">
        {/* Screen */}
        <div className="overflow-hidden rounded-[6px] bg-black text-white">
          {/* Bed strip */}
          <div className="flex gap-px bg-[#111] px-1 pt-1">
            {beds.map((b, i) => (
              <span
                key={b}
                className={`flex-1 truncate rounded-t-[2px] px-1 py-[2px] text-center text-[4.5px] font-semibold md:text-[5.5px] ${
                  i === 3
                    ? "bg-[#e9b83a] text-black"
                    : i === 6
                      ? "bg-[#37b9da] text-black"
                      : "bg-white/10 text-white/60"
                }`}
              >
                {b}
              </span>
            ))}
          </div>
          {/* Status bar */}
          <div className="flex items-center justify-between bg-[#0c0c0c] px-1.5 py-[2px] text-[4.5px] text-white/55 md:text-[5.5px]">
            <span>Bed 4 · Adult</span>
            <span>Doe, John</span>
            <span className="hidden sm:inline">Profiles</span>
            <span>Horizon</span>
          </div>

          {/* Waveforms + right numeric stack */}
          <div className="grid grid-cols-[1.55fr_1fr]">
            <div className="flex h-[128px] flex-col md:h-[150px]">
              {WAVES.map((w, i) => (
                <Wave key={w.key} def={w} dur={`${6 + i * 0.5}s`} />
              ))}
            </div>
            <div className="flex flex-col justify-between border-l border-white/[0.06] px-1.5 py-1">
              <div className="grid grid-cols-2 gap-x-2">
                <Num label="HR" range={"120\n50"} value={String(hr)} color={C.ecg} big />
                <Num label="Pulse" value="80" color={C.pleth} big />
              </div>
              <div className="grid grid-cols-2 gap-x-2">
                <Num label="SpO₂" range={"100\n90"} value="98" color={C.pleth} big />
                <Num label="Perf" value="2.1" color={C.pleth} />
              </div>
              <Num
                label="ABP"
                range={"160\n90"}
                value={`${abp.s}/${abp.d} (${abpm})`}
                color={C.abp}
              />
              <div className="grid grid-cols-2 gap-x-2">
                <Num label="etCO₂" range={"60\n25"} value="29" color={C.white} />
                <Num label="awRR" range={"40\n8"} value="13" color={C.white} />
              </div>
            </div>
          </div>

          {/* Anesthetic-gas + NBP band */}
          <div className="flex items-stretch justify-between border-t border-white/[0.06] bg-[#080808] px-1.5 py-1">
            <div className="leading-none">
              <span className="text-[4.5px] font-semibold md:text-[5.5px]" style={{ color: C.nbp }}>
                NBP · Pulse 91
              </span>
              <div
                className="font-display text-[13px] font-bold tabular-nums md:text-[16px]"
                style={{ color: C.nbp }}
              >
                125/80 <span className="text-[9px] md:text-[11px]">(88)</span>
              </div>
            </div>
            <Gas
              color={C.nbp}
              rows={[
                ["etISO", "1.80"],
                ["inISO", "2.00"],
              ]}
            />
            <Gas
              color={C.o2}
              rows={[
                ["etO₂", "29"],
                ["inO₂", "33"],
              ]}
            />
            <Gas
              color={C.n2o}
              rows={[
                ["etN₂O", "64"],
                ["inN₂O", "65"],
              ]}
            />
            <div className="flex items-center gap-1.5">
              <Num label="BIS" range={"70\n20"} value="51" color={C.bis} big />
              <Gas
                color={C.bis}
                rows={[
                  ["SQI", "69"],
                  ["EMG", "28"],
                ]}
              />
            </div>
          </div>

          {/* Mini-trend row */}
          <div className="flex items-stretch justify-between border-t border-white/[0.06] bg-[#0a0a0a] py-1">
            <Trend label="HR" value="80" color={C.ecg} bar />
            <Trend label="SpO₂" value="98" color={C.pleth} />
            <Trend label="ABPm" value="98" color={C.abp} bar />
            <Trend label="PAPm" value="15" color={C.bis} />
            <Trend label="etCO₂" value="29" color={C.white} />
            <Trend label="Tcore" value="39.6" color={C.abp} bar />
          </div>

          {/* Soft-button toolbar */}
          <div className="flex items-stretch gap-px bg-[#111] px-1 py-1 text-[4px] text-white/45 md:text-[5px]">
            {[
              ["Silence", "amber"],
              ["Alarms Off", "amber"],
              ["Start/Stop", ""],
              ["Stop All", ""],
              ["Zero", ""],
              ["Suppress", ""],
              ["Recordings", ""],
              ["Vitals Trend", ""],
              ["End Case", ""],
              ["Main Setup", "blue"],
              ["Main Screen", "blue"],
            ].map(([t, kind]) => (
              <span
                key={t}
                className={`flex-1 rounded-[2px] px-0.5 py-1 text-center leading-tight ${
                  kind === "amber"
                    ? "bg-[#e9b83a] font-semibold text-black"
                    : kind === "blue"
                      ? "bg-[#2f6ad0] font-semibold text-white"
                      : "bg-white/[0.06]"
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
