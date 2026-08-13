import { Link } from "@tanstack/react-router";
import { BarChart3, ClipboardCheck, FileText, Hospital, Users } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { StretchText } from "./StretchText";

// These previously held internal instructions for whoever wrote the page
// ("Frame the value around…", "Give value-analysis committees…"). Rewritten as
// visitor-facing descriptions of what the evaluation provides.
// [EDIT NEEDED: confirm the economic framing and that a spec sheet / evidence
// summary / regulatory-status language are available to share.]
const economicPoints = [
  {
    icon: BarChart3,
    title: "The economic case",
    body: "We help frame the value for your setting — missed-hypotension risk, arterial-line procedure burden, nursing workflow, and consumable use.",
  },
  {
    icon: ClipboardCheck,
    title: "The workflow case",
    body: "VeriTrack adds continuous pressure to the perioperative workflow — setup, placement, calibration, and monitoring — without replacing your existing monitor stack.",
  },
  {
    icon: FileText,
    title: "Committee materials",
    body: "For value-analysis committees, we can provide a spec sheet, an evidence summary, and current regulatory-status language.",
  },
];

const pilotSteps = [
  ["01", "Scope", "Confirm setting, patient population, endpoints, and review pathway."],
  [
    "02",
    "Prepare",
    "Train clinical users, confirm data flow, and align review board or evaluation needs.",
  ],
  ["03", "Run", "Support placement workflow, data capture, and weekly check-ins."],
  ["04", "Review", "Return summary data, workflow findings, and next-step recommendations."],
];

// These were internal planning notes, not answers a partner would read
// (e.g. "Public claims should follow approved 510(k) pending language",
// "…shown in the deck… framed as roadmap unless confirmed"). Rewritten as
// honest, visitor-facing answers.
// [EDIT NEEDED: confirm the integration roadmap and consumable configuration
// before these are treated as final public statements.]
const faqs = [
  [
    "Regulatory status",
    "VeriTrack is an investigational device. Commercial availability is subject to regulatory clearance.",
  ],
  [
    "Integration",
    "The sensor streams over Bluetooth to a tablet today. Bedside-monitor, health-record, and dashboard integrations are on the product roadmap.",
  ],
  [
    "Training",
    "Evaluation includes training on placement, signal confirmation, calibration, and troubleshooting.",
  ],
  [
    "Consumables",
    "Reusable and single-use component details are shared as the product configuration is finalized.",
  ],
  [
    "Data and privacy",
    "Each pilot defines data export, storage, access, and institutional privacy review up front.",
  ],
];

// [VERIFY] confirm each institution is an active/authorized site and that Vēna
// has permission to display its name before launch.
const logos = [
  { name: "University of California, Irvine", href: "https://www.uci.edu/" },
  { name: "University of Vermont", href: "https://www.uvm.edu/" },
  { name: "Hoag", href: "https://www.hoag.org/" },
  { name: "University of California San Francisco", href: "https://www.ucsf.edu/" },
  { name: "Henry Ford", href: "https://www.henryford.com/" },
  { name: "Arkansas Heart", href: "https://www.arheart.com/" },
];

// Decomposed from the single "Built for ..." sentence this replaces — no new
// audiences introduced.
const audiences = [
  "Clinical leaders",
  "Operating room teams",
  "Critical care teams",
  "Supply chain",
  "Value-analysis committees",
];

