import { createFileRoute } from "@tanstack/react-router";
import { Technology } from "@/components/vena/Technology";
import { useReveal } from "@/components/vena/lib";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology | Vēna Vitals" },
      {
        name: "description",
        content:
          "How the capacitive micropillar sensor turns each pulse into a calibrated blood-pressure waveform, soft, skin-worn, no ultrasound.",
      },
      { property: "og:title", content: "Technology | Vēna Vitals" },
      {
        property: "og:description",
        content:
          "Inside the soft capacitive sensor that reads beat-to-beat blood pressure from the skin.",
      },
      { property: "og:url", content: "/technology" },
    ],
    links: [{ rel: "canonical", href: "/technology" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <Technology />;
}
