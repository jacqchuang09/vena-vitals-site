import { Link } from "@tanstack/react-router";
import { ArrowDownRight } from "lucide-react";
import { HeroBackgroundVideos } from "./HeroBackgroundVideos";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[color:var(--ink)]">
      <HeroBackgroundVideos className="absolute inset-0 h-full w-full object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.82)_34%,rgba(0,0,0,0.5)_68%,rgba(0,0,0,0.32)_100%)]"
      />

      <div className="relative container-x flex min-h-[100svh] flex-col justify-end pt-40 pb-28 md:pb-36">
        <div className="max-w-[560px] text-center reveal lg:text-left">
          <h1 className="hero-heading text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.6)]">
            Continuous.
            <br />
            Non-invasive.
            <br />
            <span className="text-[color:var(--accent)]">Blood pressure.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-[440px] text-sm leading-relaxed text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.65)] lg:mx-0">
            Beat-to-beat arterial pressure from a soft sensor the size of a bandage. No cuff, no
            arterial line.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-[color:var(--accent)] text-white px-6 py-4 text-xs font-semibold tracking-normal hover:bg-[color:var(--accent)]/90 transition-colors"
            >
              Request a demo
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              to="/clinical-evidence"
              className="group inline-flex items-center gap-3 bg-neutral-600/85 text-white px-6 py-4 text-xs font-semibold tracking-normal backdrop-blur-sm hover:bg-neutral-500/85 transition-colors"
            >
              See the evidence{" "}
              <span
                aria-hidden
                className="inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <a
        href="#care-journey"
        aria-label="Scroll to care journey"
        className="absolute bottom-5 right-5 hidden h-11 w-11 items-center justify-center border border-[color:var(--paper)]/40 text-[color:var(--paper)] transition hover:border-[color:var(--accent)] md:flex"
      >
        <ArrowDownRight size={18} aria-hidden />
      </a>
    </section>
  );
}
