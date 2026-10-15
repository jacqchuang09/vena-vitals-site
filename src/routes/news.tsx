import { createFileRoute } from "@tanstack/react-router";
import { News } from "@/components/news/News";
import { useReveal } from "@/components/shared/lib";
// All words, images and videos on this page live in this file:
import news from "@content/news.json";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: news.seo.title },
      { name: "description", content: news.seo.description },
      { property: "og:title", content: news.seo.shareTitle },
      { property: "og:description", content: news.seo.shareDescription },
      { property: "og:url", content: news.seo.url },
    ],
    links: [{ rel: "canonical", href: news.seo.url }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <News />;
}
