import { createFileRoute } from "@tanstack/react-router";
import { Partner } from "@/components/vena/Partner";
import { useReveal } from "@/components/vena/lib";

export const Route = createFileRoute("/partner-with-us")({
  head: () => ({
    meta: [
      { title: "Partner With Us | Vēna Vitals" },
      {
        name: "description",
        content:
          "Pilot program, economic case, evidence packet, and demo request for hospitals evaluating Vena Vitals.",
      },
      { property: "og:title", content: "Partner With Us | Vēna Vitals" },
      {
        property: "og:description",
        content: "Start a hospital evaluation or demo conversation with Vena Vitals.",
      },
      { property: "og:url", content: "/partner-with-us" },
    ],
    links: [{ rel: "canonical", href: "/partner-with-us" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <Partner />;
}
