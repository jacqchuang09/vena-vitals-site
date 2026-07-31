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
        eyebrow: "Solutions / Anesthesiology",
        title: "Every beat of",
        titleAccent: "every case.",
        intro:
          "Continuous, noninvasive arterial pressure for the operating room, applied to the foot and out of your field.",
        button: "Request a Demo",
        sectionEyebrow: "Pain points",
        sectionTitle: "Why the current choice is",
        sectionAccent: "difficult.",
        cards: [
          {
            title: "A-line delay",
            body: "Placing a line can take unpredictable time, delaying care when teams need continuous pressure now.",
          },
          {
            title: "A-line risk",
            body: "Arterial lines are invasive and carry procedure risk, so they are not placed in every case.",
          },
          {
            title: "Cuff blind spots",
            body: "Lag and minutes between readings can hide blood loss, fluid shifts, and rapid pressure changes.",
          },
        ],
        fitEyebrow: "How VeriTrack fits",
        fitTitle: "Apply in pre-op,",
        fitAccent: "out of the surgical field.",
        fitBody:
          "The sensor sits on the foot, where placement is simple and out of the way. It is applied before the case and monitors continuously through the case.",
        windowsEyebrow: "In the operating room",
        windowsTitle: "Continuous pressure, in the room.",
        windowsBody:
          "From placement on the foot to a continuous trace at the bedside, without occupying the arm or sterile field.",
        windows: [
          {
            src: "/assets/operating-room/or-sensor-foot.mp4",
            label: "Applied to the foot, out of the field",
            feature: true,
          },
          {
            src: "/assets/operating-room/or-monitor.mp4",
            label: "Continuous pressure at the bedside",
          },
          { src: "/assets/operating-room/or-monitor-2.mp4", label: "Eyes on every beat" },
        ],
        noteTitle: "Evidence in this setting",
        noteBody:
          "Operating-room validation, motion and artifact comparison, and accuracy snapshots are summarized on Clinical Evidence.",
        cta: "Request a demo for your",
        ctaAccent: "operating room.",
      }}
    />
  );
}
