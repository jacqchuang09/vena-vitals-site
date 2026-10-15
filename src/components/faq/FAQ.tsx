import { useState } from "react";

import faq from "@content/faq.json";

// [EDIT NEEDED (content/faq.json, questions): add a calibration FAQ. The device
// requires calibration, so a clear Q&A on how/when it is calibrated (and
// against what reference) should be added here once the team confirms the
// details. Avoid any "no cuff / cuffless" framing — the device is noninvasive
// and continuous, but not cuff-free.]
const { hero, questions } = faq;

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative bg-[color:var(--ink)] pt-40 pb-28 md:pb-40">
      <div className="container-x">
        <div>
          <div className="max-w-4xl reveal">
            <h1 className="section-heading mt-6 text-[color:var(--paper)]">
              {hero.title}
              <span className="text-[color:var(--accent)]">{hero.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-[color:var(--paper)] text-sm leading-relaxed">
              {hero.body}
            </p>
          </div>
          <div className="mt-14 min-w-0">
            <ul className="hairline-b border-t border-[color:var(--line)]">
              {questions.map((it, i) => {
                const expanded = open === i;
                return (
                  <li key={it.question} className="hairline-b">
                    <button
                      onClick={() => setOpen(expanded ? null : i)}
                      className="w-full flex items-start justify-between gap-8 py-7 text-left group"
                      aria-expanded={expanded}
                    >
                      <span className="font-display text-[color:var(--paper)] text-base md:text-xl tracking-tight leading-[1.18] group-hover:text-[color:var(--accent)] transition-colors">
                        {it.question}
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
                          {it.answer}
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
