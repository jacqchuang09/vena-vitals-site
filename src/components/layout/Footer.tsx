import { Link } from "@tanstack/react-router";
import site from "@content/site.json";

const { footer } = site;

// No /solutions entry in the link groups — that path has no page, it is only
// the nav dropdown. The individual setting pages are linked from there.
// Paths starting with "/" go through the router; anything else (mailto:,
// https://) is a plain anchor.
const columns = footer.linkGroups;

const trustLogos = footer.backedBy.logos;

// Repeat the set wide enough that the -50% marquee loop never shows a gap.
const marqueeHalf = [...trustLogos, ...trustLogos, ...trustLogos];
const marqueeLogos = [...marqueeHalf, ...marqueeHalf];

// The year is filled in at build time; "{year}" in site.json marks where.
const [copyrightBefore, copyrightAfter] = footer.copyright.split("{year}");

// The footer is locked to the viewport only from md up, where the link columns
// sit in a row and the whole thing fits. Narrower than that they stack, the
// content runs taller than the screen, and a fixed height combined with
// items-center and overflow-hidden clipped that overflow off BOTH ends — taking
// the top of the logo strip with it. A min-height keeps the full-screen look
// without capping it, which is what every section on the site already does.
export function Footer() {
  return (
    <footer className="flex min-h-[100svh] w-full items-center overflow-hidden bg-[color:var(--ink)] py-10 md:h-[100svh] md:py-14">
      <div className="container-wide flex items-center md:h-full">
        <div className="w-full pt-10 md:pt-12">
          <div className="mb-12 overflow-hidden border-b border-[color:var(--line)] pb-10">
            <div className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              {footer.backedBy.eyebrow}
            </div>
            <div className="logo-marquee flex w-max items-center gap-x-24">
              {marqueeLogos.map((logo, i) => (
                <img
                  key={`${logo.alt}-${i}`}
                  src={logo.image}
                  alt={logo.alt}
                  aria-hidden={i >= marqueeHalf.length}
                  // `large` marks a logo drawn taller than the rest (the YC
                  // mark, whose artwork has more padding around it).
                  className={`w-auto shrink-0 object-contain ${
                    "large" in logo && logo.large ? "h-20 md:h-28" : "h-8 md:h-9"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {columns.map((column) => (
              <div key={column.heading}>
                <h2 className="text-sm font-bold text-[color:var(--paper)]">{column.heading}</h2>
                <ul className="mt-5 space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link
                          to={link.href}
                          className="text-sm text-[color:var(--accent)] transition hover:text-[color:var(--paper)]"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                          className="text-sm text-[color:var(--accent)] transition hover:text-[color:var(--paper)]"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-12 text-xs leading-relaxed text-[color:var(--mute)]">
            {footer.disclaimer}
          </p>
          <p className="mt-8 text-xs text-[color:var(--mute)]">
            {copyrightBefore}
            {new Date().getFullYear()}
            {copyrightAfter}
          </p>
        </div>
      </div>
    </footer>
  );
}
