import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/about/About";
import { useReveal } from "@/components/shared/lib";
// All words, images and videos on this page live in this file:
import about from "@content/about.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: about.seo.title },
      { name: "description", content: about.seo.description },
      { property: "og:title", content: about.seo.shareTitle },
      { property: "og:description", content: about.seo.shareDescription },
      { property: "og:url", content: about.seo.url },
    ],
    links: [{ rel: "canonical", href: about.seo.url }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <About />;
}
