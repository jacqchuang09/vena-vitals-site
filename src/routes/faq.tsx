import { createFileRoute } from "@tanstack/react-router";
import { FAQ } from "@/components/faq/FAQ";
import { useReveal } from "@/components/shared/lib";
// All words, images and videos on this page live in this file:
import faq from "@content/faq.json";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: faq.seo.title },
      { name: "description", content: faq.seo.description },
      { property: "og:title", content: faq.seo.shareTitle },
      { property: "og:description", content: faq.seo.shareDescription },
      { property: "og:url", content: faq.seo.url },
    ],
    links: [{ rel: "canonical", href: faq.seo.url }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <FAQ />;
}
