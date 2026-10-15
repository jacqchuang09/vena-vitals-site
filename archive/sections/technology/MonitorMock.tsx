import { useEffect, useState, type ReactNode } from "react";
import { Folder } from "lucide-react";

// A lightweight replica of the Vēna Vitals bedside monitor app, used as the
// diagram for the "blood pressure blind spot" section. Built from SVG + CSS so
// it stays tiny (the real screen recording is ~550MB).

const RED = "#f4584f";
const GREEN = "#43d17a";
const AMBER = "#f0a23a";

/**
 * Builds a realistic repeating radial arterial pressure waveform: a sharp
 * systolic upstroke, rounded peak, dicrotic notch + wave, and diastolic runoff.
 */
function arterialPath(width: number, count: number) {
  const seg = width / count;
  const base = 66; // diastolic baseline (higher y = lower pressure)
  const top = 12; // systolic peak
  const amp = base - top;
  const y = (f: number) => (base - f * amp).toFixed(1);
  const x = (i: number, f: number) => (i * seg + f * seg).toFixed(1);

  let d = `M0 ${base}`;
  for (let i = 0; i < count; i++) {
    d += ` C${x(i, 0.05)} ${y(0)}, ${x(i, 0.1)} ${y(0.04)}, ${x(i, 0.15)} ${y(0.96)}`;
    d += ` C${x(i, 0.17)} ${y(1)}, ${x(i, 0.2)} ${y(1)}, ${x(i, 0.23)} ${y(0.88)}`;
    d += ` C${x(i, 0.29)} ${y(0.7)}, ${x(i, 0.35)} ${y(0.56)}, ${x(i, 0.41)} ${y(0.46)}`;
    d += ` C${x(i, 0.44)} ${y(0.41)}, ${x(i, 0.46)} ${y(0.37)}, ${x(i, 0.48)} ${y(0.39)}`; // dicrotic notch
    d += ` C${x(i, 0.5)} ${y(0.45)}, ${x(i, 0.52)} ${y(0.49)}, ${x(i, 0.55)} ${y(0.46)}`; // dicrotic wave
    d += ` C${x(i, 0.68)} ${y(0.28)}, ${x(i, 0.83)} ${y(0.1)}, ${x(i, 1)} ${y(0)}`; // diastolic runoff
  }
  return d;
}

// Trend readings (systolic / diastolic range with a mean marker), like the app.
const TREND = Array.from({ length: 11 }, (_, i) => {
  const sys = 119 + [2, -1, 3, 0, -2, 1, 4, -1, 2, 0, 3][i];
  const dia = 80 + [1, -2, 2, 0, -1, 1, -1, 2, 0, -2, 1][i];
  return { sys, dia, map: Math.round(dia + (sys - dia) / 3) };
});
const trendY = (v: number) => 6 + ((145 - v) / 103) * 54;

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));
const drift = (n: number, step: number, lo: number, hi: number) =>
  clamp(n + Math.round((Math.random() - 0.5) * 2 * step), lo, hi);

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[7px] text-white/70 md:text-[8px]">
      {children}
    </span>
  );
}

function Vital({
  value,
  max,
  min,
  label,
  tone,
}: {
  value: string;
  max: string;
  min: string;
  label: string;
  tone: "red" | "green";
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className="font-display text-3xl font-bold leading-none tabular-nums md:text-[44px]"
        style={{ color: tone === "green" ? GREEN : RED }}
      >
        {value}
      </span>
      <div className="text-right leading-tight">
        <div className="text-[6.5px] text-white/40 md:text-[8px]">{max}</div>
        <div className="text-[6.5px] text-white/40 md:text-[8px]">{min}</div>
        <div className="mt-0.5 text-[7px] font-semibold text-white/80 md:text-[9px]">{label}</div>
      </div>
    </div>
  );
}

