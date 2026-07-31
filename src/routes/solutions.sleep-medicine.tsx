import { createFileRoute } from "@tanstack/react-router";
import { SolutionDetail } from "@/components/vena/SolutionDetail";
import { useReveal } from "@/components/vena/lib";

export const Route = createFileRoute("/solutions/sleep-medicine")({
  head: () => ({
    meta: [
      { title: "Sleep Medicine | Vēna Vitals" },
      {
        name: "description",
        content:
          "A research direction for continuous nocturnal blood pressure monitoring with a soft sensor.",
      },
    ],
    links: [{ rel: "canonical", href: "/solutions/sleep-medicine" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return (
    <SolutionDetail
      content={{
        eyebrow: "Solutions / Sleep Medicine",
        title: "Toward continuous nocturnal blood pressure.",
        intro:
          "Overnight blood pressure is a promising research direction for continuous, unobtrusive monitoring.",
        button: "Contact our team",
        sectionEyebrow: "Why it matters",
        sectionTitle: "Nighttime pressure is hard to capture",
        cards: [
          {
            title: "Sleep disruption",
            body: "Conventional overnight blood pressure methods can wake patients or change sleep quality.",
          },
          {
            title: "Missed variation",
            body: "Nighttime pressure patterns can carry meaningful signals that intermittent checks may miss.",
          },
          {
            title: "Research need",
            body: "Continuous, unobtrusive monitoring could make nocturnal blood pressure easier to study.",
          },
        ],
        fitEyebrow: "Research direction",
        fitTitle: "Continuous signal alongside a sleep study",
        fitBody:
          "Overnight blood pressure and its variation carry meaningful signals, yet conventional methods disrupt sleep. A soft sensor that streams continuously alongside standard sleep measures could make nocturnal pressure easier to study.",
        windowsEyebrow: "During the night",
        windowsTitle: "A continuous signal through the night.",
        windowsBody:
          "A research direction: a soft sensor that streams continuously alongside standard sleep measures to make nocturnal pressure easier to study.",
        windows: [
          { label: "Overnight blood pressure signal", feature: true },
          { label: "Alongside the sleep study" },
          { label: "Research-ready data" },
        ],
        noteTitle: "A research direction, not a product",
        noteBody:
          "VeriTrack is not offered for sleep or home use today. This page describes a direction for research. VeriTrack has been submitted for Food and Drug Administration 510(k) review and is not yet available for commercial sale.",
        cta: "Collaborate on research",
      }}
    />
  );
}
