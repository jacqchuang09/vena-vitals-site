import { useEffect, useRef, useState, type ReactNode } from "react";
import { TiltCard } from "./TiltCard";
import { useCountUp } from "./lib";

// A simulated replica of the VeriTrack capacitive-sensor figure: a 3D surface
// model of the pressure field (left) beside its eight capacitance channels
// (right). The surface beats and the channels scroll like a live arterial
// pressure waveform. Everything is drawn from SVG so it stays tiny and crisp.

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
const smooth = (t: number) => {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
};

// Arterial pulse shape (0..1): sharp upstroke, dicrotic notch, diastolic decay.
function beatPulse(ph: number) {
  const p = ph - Math.floor(ph);
  if (p < 0.12) {
    const u = p / 0.12;
    return u * u * (3 - 2 * u);
  }
  const d = p - 0.12;
  const main = Math.exp(-d * 3.4);
  const dicrotic = 0.2 * Math.exp(-((p - 0.34) ** 2) / 0.0016);
  return clamp(main + dicrotic, 0, 1);
}

/* ----------------------------- 3D surface ----------------------------- */

// Axonometric projection of data-space (x, y in [0,1], z height) to the SVG.
const OX = 70;
const OY = 300;
const AX = 232; // data-x screen delta
const AY = 62;
const BX = 150; // data-y (depth) screen delta
const BY = -126;
const ZH = 168; // height scale
const proj = (x: number, y: number, z: number): [number, number] => [
  OX + x * AX + y * BX,
  OY + x * AY + y * BY - z * ZH,
];

// Surface height: a tall pulse peak near the front-left over a low plateau.
// `amp` scales the peak so the whole surface beats like an arterial pulse.
function zf(x: number, y: number, amp: number) {
  const peak =
    amp *
    Math.exp(-((x - 0.22) ** 2) / (2 * 0.085 ** 2)) *
    Math.exp(-((y - 0.27) ** 2) / (2 * 0.135 ** 2));
  const base = 0.09 * smooth((x - 0.16) / 0.55);
  return Math.min(1.14, peak + base);
}

const path = (pts: [number, number][]) =>
  pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");

const NY = 60;
const NX = 58;
// Stacked constant-depth profiles (back to front) — the "waterfall" mesh.
function buildSurface(amp: number) {
  const lines: string[] = [];
  for (let j = NY; j >= 0; j--) {
    const y = j / NY;
    const pts: [number, number][] = [];
    for (let i = 0; i <= NX; i++) {
      const x = i / NX;
      pts.push(proj(x, y, zf(x, y, amp)));
    }
    lines.push(path(pts));
  }
  return lines;
}

const ZBOX = 1.12;
const BOX_LINES = (() => {
  const out: string[] = [];
  const steps = [0, 0.2, 0.4, 0.6, 0.8, 1];
  steps.forEach((gx) => out.push(path([proj(gx, 0, 0), proj(gx, 1, 0)])));
  steps.forEach((gy) => out.push(path([proj(0, gy, 0), proj(1, gy, 0)])));
  steps.forEach((gx) => out.push(path([proj(gx, 1, 0), proj(gx, 1, ZBOX)])));
  [0, 0.5, 1].forEach((gz) => out.push(path([proj(0, 1, gz * ZBOX), proj(1, 1, gz * ZBOX)])));
  steps.forEach((gy) => out.push(path([proj(1, gy, 0), proj(1, gy, ZBOX)])));
  [0, 0.5, 1].forEach((gz) => out.push(path([proj(1, 0, gz * ZBOX), proj(1, 1, gz * ZBOX)])));
  return out;
})();

const CONTOURS = (() => {
  const cx = 0.22;
  const cy = 0.27;
  return [0.045, 0.085, 0.13, 0.18, 0.24].map((r) => {
    const pts: [number, number][] = [];
    for (let a = 0; a <= 36; a++) {
      const t = (a / 36) * Math.PI * 2;
      pts.push(proj(cx + Math.cos(t) * r * 0.72, cy + Math.sin(t) * r * 1.15, 0.004));
    }
    return path(pts);
  });
})();

