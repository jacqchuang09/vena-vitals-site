import { useEffect, useRef, useState } from "react";
import { StretchText } from "./StretchText";

// Scroll-driven exploded view of the VeriTrack wearable. The section pins while
// the assembly separates along the Z axis, then walks the highlight down through
// the stack one layer at a time.
//
// Each layer is drawn as its own component part: an SVG top face giving it a
// distinct identity (board traces, micropillar array, wrinkled electrode, and so
// on) plus stacked slices behind it that read as material thickness once the
// stage is tipped into its isometric attitude. It is stylised geometry, not a
// render of the real hardware — the repo has no per-layer product art. Swapping
// in real transparent PNGs later means replacing the <LayerArt> face.
//
// LAYER NAMES AND ORDER:
// The capacitive sensing stack (spacer, air gap, wAu electrode, dielectric,
// elastomer) is taken from the technical detail copy already published on this
// page. The adhesive interface, flexible PCB, and housing are NOT documented
// anywhere in this repo — they are marked below and surfaced in the UI as
// unconfirmed.
// [EDIT NEEDED: confirm the wearable's internal construction — whether an
// adhesive interface, flexible PCB, and soft housing are the right components,
// their order in the stack, and the correct name for each.]
type LayerKind = "housing" | "pcb" | "elastomer" | "electrode" | "spacer" | "skin";

type Layer = {
  name: string;
  detail: string;
  kind: LayerKind;
  /** Slices drawn behind the face; more slices reads as a thicker part. */
  slices: number;
  confirmed: boolean;
};

const layers: Layer[] = [
  {
    name: "Soft housing",
    detail: "The skin-worn body of the wearable, shaped to flex with the wrist.",
    kind: "housing",
    slices: 5,
    confirmed: false,
  },
  {
    name: "Flexible PCB",
    detail: "Carries the readout electronics that digitise the sensor signal.",
    kind: "pcb",
    slices: 3,
    confirmed: false,
  },
  {
    name: "Dielectric & silicone elastomer",
    detail: "The compliant upper layers of the capacitive stack.",
    kind: "elastomer",
    slices: 4,
    confirmed: true,
  },
  {
    name: "Wrinkled-gold (wAu) electrode",
    detail: "The sensing element. Each arterial pulse changes its capacitance.",
    kind: "electrode",
    slices: 2,
    confirmed: true,
  },
  {
    name: "Air gap & PDMS spacer",
    detail: "The micropillar structure that compresses beat to beat.",
    kind: "spacer",
    slices: 4,
    confirmed: true,
  },
  {
    name: "Skin interface",
    detail: "Holds the sensor over the arterial site for the length of a case.",
    kind: "skin",
    slices: 2,
    confirmed: false,
  },
];

const W = 300;
const H = 180;
const R = 46;
const ACCENT = "#d84a4a";

