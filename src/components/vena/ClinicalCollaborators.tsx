import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { StretchText } from "./StretchText";
import { advisors, type Advisor } from "./people";

/**
 * The clinical people behind a page, as circular portraits that open a bio.
 *
 * Which advisors appear is chosen per page through `names`, so a setting page
 * can show only the advisor whose field it covers while About still lists the
 * whole board. Omitting `names` shows everyone.
 *
 * Lifted out of Evidence.tsx so it can sit on a solution page instead.
 */
export function ClinicalCollaborators({
  eyebrow = "Meet our",
  title = "Clinical ",
  titleAccent = "collaborators.",
  names,
  background = "bg-[color:var(--ink)]",
}: {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  names?: readonly string[];
  /** Set by the page, which alternates section backgrounds down the stack. */
  background?: string;
}) {
  const [selected, setSelected] = useState<Advisor | null>(null);
  const people = names ? advisors.filter((a) => names.includes(a.name)) : advisors;

  return (
    <>
      <section
        className={`relative flex min-h-screen items-center overflow-hidden py-16 md:py-20 hairline-b ${background}`}
      >
        <div className="container-x">
          <div className="mx-auto max-w-[560px] text-center reveal">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              {eyebrow}
            </div>
            <StretchText
              as="h2"
              className="font-display text-[clamp(26px,2.8vw,40px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[
                { text: title },
                { text: titleAccent, className: "text-[color:var(--accent)]" },
              ]}
            />
          </div>
          <div
            className={`mx-auto mt-12 grid items-start gap-x-6 gap-y-10 ${
              people.length > 1 ? "max-w-[900px] sm:grid-cols-2 lg:grid-cols-4" : "max-w-[280px]"
            }`}
          >
            {people.map((a) => (
              <button
                type="button"
                key={a.name}
                onClick={() => setSelected(a)}
                aria-label={`Read more about ${a.name}`}
                className="group reveal flex cursor-pointer flex-col items-center text-center outline-none"
              >
                <span className="relative block aspect-square w-32 overflow-hidden rounded-full bg-[color:var(--ink-2)] shadow-[0_10px_30px_-12px_rgba(43,43,43,0.3)] ring-1 ring-[color:var(--line)] transition duration-300 group-hover:ring-2 group-hover:ring-[color:var(--accent)]/50 group-focus-visible:ring-2 group-focus-visible:ring-[color:var(--accent)] md:w-36">
                  <img
                    src={"avatar" in a ? a.avatar : a.img}
                    alt={a.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </span>
                <div className="mt-4 font-display text-sm font-bold tracking-tight text-[color:var(--paper)]">
                  {a.name}
                </div>
                <div className="mt-1 text-[11px] leading-snug text-[color:var(--paper)]/60">
                  {a.sub ? `${a.role}, ${a.sub}` : a.role}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Advisor bio popup — text only, quick fade in */}
      <DialogPrimitive.Root open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[#141414]/40 backdrop-blur-[4px] duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[520px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] bg-white p-7 text-[color:var(--paper)] shadow-[0_40px_100px_-24px_rgba(43,43,43,0.4)] outline-none duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0 md:p-9">
            {selected && (
              <div className="flex flex-col">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                  {selected.role}
                </div>
                <DialogPrimitive.Title className="mt-2.5 font-display text-xl font-bold leading-tight tracking-tight text-[color:var(--paper)]">
                  {selected.name}
                </DialogPrimitive.Title>
                <div className="mt-2 text-[12px] font-medium leading-snug text-[color:var(--paper)]/55">
                  {selected.title}
                </div>
                <DialogPrimitive.Description className="mt-5 text-[13px] leading-relaxed text-[color:var(--paper)]/75">
                  {selected.bio}
                </DialogPrimitive.Description>
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[color:var(--accent)] transition-opacity hover:opacity-80"
                >
                  View profile
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>
            )}
            <DialogPrimitive.Close className="absolute right-4 top-4 grid h-8 w-8 cursor-pointer place-items-center rounded-full text-[color:var(--paper)]/60 outline-none transition hover:bg-[color:var(--ink-2)] hover:text-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