export function Partner() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-center">
          <div className="mx-auto max-w-[390px] text-center reveal md:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Partner with us
            </div>
            <StretchText
              as="h1"
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Bring continuous, noninvasive blood pressure to " },
                { text: "your facility.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[340px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
              Evaluate VeriTrack in your operating room or ICU through a structured pilot.
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--paper)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
              >
                Start a pilot conversation{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
          {/* The audiences broken out as rows rather than one sentence in an
              otherwise empty panel. */}
          <div className="reveal rounded-[32px] bg-[color:var(--ink-2)] p-7 shadow-[0_18px_60px_rgba(43,43,43,0.05)] md:p-9">
            <div className="flex items-center gap-2.5">
              <Hospital size={18} className="shrink-0 text-[color:var(--accent)]" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                Who this is for
              </span>
            </div>
            <ul className="mt-5 divide-y divide-[color:var(--line)]">
              {audiences.map((a, i) => (
                <li key={a} className="flex items-baseline gap-4 py-3 first:pt-0 last:pb-0">
                  <span className="font-mono text-[11px] text-[color:var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs leading-relaxed text-[color:var(--paper)] md:text-[13px]">
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
        <div className="container-x">
          <div className="mx-auto max-w-[500px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              The economic case
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Build the case for " },
                { text: "your site.", className: "text-[color:var(--accent)]" },
              ]}
            />
          </div>
          <div className="mx-auto mt-10 grid max-w-[980px] gap-4 md:grid-cols-3">
            {economicPoints.map((point) => {
              const Icon = point.icon;
              return (
                <TiltCard
                  as="article"
                  key={point.title}
                  className="reveal rounded-[30px] bg-[color:var(--ink)] p-6 md:p-7"
                >
                  <div className="flex h-10 w-10 items-center justify-center border border-[color:var(--line)] text-[color:var(--accent)]">
                    <Icon size={18} aria-hidden />
                  </div>
                  <h3 className="mt-6 font-display text-base font-bold leading-tight tracking-tight text-[color:var(--paper)]">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-[11px] leading-relaxed text-[color:var(--paper)]">
                    {point.body}
                  </p>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x grid gap-8 md:grid-cols-[0.58fr_1.42fr] md:items-center">
          <div className="mx-auto max-w-[320px] text-center reveal md:text-left">
            <div className="mx-auto flex h-11 w-11 items-center justify-center border border-[color:var(--line)] text-[color:var(--accent)] md:mx-0">
              <Users size={20} aria-hidden />
            </div>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              How it works
            </div>
            <StretchText
              as="h2"
              className="mt-6 font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "The evaluation " },
                { text: "program.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[290px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
              A structured pilot gives your team a clear timeline, hands-on support, defined data
              outputs, and a shared definition of success.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {pilotSteps.map(([n, title, body]) => (
              <TiltCard key={title} className="reveal rounded-[28px] bg-[color:var(--ink-2)] p-5">
                <div className="font-mono text-xs text-[color:var(--accent)]">{n}</div>
                <div className="mt-4 font-display text-base tracking-tight text-[color:var(--paper)]">
                  {title}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[color:var(--paper)]">{body}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
        <div className="container-x grid gap-8 md:grid-cols-[0.32fr_1fr] md:items-center">
          <div className="mx-auto max-w-[280px] text-center reveal md:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Clinical sites
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Studied with " },
                { text: "clinical teams.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[260px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
              Use these names only after partner and team approval.
            </p>
          </div>
          <div className="reveal grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {logos.map((logo) => (
              <TiltCard
                as="a"
                key={logo.name}
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-24 items-center justify-center rounded-[24px] bg-[color:var(--ink)] px-4 text-center text-xs font-semibold tracking-normal text-[color:var(--paper)]"
              >
                {logo.name}
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x grid gap-8 md:grid-cols-[0.58fr_1.42fr] md:items-center">
          <div className="mx-auto max-w-[320px] text-center reveal md:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              FAQ
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Common pilot " },
                { text: "questions.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[290px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
              What teams ask most when scoping an evaluation.
            </p>
          </div>
          <div className="reveal rounded-[32px] bg-[color:var(--ink-2)] p-5 md:p-6">
            {faqs.map(([q, a]) => (
              <details
                key={q}
                className="group border-b border-[color:var(--line)] py-3 last:border-b-0"
              >
                <summary className="cursor-pointer list-none font-display text-sm tracking-tight text-[color:var(--paper)] transition group-open:text-[color:var(--accent)]">
                  {q}
                </summary>
                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[color:var(--paper)]">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA. There's a single lead form site-wide (/contact); this
          page makes the case and hands off to it rather than carrying its own
          duplicate form. */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-[560px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Get started
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Start an evaluation " },
                { text: "conversation.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[440px] text-xs leading-relaxed text-[color:var(--paper)]">
              Tell us about your facility and evaluation interest, and the team will follow up with
              pilot and evidence-packet details.
            </p>
            <div className="mt-9">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--paper)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
              >
                Request a demo{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
