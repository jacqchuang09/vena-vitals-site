import { Link } from "@tanstack/react-router";
import { useNoSnap } from "@/components/shared/lib";

export type LegalNode =
  | { kind: "heading"; text: string }
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] };

/**
 * One policy, as stored in content/legal/*.json.
 *
 * The text there is transcribed from the pages Vena Vitals already publishes
 * at venavitals.com/privacy-policy and venavitals.com/terms-and-conditions on
 * 29 Sep 2026. Transcribed, not rewritten: it was taken from the rendered
 * pages character for character, including its own typos ("DEFINITONS", the
 * spacing in "April 18 , 2022", and the malformed self-reference URL at the
 * end of the privacy policy). Nothing is drafted, summarised or corrected,
 * because this is legal and regulatory copy and neither is ours to change.
 * Any edit should come from the Vena Vitals team.
 */
export type LegalDoc = {
  /** Small label above the title. */
  eyebrow: string;
  title: string;
  /** The document's own date line, shown under the title. */
  date: string;
  body: LegalNode[];
  /** The link under the document. */
  contact: { label: string; href: string };
};

/**
 * A policy document: one long column of text, not a deck of panels.
 *
 * Most pages here are full-viewport sections under
 * `scroll-snap-type: y mandatory`. A document is taller than the viewport and
 * has nothing to snap to, and mandatory snapping would drag the reader to the
 * footer as soon as they scrolled, so it opts out through useNoSnap.
 *
 * The text itself lives in content/legal/*.json, transcribed from the
 * published policies. This component only sets it; it does not author any of
 * it.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  useNoSnap();

  return (
    <article className="bg-[color:var(--ink)] pb-24 pt-[calc(var(--nav-h)+3rem)] md:pb-32 md:pt-[calc(var(--nav-h)+5rem)]">
      <div className="container-x">
        <header className="max-w-[720px]">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            {doc.eyebrow}
          </div>
          <h1 className="font-display text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.05] tracking-tight text-[color:var(--paper)] text-balance">
            {doc.title}
          </h1>
          <p className="mt-4 text-[12px] font-medium text-[color:var(--mute)]">{doc.date}</p>
        </header>

        {/* A measure of roughly 78 characters: long enough not to shred the
            numbered clauses, short enough to stay readable. */}
        <div className="mt-10 max-w-[78ch] md:mt-14">
          {doc.body.map((node, i) => {
            if (node.kind === "heading") {
              return (
                <h2
                  key={i}
                  className="mt-11 border-t border-[color:var(--line)]/60 pt-7 font-display text-[13px] font-bold uppercase leading-snug tracking-[0.1em] text-[color:var(--paper)] first:mt-0 first:border-0 first:pt-0 md:mt-14 md:pt-8"
                >
                  {node.text}
                </h2>
              );
            }
            if (node.kind === "list") {
              return (
                <ul key={i} className="mt-4 space-y-2.5">
                  {node.items.map((item, j) => (
                    <li
                      key={j}
                      className="relative pl-5 text-[13px] leading-relaxed text-[color:var(--paper)]/85 md:text-[14px]"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.62em] size-1.5 rounded-full bg-[color:var(--accent)]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={i}
                className="mt-4 text-[13px] leading-relaxed text-[color:var(--paper)]/85 md:text-[14px]"
              >
                {node.text}
              </p>
            );
          })}
        </div>

        <div className="mt-14 max-w-[78ch] border-t border-[color:var(--line)]/60 pt-7">
          <Link
            to={doc.contact.href}
            className="group inline-flex items-center gap-1.5 text-[11px] font-semibold text-[color:var(--accent)] transition-opacity hover:opacity-80"
          >
            {doc.contact.label}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
