import { useRef, type ElementType, type PointerEvent, type ReactNode } from "react";

/**
 * A content card that leans subtly toward the cursor and lifts on hover.
 * Movement is small by design and disabled for prefers-reduced-motion users.
 */
export function TiltCard({
  as,
  className = "",
  children,
  max = 6,
  lift = 5,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Maximum tilt in degrees. */
  max?: number;
  /** Hover lift in pixels. */
  lift?: number;
  [key: string]: unknown;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(720px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(
      px * max
    ).toFixed(2)}deg) translateY(-${lift}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <Tag
      ref={ref}
      {...rest}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform ${className}`}
    >
      {children}
    </Tag>
  );
}
