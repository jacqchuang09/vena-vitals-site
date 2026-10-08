import { createFileRoute } from "@tanstack/react-router";
import { SolutionDetail } from "@/components/vena/SolutionDetail";
import { useReveal } from "@/components/vena/lib";

export const Route = createFileRoute("/solutions/anesthesiology")({
  head: () => ({
    meta: [
      { title: "Anesthesiology | Vēna Vitals" },
      {
        name: "description",
        content:
          "Continuous, noninvasive arterial blood pressure monitoring for anesthesiology and operating room workflows.",
      },
    ],
    links: [{ rel: "canonical", href: "/solutions/anesthesiology" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return (
    <SolutionDetail
      content={{
        eyebrow: "Perioperative monitoring",
        title: "Continuous blood pressure,",
        titleAccent: "evaluated against the arterial line.",
        intro:
          "Performance has been measured in the operating room on 600+ patients across eight U.S. hospitals.",
        button: "Request a Demo",
        showHeroButton: false,
        collaborators: ["Joseph Rinehart, MD"],
        figures: {
          eyebrow: "Operating room data",
          title: "Measured against the",
          titleAccent: "arterial line.",
          footnote: "Research presented at IARS 2024, IARS 2025, ASA 2025, and ASA 2026.",
          slides: [
            {
              src: "/assets/studies/or-data-1.png",
              alt: "Arterial line and Vena Vitals pressure traces over roughly an hour, plotted one above the other, with calibration points to a blood pressure cuff marked on the lower trace",
              caption:
                "Investigational device used in 62 year old male in an endovascular procedure.",
            },
            {
              src: "/assets/studies/or-data-2.png",
              alt: "Arterial line and Vena Vitals pressure traces plotted one above the other for a craniotomy case",
              caption:
                "Investigational device used in 41 year old male in a right frontotemporal craniotomy.",
            },
            {
              src: "/assets/studies/or-data-3.png",
              alt: "A steep fall and recovery in blood pressure, tracked by both the arterial line and the sensor-derived signal",
              caption: "The sensor-derived signal responds to rapid changes in blood pressure.",
            },
            {
              src: "/assets/studies/or-data-4.png",
              alt: "A close view of individual pressure waveforms, showing the systolic upstroke and dicrotic notch resolved by the sensor",
              caption:
                "The sensor is able to capture detailed waveform features, as seen in this 43 year old male undergoing a CABG procedure.",
            },
            {
              src: "/assets/studies/or-data-5.png",
              alt: "Sensor readings plotted against arterial line readings across a wide span of pressures",
              caption: "The investigational device measures across a wide range of blood pressure.",
            },
          ],
        },
      }}
    />
  );
}
