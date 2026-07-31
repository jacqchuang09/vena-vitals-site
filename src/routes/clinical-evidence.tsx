import { createFileRoute } from "@tanstack/react-router";
import { Evidence } from "@/components/vena/Evidence";
import { useReveal } from "@/components/vena/lib";

export const Route = createFileRoute("/clinical-evidence")({
  head: () => ({
    meta: [
      { title: "Clinical Evidence | Vēna Vitals" },
      {
        name: "description",
        content:
          "Clinical validation data, arterial-line comparison, and study status for Vena Vitals.",
      },
      { property: "og:title", content: "Clinical Evidence | Vēna Vitals" },
      {
        property: "og:description",
        content:
          "Validation data and arterial-line comparison for continuous, noninvasive blood pressure monitoring.",
      },
      { property: "og:url", content: "/clinical-evidence" },
    ],
    links: [{ rel: "canonical", href: "/clinical-evidence" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <Evidence />;
}
