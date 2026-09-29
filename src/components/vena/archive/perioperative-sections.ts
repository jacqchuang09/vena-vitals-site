import type { SolutionDetailContent } from "../SolutionDetail";

/**
 * Sections taken off the Perioperative monitoring page on 29 Sep 2026, kept so
 * they can be put back rather than rewritten.
 *
 * Removed: "Pain points", "How VeriTrack fits" and the "In the operating room"
 * footage strip, plus the evidence note card that sat beside "How VeriTrack
 * fits". The page now runs Hero, study figures, Clinical collaborators,
 * closing CTA.
 *
 * To restore, spread the pieces you want back into the `content` object in
 * src/routes/solutions.anesthesiology.tsx. SolutionDetail renders each section
 * only when its content is present, so partial restores work:
 *   cards      -> Pain points
 *   fitTitle   -> How VeriTrack fits (noteTitle/noteBody fill its side card)
 *   windows    -> the footage strip
 *
 * Other things parked rather than deleted, for anyone looking:
 *   - Four Technology page sections: ../TechnologyArchive.tsx
 *   - The Clinical Studies page itself is still whole at
 *     src/components/vena/Evidence.tsx, routed at /clinical-evidence and
 *     prerendered, but nothing links to it since the nav label stopped being
 *     clickable. Its "Clinical collaborators" section was not deleted either;
 *     it became ../ClinicalCollaborators.tsx and now renders on this page.
 */
export const perioperativeArchive: Partial<SolutionDetailContent> = {
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
  noteTitle: "Evidence in this setting",
  noteBody:
    "Operating-room validation, motion and artifact comparison, and accuracy snapshots are summarized on Clinical Studies.",
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
};
