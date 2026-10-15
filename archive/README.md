# archive/

Things that used to be on the site, or were built for it, but aren't shown
right now. None of this is built or deployed. It is kept so a section can be
put back instead of rebuilt from scratch.

## Sections (`archive/sections/<page>/`)

Grouped by the page they came from.

| Page | File | What it is |
| --- | --- | --- |
| Home | `home/HomeRemovedSections.tsx` | three home sections: **HomeSolution** (how-it-works steps), **HomeVideo** ("Meet Vēna" video), **HomeBackedBy** (investor logo strip) |
| Home | `home/CareJourney.tsx` | Capture → Detect → Record care journey cards |
| Home | `home/WhyVena.tsx` | count-up stat strip (pulse events per hour, mean error, 24/7 wear, zero needle sticks) |
| Home | `home/LiveMonitor.tsx` + `home/Waveform.tsx` | animated bedside monitor with a live arterial waveform and ticking vitals |
| About | `about/AboutRemovedSections.tsx` | **StorySection** (company story) and the scrolling milestones timeline |
| Technology | `technology/TechnologyArchive.tsx` | **TechSignal**, **TechAtAGlance**, **TechSpecs**, **TechIpScience**, removed 29 Sep 2026 |
| Technology | `technology/SignalGraphs.tsx`, `MonitorMock.tsx`, `StandardMonitorMock.tsx` | animated sensor figure, Vēna monitor app mockup, and a crowded standard monitor mockup (used by TechnologyArchive) |
| Technology | `technology/SensorExploded.tsx` | scroll-driven exploded view of the wearable (uses the 121-frame image sequence in `media/assets/technology/wearable-frames/`) |
| Technology | `technology/TechnologyRemovedSections.tsx` | **TechnicalDetail** (expandable technical detail) |
| Clinical Evidence | `clinical-evidence/ClinicalCollaborators.tsx` + `people.ts` | clinical advisor portraits, with full bios for Drs. Rinehart, Lombardo, Malik and Washington |
| Solutions | `solutions/Solutions.tsx` | the old `/solutions` overview page (hospital settings grid). `/solutions` now redirects home |
| Solutions | `solutions/Mission.tsx` | care settings strip (critical care & OR, ward & step-down...) |
| Solutions | `solutions/perioperative-sections.ts`, `sleep-sections.ts` | copy removed from the perioperative and sleep pages on 29 Sep 2026 |
| Partner | `partner/PartnerSections.tsx` | **PartnerEconomicCase**, **PartnerPilotSteps**, **PartnerClinicalSites**, **PartnerFaq**, **PartnerClosingCta** |
| News | `news/Resources.tsx` | "More to read" resources section |
| Any page | `shared/CursorGlow.tsx` | glow that follows the mouse cursor |

Text in these files is still written inside the code (they were archived
before the content move). When you bring one back, move its text into the
page's content file like the live sections.

## Media (`archive/media/`)

- `media/assets/...` keeps each file's **original path**. A file at
  `archive/media/assets/home/meet-vena.mp4` was served as
  `/assets/home/meet-vena.mp4`, which is the path archived code still uses.
  Highlights: the "Meet Vēna" and MedTech Innovator videos, home "use-*"
  clips, advisor portraits, the wearable exploded-view frames, the 3D pulse
  video, two extra OR study figures, and unused brand logos.
- `media/unsorted/` has files nothing on the site ever referenced in its
  current form: Canva exports (`untitled-design/`), early template images, an
  old screenshot.

## Old docs (`archive/old-docs/`)

Notes for tools the site no longer uses: the Framer to-do list, the original
Cursor build spec, and GitHub Copilot instructions.

## Bringing something back

Easiest: ask Claude, e.g. *"bring back HomeVideo from the archive onto the
home page, after the evidence section."*

By hand:

1. Copy the section file (or the one function you want) from
   `archive/sections/<page>/` into `src/components/<page>/`.
2. Move any images or videos it uses from `archive/media/assets/...` into
   `public/assets/<page>/` and update the paths in the code.
3. Import the section in the page's file in `src/routes/` and place it where
   it should appear.
4. Move its text into `content/<page>.json` (optional but keeps things tidy).
5. Run `npm run build`, check the page with `npm run dev`, then commit.
