import type { ReactNode } from "react";

/**
 * Device shell for screen content shown in landscape, shaped after an iPad.
 *
 * The shell is artwork rather than CSS: `public/assets/home/ipad-frame.png`,
 * whose screen is a transparent cutout. The image is painted over the screen
 * well and the content shows through the hole, so the bezel, side rail, camera
 * and buttons all come from the artwork.
 *
 * Both boxes below are measured off the artwork's own alpha channel, as a
 * fraction of its width and height, so they hold at any rendered size:
 *
 *   screen   left 4.1667%   top 5.614%   91.667% x 88.772%   (~1.45:1)
 *   device   left 0.75%     top 0.819%   98.5%   x 98.363%
 *
 * A child is expected to fill the screen box.
 */
const SCREEN = {
  left: "4.1667%",
  top: "5.614%",
  width: "91.6666%",
  height: "88.772%",
} as const;

/** The device silhouette, which is what casts the shadow. */
const DEVICE = {
  left: "0.75%",
  top: "0.819%",
  width: "98.5%",
  height: "98.363%",
} as const;

export function IPadFrame({
  children,
  className = "",
  screenClassName = "",
}: {
  children: ReactNode;
  /** Sizing for the device as a whole — width, max-width, scale. */
  className?: string;
  /** Extra classes for the screen well, e.g. a different background. */
  screenClassName?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Contact shadow, on its own box behind everything else. It cannot go
          on the <img>: a drop-shadow filter follows the alpha, and the screen
          is a hole in that alpha, so the shadow would fall through the cutout
          and darken the top of the video. Pulled in with a negative spread so
          it stays a contact shadow under the device rather than a grey cloud
          smudged across the page behind it. The radius matches the artwork's
          own 5.25%-of-width outer corner at the size this renders at. */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-[28px] shadow-[0_16px_34px_-14px_rgba(16,20,26,0.45)]"
        style={DEVICE}
      />
      {/* Screen well next, so the artwork below it paints on top. The dark
          fill stands in for the screen until the content has loaded. */}
      <div
        className={`absolute overflow-hidden rounded-[8px] bg-[#0b0d12] md:rounded-[10px] ${screenClassName}`}
        style={SCREEN}
      >
        {children}
      </div>
      <img
        src="/assets/home/ipad-frame.png"
        alt=""
        aria-hidden
        className="relative block w-full"
      />
    </div>
  );
}
