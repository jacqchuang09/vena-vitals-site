import { FileText, Image, Newspaper } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { StretchText } from "./StretchText";

// Placeholder update slots. `body` is null on every one because no announcement
// has been approved yet — the card renders a "Copy to confirm." state rather
// than filler. The guidance for whoever writes each slot is kept here as a
// comment; it previously sat in `body` and was rendering as public page copy.
//
// [EDIT NEEDED: real update copy, and a date for each. Guidance per slot —
//  Company:  funding, pilot, regulatory, or milestone announcements once approved.
//  Evidence: link abstracts, posters, and evidence summaries once publication
//            permissions are confirmed.
//  Research: keep research updates distinct from cleared product claims.]
const updates: Array<{ label: string; title: string; body: string | null }> = [
  {
    label: "Company",
    title: "Vena Vitals advances continuous, noninvasive blood pressure monitoring.",
    body: null,
  },
  {
    label: "Evidence",
    title: "Operating-room validation material presented to clinical audiences.",
    body: null,
  },
  {
    label: "Research",
    title: "Expanding research directions across perioperative and sleep monitoring.",
    body: null,
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
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-center">
          <div className="mx-auto max-w-[390px] text-center reveal md:text-left">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Newsroom
            </div>
            <StretchText
              as="h1"
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: "Company updates and " },
                { text: "press resources.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[340px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
              A simple place for announcements, evidence updates, and approved media materials.
            </p>
          </div>
          <div className="reveal flex h-56 items-center justify-center rounded-[32px] bg-[color:var(--ink-2)] text-center text-xs text-[color:var(--mute)] md:h-72">
            Press image placeholder
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
                <p
                  className={`mt-4 text-xs leading-relaxed ${
                    update.body ? "text-[color:var(--paper)]" : "text-[color:var(--accent)]"
                  }`}
                >
                  {update.body ?? "Copy to confirm."}
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
                  <h3 className="mt-5 font-display text-base tracking-tight text-[color:var(--paper)]">
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
              className="mt-8 inline-flex items-center gap-3 bg-[color:var(--paper)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
            >
              Contact press
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
