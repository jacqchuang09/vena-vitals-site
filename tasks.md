# Tasks

This is the running task list for the Vena Vitals marketing site. Agents should read `CLAUDE.md` and all docs in `docs/vibe-code` before starting.

Blue markers mean a human decision, source, citation, permission, or asset is still needed.

<span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: keep this task list current as the project shifts.]</span>

## Current Priority

Structure is locked (6/19 stakeholder review with Josh). Near-term priority: populate every page with placeholders and real assets, then stylize.

Do not finalize copy in this phase. Use boilerplate or AI-drafted text and mark it as draft. Prefer real Vena Vitals assets (figures, signal graphs, videos, device-on-foot images, content from the old Google Drive) over generated renders or placeholders whenever they exist.

First-draft target is about a week out, around next Friday (June 26, 2026), meaning fully populated but not final wording. Review on Tuesday (June 23, 2026).

### Scroll-effect and stylization pass (7/20)

Interaction work. Three sections now pin to the viewport and drive their motion
from scroll position. All three share the same mechanism: a tall outer track
whose extra height is the scroll budget, a `sticky` viewport-height stage
inside it, and a `requestAnimationFrame` loop that writes transforms straight
to the DOM (never through React state, which would re-render the section and
`StretchText` on every scroll tick). All three use the same damped follow
(`SMOOTH = 0.2`) so wheel and trackpad steps don't land as visible jumps, and
all three fall back to a static, unpinned layout under `prefers-reduced-motion`.

- **Clinical Evidence — research pipeline** (`Evidence.tsx`). Was a horizontal
  drag carousel; now the studies slide up through a clipping viewport one at a
  time, each holding still for the first 50% of its scroll slot before handing
  off (`HOLD`), with a `GAP` of empty space between them so they read as
  discrete items rather than one continuous ribbon. No opacity crossfade — two
  opaque panels at the same position ghost their text together illegibly. The
  cards were then de-carded entirely: image left, type right, no panel, no
  border, no shadow. `SCROLL_PER_CARD_VH = 95`.
- **Technology — exploded sensor view** (`SensorExploded.tsx`, new). Pinned CSS
  3D stage (`perspective` + `preserve-3d`) where the wearable's layers separate
  along Z as you scroll, then the highlight walks down the layer list.
- **About — company timeline** (`About.tsx`). Was a horizontal auto-marquee; now
  a vertical timeline that travels inside a fixed window on the right of the
  story copy, entries alternating either side of a centre rail and popping in as
  they rise. `TIMELINE_SCROLL_VH = 520`.

Stylization and layout:

- About page brought in line with the other pages: asymmetric editorial grids
  (`md:grid-cols-[0.58fr_1.42fr]`), eyebrow labels on every section, accent-split
  headings, `01`/`02` mono indices on the team cards, corrected CTA order and
  colours. It had been the only page built on centred columns and symmetric grids.
- Home "The Problem": iPad frame reduced to `max-w-[520px]` and right-aligned in
  its column so its right edge lines up with the stat cards below it.
- Home "The company behind VeriTrack": video is now full-bleed over the whole
  section with the headline overlaid bottom left; no frame, border, or radius.

Navigation:

- `/solutions` no longer has a landing page. The route survives only as the
  layout parent for the individual setting pages; the bare path redirects home.
  The nav "Solutions" item is now a non-clickable `button` that only opens the
  dropdown, and the mobile drawer lists the four setting pages directly.
- Footer's "Solutions" link removed — it pointed at the now-redirecting path.

Site-wide constraint discovered while doing this: **before this pass, no section
on any page was taller than the viewport.** That invariant is what allows the nav
to be fully transparent with no background. A first attempt at the vertical
timeline broke it and collided with the nav links; the fix was to pin the
timeline so the section stays viewport-height. Keep new sections viewport-height
or the nav needs a scrolled background.

Team section (About):

