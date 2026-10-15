import { Link } from "@tanstack/react-router";

import product from "@content/product.json";

const { hero, features, finalCta } = product;

export function Product() {
  return (
    <section className="relative bg-[color:var(--ink)] pt-40 pb-28 md:pb-40">
      <div className="container-x">
        <div className="max-w-4xl reveal">
          <h1 className="section-heading text-[color:var(--paper)] mt-6">
            {hero.title} <span className="text-[color:var(--accent)]">{hero.titleAccent}</span>
          </h1>
          <p className="mt-8 text-[color:var(--paper)] text-lg leading-relaxed max-w-2xl">
            {hero.body}
          </p>
        </div>

        <div className="mt-20 grid gap-8">
          {features.items.map((p, i) => (
            <div
              key={p.title}
              className={`grid overflow-hidden rounded-none bg-[color:var(--ink-2)] md:grid-cols-12 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
            >
              <div className="relative aspect-[16/10] [direction:ltr] md:col-span-6 md:min-h-[420px] md:aspect-auto">
                <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--ink)] text-center text-sm text-[color:var(--mute)]">
                  {p.title}
                  {features.placeholderSuffix}
                </div>
              </div>
              <div className="md:col-span-6 p-8 md:p-10 lg:p-14 flex flex-col justify-center reveal [direction:ltr]">
                <div className="eyebrow">{p.eyebrow}</div>
                <h2 className="font-display text-[color:var(--paper)] text-2xl md:text-3xl xl:text-4xl mt-5 tracking-tight leading-[1.06]">
                  {p.title}
                </h2>
                <p className="mt-6 max-w-md text-[color:var(--paper)] leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-6 reveal">
          <p className="font-display text-[color:var(--paper)] text-xl md:text-3xl max-w-xl leading-tight tracking-tight">
            {finalCta.title}
            <span className="text-[color:var(--accent)]">{finalCta.titleAccent}</span>
          </p>
          <Link
            to={finalCta.href}
            className="group inline-flex items-center gap-3 bg-[color:var(--accent)] text-[color:var(--ink)] px-6 py-4 text-xs font-semibold tracking-normal hover:bg-[color:var(--paper)] transition-colors"
          >
            {finalCta.button}{" "}
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
