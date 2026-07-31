import { createFileRoute } from "@tanstack/react-router";
import { SolutionDetail } from "@/components/vena/SolutionDetail";
import { useReveal } from "@/components/vena/lib";

export const Route = createFileRoute("/solutions/home-monitoring")({
  head: () => ({
    meta: [
      { title: "Home Monitoring | Vēna Vitals" },
      {
        name: "description",
        content:
          "A future direction for continuous blood pressure monitoring outside the hospital.",
      },
    ],
    links: [{ rel: "canonical", href: "/solutions/home-monitoring" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return (
    <SolutionDetail
      content={{
        eyebrow: "Solutions / Home Monitoring",
        title: "Toward continuous pressure outside the hospital.",
        intro:
          "A future direction for noninvasive blood pressure trends during everyday life and remote follow-up.",
        button: "Contact our team",
        sectionEyebrow: "Future use case",
        sectionTitle: "Blood pressure changes outside clinic visits",
        cards: [
          {
            title: "Fewer snapshots",
            body: "Home cuffs can miss variation between measurements and depend on patient technique.",
          },
          {
            title: "Continuous trends",
            body: "A skin-worn sensor could make longitudinal pressure patterns easier to review.",
          },
          {
            title: "Care-team context",
            body: "Trend data could support follow-up when paired with clinical review and clear workflows.",
          },
        ],
        fitEyebrow: "Important note",
        fitTitle: "Not a commercial home product today",
        fitBody:
          "Home monitoring is included as a future direction. VeriTrack has been submitted for Food and Drug Administration 510(k) review and is not yet available for commercial sale.",
        windowsEyebrow: "Outside the hospital",
        windowsTitle: "Continuous trends at home.",
        windowsBody:
          "A future direction: a soft, wearable sensor that could make longitudinal pressure patterns easier to review with a care team.",
        windows: [
          { label: "Continuous pressure at home", feature: true },
          { label: "Trends for the care team" },
          { label: "Soft, wearable form factor" },
        ],
        noteTitle: "Keep evidence and indications separate",
        noteBody:
          "This page describes a potential setting. Current validation details and regulatory status belong on Clinical Evidence.",
        cta: "Talk to us about future studies",
      }}
    />
  );
}
