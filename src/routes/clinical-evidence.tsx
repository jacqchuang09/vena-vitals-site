import { createFileRoute } from "@tanstack/react-router";
import { Evidence } from "@/components/clinical-evidence/Evidence";
import { useReveal } from "@/components/shared/lib";
// All words, images and videos on this page live in this file:
import evidence from "@content/clinical-evidence.json";

export const Route = createFileRoute("/clinical-evidence")({
  head: () => ({
    meta: [
      { title: evidence.seo.title },
      { name: "description", content: evidence.seo.description },
      { property: "og:title", content: evidence.seo.shareTitle },
      { property: "og:description", content: evidence.seo.shareDescription },
      { property: "og:url", content: evidence.seo.url },
    ],
    links: [{ rel: "canonical", href: evidence.seo.url }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <Evidence />;
}
