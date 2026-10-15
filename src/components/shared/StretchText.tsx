import { type ElementType } from "react";

export type StretchSegment = { text: string; className?: string };

/**
 * Renders a heading from accent-colored segments. (Previously the letters
 * stretched toward the cursor; that interaction has been removed.)
 */
export function StretchText({
  as,
  segments,
  className = "",
}: {
  as?: ElementType;
  segments: StretchSegment[];
  className?: string;
  /** Retained for call-site compatibility; no longer used. */
  radius?: number;
}) {
  const Tag = (as ?? "h2") as ElementType;
  return (
    <Tag className={className}>
      {segments.map((seg, si) => (
        <span key={si} className={seg.className ?? ""}>
          {seg.text}
        </span>
      ))}
    </Tag>
  );
}