- Expanded from 3 founders to the full 6, each card opening a biography dialog
  matching the clinical-advisor dialog on the Clinical Evidence page. Added
  Sophia Lin PhD, Eugene Lee PhD, and Jared Olivo, with headshots cropped from
  `headshots_individual/` (the source PNGs carry a dark bar down the left edge —
  crop it, don't nudge it with object-position).
- Titles for all six are verbatim from Vēna's own decks
  (`VenaVitals_intro_materials.pptx`, `VenaVitals_background-510k.pptx`), where
  they appear identically in both.
- Fixed: the founder cards previously linked to Google Drive "bio" documents
  that are in fact **headshot image files** — clicking a founder opened a raw
  photo. Those links are gone, replaced by the dialog.
- Ray Liu's bio is sourced (intro_materials slide 8). No one else has written
  biography text anywhere in the company Drive, so their dialog shows
  "Biography to confirm." rather than invented copy.

- <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: biographies for Michelle Khine, Josh Kim, Sophia Lin, Eugene Lee, and Jared Olivo. None exist in Drive.]</span>
- <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: "Head of Mech E" is deck shorthand — confirm "Head of Mechanical Engineering" is right for Jared Olivo.]</span>
- <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: source decks say "Scientific Advisor Co-Founder" for Michelle Khine (narrower than the site's "Co-founder") and "Joshua Kim" rather than "Josh Kim". Confirm the public forms.]</span>
- <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: `Vena_Vitals_Website_Copy` in Drive contains one-line founder bios that do not trace to any primary source — the Ray Liu line in particular conflicts with his sourced background. Do not publish them without sign-off.]</span>

Still needs the Vena Vitals team:

- <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: the exploded sensor view's layer names and order. The capacitive stack (dielectric, silicone elastomer, air gap, PDMS spacer, wrinkled-gold electrode) is taken from technical copy already on the Technology page, but the soft housing, flexible PCB, and skin interface are not documented anywhere in this repo — they were inferred and are flagged "To confirm." in the UI.]</span>
- <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: the exploded view is drawn as abstract CSS planes, not product art. No per-layer renders exist in the repo. Real transparent PNGs can drop into the existing per-layer slots.]</span>
- <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: research pipeline card images are decorative (alt=""), not depictions of the studies they sit beside.]</span>

### Recent home page changes (6/29)

- Added a 4-stat strip below the clinical-evidence chart: 600+ subjects tested, 6+ study sites, ages 18-89 / BMI 17-48, 30-300 mmHg BP range. (Subjects confirmed as 600+, matching `Evidence.tsx`.)
- Removed the dead hidden iPad-mockup block from `HomeEvidenceStrip`.
- Added small red uppercase eyebrow labels above every home section heading: The Problem, The Solution (existing), Clinical Evidence, See It In Action, Use Cases, Perspectives, Get Started.
- Use Cases cards now have looping autoplay video: documentary hospital footage below the clinical-teams card (`use-clinical.mp4`), mobile-app clip above the sleep-medicine card (`use-sleep.mp4`, downscaled from a 4K source to 1280px / 601KB).

## Phase 1: Project And Brand Assets

- [ ] Confirm final product naming rules.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: decide when to use Vena Vitals vs VeriTrack.]</span>
- [ ] Add approved logo, favicon, and brand assets.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: final logo files needed.]</span>
- [ ] Replace placeholder images with approved product, OR, tablet UI, evidence, and sleep visuals.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: approved image files needed.]</span>
- [ ] Confirm regulatory disclaimer wording.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: legal/regulatory review needed.]</span>

## Phase 2: Design System And Shared Layout

- [x] Create shared header and footer structure.
  - Completed: nav now includes Technology, Evidence, Solutions, Partner, About, News, Request a Demo.
- [x] Create shared live monitor component.
  - Completed: waveform and vitals display, with units stacked to avoid overlap.
- [ ] Audit responsive design system across all page widths.
  - Check mobile, tablet, desktop, and narrow desktop containers.
- [ ] Add final brand token decisions to `design-guidelines.md`.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: official color and font confirmation needed.]</span>
- [ ] Set the Vena Vitals brand red and neutral gray hex values in `design-guidelines.md`.
  - The accent role is set to the brand red. Apply red as accent, black for contrast, neutral gray, on the dark base.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: exact brand red and gray hex values needed.]</span>

## Phase 3: Homepage

- [x] Build homepage sections from sitemap.
  - Completed: hero, trust bar, problem, solution, evidence strip, audience cards, quote placeholders, backed-by row, final CTA.
