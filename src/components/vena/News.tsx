import { FileText, Image, Newspaper } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { StretchText } from "./StretchText";

// The newsroom has no published items yet, so each card describes the kind of
// update its category will carry rather than stating a fake headline. These are
// forward-looking ("will be posted here"), not claims of anything having
// happened — safe to show publicly.
//
// [EDIT NEEDED: replace these category placeholders with real, dated updates as
//  they are approved. Company: funding, pilot, and regulatory milestones.
//  Evidence: abstracts, posters, and evidence summaries once publication
//  permissions are confirmed. Research: research-direction notes, kept distinct
//  from cleared product claims.]
const updates = [
  {
    label: "Company",
    title: "Company milestones",
    body: "Funding, pilots, and regulatory milestones will be posted here as they are announced.",
  },
  {
    label: "Evidence",
    title: "Evidence & publications",
    body: "Abstracts, posters, and evidence summaries as publication permissions are confirmed.",
  },
  {
    label: "Research",
    title: "Research notes",
    body: "Updates on research across perioperative and sleep monitoring.",
  },
];

const kit = [
  {
    icon: FileText,
    title: "Boilerplate",
    body: "Short company description and approved regulatory language.",
  },
  {
    icon: Image,
    title: "Logos and media",
    body: "Approved logos, product visuals, and leadership photos.",
  },
  {
    icon: Newspaper,
    title: "Press contact",
    body: "A clear path for interviews, announcements, and media questions.",
  },
];

export function News() {
  return (
    <>
      {/* Centered hero — no image column. There's no press asset to show, and an
          empty placeholder box read as broken. */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x">
          <div className="mx-auto max-w-[600px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Newsroom
            </div>
            <StretchText
              as="h1"
              className="font-display text-[clamp(28px,3.4vw,48px)] font-bold leading-[1.05] tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Company updates and " },
                { text: "press resources.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[440px] text-sm leading-relaxed text-[color:var(--mute)]">
              Announcements, evidence updates, and approved media materials for press and partners.
            </p>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
        <div className="container-x">
          <div className="mx-auto max-w-[500px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Latest
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Announcements, evidence, and " },
                { text: "research notes.", className: "text-[color:var(--accent)]" },
              ]}
            />
          </div>
          <div className="mx-auto mt-10 grid max-w-[980px] gap-4 md:grid-cols-3">
            {updates.map((update) => (
              <TiltCard
                as="article"
                key={update.title}
                className="reveal rounded-[30px] bg-[color:var(--ink)] p-6 md:p-7"
              >
                <div className="text-[11px] font-semibold tracking-normal text-[color:var(--accent)]">
                  {update.label}
                </div>
                <h3 className="mt-6 font-display text-base font-bold leading-tight tracking-tight text-[color:var(--paper)]">
                  {update.title}
                </h3>
                <p className="mt-4 text-xs leading-relaxed text-[color:var(--paper)]/70">
                  {update.body}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x grid gap-8 md:grid-cols-[0.58fr_1.42fr] md:items-center">
          <div className="mx-auto max-w-[320px] text-center reveal md:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Press kit
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Approved assets for " },
                { text: "media and partners.", className: "text-[color:var(--accent)]" },
              ]}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {kit.map((item) => {
              const Icon = item.icon;
              return (
                <TiltCard
                  key={item.title}
                  className="reveal rounded-[28px] bg-[color:var(--ink-2)] p-6"
                >
                  <Icon size={21} className="text-[color:var(--accent)]" aria-hidden />
                  <h3 className="mt-5 font-display text-base font-bold tracking-tight text-[color:var(--paper)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[color:var(--paper)]">
                    {item.body}
                  </p>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-[560px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Press contact
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Need " },
                { text: "approved material?", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[420px] text-xs leading-relaxed text-[color:var(--paper)]">
              Reach out for approved background, interviews, and media assets.
            </p>
            <a
              href="mailto:INFO@VENAVITALS.COM"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[color:var(--paper)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
            >
              Contact press{" "}
              <span
                aria-hidden
                className="inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
