import { useEffect, useRef } from "react";

/**
 * A thin accent line pinned to the very top of the viewport that fills as the
 * page scrolls, a quiet, clinical "read position" indicator. Uses rAF-throttled
 * scroll reads and a transform-only update to stay cheap.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div
        ref={ref}
        className="h-full w-full origin-left bg-[color:var(--accent)]"
        style={{ transform: "scaleX(0)", boxShadow: "0 0 12px var(--accent)" }}
      />
    </div>
  );
}
