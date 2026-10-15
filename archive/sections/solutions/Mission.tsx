import { useState } from "react";
import clinicalImg from "@/assets/clinical.jpg";
import footImg from "@/assets/foot.jpg";
import dataImg from "@/assets/data.jpg";

const tabs = [
  {
    id: "icu",
    label: "critical care & operating room",
    title: "Continuous blood pressure at the bedside.",
    body: "Track systolic, diastolic, and mean arterial pressure trends without placing an arterial line. Designed to support monitoring in high-acuity settings.",
    img: clinicalImg,
  },
  {
    id: "ward",
    label: "Ward & Step-down",
    title: "Fewer gaps between vital sign checks.",
    body: "Continuous trends can help teams see hypotension, hypertension, or recovery patterns between routine cuff measurements.",
    img: footImg,
  },
  {
    id: "home",
    label: "At-home & Trials",
    title: "Follow blood pressure trends outside the hospital.",
    body: "Use the same wearable sensor for home monitoring, post-procedure follow-up, medication titration, and clinical studies.",
    img: dataImg,
  },
] as const;

export function Mission() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("icu");
  const activeIndex = tabs.findIndex((t) => t.id === active);
  const current = tabs[activeIndex] ?? tabs[0];

  return (
    <section className="relative bg-[color:var(--ink)] pt-28 md:pt-40 pb-28 md:pb-40 hairline-b">
      <div className="container-x">
        <div className="max-w-4xl reveal">
          <h2 className="section-heading text-[color:var(--paper)] mt-6">
            Continuous blood pressure across care settings.
          </h2>
          <p className="mt-8 max-w-2xl text-[color:var(--paper)] text-lg leading-relaxed">
            Vēna is designed for inpatient monitoring, step-down care, and follow-up outside the
            hospital. The goal is simple: fewer gaps in blood pressure data.
          </p>
        </div>

        <div className="mt-14 reveal">
          <div className="grid gap-px bg-[color:var(--line)] md:grid-cols-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`min-h-[74px] px-5 py-4 text-left text-xs tracking-normal font-mono transition-colors ${
                  active === t.id
                    ? "bg-[color:var(--ink-2)] text-[color:var(--paper)]"
                    : "bg-[color:var(--ink)] text-[color:var(--mute)] hover:bg-[color:var(--line)] hover:text-[color:var(--paper)]"
                }`}
              >
                <span className="opacity-50 mr-3">0{tabs.indexOf(t) + 1}</span>
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-12 gap-10 md:gap-14 mt-12">
            <div className="md:col-span-5 flex flex-col">
              <h3 className="font-display text-2xl md:text-3xl text-[color:var(--paper)] leading-[1.08] tracking-tight">
                {current.title}
              </h3>
              <p className="mt-6 text-[color:var(--paper)] leading-relaxed">{current.body}</p>
              <ul className="mt-10 space-y-3">
                {[
                  "Continuous systolic, diastolic, and mean arterial pressure",
                  "Soft sensor worn on the skin",
                  "Wireless data transfer",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[color:var(--paper)]">
                    <span className="h-px w-6 bg-[color:var(--accent)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-7 relative aspect-[4/3] overflow-hidden">
              <img
                key={current.id}
                src={current.img}
                alt={current.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ animation: "fade-up .8s ease both" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[color:var(--ink)] to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 eyebrow text-[color:var(--paper)]">
                <span>vēna · {current.label}</span>
                <span>
                  live · {current.id.toUpperCase()}-{String(activeIndex + 1).padStart(3, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
