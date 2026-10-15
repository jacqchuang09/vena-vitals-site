// Plain Vite config for the Vena Vitals site (TanStack Start + React + Tailwind).
// This used to come from Lovable's @lovable.dev/vite-tanstack-config wrapper,
// which bundled these same plugins plus Lovable-only dev tooling. The site no
// longer uses Lovable, so the plugins are listed here directly.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Keep server-only code out of the browser bundle.
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
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
    }),
    viteReact(),
  ],
  // Use Lightning CSS in dev too, so the dev preview matches the built CSS.
  css: { transformer: "lightningcss" },
  resolve: {
    alias: {
      "@": `${process.cwd()}/src`,
      "@content": `${process.cwd()}/content`,
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: { port: 8080 },
});
