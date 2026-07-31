import { Link } from "@tanstack/react-router";
import { SolutionWindows, type SolutionWindow } from "./SolutionWindows";
import { StretchText } from "./StretchText";
import { TiltCard } from "./TiltCard";

export type SolutionDetailContent = {
  eyebrow: string;
  title: string;
  /** Optional trailing fragment of the title rendered in the accent colour. */
  titleAccent?: string;
  intro: string;
  button: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionAccent?: string;
  cards: Array<{ title: string; body: string }>;
  fitEyebrow: string;
  fitTitle: string;
  fitAccent?: string;
  fitBody: string;
  windowsEyebrow?: string;
  windowsTitle?: string;
  windowsBody?: string;
  windows?: SolutionWindow[];
  noteTitle: string;
  noteBody: string;
  cta: string;
  ctaAccent?: string;
};

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
      {children}
    </div>
  );
}

// Splits a heading into a plain part and an accent-coloured tail, matching the
// two-segment heading convention used across the rest of the site. When no
// accent fragment is supplied the whole heading renders plain.
function Heading({
  as = "h2",
  text,
  accent,
  className,
}: {
  as?: "h1" | "h2";
  text: string;
  accent?: string;
  className: string;
}) {
  return (
    <StretchText
      as={as}
      className={className}
      segments={
        accent
          ? [{ text: `${text} ` }, { text: accent, className: "text-[color:var(--accent)]" }]
          : [{ text }]
      }
    />
  );
}

function DemoButton({ label }: { label: string }) {
  return (
    <Link
      to="/contact"
      className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--paper)] px-6 py-4 text-xs font-semibold tracking-normal text-[color:var(--ink)] transition hover:bg-[color:var(--accent)]"
    >
      {label}{" "}
      <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export function SolutionDetail({ content }: { content: SolutionDetailContent }) {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x">
          <div className="mx-auto max-w-[640px] text-center reveal">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <Heading
              as="h1"
              text={content.title}
              accent={content.titleAccent}
              className="font-display text-[clamp(28px,3.2vw,46px)] font-bold leading-[1.05] tracking-tight text-[color:var(--paper)]"
            />
            <p className="mx-auto mt-6 max-w-[460px] text-sm leading-relaxed text-[color:var(--mute)]">
              {content.intro}
            </p>
            <div className="mt-9">
              <DemoButton label={content.button} />
            </div>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
        <div className="container-x grid gap-10 md:grid-cols-[0.58fr_1.42fr] md:items-center">
          <div className="mx-auto max-w-[390px] text-center reveal md:mx-0 md:text-left">
            <Eyebrow>{content.sectionEyebrow}</Eyebrow>
            <Heading
              text={content.sectionTitle}
              accent={content.sectionAccent}
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {content.cards.map((card, i) => (
              <TiltCard
                as="article"
                key={card.title}
                className="reveal rounded-[30px] bg-[color:var(--ink)] p-6 md:p-7"
              >
                <div className="font-mono text-xs text-[color:var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-6 font-display text-base font-bold leading-tight tracking-tight text-[color:var(--paper)]">
                  {card.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[color:var(--paper)]">
                  {card.body}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it fits */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20 hairline-b">
        <div className="container-x grid gap-10 md:grid-cols-[0.86fr_1.14fr] md:items-center">
          <div className="mx-auto max-w-[440px] text-center reveal md:mx-0 md:text-left">
            <Eyebrow>{content.fitEyebrow}</Eyebrow>
            <Heading
              text={content.fitTitle}
              accent={content.fitAccent}
              className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            />
            <p className="mt-5 max-w-[420px] text-xs leading-relaxed text-[color:var(--paper)] md:text-[13px]">
              {content.fitBody}
            </p>
          </div>

          <div className="reveal rounded-[32px] bg-[color:var(--ink-2)] p-7 md:p-9">
            <h3 className="font-display text-base font-bold leading-tight tracking-tight text-[color:var(--paper)]">
              {content.noteTitle}
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-[color:var(--paper)]/70 md:text-[13px]">
              {content.noteBody}
            </p>
            <Link
              to="/clinical-evidence"
              className="group mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[color:var(--accent)] transition-opacity hover:opacity-80"
            >
              See the clinical evidence
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footage */}
      {content.windows?.length ? (
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20 hairline-b">
          <div className="container-x">
            <SolutionWindows
              eyebrow={content.windowsEyebrow ?? "In this setting"}
              title={content.windowsTitle ?? content.fitTitle}
              body={content.windowsBody}
              windows={content.windows}
            />
          </div>
        </section>
      ) : null}

      {/* Closing CTA */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-[560px] text-center reveal">
            <Eyebrow>Get started</Eyebrow>
            <Heading
              text={content.cta}
              accent={content.ctaAccent}
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            />
            <div className="mt-9">
              <DemoButton label={content.button} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
