// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Force-enable the Nitro deploy plugin. Without this it only runs inside
  // Lovable's own environment ("No Lovable context detected — skipping nitro
  // deploy plugin") — so a plain `npm run build` on Netlify/CI produced a
  // server bundle with no platform adapter, and Netlify 404'd every route.
  // The target preset is chosen at build time via NITRO_PRESET (set to
  // "netlify" in netlify.toml).
  nitro: false,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },

    // Prerender every route to static HTML at build time. Nothing on this site
    // reads request-time state — there are no server functions and no loaders
    // fetching data, so rendering each page per request only burned serverless
    // invocations for output that never changes between visitors.
    prerender: {
      enabled: true,
      // Follows every <Link> from "/", which covers everything reachable from
      // the nav, the footer and the in-page CTAs.
      crawlLinks: true,
      // Surface a broken route as a failed build instead of silently shipping
      // a page that falls back to on-demand rendering.
      failOnError: true,
      // /solutions has no page of its own — it redirects to "/". Prerendering
      // it follows that redirect and writes a byte-for-byte copy of the home
      // page to /solutions, which is duplicate content under a second URL.
      // It is served as a real 301 from netlify.toml instead.
      filter: (page: { path: string }) => page.path !== "/solutions",
    },

    // Routes the crawler cannot reach, because nothing on the site links to
    // them. Without these three they would be the only pages still rendered on
    // demand. See also: /solutions has no page of its own, it redirects, so it
    // is deliberately absent here.
    pages: [
      { path: "/faq" },
      { path: "/product" },
      { path: "/solutions/operating-room" },
      // Renders the root route's NotFoundComponent to a static page. Without a
      // server there is nothing to render a 404 on demand, so netlify.toml
      // serves this file for any unmatched path.
      { path: "/404" },
    ],
  },
});
