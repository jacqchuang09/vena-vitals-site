import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";

const links = [
  { to: "/technology", label: "Technology" },
  { to: "/clinical-evidence", label: "Clinical Evidence" },
  { to: "/solutions", label: "Solutions" },
  { to: "/partner-with-us", label: "Partner With Us" },
  { to: "/about", label: "About" },
  { to: "/news", label: "News" },
] as const;

const solutionsGroups = [
  {
    title: "Clinical settings",
    items: [
      { to: "/solutions/anesthesiology", label: "Anesthesiology", desc: "Operating room" },
      { to: "/solutions/critical-care", label: "ICU", desc: "Critical care" },
    ],
  },
  {
    title: "Future settings",
    items: [
      { to: "/solutions/sleep-medicine", label: "Sleep Medicine", desc: "Research direction" },
      { to: "/solutions/home-monitoring", label: "Home monitoring", desc: "Outside the hospital" },
    ],
  },
] as const;

// The drawer lists the individual setting pages in place of Solutions itself.
// /solutions has no page — it redirects — so a "Solutions" row here would just
// dump the user back on the home page.
const mobileLinks = [
  { to: "/", label: "Home" },
  { to: "/technology", label: "Technology" },
  { to: "/clinical-evidence", label: "Clinical Evidence" },
  { to: "/solutions/anesthesiology", label: "Anesthesiology" },
  { to: "/solutions/critical-care", label: "ICU" },
  { to: "/solutions/sleep-medicine", label: "Sleep Medicine" },
  { to: "/solutions/home-monitoring", label: "Home Monitoring" },
  { to: "/partner-with-us", label: "Partner With Us" },
  { to: "/about", label: "About" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [pastHero, setPastHero] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // White over full-bleed dark heroes (home video, About team photo), red once
  // the nav passes them. Other pages are light, so the nav is red from the top.
  const darkHero = pathname === "/" || pathname === "/about";
  const navColor = pastHero ? "text-[color:var(--accent)]" : "text-white";

  const goTop = () => {
    setOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  };

  useEffect(() => {
    const onScroll = () => {
      const threshold = darkHero ? window.innerHeight - 90 : -1;
      setPastHero(window.scrollY > threshold);
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [darkHero]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      {/* White background once the page starts scrolling. Gated on pastHero too:
          over the dark home/About heroes the links are white, so a white bar
          there would hide them — it only appears after the hero, where the links
          have turned accent-red. On light pages pastHero is true from the top,
          so `scrolled` is what holds it back until the user actually scrolls. */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled && pastHero
            ? "bg-white/90 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            : ""
        }`}
      >
        <div className="container-x flex h-20 items-center justify-between md:h-24">
          <Link to="/" onClick={goTop} className="shrink-0">
            <img
              src="/assets/brand/venavitals-logo.png"
              alt="Vēna Vitals"
              className="h-16 w-auto object-contain md:h-20"
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) =>
              l.to === "/solutions" ? (
                <div key={l.to} className="group relative">
                  {/* Not a link — Solutions has no landing page, it only opens
                      this panel. Kept as a button so it stays keyboard
                      reachable, with the panel shown on focus-within too. */}
                  <button
                    type="button"
                    aria-haspopup="true"
                    className={`inline-flex cursor-default items-center gap-1 text-sm font-semibold ${navColor}`}
                  >
                    {l.label}
                    <ChevronDown
                      size={14}
                      aria-hidden
                      className="transition-transform group-hover:rotate-180"
                    />
                  </button>
                  {/* Hover bridge + panel */}
                  <div className="invisible absolute left-1/2 top-full z-50 w-[440px] -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-2 rounded-2xl border border-[color:var(--line)] bg-[color:var(--ink)]/95 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                      {solutionsGroups.map((group) => (
                        <div key={group.title} className="p-2">
                          <div className="eyebrow mb-2 text-[color:var(--mute)]">{group.title}</div>
                          <div className="flex flex-col gap-1">
                            {group.items.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                onClick={goTop}
                                className="group/item rounded-xl px-3 py-2 transition hover:bg-[color:var(--line)]"
                              >
                                <div className="text-sm font-semibold text-[color:var(--paper)] transition group-hover/item:text-[color:var(--accent)]">
                                  {item.label}
                                </div>
                                <div className="text-[11px] text-[color:var(--mute)]">
                                  {item.desc}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={goTop}
                  className={`text-sm font-semibold transition hover:opacity-70 ${navColor}`}
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className={`group inline-flex h-10 w-10 items-center justify-center transition hover:bg-white/10 lg:hidden ${navColor}`}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[color:var(--ink)]/95 backdrop-blur-2xl" />
        <div className="relative h-full flex flex-col justify-center container-x pt-20">
          <div className="eyebrow mb-10">[ Navigate ]</div>
          <nav className="flex flex-col">
            {mobileLinks.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={goTop}
                className="group block py-4 md:py-5 hairline-b"
                style={{
                  transitionDelay: open ? `${i * 50}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                <div className="flex items-baseline justify-between gap-6">
                  <span className="font-display font-bold text-[clamp(32px,6vw,72px)] leading-none tracking-tight text-[color:var(--paper)] group-hover:text-[color:var(--paper)] transition-colors">
                    {l.label}
                  </span>
                  <span className="eyebrow opacity-50 group-hover:opacity-100 transition">
                    0{i + 1}
                  </span>
                </div>
              </Link>
            ))}
          </nav>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 eyebrow">
            <span>vēna vitals © {new Date().getFullYear()}</span>
            <span>continuous · noninvasive · beat-to-beat</span>
          </div>
        </div>
      </div>
    </>
  );
}