// Top face of each part. One squircle footprint shared by all six so they stack
// as one device, with per-layer detail inside it.
function LayerArt({ kind }: { kind: LayerKind }) {
  const shell = { rx: R, ry: R, x: 0, y: 0, width: W, height: H };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sheen-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#e8e8e8" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id={`gold-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.55" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {kind === "housing" && (
        <>
          <rect {...shell} fill={`url(#sheen-${kind})`} stroke="#00000018" />
          <rect
            x="14"
            y="14"
            width={W - 28}
            height={H - 28}
            rx={R - 12}
            fill="none"
            stroke="#00000012"
          />
          {/* seam + button detail */}
          <rect x={W / 2 - 34} y="26" width="68" height="7" rx="3.5" fill="#0000000f" />
        </>
      )}

      {kind === "pcb" && (
        <>
          <rect {...shell} fill={ACCENT} fillOpacity="0.13" stroke={ACCENT} strokeOpacity="0.4" />
          {/* traces */}
          {[52, 74, 96, 118].map((y) => (
            <path
              key={y}
              d={`M42 ${y} H${W / 2 - 26} l14 -14 H${W - 58}`}
              fill="none"
              stroke={ACCENT}
              strokeOpacity="0.5"
              strokeWidth="1.6"
            />
          ))}
          {/* chip + pads */}
          <rect
            x={W / 2 - 22}
            y={H / 2 - 16}
            width="44"
            height="32"
            rx="5"
            fill={ACCENT}
            fillOpacity="0.55"
          />
          {[62, 238].map((x) => (
            <circle
              key={x}
              cx={x}
              cy={H / 2}
              r="6"
              fill="none"
              stroke={ACCENT}
              strokeOpacity="0.6"
              strokeWidth="2"
            />
          ))}
        </>
      )}

      {kind === "elastomer" && (
        <>
          <rect {...shell} fill="#ffffff" fillOpacity="0.82" stroke="#00000014" />
          {/* soft sheen sweep, to read as a translucent sheet */}
          <path
            d={`M0 ${H * 0.62} Q ${W / 2} ${H * 0.3} ${W} ${H * 0.58}`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="16"
            strokeOpacity="0.8"
          />
        </>
      )}

      {kind === "electrode" && (
        <>
          <rect {...shell} fill={`url(#gold-${kind})`} stroke={ACCENT} strokeOpacity="0.45" />
          {/* wrinkle texture */}
          {Array.from({ length: 11 }, (_, i) => 24 + i * 13).map((y, i) => (
            <path
              key={y}
              d={`M26 ${y} q 22 ${i % 2 ? -7 : 7} 44 0 t 44 0 t 44 0 t 44 0 t 44 0`}
              fill="none"
              stroke={ACCENT}
              strokeOpacity="0.32"
              strokeWidth="1.2"
            />
          ))}
        </>
      )}

      {kind === "spacer" && (
        <>
          {/* frame with an open centre — the air gap itself */}
          <path
            d={`M0 0 H${W} V${H} H0 Z M28 34 H${W - 28} V${H - 34} H28 Z`}
            fillRule="evenodd"
            fill="#ffffff"
            fillOpacity="0.9"
            stroke="#00000014"
          />
          {/* micropillar array inside the gap */}
          {Array.from({ length: 5 }, (_, r) => 48 + r * 22).map((cy) =>
            Array.from({ length: 11 }, (_, c) => 44 + c * 21).map((cx) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.6" fill="#00000018" />
            )),
          )}
        </>
      )}

      {kind === "skin" && (
        <>
          <rect {...shell} fill="#2b2b2b" fillOpacity="0.09" stroke="#00000016" />
          {/* adhesive perforations */}
          {Array.from({ length: 4 }, (_, r) => 44 + r * 30).map((cy) =>
            Array.from({ length: 9 }, (_, c) => 44 + c * 26).map((cx) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r="3.2"
                fill="#ffffff"
                fillOpacity="0.75"
              />
            )),
          )}
        </>
      )}
    </svg>
  );
}

// One part: the drawn face, plus slices stacked behind it in Z so the part has
// visible thickness when the stage is tilted.
function Part({ layer }: { layer: Layer }) {
  return (
    <div className="absolute inset-0 [transform-style:preserve-3d]">
      {Array.from({ length: layer.slices }, (_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-[46px] bg-[color:var(--ink-2)] ring-1 ring-black/5"
          style={{ transform: `translateZ(${-(i + 1) * 2.2}px)` }}
        />
      ))}
      <div className="absolute inset-0 overflow-hidden rounded-[46px]">
        <LayerArt kind={layer.kind} />
      </div>
    </div>
  );
}

const SPREAD_PX = 62; // Z distance between adjacent layers when fully exploded
const ASSEMBLY_PHASE = 0.34; // fraction of the scroll spent pulling the stack apart
const SCROLL_VH = 300; // scroll budget on top of the pinned viewport

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const smoothstep = (n: number) => n * n * (3 - 2 * n);

