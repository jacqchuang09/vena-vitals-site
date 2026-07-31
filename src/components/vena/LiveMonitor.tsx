import { useCallback, useRef, useState } from "react";
import { Waveform } from "./Waveform";

/**
 * A live bedside-monitor panel: a flowing arterial waveform, a pulsing LIVE
 * indicator, and four vitals that tick beat-to-beat: systolic, diastolic, mean arterial pressure
 * and pulse, the way a real patient monitor reads. The numbers nudge within a
 * tight physiologic band on every heartbeat so the panel always feels alive
 * without ever looking noisy.
 */

const BASE = { sys: 118, dia: 76, pulse: 62 };

function jitter(base: number, spread: number) {
  return base + Math.round((Math.random() - 0.5) * 2 * spread);
}

export function LiveMonitor({
  className = "",
  variant = "card",
}: {
  className?: string;
  /** "card" = stacked panel; "bar" = wide monitor strip, vitals docked right */
  variant?: "card" | "bar";
}) {
  const [v, setV] = useState({ sys: BASE.sys, dia: BASE.dia, pulse: BASE.pulse });
  const [flash, setFlash] = useState(false);
  const beats = useRef(0);

  const onBeat = useCallback(() => {
    beats.current += 1;
    // update the readout every couple of beats, since monitors do not twitch per beat
    if (beats.current % 2 === 0) {
      setV({
        sys: jitter(BASE.sys, 3),
        dia: jitter(BASE.dia, 2),
        pulse: jitter(BASE.pulse, 2),
      });
    }
    setFlash(true);
    window.setTimeout(() => setFlash(false), 140);
  }, []);

  const map = Math.round(v.dia + (v.sys - v.dia) / 3);

  const cells = [
    { k: "Systolic", v: v.sys, u: "mmHg", accent: true },
    { k: "Diastolic", v: v.dia, u: "mmHg", accent: false },
    { k: "mean arterial pressure", v: map, u: "mmHg", accent: false },
    { k: "Pulse", v: v.pulse, u: "bpm", accent: false },
  ];

  const Vital = ({ c, className: cn = "" }: { c: (typeof cells)[number]; className?: string }) => (
    <div className={`min-w-0 rounded-2xl bg-[color:var(--ink)] px-3 py-3 md:px-4 ${cn}`}>
      <div className="eyebrow whitespace-nowrap text-[9px] tracking-normal sm:text-[10px]">
        {c.k}
      </div>
      <div className="mt-1.5 flex min-w-0 flex-col items-start gap-1">
        <span
          className="font-display text-[clamp(1.5rem,4vw,2.15rem)] leading-none tracking-tight tabular-nums transition-colors"
          style={{
            color: c.accent ? "var(--accent)" : "var(--paper)",
            textShadow: flash && c.accent ? "0 0 16px var(--accent)" : "none",
          }}
        >
          {c.v}
        </span>
        <span className="block max-w-full whitespace-nowrap text-[8px] tracking-normal text-[color:var(--mute)] sm:text-[9px]">
          {c.u}
        </span>
      </div>
    </div>
  );

  const Header = () => (
    <div className="flex items-center justify-between gap-3 border-b border-[color:var(--line)] px-4 py-2.5">
      <div className="flex items-center gap-2.5 whitespace-nowrap">
        <span
          className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#5ee9b5]"
          style={{
            animation: "pulse-dot 1.1s ease-in-out infinite",
            boxShadow: "0 0 10px #5ee9b5",
          }}
        />
        <span className="eyebrow text-[color:var(--paper)]">Live · arterial</span>
      </div>
      <span className="eyebrow whitespace-nowrap text-[color:var(--mute)]">
        vēna · ch 001<span className="hidden sm:inline"> · streaming</span>
      </span>
    </div>
  );

  if (variant === "bar") {
    return (
      <div
        className={`relative border border-[color:var(--line)] bg-[color:var(--ink)]/55 backdrop-blur-md ${className}`}
      >
        <Header />
        <div className="flex flex-col">
          <div className="h-28 min-w-0 px-2 sm:h-32">
            <Waveform
              color="var(--accent)"
              bpm={v.pulse}
              speed={1.6}
              lineWidth={2}
              onBeat={onBeat}
            />
          </div>
          <div className="grid grid-cols-4 gap-2 rounded-2xl border border-[color:var(--line)] bg-[color:var(--ink-2)] p-2">
            {cells.map((c) => (
              <Vital key={c.k} c={c} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative border border-[color:var(--line)] bg-[color:var(--ink)]/55 backdrop-blur-md ${className}`}
    >
      <Header />
      <div className="h-24 w-full px-1 md:h-28">
        <Waveform color="var(--accent)" bpm={v.pulse} speed={1.5} lineWidth={2} onBeat={onBeat} />
      </div>
      <div className="grid grid-cols-4 gap-2 rounded-2xl border border-[color:var(--line)] bg-[color:var(--ink-2)] p-2">
        {cells.map((c) => (
          <Vital key={c.k} c={c} />
        ))}
      </div>
    </div>
  );
}
