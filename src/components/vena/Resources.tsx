import { Link } from "@tanstack/react-router";
import footImg from "@/assets/foot.jpg";

export function Resources() {
  return (
    <section className="relative bg-[color:var(--ink)] py-28 md:py-40">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6 reveal">
          <div className="max-w-2xl">
            <h2 className="section-heading text-[color:var(--paper)] mt-6">More to read.</h2>
          </div>
          <Link
            to="/product"
            className="group text-xs tracking-normal text-[color:var(--paper)] hover:text-[color:var(--paper)] border-b border-[color:var(--line)] pb-1"
          >
            All resources{" "}
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
        <div className="mt-16 max-w-xl">
          <Link
            to="/product"
            className="group bg-[color:var(--ink)] p-0 reveal block border-t border-[color:var(--line)] hairline-b"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={footImg}
                alt="Continuous monitoring beyond the critical care."
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)] via-transparent to-transparent" />
            </div>
            <div className="p-7 md:p-9">
              <div className="eyebrow text-[color:var(--accent)]">Use case</div>
              <h3 className="mt-4 font-display text-[color:var(--paper)] text-lg md:text-xl leading-snug tracking-tight">
                Continuous monitoring beyond the critical care.
              </h3>
              <div className="mt-6 inline-flex items-center gap-2 text-xs tracking-normal text-[color:var(--paper)] group-hover:text-[color:var(--paper)]">
                Learn more{" "}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
