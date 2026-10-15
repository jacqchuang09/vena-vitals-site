import { FileText, Image, Newspaper } from "lucide-react";
import { TiltCard } from "@/components/shared/TiltCard";
import { StretchText } from "@/components/shared/StretchText";

import news from "@content/news.json";

// The newsroom has no published items yet, so each card in latest.posts
// (content/news.json) describes the kind of update its category will carry
// rather than stating a fake headline. These are forward-looking ("will be
// posted here"), not claims of anything having happened — safe to show
// publicly.
//
// [EDIT NEEDED (content/news.json, latest.posts): replace these category
//  placeholders with real, dated updates as they are approved. Company:
//  funding, pilot, and regulatory milestones. Evidence: abstracts, posters, and
//  evidence summaries once publication permissions are confirmed. Research:
//  research-direction notes, kept distinct from cleared product claims.]

// Icon names used in content/news.json, mapped to their lucide components.
const icons = { FileText, Image, Newspaper } as const;

const { hero, latest, pressKit, pressContact } = news;

export function News() {
  return (
    <>
      {/* Centered hero — no image column. There's no press asset to show, and an
          empty placeholder box read as broken. */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x">
          <div className="mx-auto max-w-[600px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              {hero.eyebrow}
            </div>
            <StretchText
              as="h1"
              className="font-display text-[clamp(28px,3.4vw,48px)] font-bold leading-[1.05] tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: hero.title },
                { text: hero.titleAccent, className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[440px] text-sm leading-relaxed text-[color:var(--mute)]">
              {hero.body}
            </p>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
        <div className="container-x">
          <div className="mx-auto max-w-[500px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              {latest.eyebrow}
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: latest.title },
                { text: latest.titleAccent, className: "text-[color:var(--accent)]" },
              ]}
            />
          </div>
          <div className="mx-auto mt-10 grid max-w-[980px] gap-4 md:grid-cols-3">
            {latest.posts.map((update) => (
              <TiltCard
                as="article"
                key={update.title}
                className="reveal rounded-none bg-[color:var(--ink)] p-6 md:p-7"
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
              {pressKit.eyebrow}
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: pressKit.title },
                { text: pressKit.titleAccent, className: "text-[color:var(--accent)]" },
              ]}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {pressKit.items.map((item) => {
              const Icon = icons[item.icon as keyof typeof icons];
              return (
                <TiltCard
                  key={item.title}
                  className="reveal rounded-none bg-[color:var(--ink-2)] p-6"
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
              {pressContact.eyebrow}
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: pressContact.title },
                { text: pressContact.titleAccent, className: "text-[color:var(--accent)]" },
              ]}
            />
            <p className="mx-auto mt-5 max-w-[420px] text-xs leading-relaxed text-[color:var(--paper)]">
              {pressContact.body}
            </p>
            <a
              href={pressContact.href}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[color:var(--paper)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
            >
              {pressContact.button}{" "}
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
