import { useState } from "react";

const items = [
  {
    q: "How does Vēna measure blood pressure without a cuff?",
    a: "A soft sensor is worn over an arterial site, such as the wrist or foot. The sensor detects pulse-related pressure changes and converts them into systolic, diastolic, and mean arterial pressure trends.",
  },
  {
    q: "Is it accurate compared to invasive monitoring?",
    a: "In validation studies, Vēna has shown mean error under 3 mmHg compared with radial arterial line measurements. Full study data are available on request.",
  },
  {
    q: "Where is the sensor worn?",
    a: "Either the inner wrist (over the radial artery) or the top of the foot. Both sites yield a clean beat-to-beat waveform; clinicians choose based on patient and workflow.",
  },
  {
    q: "How does the data reach the chart?",
    a: "The sensor sends data wirelessly to a phone or bedside gateway. From there, readings can be forwarded to a monitor, dashboard, health record workflow, or research database.",
  },
  {
    q: "What is the regulatory status?",
    a: "Vēna is an investigational device. Performance claims reference internal validation and ongoing studies. Commercial availability is subject to regulatory clearance in each geography.",
  },
  {
    q: "Can patients wear it at home?",
    a: "Yes. Vēna is designed for hospital, ambulatory, and home use, including post-procedure follow-up, medication titration, and decentralized clinical trials.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative bg-[color:var(--ink)] pt-40 pb-28 md:pb-40">
      <div className="container-x">
        <div>
          <div className="max-w-4xl reveal">
            <h1 className="section-heading mt-6 text-[color:var(--paper)]">
              Common <span className="text-[color:var(--accent)]">questions.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[color:var(--paper)] text-sm leading-relaxed">
              Clear answers about the sensor, the measurements, data transfer, and current
              availability.
            </p>
          </div>
          <div className="mt-14 min-w-0">
            <ul className="hairline-b border-t border-[color:var(--line)]">
              {items.map((it, i) => {
                const expanded = open === i;
                return (
                  <li key={it.q} className="hairline-b">
                    <button
                      onClick={() => setOpen(expanded ? null : i)}
                      className="w-full flex items-start justify-between gap-8 py-7 text-left group"
                      aria-expanded={expanded}
                    >
                      <span className="font-display text-[color:var(--paper)] text-base md:text-xl tracking-tight leading-[1.18] group-hover:text-[color:var(--accent)] transition-colors">
                        {it.q}
                      </span>
                      <span
                        aria-hidden
                        className={`shrink-0 mt-2 h-6 w-6 border border-[color:var(--line)] flex items-center justify-center text-[color:var(--paper)] transition-transform duration-500 ${
                          expanded ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="grid transition-all duration-500"
                      style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-7 max-w-2xl text-[color:var(--paper)] leading-relaxed">
                          {it.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