function Surface3D({ amp }: { amp: number }) {
  const surfaceLines = buildSurface(amp);
  return (
    <svg viewBox="0 0 482 384" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient
          id="surfGrad"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="100"
          x2="0"
          y2="300"
        >
          <stop offset="0" stopColor="#c0eb75" />
          <stop offset="0.16" stopColor="#51cf66" />
          <stop offset="0.34" stopColor="#22b8cf" />
          <stop offset="0.58" stopColor="#4263eb" />
          <stop offset="1" stopColor="#3b5bdb" />
        </linearGradient>
      </defs>
      {BOX_LINES.map((d, i) => (
        <path key={`b${i}`} d={d} fill="none" stroke="#d2d6dd" strokeWidth="1" />
      ))}
      {CONTOURS.map((d, i) => (
        <path
          key={`c${i}`}
          d={d}
          fill="none"
          stroke="#5b8def"
          strokeWidth="0.8"
          strokeOpacity="0.7"
        />
      ))}
      {surfaceLines.map((d, i) => (
        <path
          key={`s${i}`}
          d={d}
          fill="none"
          stroke="url(#surfGrad)"
          strokeWidth="1"
          strokeOpacity="0.95"
        />
      ))}
    </svg>
  );
}

/* ----------------------------- channels ----------------------------- */

const CHANNELS = [
  { amp: 0.03, base: 0.07, noise: 0.004 },
  { amp: 0.66, base: 0.14, noise: 0.006 },
  { amp: 0.17, base: 0.1, noise: 0.006 },
  { amp: 0.24, base: 0.09, noise: 0.005 },
  { amp: 0.02, base: 0.11, noise: 0.003 },
  { amp: 0.02, base: 0.1, noise: 0.003 },
  { amp: 0.015, base: 0.06, noise: 0.003 },
  { amp: 0.02, base: 0.05, noise: 0.003 },
];

const BEATS = 7;
const PX0 = 30;
const PX1 = 172;
const PY0 = 18; // cap = 1.5
const PY1 = 92; // cap = 0
const capY = (c: number) => PY1 - (clamp(c, 0, 1.5) / 1.5) * (PY1 - PY0);

function channelPath({ amp, base, noise }: (typeof CHANNELS)[number], shift: number) {
  const N = 168;
  const pts: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const f = i / N;
    const c = base + amp * beatPulse(f * BEATS + shift) + noise * Math.sin(i * 1.7);
    pts.push([PX0 + f * (PX1 - PX0), capY(c)]);
  }
  return path(pts);
}

const Y_TICKS = [0, 0.5, 1, 1.5];
const X_TICKS = [0, 1, 2, 3, 4, 5];

