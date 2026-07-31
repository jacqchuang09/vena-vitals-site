import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/vena/About";
import { useReveal } from "@/components/vena/lib";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Vēna Vitals" },
      {
        name: "description",
        content:
          "Vēna Vitals is developing a soft, skin-worn sensor for continuous, cuffless blood pressure monitoring.",
      },
      { property: "og:title", content: "About | Vēna Vitals" },
      {
        property: "og:description",
        content: "Company, founders, technology, and clinical development overview.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <About />;
}
