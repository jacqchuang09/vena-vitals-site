import type { ReactNode } from "react";

/**
 * Device shell for screen content shown in landscape, shaped after an iPad.
 *
 * Geometry is measured off the reference photograph in
 * `Vena Vitals Website Source Docs`, an iPad held in landscape with the camera
 * edge on the left. Every figure below is a fraction of the device's own width
 * or height, so the shell keeps its proportions at any size:
 *
 *   bezel            3.7% of width, uniform on all four sides
 *   volume buttons   top edge, 8.0% to 17.0% from the left corner
 *   power button     left edge, 7.3% to 14.0% down from the top corner
 *   front camera     left bezel, 42% down
 *   screen corners   1.6% of screen width, much squarer than the outer shell
 *   outer corners    5.5% of width
 *
 * Buttons sit a couple of pixels proud of the bezel, so the wrapper must not
 * clip its overflow.
 *
 * The child is expected to be 1.43:1, the iPad screen ratio the reference
 * measures at.
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
      {/* Volume up / down: top edge, toward the left corner. */}
      <span
        aria-hidden
        className="absolute -top-[3px] left-[8%] h-[4px] w-[4%] rounded-t-[2px] bg-gradient-to-b from-[#4a4a50] to-[#26262b] md:-top-[4px] md:h-[5px]"
      />
      <span
        aria-hidden
        className="absolute -top-[3px] left-[13%] h-[4px] w-[4%] rounded-t-[2px] bg-gradient-to-b from-[#4a4a50] to-[#26262b] md:-top-[4px] md:h-[5px]"
      />
      {/* Power: left edge, near the top corner. */}
      <span
        aria-hidden
        className="absolute -left-[3px] top-[7.3%] h-[6.7%] w-[4px] rounded-l-[2px] bg-gradient-to-l from-[#26262b] to-[#4a4a50] md:-left-[4px] md:w-[5px]"
      />

      {/* Bezel. The shadow is what gives the whole thing depth, so it stays.
          Percentage padding resolves against width on every side, which is
          what keeps the bezel square all the way round. */}
      <div className="relative rounded-[28px] bg-gradient-to-b from-[#2a2a2e] to-[#141416] p-[3.7%] shadow-[0_40px_90px_rgba(0,0,0,0.4)] ring-1 ring-black/50 md:rounded-[30px]">
        {/* Front camera, on the left bezel rather than the long top edge. */}
        <span
          aria-hidden
          className="absolute left-[1.85%] top-[42%] z-10 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20"
        />
        <div
          className={`overflow-hidden rounded-[8px] bg-[#0b0d12] md:rounded-[10px] ${screenClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
