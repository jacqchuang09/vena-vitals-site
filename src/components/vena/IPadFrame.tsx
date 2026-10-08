import type { ReactNode } from "react";

/**
 * Device shell for screen content shown in landscape, shaped after an iPad.
 *
 * Geometry is measured off the reference photograph in
 * `Vena Vitals Website Source Docs`, an iPad held in landscape with the camera
 * edge on the left. Every figure below is a fraction of the device's own width
 * or height, so the shell keeps its proportions at any size:
 *
 *   bezel            3.7% of width, uniform on all four sides, split between
 *                    a 0.8% silver side rail and a 2.9% dark bezel face
 *   volume buttons   top edge, 8.0% to 17.0% from the left corner
 *   power button     left edge, 7.3% to 14.0% down from the top corner
 *   front camera     left bezel, centred on both axes
 *   screen corners   1.6% of screen width, much squarer than the outer shell
 *   outer corners    5.5% of width
 *
 * The shell is a silver iPad Pro: a dark bezel face, as on the real device,
 * inside a thin band of machined aluminium. The rail is the part that does the
 * work here, since without it a dark slab has no edge to read against a light
 * page.
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
      {/* Volume up / down: top edge, toward the left corner. Mid-silver with
          their own contour — at near-white they read as paper tabs stuck to
          the edge rather than machined buttons. */}
      <span
        aria-hidden
        className="absolute -top-[4px] left-[8%] h-[5px] w-[4%] rounded-t-[2px] border border-b-0 border-[#7d848e] bg-gradient-to-b from-[#d9dde2] to-[#9ba2ac] md:-top-[5px] md:h-[6px]"
      />
      <span
        aria-hidden
        className="absolute -top-[4px] left-[13%] h-[5px] w-[4%] rounded-t-[2px] border border-b-0 border-[#7d848e] bg-gradient-to-b from-[#d9dde2] to-[#9ba2ac] md:-top-[5px] md:h-[6px]"
      />
      {/* Power: left edge, near the top corner. */}
      <span
        aria-hidden
        className="absolute -left-[4px] top-[7.3%] h-[6.7%] w-[5px] rounded-l-[2px] border border-r-0 border-[#7d848e] bg-gradient-to-l from-[#9ba2ac] to-[#d9dde2] md:-left-[5px] md:w-[6px]"
      />

      {/* Aluminium side rail. Lit from the top left and falling off toward the
          bottom right, which is where the highlights come from — no specular
          streaks. The shadow is pulled in with a negative spread so it stays a
          contact shadow under the device; a wide soft one at this blur reads
          as a grey cloud smudged across the page behind it. */}
      <div className="relative rounded-[30px] border border-[#8a919b] bg-[linear-gradient(145deg,#c2c8d0_0%,#eef0f3_10%,#b4bac3_34%,#7f868f_52%,#b0b7bf_72%,#e4e7ea_90%,#a9b0b9_100%)] p-[0.8%] shadow-[0_16px_34px_-14px_rgba(16,20,26,0.45)] md:rounded-[32px]">
        {/* Bezel face. Percentage padding resolves against width on every
            side, which is what keeps the bezel square all the way round. The
            inset ring is the shadow the rail casts onto the glass. */}
        <div className="relative rounded-[28px] bg-gradient-to-b from-[#2a2a2e] to-[#141416] p-[2.9%] ring-1 ring-inset ring-white/10 md:rounded-[30px]">
          {/* Front camera: on the left bezel rather than the long top edge,
              and centred on that edge, halfway down and halfway through. */}
          <span
            aria-hidden
            className="absolute left-[1.45%] top-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20"
          />
          <div
            className={`overflow-hidden rounded-[8px] bg-[#0b0d12] md:rounded-[10px] ${screenClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
