import { useEffect, useRef, useState } from "react";
import { StretchText } from "./StretchText";

// Scroll-driven exploded view of the VeriTrack wearable. The section pins while
// the page scrolls, scrubbing through a frame sequence of the real product
// exploded-view animation (the layers of the soft sensor lifting apart), and
// walks the highlight down the layer list as it goes.
//
// The frames were extracted from a supplied product animation (an AI-rendered
// exploded view of the device) into public/assets/technology/wearable-frames.
// [VERIFY] the layer names/order below with the Vena Vitals team; several are
// inferred, and the ones marked "To confirm" are not documented in this repo.

const FRAME_COUNT = 120;
const FRAME_W = 900;
const FRAME_H = 675;
const framePath = (n: number) =>
  `/assets/technology/wearable-frames/f${String(n).padStart(3, "0")}.jpg`;
// A well-separated frame, shown static under reduced-motion / on phones.
const STATIC_FRAME = framePath(96);

const layers = [
  {
    name: "Soft housing",
    detail: "The skin-worn body of the wearable, shaped to flex with the wrist.",
    confirmed: false,
  },
  {
    name: "Wrinkled-gold (wAu) electrode",
    detail: "The sensing element. Each arterial pulse changes its capacitance.",
    confirmed: true,
  },
  {
    name: "Dielectric & silicone elastomer",
    detail: "The compliant upper layers of the capacitive stack.",
    confirmed: true,
  },
  {
    name: "Air gap & PDMS spacer",
    detail: "The micropillar structure that compresses beat to beat.",
    confirmed: true,
  },
  {
    name: "Flexible PCB",
    detail: "Carries the readout electronics that digitise the sensor signal.",
    confirmed: false,
  },
  {
    name: "Skin interface",
    detail: "Holds the sensor over the arterial site for the length of a case.",
    confirmed: false,
  },
];

const SCROLL_VH = 300; // scroll budget on top of the pinned viewport
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function SensorExploded() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const drawnRef = useRef(-1);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Phones fall back to a single static frame — scroll-scrubbing is poor UX
    // on touch and the pinned stage doesn't fit a narrow column.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Preload every frame; draw the first as soon as it decodes.
  useEffect(() => {
    if (reduced) return;
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      imgs.push(img);
    }
    imagesRef.current = imgs;
    const drawIfCurrent = () => {
      // Redraw whatever frame the scroll loop last wanted, once it has loaded.
      if (drawnRef.current >= 0) draw(drawnRef.current, true);
    };
    imgs.forEach((img) => (img.onload = drawIfCurrent));
    if (imgs[0].complete) draw(0);
  }, [reduced]);

  const draw = (idx: number, force = false) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    drawnRef.current = idx;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    if (!force && idx === (canvas as unknown as { _drawn?: number })._drawn) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    (canvas as unknown as { _drawn?: number })._drawn = idx;
  };

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

    const paint = (p: number) => {
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))));
      draw(idx);
      const next = Math.min(layers.length - 1, Math.max(0, Math.round(p * (layers.length - 1))));
      setActive((prev) => (prev === next ? prev : next));
    };

    // Damped follow, so wheel/trackpad steps scrub smoothly rather than jumping.
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

  return (
    // Full-bleed dark section: the frames sit on pure black, so a black section
    // lets the device merge into the background with empty space to its left.
    <section className="relative bg-black">
      <div ref={trackRef} style={reduced ? undefined : { height: `calc(100vh + ${SCROLL_VH}vh)` }}>
        <div
          className={
            reduced
              ? "flex min-h-screen items-center overflow-hidden py-16 md:py-20"
              : "sticky top-0 flex h-screen items-center overflow-hidden pt-[var(--nav-h)] pb-10"
          }
        >
          <div className="container-x grid w-full gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-center">
            <div className="mx-auto max-w-[400px] text-center reveal md:mx-0 md:text-left">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                Inside the wearable
              </div>
              <StretchText
                as="h2"
                className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-white"
                segments={[
                  { text: "Layers between " },
                  { text: "skin and signal.", className: "text-[color:var(--accent)]" },
                ]}
              />
              <p className="mt-5 max-w-[340px] text-xs leading-relaxed text-white/60 md:text-[13px]">
                The VeriTrack wearable holds a soft capacitive stack against an arterial site.
                Scroll to pull it apart.
              </p>

              <ol className="mt-8 divide-y divide-white/10 text-left">
                {layers.map((l, i) => (
                  <li
                    key={l.name}
                    className={`flex gap-4 py-3 transition-opacity duration-300 first:pt-0 last:pb-0 ${
                      i === active ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <span className="mt-0.5 font-mono text-[11px] text-[color:var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-display text-[13px] font-bold leading-tight tracking-tight text-white">
                        {l.name}
                      </span>
                      <span className="mt-1 block text-[11px] leading-snug text-white/60">
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

            {/* Exploded-view frame sequence, scrubbed by scroll. No frame or
                rounding — the black frames bleed straight into the black
                section so the device floats on the right. The radial mask
                feathers the frame edges (which aren't quite pure black) into
                the section so no rectangle shows. */}
            <div
              className="reveal relative aspect-[4/3] w-full overflow-hidden"
              style={{
                maskImage: "radial-gradient(125% 125% at 50% 50%, #000 82%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(125% 125% at 50% 50%, #000 82%, transparent 100%)",
              }}
            >
              {reduced ? (
                <img
                  src={STATIC_FRAME}
                  alt="The VeriTrack wearable, shown as an exploded view of its layers"
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              ) : (
                <canvas
                  ref={canvasRef}
                  width={FRAME_W}
                  height={FRAME_H}
                  aria-hidden
                  className="h-full w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