export function SensorExploded() {
  const trackRef = useRef<HTMLDivElement>(null);
  const planeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;

    const readTarget = () => {
      const track = trackRef.current;
      if (!track) return null;
      const distance = track.offsetHeight - window.innerHeight;
      if (distance <= 0) return null;
      const scrolled = -track.getBoundingClientRect().top;
      return clamp01(scrolled / distance);
    };

    // Written straight to the DOM: one setState per frame would re-render the
    // whole section, StretchText included, on every scroll tick.
    const paint = (p: number) => {
      const spread = smoothstep(clamp01(p / ASSEMBLY_PHASE));
      const walk = clamp01((p - ASSEMBLY_PHASE) / (1 - ASSEMBLY_PHASE)) * (layers.length - 1);

      planeRefs.current.forEach((el, i) => {
        if (!el) return;
        // Centre the stack on its middle layer so it expands both ways rather
        // than drifting off the top of the stage.
        const fromCentre = i - (layers.length - 1) / 2;
        const z = fromCentre * SPREAD_PX * spread;
        const focus = 1 - Math.min(1, Math.abs(walk - i));
        el.style.transform = `translate(-50%,-50%) translateZ(${z.toFixed(2)}px)`;
        el.style.opacity = String(0.42 + 0.58 * Math.max(spread * focus, spread * 0.55));
      });

      const next = Math.min(layers.length - 1, Math.max(0, Math.round(walk)));
      setActive((prev) => (prev === next ? prev : next));
    };

    // Damped follow, so wheel and trackpad steps don't land as hard jumps.
    const SMOOTH = 0.2;
    let lastTime = 0;
    let current = 0;
    let target = 0;
    let primed = false;

    const tick = (now: number) => {
      const dt = lastTime ? Math.min(64, now - lastTime) : 16.67;
      lastTime = now;
      const next = readTarget();
      if (next !== null) target = next;
      const k = 1 - Math.pow(1 - SMOOTH, dt / 16.67);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0002) current = target;
      paint(current);
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!primed || frame) return;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };

    const initial = readTarget();
    current = initial ?? 0;
    target = current;
    paint(current);
    primed = true;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  // First paint / reduced-motion: show the stack already separated so the
  // section still reads as an exploded view without any scrolling.
  const restingTransform = (i: number) => {
    const fromCentre = i - (layers.length - 1) / 2;
    return `translate(-50%,-50%) translateZ(${(fromCentre * SPREAD_PX).toFixed(2)}px)`;
  };

  return (
    <section className="relative bg-[color:var(--ink)] hairline-b">
      <div ref={trackRef} style={reduced ? undefined : { height: `calc(100vh + ${SCROLL_VH}vh)` }}>
        <div
          className={
            reduced
              ? "py-16 md:py-20"
              : "sticky top-0 flex h-screen items-center overflow-hidden pt-[var(--nav-h)] pb-10"
          }
        >
          <div className="container-x grid w-full gap-10 md:grid-cols-[0.72fr_1.28fr] md:items-center">
            <div className="mx-auto max-w-[400px] text-center reveal md:mx-0 md:text-left">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                Inside the wearable
              </div>
              <StretchText
                as="h2"
                className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
                segments={[
                  { text: "Six layers between " },
                  { text: "skin and signal.", className: "text-[color:var(--accent)]" },
                ]}
              />
              <p className="mt-5 max-w-[340px] text-xs leading-relaxed text-[color:var(--paper)]/70 md:text-[13px]">
                The VeriTrack wearable holds a soft capacitive stack against an arterial site.
                Scroll to pull it apart.
              </p>

              <ol className="mt-8 divide-y divide-[color:var(--line)] text-left">
                {layers.map((l, i) => (
                  <li
                    key={l.name}
                    className={`flex gap-4 py-3 transition-opacity duration-300 first:pt-0 last:pb-0 ${
                      i === active ? "opacity-100" : "opacity-45"
                    }`}
                  >
                    <span className="mt-0.5 font-mono text-[11px] text-[color:var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-display text-[13px] font-bold leading-tight tracking-tight text-[color:var(--paper)]">
                        {l.name}
                      </span>
                      <span className="mt-1 block text-[11px] leading-snug text-[color:var(--paper)]/70">
                        {l.detail}
                        {!l.confirmed && (
                          <span className="text-[color:var(--accent)]"> To confirm.</span>
                        )}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* 3D stage. The wrapper owns the perspective; the inner element is
                tipped into an isometric attitude and every part is a child of it
                so they share one 3D space. */}
            <div className="reveal relative h-[320px] [perspective:1400px] sm:h-[380px] md:h-[460px]">
              <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-32deg)]">
                {layers.map((l, i) => (
                  <div
                    key={l.name}
                    ref={(el) => {
                      planeRefs.current[i] = el;
                    }}
                    style={{ transform: restingTransform(i) }}
                    className="absolute left-1/2 top-1/2 h-[150px] w-[250px] [transform-style:preserve-3d] md:h-[180px] md:w-[300px]"
                  >
                    <Part layer={l} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
