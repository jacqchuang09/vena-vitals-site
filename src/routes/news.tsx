import { createFileRoute } from "@tanstack/react-router";
import { News } from "@/components/vena/News";
import { useReveal } from "@/components/vena/lib";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News | Vēna Vitals" },
      {
        name: "description",
        content:
          "Company updates, evidence news, press materials, and media contact for Vena Vitals.",
      },
      { property: "og:title", content: "News | Vēna Vitals" },
      { property: "og:description", content: "Company updates and approved press resources." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <News />;
}
