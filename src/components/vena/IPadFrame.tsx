import type { ReactNode } from "react";

/**
 * Device shell for screen content shown in landscape, shaped after an iPad Pro.
 *
 * Geometry follows the current (M4) iPad Pro held in landscape: the front
 * camera sits centred on the long top edge, the power button is on that same
 * top edge toward the right corner, and the two volume buttons are on the right
 * edge just below it. Buttons sit a couple of pixels proud of the bezel, so the
 * wrapper must not clip its overflow.
 *
 * The child is expected to be 1.43:1, the real iPad Pro 11" screen ratio.
 */
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
      {/* Power button: top edge, right of centre. */}
      <span
        aria-hidden
        className="absolute -top-[3px] right-[17%] h-[4px] w-[9%] rounded-t-[2px] bg-gradient-to-b from-[#4a4a50] to-[#26262b] md:-top-[4px] md:h-[5px]"
      />
      {/* Volume up / down: right edge, toward the top. */}
      <span
        aria-hidden
        className="absolute -right-[3px] top-[19%] h-[7%] w-[4px] rounded-r-[2px] bg-gradient-to-r from-[#26262b] to-[#4a4a50] md:-right-[4px] md:w-[5px]"
      />
      <span
        aria-hidden
        className="absolute -right-[3px] top-[28%] h-[7%] w-[4px] rounded-r-[2px] bg-gradient-to-r from-[#26262b] to-[#4a4a50] md:-right-[4px] md:w-[5px]"
      />

      {/* Bezel. The shadow is what gives the whole thing depth, so it stays. */}
      <div className="relative rounded-[30px] bg-gradient-to-b from-[#2a2a2e] to-[#141416] p-2.5 shadow-[0_40px_90px_rgba(0,0,0,0.4)] ring-1 ring-black/50 md:rounded-[34px] md:p-3">
        {/* Front camera, centred on the long top edge. */}
        <span
          aria-hidden
          className="absolute left-1/2 top-[7px] z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/20 md:top-2"
        />
        <div
          className={`overflow-hidden rounded-[20px] bg-[#0b0d12] md:rounded-[26px] ${screenClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