function Channel({ n, cfg, shift }: { n: number; cfg: (typeof CHANNELS)[number]; shift: number }) {
  return (
    <div className="group rounded-[8px] p-0.5 text-[#3a3a3a] transition hover:text-[color:var(--accent)]">
      <svg viewBox="0 0 178 112" className="w-full" aria-label={`Channel ${n} capacitance`}>
        <text x={101} y={11} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1f1f1f">
          Ch. {n}
        </text>
        <rect
          x={PX0}
          y={PY0}
          width={PX1 - PX0}
          height={PY1 - PY0}
          fill="none"
          stroke="#c7ccd4"
          strokeWidth="0.8"
        />
        {Y_TICKS.map((t) => (
          <g key={t}>
            <line
              x1={PX0 - 2.5}
              x2={PX0}
              y1={capY(t)}
              y2={capY(t)}
              stroke="#9aa1ab"
              strokeWidth="0.7"
            />
            <text x={PX0 - 4} y={capY(t) + 2.6} textAnchor="end" fontSize="6" fill="#7a818c">
              {t}
            </text>
          </g>
        ))}
        {X_TICKS.map((t) => {
          const x = PX0 + (t / 5) * (PX1 - PX0);
          return (
            <g key={t}>
              <line x1={x} x2={x} y1={PY1} y2={PY1 + 2.5} stroke="#9aa1ab" strokeWidth="0.7" />
              <text x={x} y={PY1 + 9} textAnchor="middle" fontSize="5.5" fill="#7a818c">
                {t}
              </text>
            </g>
          );
        })}
        <text
          x={9}
          y={(PY0 + PY1) / 2}
          textAnchor="middle"
          fontSize="6"
          fill="#7a818c"
          transform={`rotate(-90 9 ${(PY0 + PY1) / 2})`}
        >
          Cap (pF)
        </text>
        <text x={101} y={110} textAnchor="middle" fontSize="6" fill="#7a818c">
          Time (Sec)
        </text>
        <path
          d={channelPath(cfg, shift)}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function SignalGraphs() {
  // Start at a representative systolic phase so the static (reduced-motion)
  // render still shows a tall peak.
  const [t, setT] = useState(0.065);
  // When the pointer is over the card the user "scrubs" the waveform: this
  // holds the manual phase, or null when the pulse auto-plays.
  const [scrub, setScrub] = useState<number | null>(null);
  const reduced = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reduced.current = true;
      return;
    }
    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 45) return; // ~22fps is plenty for the pulse
      last = now;
      setT(now / 1000);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Map the cursor's horizontal position to a phase spanning the beats shown.
  const handleScrub = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const fr = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    setScrub(fr * BEATS);
  };

  const scrubbing = scrub !== null;
  const phase = scrubbing ? scrub : t * 1.15; // auto ≈ 69 bpm
  const amp = 0.5 + 0.6 * beatPulse(phase);
  const shift = scrubbing ? scrub : reduced.current ? 0 : phase;

  return (
    <div
      ref={wrapRef}
      onPointerMove={handleScrub}
      onPointerDown={handleScrub}
      onPointerLeave={() => setScrub(null)}
      style={{ touchAction: "pan-y" }}
      className="reveal group relative cursor-ew-resize touch-pan-y select-none p-3 md:p-4"
    >
      {/* affordance hint — fades out while scrubbing */}
      <div
        className={`pointer-events-none absolute right-4 top-3 z-10 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)] transition-opacity duration-200 ${
          scrubbing ? "opacity-0" : "opacity-70 group-hover:opacity-100"
        }`}
      >
        <span aria-hidden>⇆</span> Drag to scrub
      </div>
      <div className="grid grid-cols-[0.94fr_1.06fr] items-center gap-3 md:gap-4">
        <div className="p-1">
          <Surface3D amp={amp} />
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          {CHANNELS.map((cfg, i) => (
            <Channel key={i} n={i + 1} cfg={cfg} shift={shift} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- stat callouts ----------------------------- */

// One tilt card holding the three validation stats in a row.
export function StatStrip({ children }: { children: ReactNode }) {
  return (
    <TiltCard className="rounded-[22px] bg-white p-5 shadow-[0_14px_38px_rgba(43,43,43,0.06)] md:p-6">
      <div className="grid grid-cols-3">{children}</div>
    </TiltCard>
  );
}

export function CountUpStat({
  target,
  from = 0,
  decimals = 0,
  prefix = "",
  unit,
  label,
}: {
  target: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  unit: string;
  label: string;
}) {
  const { ref, value } = useCountUp(target - from, { decimals });
  const num = from + value;
  const display = `${prefix}${decimals ? num.toFixed(decimals) : Math.round(num)}`;
  return (
    <div className="pr-3 first:pl-0 last:pr-0 md:pr-4">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="whitespace-nowrap font-display text-xl font-bold leading-none tabular-nums text-[color:var(--accent)] md:text-[26px]"
      >
        {display}
      </div>
      <div className="mt-1.5 text-[8.5px] font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]/55 md:text-[9px]">
        {unit}
      </div>
      <div className="mt-2.5 text-[10px] leading-snug text-[color:var(--paper)]/70 md:text-[11px]">
        {label}
      </div>
    </div>
  );
}
