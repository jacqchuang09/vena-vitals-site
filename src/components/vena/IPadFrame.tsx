import type { ReactNode } from "react";

/**
 * Device shell for screen content shown in landscape, shaped after an iPad.
 *
 * The shell is artwork rather than CSS: `public/assets/home/ipad-frame.png`,
 * whose screen is a transparent cutout. The image is painted over the screen
 * well and the content shows through the hole, so the bezel, side rail, camera
 * and buttons all come from the artwork.
 *
 * The cutout is measured off the artwork's own alpha channel, as a fraction of
 * its width and height, so it holds at any rendered size:
 *
 *   left   4.1667%     right   95.8333%
 *   top    5.614%      bottom  94.386%
 *
 * That leaves a screen of 91.667% x 88.772%, a ratio of about 1.45:1, which is
 * what a child should expect to fill.
 */
const SCREEN = {
  left: "4.1667%",
  top: "5.614%",
  width: "91.6666%",
  height: "88.772%",
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
      {/* Screen well first, so the artwork below it paints on top. The dark
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
