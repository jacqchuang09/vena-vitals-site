import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      x += (tx - x) * 0.035;
      y += (ty - y) * 0.035;
      if (ref.current) ref.current.style.transform = `translate3d(${x - 280}px, ${y - 280}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[560px] w-[560px] rounded-full hidden md:block"
      style={{
        background:
          "radial-gradient(closest-side, rgba(216,74,74,0.1), rgba(216,74,74,0.035) 45%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
