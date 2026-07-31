import { Link } from "@tanstack/react-router";

const pieces = [
  {
    eyebrow: "01 · Sensor",
    title: "Wearable sensor",
    body: "Soft sensor worn on the wrist or foot. Designed for multi-day monitoring with wireless data transfer.",
  },
  {
    eyebrow: "02 · Patient app",
    title: "Patient app",
    body: "Shows systolic, diastolic, mean arterial pressure, and pulse trends, with alerts and history for the patient or study workflow.",
  },
  {
    eyebrow: "03 · Clinician monitor",
    title: "Clinician view",
    body: "Supports review on a monitor or dashboard, with data exports for clinical studies and treatment follow-up.",
  },
];

export function Product() {
  return (
    <section className="relative bg-[color:var(--ink)] pt-40 pb-28 md:pb-40">
      <div className="container-x">
        <div className="max-w-4xl reveal">
          <h1 className="section-heading text-[color:var(--paper)] mt-6">
            Wearable blood pressure{" "}
            <span className="text-[color:var(--accent)]">monitoring system.</span>
          </h1>
          <p className="mt-8 text-[color:var(--paper)] text-lg leading-relaxed max-w-2xl">
            Vēna includes the wearable sensor, patient app, and clinician-facing tools needed to
            collect and review continuous blood pressure data.
          </p>
        </div>

        <div className="mt-20 grid gap-8">
          {pieces.map((p, i) => (
            <div
              key={p.title}
              className={`grid overflow-hidden rounded-[32px] bg-[color:var(--ink-2)] md:grid-cols-12 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
            >
              <div className="relative aspect-[16/10] [direction:ltr] md:col-span-6 md:min-h-[420px] md:aspect-auto">
                <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--ink)] text-center text-sm text-[color:var(--mute)]">
                  {p.title} placeholder
                </div>
              </div>
              <div className="md:col-span-6 p-8 md:p-10 lg:p-14 flex flex-col justify-center reveal [direction:ltr]">
                <div className="eyebrow">{p.eyebrow}</div>
                <h2 className="font-display text-[color:var(--paper)] text-2xl md:text-3xl xl:text-4xl mt-5 tracking-tight leading-[1.06]">
                  {p.title}
                </h2>
                <p className="mt-6 max-w-md text-[color:var(--paper)] leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-6 reveal">
          <p className="font-display text-[color:var(--paper)] text-xl md:text-3xl max-w-xl leading-tight tracking-tight">
            Built for <span className="text-[color:var(--accent)]">clinical workflows.</span>
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-[color:var(--accent)] text-[color:var(--ink)] px-6 py-4 text-xs font-semibold tracking-normal hover:bg-[color:var(--paper)] transition-colors"
          >
            Talk to our team{" "}
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
