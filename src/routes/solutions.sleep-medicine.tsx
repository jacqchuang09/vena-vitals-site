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
        heroCards: [
          {
            title: "Sleep disruption",
            body: "Conventional ambulatory blood pressure monitors (ABPMs) can wake up patients and affect sleep quality.",
          },
          {
            title: "Missed BP variation",
            body: "Episodic measurements can miss meaningful nighttime pressure patterns.",
          },
          {
            title: "Untapped insights",
            body: "Continuous, unobtrusive monitoring during sleep can yield new information about an individual's overall health.",
          },
        ],
        gallery: {
          // Same shape as the perioperative figures header: small red caps
          // over a large heading with an accent tail.
          eyebrow: "Polysomnography Data",
          title: "Clinical evidence in",
          titleAccent: "sleep settings.",
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
      }}
    />
  );
}
