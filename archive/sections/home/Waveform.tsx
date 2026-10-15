import { useEffect, useRef } from "react";

/**
 * Live arterial blood-pressure waveform.
 *
 * Renders a continuously scrolling, clinically-shaped pulse trace on a canvas:
 * sharp systolic upstroke, dicrotic notch, diastolic runoff, with a soft glow
 * and a bright leading "now" dot, the way a bedside monitor sweeps.
 *
 * Decorative: respects prefers-reduced-motion (draws a single static beat) and
 * pauses when scrolled off-screen to stay cheap.
 */

type WaveformProps = {
  className?: string;
  /** trace + glow color */
  color?: string;
  /** beats per minute */
  bpm?: number;
  /** horizontal scroll speed, px per frame at 60fps */
  speed?: number;
  /** stroke width in CSS px */
  lineWidth?: number;
  /** called once per heartbeat (at the systolic peak), drives synced readouts */
  onBeat?: () => void;
};

/** One normalized arterial pulse, phase t in [0,1) → amplitude in ~[0,1]. */
function arterialPulse(t: number): number {
  // main systolic peak: fast rise, slightly slower fall
  const systolic = Math.exp(-Math.pow((t - 0.16) / 0.072, 2));
  // dicrotic wave after the aortic-valve notch
  const dicrotic = 0.32 * Math.exp(-Math.pow((t - 0.43) / 0.07, 2));
  // gentle diastolic baseline lift early in the cycle
  const baseline = 0.06 * Math.exp(-Math.pow((t - 0.62) / 0.3, 2));
  return systolic + dicrotic + baseline;
}

export function Waveform({
  className = "",
  color = "#6bb6ff",
  bpm = 62,
  speed = 1.4,
  lineWidth = 2,
  onBeat,
}: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onBeatRef = useRef(onBeat);
  onBeatRef.current = onBeat;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // canvas cannot parse CSS custom properties, so resolve to a concrete color
    let stroke = color;
    const varMatch = color.match(/var\((--[\w-]+)\)/);
    if (varMatch) {
      const resolved = getComputedStyle(canvas).getPropertyValue(varMatch[1]).trim();
      if (resolved) stroke = resolved;
    }

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ring buffer of amplitudes (0..1), one entry per CSS px of width
    let samples: number[] = [];
    let phase = 0; // 0..1 within current beat
    let lastBeatPhaseHigh = false;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (samples.length === 0) {
        samples = new Array(width).fill(0);
        // seed with a few resting beats so it never starts empty
        for (let i = 0; i < width; i++) {
          const t = (i / width) * 6;
          samples[i] = arterialPulse(t % 1);
        }
      } else if (samples.length < width) {
        samples = new Array(width - samples.length).fill(0).concat(samples);
      } else if (samples.length > width) {
        samples = samples.slice(samples.length - width);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const pad = lineWidth + 6;
      const top = pad;
      const bottom = height - pad;
      const span = bottom - top;

      const yFor = (amp: number) => bottom - amp * span * 0.92;

      // baseline grid tick (subtle clinical reference line)
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, bottom - span * 0.08);
      ctx.lineTo(width, bottom - span * 0.08);
      ctx.stroke();

      // the trace
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = yFor(samples[x] ?? 0);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.shadowColor = stroke;
      ctx.shadowBlur = 12;
      ctx.stroke();

      // soft fill under the leading section for depth
      ctx.shadowBlur = 0;

      // leading "now" dot
      const lastY = yFor(samples[width - 1] ?? 0);
      ctx.beginPath();
      ctx.arc(width - 1, lastY, lineWidth + 1.5, 0, Math.PI * 2);
      ctx.fillStyle = stroke;
      ctx.shadowColor = stroke;
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const step = () => {
      if (!visible) {
        raf = requestAnimationFrame(step);
        return;
      }
      // advance phase: a full beat covers (60/bpm) seconds.
      // px advanced per frame = speed; samples per beat = width-ish independent,
      // we advance phase by speed * (bpm/60) / (pixels-per-second baseline).
      const beatsPerFrame = (bpm / 60) * speed * 0.018;
      for (let i = 0; i < Math.max(1, Math.round(speed)); i++) {
        phase += beatsPerFrame / Math.max(1, Math.round(speed));
        if (phase >= 1) phase -= 1;

        // tiny physiologic jitter so it never looks looped
        const noise = (Math.sin(phase * 53.1) + Math.sin(phase * 17.7)) * 0.012;
        const amp = Math.max(0, arterialPulse(phase) + noise);

        samples.push(amp);
        if (samples.length > width) samples.shift();

        // fire onBeat right after the systolic peak crosses
        const high = phase > 0.12 && phase < 0.2;
        if (high && !lastBeatPhaseHigh) onBeatRef.current?.();
        lastBeatPhaseHigh = high;
      }

      draw();
      raf = requestAnimationFrame(step);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [color, bpm, speed, lineWidth]);

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}
