import type { SolutionDetailContent } from "../SolutionDetail";

/**
 * Sections taken off the Sleep monitoring page on 29 Sep 2026, kept so they
 * can be put back rather than rewritten.
 *
 * Everything after the first two sections was removed: "Why it matters",
 * "Research direction" with its note card, the "During the night" footage
 * strip, and the closing "Collaborate on research" CTA. The page now runs
 * Hero, study figures, and nothing else. The hero keeps its own
 * "Contact our team" button, so the page is not without a call to action.
 *
 * "Toward continuous nocturnal blood pressure." below was this page's original
 * hero headline. It moved down here when the hero took
 * "Nighttime pressure is hard to capture." from this section.
 *
 * To restore, spread the pieces you want back into the `content` object in
 * src/routes/solutions.sleep-medicine.tsx. SolutionDetail renders each section
 * only when its content is present, so partial restores work:
 *   cards      -> Why it matters
 *   fitTitle   -> Research direction (noteTitle/noteBody fill its side card)
 *   windows    -> the footage strip
 *   cta        -> the closing CTA
 *
 * Note the regulatory line that was in `noteBody`: it is the only place on
 * this page that carried the 510(k) statement. The site footer carries it too,
 * so nothing is lost, but that is worth knowing before this stays off.
 *
 * Sections parked from the other solution page: ./perioperative-sections.ts
 */
export const sleepArchive: Partial<SolutionDetailContent> = {
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
};
