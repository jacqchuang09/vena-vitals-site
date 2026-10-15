import { createFileRoute } from "@tanstack/react-router";
import { NotFoundComponent } from "./__root";
// The not-found page's words live in the `notFound` block of this file:
import site from "@content/site.json";

// A real route so the prerender can emit a static 404 document. The site is
// fully prerendered, so there is no server left to render the root route's
// notFoundComponent on demand — netlify.toml serves this file with a 404
// status for any unmatched path. Client-side navigation to an unknown route
// still uses the router's own notFoundComponent, which this reuses.
export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [{ title: site.notFound.seo.title }, { name: "robots", content: "noindex" }],
  }),
  component: NotFoundComponent,
});
