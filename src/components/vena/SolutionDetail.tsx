import { Link } from "@tanstack/react-router";
import { Testimonials } from "./Testimonials";
import { StudyFigures, type StudyFigure } from "./StudyFigures";
import { StudySpread } from "./StudySpread";
import { SolutionWindows, type SolutionWindow } from "./SolutionWindows";
import { StretchText } from "./StretchText";
import { TiltCard } from "./TiltCard";

export type SolutionDetailContent = {
  eyebrow: string;
  title: string;
  /** Optional leading fragment of the title rendered in the accent colour. */
  titleLead?: string;
  /** Optional trailing fragment of the title rendered in the accent colour. */
  titleAccent?: string;
  intro: string;
  button: string;
  /** Hero CTA. Defaults to shown; the closing CTA always keeps its button. */
  showHeroButton?: boolean;
  /** Cards beside the hero copy. Omit and the hero stays a centred column. */
  heroCards?: Array<{ title: string; body: string }>;
  /** Advisor names to feature on this page. Omit for no collaborators section. */
  collaborators?: readonly string[];
  /** Study figures, shown as one section directly under the hero. */
  figures?: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    footnote?: string;
    slides: StudyFigure[];
  };
  /** Study figures shown all at once, caption under each. A different
      instrument from `figures`, for pages with only a couple of figures. */
  gallery?: {
    eyebrow?: string;
    title?: string;
    titleAccent?: string;
    footnote?: string;
    slides: StudyFigure[];
  };
  /** Pain points. Omit `cards` to drop the section. */
  sectionEyebrow?: string;
  sectionTitle?: string;
  sectionAccent?: string;
  cards?: Array<{ title: string; body: string }>;
  /** How it fits. Omit `fitTitle` to drop the section. */
  fitEyebrow?: string;
  fitTitle?: string;
  fitAccent?: string;
  fitBody?: string;
  windowsEyebrow?: string;
  windowsTitle?: string;
  windowsBody?: string;
  windows?: SolutionWindow[];
  noteTitle?: string;
  noteBody?: string;
  /** Closing CTA. Omit to drop the section; the hero keeps its own button. */
  cta?: string;
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
  lead,
  text,
  accent,
  className,
}: {
  as?: "h1" | "h2";
  /** Accent fragment before the plain text, for headings that open in colour. */
  lead?: string;
  text: string;
  accent?: string;
  className: string;
}) {
  const segments = [
    ...(lead ? [{ text: `${lead} `, className: "text-[color:var(--accent)]" }] : []),
    { text },
    ...(accent ? [{ text: ` ${accent}`, className: "text-[color:var(--accent)]" }] : []),
  ];
  return <StretchText as={as} className={className} segments={segments} />;
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

// The numbered card used both beside the hero and in the pain points section.
// `surface` is the background, which has to be the panel the card sits on
// inverted, since the page alternates ink and ink-2 down the stack.
function PointCard({
  index,
  title,
  body,
  surface,
}: {
  index: number;
  title: string;
  body: string;
  surface: string;
}) {
  return (
    <TiltCard as="article" className={`reveal rounded-none p-6 md:p-7 ${surface}`}>
      <div className="font-mono text-xs text-[color:var(--accent)]">
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className="mt-6 font-display text-base font-bold leading-tight tracking-tight text-[color:var(--paper)]">
        {title}
      </h3>
      <p className="mt-3 text-xs leading-relaxed text-[color:var(--paper)]">{body}</p>
    </TiltCard>
  );
}

const INK = "bg-[color:var(--ink)]";
const INK_2 = "bg-[color:var(--ink-2)]";

export function SolutionDetail({ content }: { content: SolutionDetailContent }) {
  // The page alternates white and off-white down the stack, which is what
  // keeps each section reading as its own panel rather than running into its
  // neighbour. Which sections a page renders differs from page to page, so the
  // backgrounds are assigned by position among the sections actually present
  // instead of being fixed per section.
  const present = [
    "hero",
    content.figures ? "figures" : null,
    content.gallery ? "gallery" : null,
    content.cards?.length ? "cards" : null,
    content.fitTitle ? "fit" : null,
    content.collaborators?.length ? "collaborators" : null,
    content.windows?.length ? "windows" : null,
    content.cta ? "cta" : null,
  ].filter((k): k is string => k !== null);
  const bg: Record<string, string> = Object.fromEntries(
    present.map((key, i) => [key, i % 2 ? INK_2 : INK]),
  );
  const heroCards = content.heroCards?.length ? content.heroCards : null;

  return (
    <>
      {/* Hero */}
      <section
        className={`relative flex min-h-screen items-center overflow-hidden py-16 md:py-20 hairline-b ${bg.hero}`}
      >
        <div
          className={
            heroCards
              ? "container-x grid gap-10 md:grid-cols-[0.58fr_1.42fr] md:items-center"
              : "container-x"
          }
        >
          <div
            className={
              heroCards
                ? "mx-auto max-w-[460px] text-center reveal md:mx-0 md:text-left"
                : "mx-auto max-w-[640px] text-center reveal"
            }
          >
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <Heading
              as="h1"
              lead={content.titleLead}
              text={content.title}
              accent={content.titleAccent}
              className="font-display text-[clamp(28px,3.2vw,46px)] font-bold leading-[1.05] tracking-tight text-[color:var(--paper)]"
            />
            <p
              className={`mt-6 text-sm leading-relaxed text-[color:var(--mute)] ${
                heroCards ? "max-w-[420px] mx-auto md:mx-0" : "mx-auto max-w-[460px]"
              }`}
            >
              {content.intro}
            </p>
            {content.showHeroButton !== false && (
              <div className="mt-9">
                <DemoButton label={content.button} />
              </div>
            )}
          </div>

          {heroCards ? (
            <div className="grid gap-4 md:grid-cols-3">
              {heroCards.map((card, i) => (
                <PointCard
                  key={card.title}
                  index={i}
                  title={card.title}
                  body={card.body}
                  surface={bg.hero === INK ? INK_2 : INK}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {content.figures ? (
        <StudyFigures
          background={bg.figures}
          eyebrow={content.figures.eyebrow}
          title={content.figures.title}
          titleAccent={content.figures.titleAccent}
          figures={content.figures.slides}
          footnote={content.figures.footnote}
        />
      ) : null}

      {content.gallery ? (
        <StudySpread
          background={bg.gallery}
          eyebrow={content.gallery.eyebrow}
          title={content.gallery.title}
          titleAccent={content.gallery.titleAccent}
          slides={content.gallery.slides}
          footnote={content.gallery.footnote}
        />
      ) : null}

      {/* Pain points */}
      {content.cards?.length ? (
        <section
          className={`relative flex min-h-screen items-center overflow-hidden py-16 md:py-20 hairline-b ${bg.cards}`}
        >
          <div className="container-x grid gap-10 md:grid-cols-[0.58fr_1.42fr] md:items-center">
            <div className="mx-auto max-w-[390px] text-center reveal md:mx-0 md:text-left">
              <Eyebrow>{content.sectionEyebrow ?? ""}</Eyebrow>
              <Heading
                text={content.sectionTitle ?? ""}
                accent={content.sectionAccent}
                className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {content.cards.map((card, i) => (
                <PointCard
                  key={card.title}
                  index={i}
                  title={card.title}
                  body={card.body}
                  surface={INK}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* How it fits */}
      {content.fitTitle ? (
        <section
          className={`relative flex min-h-screen items-center overflow-hidden py-16 md:py-20 hairline-b ${bg.fit}`}
        >
          <div className="container-x grid gap-10 md:grid-cols-[0.86fr_1.14fr] md:items-center">
            <div className="mx-auto max-w-[440px] text-center reveal md:mx-0 md:text-left">
              <Eyebrow>{content.fitEyebrow ?? ""}</Eyebrow>
              <Heading
                text={content.fitTitle ?? ""}
                accent={content.fitAccent}
                className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              />
              <p className="mt-5 max-w-[420px] text-xs leading-relaxed text-[color:var(--paper)] md:text-[13px]">
                {content.fitBody}
              </p>
            </div>

            <div className="reveal rounded-none bg-[color:var(--ink-2)] p-7 md:p-9">
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
                See the clinical studies
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* The clinical people behind this setting, in their own words. This was
          a row of portraits here and a separate quote section on the home
          page; the quote belongs with the setting it describes. */}
      {content.collaborators?.length ? (
        <Testimonials names={content.collaborators} background={bg.collaborators} />
      ) : null}

      {/* Footage */}
      {content.windows?.length ? (
        <section
          className={`relative flex min-h-screen items-center overflow-hidden py-16 md:py-20 hairline-b ${bg.windows}`}
        >
          <div className="container-x">
            <SolutionWindows
              eyebrow={content.windowsEyebrow ?? "In this setting"}
              title={content.windowsTitle ?? content.fitTitle ?? ""}
              body={content.windowsBody}
              windows={content.windows}
            />
          </div>
        </section>
      ) : null}

      {/* Closing CTA */}
      {content.cta ? (
        <section
          className={`relative flex min-h-screen items-center overflow-hidden py-16 md:py-20 ${bg.cta}`}
        >
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
      ) : null}
    </>
  );
}
