import { useEffect, useRef, useState } from "react";

// A replica of the UVM005 case figure: arterial line (top) vs Vena Vitals signal
// (bottom). The A-line shows artifacts, spikes, and a dropout (highlighted in
// red) where the Vena Vitals signal stays clean. Both bands draw in left-to-right
// as the section scrolls into view.

const BLUE = "#1f6fb2";

const W = 1180;
const H = 486;
const PLOT_X0 = 84;
const PLOT_X1 = 1076;
const PLOT_W = PLOT_X1 - PLOT_X0;
const TOP_Y = 40;
const BOT_Y = 266;
const PLOT_H = 170;
const LO = 40;
const HI = 260;
const N = 460;

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));
const gauss = (f: number, mu: number, s: number) => Math.exp(-((f - mu) ** 2) / (2 * s * s));
const vY = (v: number, top: number) => top + (1 - (clamp(v, LO, HI) - LO) / (HI - LO)) * PLOT_H;
const xAt = (f: number) => PLOT_X0 + f * PLOT_W;

// Shared slow pressure trend across the case.
function sysEnv(f: number) {
  return (
    108 +
    58 * gauss(f, 0.15, 0.05) +
    30 * gauss(f, 0.36, 0.11) +
    55 * gauss(f, 0.55, 0.035) +
    28 * gauss(f, 0.8, 0.1) -
    28 * gauss(f, 0.25, 0.05) -
    22 * gauss(f, 0.46, 0.03) -
    30 * gauss(f, 0.9, 0.028) +
    6 * Math.sin(f * 31)
  );
}
function diaEnv(f: number) {
  return 60 + 0.34 * (sysEnv(f) - 108) + 6 * Math.sin(f * 24 + 1);
}

type Beat = { x: number; y1: number; y2: number };

// A-line briefly loses its signal here — drawn as a solid flatline, not beats.
const DROP_A = 0.86;
const DROP_B = 0.9;
const DROP_V = 100;

function buildBeats(top: number, artifacts: boolean): Beat[] {
  const out: Beat[] = [];
  for (let i = 0; i < N; i++) {
    const f = i / (N - 1);
    if (artifacts && f > DROP_A && f < DROP_B) continue; // flatline drawn separately
    const x = xAt(f);
    const s = sysEnv(f) + 5 * Math.sin(i * 1.9) + 3 * Math.sin(i * 0.7);
    const d = diaEnv(f) + 4 * Math.sin(i * 1.5 + 1) + 2.5 * Math.sin(i * 0.5);
    out.push({ x, y1: vY(d, top), y2: vY(s, top) });
  }
  return out;
}

const TOP_BEATS = buildBeats(TOP_Y, true);
const BOT_BEATS = buildBeats(BOT_Y, false);
// A-line artifact spikes (vertical noise lines)
const SPIKES = [0.03, 0.275, 0.51, 0.545, 0.7, 0.74, 0.83, 0.875, 0.95];
const Y_TICKS = [50, 100, 150, 200, 250];
const X_TICKS = [4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000];

export function SurgeryComparison() {
  const ref = useRef<SVGSVGElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // Reaches 1 by the time the chart's top passes ~45% of the viewport, so
        // it's fully drawn once the section is centered.
        setProgress(clamp((vh - rect.top) / (vh * 0.55), 0, 1));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const revealW = progress * PLOT_W;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Arterial line versus Vena Vitals signal for an abdominal-mass-removal case, where the arterial line shows artifacts the Vena Vitals signal does not"
      className="h-auto w-full"
    >
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="6" fill="#ffffff" stroke="#c9d6e8" />

      {/* Axes + labels (always visible) */}
      {[
        { top: TOP_Y, label: "Arterial Line (mmHg)" },
        { top: BOT_Y, label: "Vena Vitals Signal (mmHg)" },
      ].map((plot) => (
        <g key={plot.label}>
          {Y_TICKS.map((v) => (
            <text
              key={v}
              x={PLOT_X0 - 8}
              y={vY(v, plot.top) + 4}
              textAnchor="end"
              fontSize="11"
              fill="#3a3a3a"
              fontFamily="ui-sans-serif, system-ui"
            >
              {v}
            </text>
          ))}
          <line
            x1={PLOT_X0}
            x2={PLOT_X0}
            y1={plot.top}
            y2={plot.top + PLOT_H}
            stroke="#5a5a5a"
            strokeWidth="1"
          />
          <line
            x1={PLOT_X0}
            x2={PLOT_X1}
            y1={plot.top + PLOT_H}
            y2={plot.top + PLOT_H}
            stroke="#5a5a5a"
            strokeWidth="1"
          />
          <text
            x={28}
            y={plot.top + PLOT_H / 2}
            textAnchor="middle"
            fontSize="13"
            fill="#1f1f1f"
            fontFamily="ui-sans-serif, system-ui"
            transform={`rotate(-90 28 ${plot.top + PLOT_H / 2})`}
          >
            {plot.label}
          </text>
        </g>
      ))}

      {/* X axis ticks under the bottom plot */}
      {X_TICKS.map((tk) => {
        const x = xAt((tk - 4000) / 8000);
        return (
          <g key={tk}>
            <line
              x1={x}
              x2={x}
              y1={BOT_Y + PLOT_H}
              y2={BOT_Y + PLOT_H + 5}
              stroke="#5a5a5a"
              strokeWidth="1"
            />
            <text
              x={x}
              y={BOT_Y + PLOT_H + 18}
              textAnchor="middle"
              fontSize="11"
              fill="#3a3a3a"
              fontFamily="ui-sans-serif, system-ui"
            >
              {tk}
            </text>
          </g>
        );
      })}
      <text
        x={PLOT_X0 + PLOT_W / 2}
        y={H - 8}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#1f1f1f"
        fontFamily="ui-sans-serif, system-ui"
      >
        Time (sec)
      </text>

      {/* Waveform data — clipped so it draws in left-to-right with scroll */}
      <clipPath id="sc-reveal">
        <rect x={PLOT_X0} y="0" width={revealW} height={H} />
      </clipPath>
      <g clipPath="url(#sc-reveal)">
        {TOP_BEATS.map((b, i) => (
          <line
            key={`t${i}`}
            x1={b.x}
            x2={b.x}
            y1={b.y1}
            y2={b.y2}
            stroke={BLUE}
            strokeWidth="1"
            strokeOpacity="0.85"
          />
        ))}
        {/* A-line signal dropout (solid flatline) */}
        <line
          x1={xAt(DROP_A)}
          x2={xAt(DROP_B)}
          y1={vY(DROP_V, TOP_Y)}
          y2={vY(DROP_V, TOP_Y)}
          stroke={BLUE}
          strokeWidth="1.4"
          strokeOpacity="0.85"
        />
        {SPIKES.map((f, i) => {
          const x = xAt(f);
          return (
            <line
              key={`s${i}`}
              x1={x}
              x2={x}
              y1={vY(250, TOP_Y)}
              y2={vY(55, TOP_Y)}
              stroke={BLUE}
              strokeWidth="1"
              strokeOpacity="0.6"
            />
          );
        })}
        {BOT_BEATS.map((b, i) => (
          <line
            key={`b${i}`}
            x1={b.x}
            x2={b.x}
            y1={b.y1}
            y2={b.y2}
            stroke={BLUE}
            strokeWidth="1"
            strokeOpacity="0.85"
          />
        ))}
      </g>
    </svg>
  );
}
