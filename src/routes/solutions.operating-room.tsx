import { createFileRoute } from "@tanstack/react-router";
import { SolutionDetail } from "@/components/vena/SolutionDetail";
import { useReveal } from "@/components/vena/lib";

export const Route = createFileRoute("/solutions/operating-room")({
  head: () => ({
    meta: [
      { title: "Operating Room | Vēna Vitals" },
      {
        name: "description",
        content:
          "Continuous, noninvasive arterial blood pressure monitoring for operating room and anesthesiology workflows.",
      },
    ],
    links: [{ rel: "canonical", href: "/solutions/operating-room" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return (
    <SolutionDetail
      content={{
        eyebrow: "Solutions / Operating Room",
        title: "Every beat of every case.",
        intro:
          "Continuous, noninvasive arterial blood pressure through the whole case, without an arterial line.",
        button: "Request a Demo",
        sectionEyebrow: "The problem",
        sectionTitle: "Intraoperative pressure changes fast",
        cards: [
          {
            title: "A-line delay",
            body: "An arterial line can take time to place, and not every case has that time.",
          },
          {
            title: "A-line risk",
            body: "Arterial lines are invasive and carry procedure risk, so they are not placed in every case.",
          },
          {
            title: "Cuff blind spots",
            body: "A cuff reads every few minutes, leaving gaps where pressure swings go unseen.",
          },
        ],
        fitEyebrow: "How VeriTrack fits",
        fitTitle: "Apply in pre-op, out of the surgical field",
        fitBody:
          "The soft wrap fits around the foot, seating the sensor over the dorsalis pedis artery and away from the surgical field. The sensor streams beat-to-beat arterial pressure to the bedside iPad from induction through emergence, and the wrap comes off cleanly at the end of the case.",
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
        noteTitle: "Studied in more than 600 surgical patients against arterial lines.",
        noteBody:
          "VeriTrack validation material compares continuous waveform and blood pressure readings with the arterial-line reference standard.",
        cta: "See it in your operating room",
      }}
    />
  );
}
