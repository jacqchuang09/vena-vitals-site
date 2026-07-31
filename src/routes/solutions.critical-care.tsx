import { createFileRoute } from "@tanstack/react-router";
import { SolutionDetail } from "@/components/vena/SolutionDetail";
import { useReveal } from "@/components/vena/lib";

export const Route = createFileRoute("/solutions/critical-care")({
  head: () => ({
    meta: [
      { title: "Critical Care | Vēna Vitals" },
      {
        name: "description",
        content:
          "A near-term critical care direction for continuous, less invasive hemodynamic monitoring.",
      },
    ],
    links: [{ rel: "canonical", href: "/solutions/critical-care" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return (
    <SolutionDetail
      content={{
        eyebrow: "Solutions / Critical Care",
        title: "Continuous visibility for critical care.",
        intro:
          "A hospital-setting direction for continuous pressure visibility between spot checks and invasive lines.",
        button: "Request a Demo",
        sectionEyebrow: "The need",
        sectionTitle: "Missed events between cuff cycles",
        cards: [
          {
            title: "Step-down blind spots",
            body: "Patients outside the highest-acuity rooms may still have meaningful pressure changes between checks.",
          },
          {
            title: "Spot-check reliance",
            body: "Intermittent cuffs can miss short-lived changes and delay trend recognition.",
          },
          {
            title: "Line burden",
            body: "Arterial access adds placement time, maintenance, and procedure risk.",
          },
        ],
        fitEyebrow: "How VeriTrack fits",
        fitTitle: "Continuous, noninvasive, fewer lines",
        fitBody:
          "A soft sensor on the foot provides continuous arterial pressure without a catheter, with the goal of extending continuous visibility to more patients and reducing reliance on invasive access.",
        windowsEyebrow: "In critical care",
        windowsTitle: "Continuous visibility at the bedside.",
        windowsBody:
          "A continuous, noninvasive trend that aims to extend pressure visibility to more patients with less reliance on lines.",
        windows: [
          { label: "Continuous trend at the bedside", feature: true },
          { label: "Less invasive access" },
          { label: "Step-down visibility" },
        ],
        noteTitle: "In development for critical care",
        noteBody:
          "Critical care use is described as a near-term direction, not a cleared indication. VeriTrack has been submitted for Food and Drug Administration 510(k) review and is not yet available for commercial sale.",
        cta: "Talk to us about critical care evaluation",
      }}
    />
  );
}
