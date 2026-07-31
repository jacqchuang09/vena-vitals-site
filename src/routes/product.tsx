import { createFileRoute } from "@tanstack/react-router";
import { Product } from "@/components/vena/Product";
import { useReveal } from "@/components/vena/lib";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Product | Vēna Vitals" },
      {
        name: "description",
        content:
          "Wearable sensor, phone app, and clinician monitor for continuous vitals from skin to chart.",
      },
      { property: "og:title", content: "Product | Vēna Vitals" },
      {
        property: "og:description",
        content: "Sensor, app, and clinician monitor working as one continuous vitals system.",
      },
      { property: "og:url", content: "/product" },
    ],
    links: [{ rel: "canonical", href: "/product" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <Product />;
}
