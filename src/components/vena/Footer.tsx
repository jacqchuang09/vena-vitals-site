import { Link } from "@tanstack/react-router";

const columns = [
  {
    title: "Product",
    links: [
      { to: "/technology", label: "Technology" },
      { to: "/clinical-evidence", label: "Clinical Evidence" },
      // No /solutions entry — that path has no page, it is only the nav
      // dropdown. The individual setting pages are linked from there.
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/news", label: "News" },
      { to: "/partner-with-us", label: "Partner With Us" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { to: "/contact", label: "Request a Demo" },
      { href: "mailto:INFO@VENAVITALS.COM", label: "Email" },
      { href: "https://www.linkedin.com/company/vena-vitals", label: "LinkedIn" },
      { href: "https://www.venavitals.com/", label: "Official site" },
      { href: "https://www.venavitals.com/privacy-policy", label: "Privacy" },
      { href: "https://www.venavitals.com/terms-and-conditions", label: "Conflict disclosure" },
    ],
  },
] as const;

const trustLogos = [
  { src: "/assets/brand/yc-logo.png", alt: "Y Combinator" },
  { src: "/assets/brand/logo2.png", alt: "National Institutes of Health" },
  { src: "/assets/brand/logo4.png", alt: "MedTech Innovator" },
  { src: "/assets/brand/logo5.png", alt: "EvoNexus" },
  { src: "/assets/brand/logo6.webp", alt: "HeartX" },
  { src: "/assets/brand/logo7.png", alt: "National Science Foundation" },
  { src: "/assets/brand/logo1.webp", alt: "Samsung NEXT" },
];

// Repeat the set wide enough that the -50% marquee loop never shows a gap.
const marqueeHalf = [...trustLogos, ...trustLogos, ...trustLogos];
const marqueeLogos = [...marqueeHalf, ...marqueeHalf];

export function Footer() {
  return (
    <footer className="flex h-[100svh] min-h-[100svh] w-full items-center overflow-hidden bg-[color:var(--ink)] py-10 md:py-14">
      <div className="container-wide flex h-full items-center">
        <div className="w-full pt-10 md:pt-12">
          <div className="mb-12 overflow-hidden border-b border-[color:var(--line)] pb-10">
            <div className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              Backed by
            </div>
            <div className="logo-marquee flex w-max items-center gap-x-24">
              {marqueeLogos.map((logo, i) => (
                <img
                  key={`${logo.alt}-${i}`}
                  src={logo.src}
                  alt={logo.alt}
                  aria-hidden={i >= marqueeHalf.length}
                  className={`w-auto shrink-0 object-contain ${
                    logo.alt === "Y Combinator" ? "h-20 md:h-28" : "h-8 md:h-9"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="text-xl font-bold text-[color:var(--paper)]">Vēna</div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-[color:var(--mute)]">
                Continuous, noninvasive arterial blood pressure. Born at UCI.
              </p>
            </div>

            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-bold text-[color:var(--paper)]">{column.title}</h2>
                <ul className="mt-5 space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {"to" in link ? (
                        <Link
                          to={link.to}
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
            VeriTrack has been submitted for Food and Drug Administration 510(k) review and is not
            yet available for commercial sale.
          </p>
          <p className="mt-8 text-xs text-[color:var(--mute)]">
            © {new Date().getFullYear()} Vena Vitals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