export function MonitorMock() {
  const wave = arterialPath(1360, 16);

  const [vitals, setVitals] = useState({ sys: 119, dia: 80, pr: 73 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setVitals((p) => ({
        sys: drift(p.sys, 3, 112, 126),
        dia: drift(p.dia, 2, 72, 86),
        pr: drift(p.pr, 2, 66, 80),
      }));
    }, 2600);
    return () => window.clearInterval(id);
  }, []);
  const map = Math.round(vitals.dia + (vitals.sys - vitals.dia) / 3);

  return (
    <div className="h-full overflow-hidden bg-[#0b0d12] p-2.5 md:p-3">
      {/* Status bar */}
      <div className="flex items-center justify-between px-1 pb-2">
        <div className="flex items-baseline gap-1.5 text-[8px] md:text-[9px]">
          <span className="font-bold tracking-tight text-[color:var(--accent)]">vēnavitals</span>
          <span className="text-[6px] text-white/30 md:text-[7px]">v0.0.17 (Build 17)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Pill>
            <span className="h-1 w-1 rounded-full bg-[#43d17a]" /> Connected
          </Pill>
          <Folder size={11} className="text-white/40" aria-hidden />
        </div>
      </div>

      <div className="grid grid-cols-[1.5fr_1fr] gap-2">
        {/* Graphs */}
        <div className="flex flex-col gap-2">
          <div className="relative overflow-hidden rounded-[10px] bg-[#0e1119] p-2">
            <div className="h-[58px] overflow-hidden md:h-[84px]">
              <svg
                viewBox="0 0 1360 80"
                preserveAspectRatio="none"
                className="waveform-line h-full w-[1360px]"
                aria-hidden
              >
                {[20, 40, 60].map((g) => (
                  <line
                    key={g}
                    x1="0"
                    y1={g}
                    x2="1360"
                    y2={g}
                    stroke="#ffffff"
                    strokeOpacity="0.06"
                    strokeDasharray="6 8"
                  />
                ))}
                <path
                  d={wave}
                  fill="none"
                  stroke={AMBER}
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="mt-1 flex justify-between text-[6px] text-white/25">
              <span>0</span>
              <span>5</span>
              <span>10 sec</span>
            </div>
          </div>

          <div className="rounded-[10px] bg-[#0e1119] p-2">
            <svg viewBox="0 0 300 66" className="h-12 w-full md:h-16" aria-hidden>
              {[140, 120, 100, 80, 60].map((v) => (
                <g key={v}>
                  <line
                    x1="22"
                    x2="298"
                    y1={trendY(v)}
                    y2={trendY(v)}
                    stroke="#ffffff"
                    strokeOpacity="0.05"
                  />
                  <text
                    x="16"
                    y={trendY(v) + 2}
                    textAnchor="end"
                    fontSize="5"
                    fill="#ffffff"
                    fillOpacity="0.3"
                  >
                    {v}
                  </text>
                </g>
              ))}
              {TREND.map((r, i) => {
                const cx = 36 + i * 24;
                const top = trendY(r.sys);
                const bot = trendY(r.dia);
                const mid = trendY(r.map);
                return (
                  <g key={i} stroke="#ffffff" strokeOpacity="0.55" fill="#ffffff" fillOpacity="0.7">
                    <line x1={cx} x2={cx} y1={top} y2={bot} strokeWidth="0.8" />
                    <polygon
                      points={`${cx},${top - 3} ${cx - 2},${top} ${cx + 2},${top}`}
                      stroke="none"
                    />
                    <polygon
                      points={`${cx},${bot + 3} ${cx - 2},${bot} ${cx + 2},${bot}`}
                      stroke="none"
                    />
                    <polygon
                      points={`${cx},${mid - 2.6} ${cx + 2.6},${mid} ${cx},${mid + 2.6} ${cx - 2.6},${mid}`}
                      stroke="none"
                      fillOpacity="0.9"
                    />
                  </g>
                );
              })}
            </svg>
            <div className="mt-0.5 flex justify-between text-[6px] text-white/25">
              <span>1:48 PM</span>
              <span>2:29 PM</span>
            </div>
          </div>
        </div>

        {/* Vitals readout */}
        <div className="flex flex-col gap-2">
          <div className="rounded-[10px] bg-[#0e1119] p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-semibold md:text-[10px]" style={{ color: RED }}>
                mmHg
              </span>
              <span className="text-[6px] text-white/35 md:text-[7.5px]">Calibrated 2:18 PM</span>
            </div>
            <div className="mt-1.5 flex flex-col gap-1.5">
              <Vital value={String(vitals.sys)} max="180" min="60" label="SYS" tone="red" />
              <Vital value={String(vitals.dia)} max="100" min="50" label="DIA" tone="red" />
              <Vital value={String(map)} max="120" min="60" label="MAP" tone="red" />
            </div>
          </div>

          <div className="rounded-[10px] bg-[#0e1119] p-2.5">
            <span className="text-[8px] font-semibold md:text-[10px]" style={{ color: GREEN }}>
              bpm
            </span>
            <div className="mt-1.5">
              <Vital value={String(vitals.pr)} max="130" min="50" label="HR" tone="green" />
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-2 flex items-stretch gap-px overflow-hidden rounded-[6px] border-t border-white/10 pt-2 text-[5.5px] text-white/35 md:text-[6.5px]">
        {[
          "Pause Alarm",
          "Reset Alarm",
          "Connect Device",
          "Place Device",
          "Calibrate System",
          "Patient Info",
          "Discharge Patient",
          "Settings",
        ].map((t, i) => (
          <span
            key={t}
            className={`flex-1 px-0.5 py-0.5 text-center ${
              i === 0 ? "rounded-[4px] bg-[#f0c33a] font-semibold text-black" : ""
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
