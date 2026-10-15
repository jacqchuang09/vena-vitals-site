import { StretchText } from "@/components/shared/StretchText";
import { TiltCard } from "@/components/shared/TiltCard";
import technology from "@content/technology.json";

// Each clip is framed differently, so the crop lives here keyed by its video
// path. A new or swapped clip falls back to a plain centered cover crop.
const videoFit: Record<string, string> = {
  "/assets/technology/setup-veritrack.mp4": "h-full w-full origin-left scale-[2.25] object-cover",
  "/assets/technology/stretchy-sensor.mp4":
    "h-full w-full object-cover object-center scale-y-[1.3]",
  "/assets/home/journey-stream.mp4": "h-full w-full object-cover object-center scale-[1.4]",
  "/assets/technology/pulse-vid-480p.mp4": "h-full w-full object-cover object-center scale-[1.05]",
};
const defaultFit = "h-full w-full object-cover object-center";

const { signalJourney } = technology;

export function SignalJourney() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-14 md:py-16">
      <div className="container-x grid gap-6 md:grid-cols-[0.42fr_1.58fr] md:items-center">
        <div className="mx-auto max-w-[320px] text-center reveal md:text-left">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            {signalJourney.eyebrow}
          </div>
          <StretchText
            as="h2"
            className="font-display text-[clamp(22px,2.35vw,32px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
            segments={[
              { text: signalJourney.title },
              { text: signalJourney.titleAccent, className: "text-[color:var(--accent)]" },
            ]}
          />
          <p className="mx-auto mt-3 max-w-[300px] text-xs leading-relaxed text-[color:var(--paper)] md:mx-0">
            {signalJourney.body}
          </p>
        </div>

        {/* Horizontal scroll filmstrip — bleeds off the right edge of the viewport,
            so the trailing cards run off-page and are reached by scrolling sideways */}
        <div className="reveal -ml-4 -mr-[1.25rem] flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 pl-4 pr-6 pt-3 pb-14 [scrollbar-width:none] md:-mr-[calc(2.5rem+max(0px,(100vw-1080px)/2))] md:gap-5 [&::-webkit-scrollbar]:hidden">
          {signalJourney.steps.map((item) => (
            <TiltCard
              as="article"
              key={item.step}
              className="group flex w-[270px] shrink-0 snap-start flex-col overflow-hidden rounded-none bg-[color:var(--ink)] p-4 shadow-[0_12px_34px_rgba(43,43,43,0.07)] transition duration-500 hover:bg-[color:var(--accent-soft)] md:w-[370px] md:rounded-none md:p-5"
            >
              <div className="aspect-[1.5/1] overflow-hidden rounded-none bg-[color:var(--ink-2)]">
                <video
                  src={item.video}
                  className={`${videoFit[item.video] ?? defaultFit} transition-transform duration-700`}
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