- [ ] Update homepage audience cards to the merged set: Clinicians, Hospitals and Health Systems, Researchers and Sleep Medicine.
  - Merge the overlapping hospital-administrator and anesthesiologist cards into the single Clinicians card.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm final audience-card wording.]</span>
- [ ] Remove Download One-Pager references from the homepage final CTA, Clinical Evidence, and Partner With Us.
  - Site stays minimal for now.
- [ ] Replace homepage proof points with approved wording.
  - Trust bar and backer-logo placement are flexible. Logos may move to the footer or be rearranged. Design decision, not fixed.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: verify 600+ patients, A-line validation, 510(k), UCI origin.]</span>
- [ ] Replace quote placeholders with approved quote, name, title, and photo.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: approved quote needed.]</span>
- [ ] Add real backed-by logos after permission.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: logo permissions and final files needed.]</span>

## Phase 4: Core Pages

- [x] Build Technology page template.
  - Completed: hero, how it works, spec table, roadmap, IP/science, CTA.
- [x] Build Clinical Evidence page template.
  - Completed: hero, stats, validation study, accuracy table, library, research, advisors, CTA.
- [ ] Update Clinical Evidence for the 6/19 decisions.
  - Remove the publication library for now. We do not have it yet.
  - Keep our own clinical data.
  - Keep a how-we-compare graphic, the Vena Vitals vs arterial-line graph, and make it more stylized than the current site.
  - Keep the flagship validation study as a clearly marked placeholder. The study is ongoing, so it is TBD.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: flagship study design, n, comparator, result, and citation are TBD until the study completes.]</span>
- [x] Build Partner With Us page template.
  - Completed: economic case, evaluation program, partner logos, FAQ, demo form.
- [x] Build About page template.
  - Completed: story, founders, advisors, backers, careers, CTA.
- [ ] Confirm About page in story format (UC Irvine lab to validated sensor). Keep team and advisors prominent.
  - Founders are placeholders pulled from the old Drive for now.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm founder names, titles, and photos.]</span>
- [x] Build News page template.
  - Completed: updates, evidence news, press kit, press CTA.
- [x] Build Contact page.
  - Completed: contact form, direct contacts, confirmation state.

## Phase 5: Setting Pages (Hospital Settings and Home)

Solutions is grouped into Hospital Settings (Anesthesiology, ICU) and Home (Sleep Medicine). Each use case is its own clickable page.

- [ ] Build the grouped Solutions nav dropdown: Hospital Settings (Anesthesiology, ICU) and Home (Sleep Medicine).
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm the top-level nav label and final routes.]</span>
- [ ] Build or refine the Anesthesiology page (renamed from Operating Room).
  - Primary setting page, modeled on a Butterfly specialty page. Include OR workflow, A-line pain points, validation, and demo CTA.
- [ ] Build the ICU page (Hospital Settings).
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm claims and validation status.]</span>
- [ ] Build the Sleep Medicine page (Home).
  - Keep research-framed.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm approved sleep figure and language.]</span>

## Phase 6: Evidence And Download Assets

- [ ] Add citation for IARS presentation.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: citation or abstract link needed.]</span>
- Publication library: omitted for now. We do not have it yet. Removed from scope until the list exists.
- [ ] Create or upload evidence summary PDF.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: approved PDF needed.]</span>
- Economic one-pager: removed for now to keep the site minimal.
- [ ] Create or upload spec sheet.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: verified specs needed.]</span>

## Phase 7: Forms And Integrations

- [ ] Decide where the demo form submits.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: choose email, CRM, database, or third-party form tool.]</span>
- [ ] Add role dropdown and inquiry routing.
- [ ] Add analytics if required.
  - <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm analytics and privacy requirements.]</span>

## Phase 8: QA And Launch

- [ ] Desktop visual QA.
- [ ] Mobile visual QA.
- [ ] Navigation QA for every page.
- [ ] Form QA.
- [ ] Accessibility pass.
- [ ] Performance pass.
- [ ] Content claim review.
- [ ] Legal and regulatory review.
- [ ] Final build check with `npm run build`.
- [ ] Final lint check with `npm run lint`.
