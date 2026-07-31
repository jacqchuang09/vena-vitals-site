import { createFileRoute } from "@tanstack/react-router";
import { FAQ } from "@/components/vena/FAQ";
import { useReveal } from "@/components/vena/lib";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Questions | Vēna Vitals" },
      {
        name: "description",
        content: "Answers about the sensor, comfort, accuracy, data, and regulatory status.",
      },
      { property: "og:title", content: "Questions | Vēna Vitals" },
      {
        property: "og:description",
        content: "How the sensor works, what it measures, and how the data flows.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <FAQ />;
}
