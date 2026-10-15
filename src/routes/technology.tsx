import { createFileRoute } from "@tanstack/react-router";
import { Technology } from "@/components/technology/Technology";
import { useReveal } from "@/components/shared/lib";
// All words, images and videos on this page live in this file:
import technology from "@content/technology.json";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: technology.seo.title },
      { name: "description", content: technology.seo.description },
      { property: "og:title", content: technology.seo.shareTitle },
      { property: "og:description", content: technology.seo.shareDescription },
      { property: "og:url", content: technology.seo.url },
    ],
    links: [{ rel: "canonical", href: technology.seo.url }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <Technology />;
}
