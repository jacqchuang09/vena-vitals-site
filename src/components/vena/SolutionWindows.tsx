import { StretchText } from "./StretchText";

export type SolutionWindow = {
  /** Looping clip source. When omitted, a styled placeholder window is shown. */
  src?: string;
  label: string;
  feature?: boolean;
};

function WindowFrame({ src, label, feature = false }: SolutionWindow) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-[28px] bg-[color:var(--ink)] ${
        feature ? "aspect-video md:aspect-auto md:h-full" : "aspect-video"
      }`}
    >
      {src ? (
        <video
          src={src}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--ink),var(--ink-2))]">
          <span className="eyebrow text-[color:var(--mute)]">Footage coming soon</span>
        </div>
      )}
      <figcaption className="absolute inset-x-3 bottom-3 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
        {label}
      </figcaption>
    </figure>
  );
}

export function SolutionWindows({
  eyebrow,
  title,
  body,
  windows,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  windows: SolutionWindow[];
}) {
  const [feature, ...rest] = windows;

  return (
    <div className="mt-24 reveal">
      <div className="max-w-[560px]">
        <StretchText
          as="h2"
          className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
          segments={[{ text: title }]}
        />
        {body ? (
          <p className="mt-5 text-xs leading-relaxed text-[color:var(--mute)]">{body}</p>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[1.4fr_1fr] md:items-stretch">
        {feature ? <WindowFrame {...feature} feature /> : null}
        {rest.length ? (
          <div className="grid gap-4">
            {rest.map((w) => (
              <WindowFrame key={w.label} {...w} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
