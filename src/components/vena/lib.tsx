import { useEffect, useRef, useState } from "react";

/**
 * Counts a number up from 0 → target once the element scrolls into view.
 * Returns a ref to attach and the current display value.
 */
export function useCountUp(
  target: number,
  {
    duration = 1400,
    decimals = 0,
    linear = false,
  }: { duration?: number; decimals?: number; linear?: boolean } = {},
) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          // easeOutExpo for a confident settle; linear ramps evenly so small
          // targets keep climbing across the full duration instead of snapping.
          const eased = linear ? p : p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          const raw = eased * target;
          setValue(decimals ? Number(raw.toFixed(decimals)) : Math.round(raw));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration, decimals, linear]);

  return { ref, value };
}

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const revealIfVisible = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const visible =
        rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08;
      if (visible) el.classList.add("is-in");
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          const el = e.target as HTMLElement;
          // Reveal once, then stop watching so content never fades back out
          // when it scrolls off-screen (sections are full-height + snap).
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add("is-in"), i * 70);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    const revealVisible = () => {
      els.forEach((el) => revealIfVisible(el));
    };
    els.forEach((el) => {
      revealIfVisible(el);
      io.observe(el);
    });
    const settledCheck = window.setTimeout(revealVisible, 140);
    window.addEventListener("scroll", revealVisible, { passive: true });
    return () => {
      io.disconnect();
      window.clearTimeout(settledCheck);
      window.removeEventListener("scroll", revealVisible);
    };
  }, []);
}

export function Wordmark({
  className = "",
  size = "text-base",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <span
      className={`font-display font-bold tracking-tight ${size} ${className}`}
      style={{ letterSpacing: "0.04em" }}
    >
      vēna<span className="text-[color:var(--mute)] ml-1.5">vitals</span>
    </span>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`eyebrow ${className}`}>{children}</div>;
}

export function VisualPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full min-h-[220px] w-full items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#f7f7f7,#eeeeee)] p-8 text-center text-sm leading-relaxed text-[color:var(--mute)] ${className}`}
    >
      {label}
    </div>
  );
}
