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
        eyebrow: "Sleep monitoring",
        titleLead: "Nighttime pressure",
        title: "is hard to capture.",
        intro:
          "Overnight blood pressure is a promising research direction for continuous, unobtrusive monitoring.",
        button: "Contact our team",
        gallery: {
          footnote:
            "Research presented at World Sleep Conference 2023, ATS 2024, Sleep 2024, and AHA 2026.",
          slides: [
            {
              src: "/assets/studies/sleep-data-1.png",
              alt: "Overnight traces with respiratory-related sleep events marked, plotted above a blood pressure trace whose surges line up with those events",
              caption:
                "A series of respiratory-related sleep events correlating with high BP surges.",
            },
            {
              src: "/assets/studies/sleep-data-2.png",
              alt: "Blood pressure surge magnitudes plotted for arousals and for hypopneas",
              caption:
                "Blood pressure surges correlated to events such as arousals and hypopneas are estimated to be 38 and 78 mmHg.",
            },
          ],
        },
        sectionEyebrow: "Why it matters",
        sectionTitle: "Toward continuous nocturnal blood pressure.",
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
