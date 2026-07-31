import { StretchText } from "./StretchText";
import { TiltCard } from "./TiltCard";

const journeySteps = [
  {
    step: "01",
    title: "Place",
    body: "A clinician applies the soft sensor over an arterial site before monitoring begins.",
    visual: "/assets/technology/setup-veritrack.mp4",
    fit: "h-full w-full origin-left scale-[2.25] object-cover",
  },
  {
    step: "02",
    title: "Sense",
    body: "A wrinkled capacitive stack reads subtle arterial motion on every beat.",
    visual: "/assets/technology/stretchy-sensor.mp4",
    fit: "h-full w-full object-cover object-center scale-y-[1.3]",
  },
  {
    step: "03",
    title: "Stream",
    body: "Beat-to-beat blood pressure trends move to a bedside tablet for review.",
    visual: "/assets/home/journey-stream.mp4",
    fit: "h-full w-full object-cover object-center scale-[1.4]",
  },
  {
    step: "04",
    title: "Review",
    body: "Teams can see trends and context instead of isolated cuff snapshots.",
    visual: "/assets/technology/pulse-vid-480p.mp4",
    fit: "h-full w-full object-cover object-center scale-[1.05]",
  },
];

export function SignalJourney() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-14 md:py-16">
      <div className="container-x grid gap-6 md:grid-cols-[0.42fr_1.58fr] md:items-center">
        <div className="mx-auto max-w-[320px] text-center reveal md:text-left">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            The Workflow
          </div>
          <StretchText
            as="h2"
            className="font-display text-[clamp(22px,2.35vw,32px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            segments={[
              { text: "From skin contact to " },
              { text: "clinical context.", className: "text-[color:var(--accent)]" },
            ]}
          />
          <p className="mx-auto mt-3 max-w-[300px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
            Applied in under five minutes in pre-op, the VeriTrack stays in place and monitors
            continuously, without the placement time, complication risk, or nursing burden of an
            arterial line.
          </p>
        </div>

        {/* Horizontal scroll filmstrip — bleeds off the right edge of the viewport,
            so the trailing cards run off-page and are reached by scrolling sideways */}
        <div className="reveal -ml-4 -mr-[1.25rem] flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 pl-4 pr-6 pt-3 pb-14 [scrollbar-width:none] md:-mr-[calc(2.5rem+max(0px,(100vw-1080px)/2))] md:gap-5 [&::-webkit-scrollbar]:hidden">
          {journeySteps.map((item) => (
            <TiltCard
              as="article"
              key={item.step}
              className="group flex w-[270px] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] bg-[color:var(--ink)] p-4 shadow-[0_12px_34px_rgba(43,43,43,0.07)] transition duration-500 hover:bg-[color:var(--accent-soft)] md:w-[370px] md:rounded-[32px] md:p-5"
            >
              <div className="aspect-[1.5/1] overflow-hidden rounded-[20px] bg-[color:var(--ink-2)]">
                <video
                  src={item.visual}
                  className={`${item.fit} transition-transform duration-700`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
              <div className="pt-3 md:pt-4">
                <div className="eyebrow text-[color:var(--accent)]">{item.step}</div>
                <h3 className="mt-1 font-display text-sm font-bold leading-tight tracking-tight text-[color:var(--paper)] md:text-base">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[11px] leading-snug text-[color:var(--paper)] md:text-xs">
                  {item.body}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
