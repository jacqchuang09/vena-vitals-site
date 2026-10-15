import { createFileRoute } from "@tanstack/react-router";
import { Product } from "@/components/product/Product";
import { useReveal } from "@/components/shared/lib";
// All words, images and videos on this page live in this file:
import product from "@content/product.json";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: product.seo.title },
      { name: "description", content: product.seo.description },
      { property: "og:title", content: product.seo.shareTitle },
      { property: "og:description", content: product.seo.shareDescription },
      { property: "og:url", content: product.seo.url },
    ],
    links: [{ rel: "canonical", href: product.seo.url }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <Product />;
}
