// Sections taken off the Technology page on 15 Oct 2026 during the code cleanup.
// Nothing renders these. They are kept so they can be put back instead of
// rebuilt: copy the pieces you want into src/components/technology/ and add the
// section to the page. See archive/README.md for the steps.
//
// The imports are the ones the original file had; some may be unused here.
import { useEffect, useRef, useState } from "react";
import { BatteryLow, Bluetooth, Factory, Gauge, Radar, Repeat, ShieldCheck } from "lucide-react";
import { StretchText } from "@/components/shared/StretchText";

function TechnicalDetail() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-normal text-[color:var(--accent)] transition hover:text-white"
        aria-expanded={open}
      >
        <span
          aria-hidden
          className={`inline-block text-[9px] transition-transform ${open ? "" : "rotate-180"}`}
        >
          ▲
        </span>
        {open ? "Hide technical detail" : "Show technical detail"}
      </button>
      {open && (
        <p className="mt-3 max-w-[460px] text-[11px] leading-relaxed text-white/75 md:text-xs">
          The sensing element is a wrinkled-gold (wAu) capacitive stack: a dielectric layer,
          silicone elastomer, air gap, and PDMS spacer. Each arterial pulse compresses the
          micropillar structure and changes the capacitance. An onboard algorithm converts those
          capacitance changes into continuous SBP, DBP, and MAP values with beat-to-beat resolution.
        </p>
      )}
    </div>
  );
}
