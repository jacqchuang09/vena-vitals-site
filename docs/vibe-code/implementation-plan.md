# Implementation Plan

## Current Working Order (from the 6/19 stakeholder review)

Structure is locked. We are moving from structure to design.

1. Populate every page with placeholders and real assets first.
2. Then stylize.

Do not finalize copy in this phase. Use boilerplate or AI-drafted text and mark it as draft. Final wording will be set later by the Vena Vitals team.

Prefer real Vena Vitals assets (figures, signal graphs, videos, device-on-foot images, and content from the old Google Drive) over generated renders or placeholders whenever they exist.

## Build Order

| Phase | Work | Goal |
|---|---|---|
| 1 | Set up project and brand assets | Make sure the project runs and approved assets are in place |
| 2 | Build design system and shared layout | Lock colors, fonts, spacing, header, footer, cards, tables, CTAs |
| 3 | Build homepage | Establish first impression, proof path, and CTAs |
| 4 | Build core pages | Technology, Clinical Evidence, Partner With Us, About, Contact |
| 5 | Build setting pages | Hospital Settings (Anesthesiology, ICU) and Home (Sleep Medicine) |
| 6 | Add content assets | PDFs, charts, screenshots, approved logos, final images |
| 7 | Add forms and tracking | Demo form, contact routing, analytics if needed |
| 8 | QA and polish | Desktop/mobile, accessibility, performance, claim review |

## Phase 1: Project And Brand Assets

| Task | Notes |
|---|---|
| Confirm project stack | TanStack Start, Vite, React, Tailwind |
| Confirm brand assets | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: add final logo, favicon, product images, screenshots, backer logos.]</span> |
| Confirm product name | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: decide Vena Vitals vs VeriTrack naming rules.]</span> |
| Confirm regulatory language | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: legal/regulatory review.]</span> |

## Phase 2: Design System And Shared Layout

| Task | Notes |
|---|---|
| Lock CSS variables | Use values in `design-guidelines.md` |
| Shared header | Logo, Technology, Evidence, Solutions dropdown (Hospital Settings: Anesthesiology, ICU; Home: Sleep Medicine), Partner, About, News, Request a Demo |
| Shared footer | Nav, contact, LinkedIn, Privacy, FCOI, regulatory disclaimer. Backer logos may live here, see design decision below |
| Shared CTAs | Request a Demo, See Evidence, Partner With Us |
| Shared live monitor | Must not overlap at any viewport |
| Shared tables | Use consistent border, spacing, and heading style |

## Phase 3: Homepage

| Section | Implementation Notes |
|---|---|
| Hero | H1, subcopy, demo CTA, evidence CTA, real clinical/product visual |
| Trust bar | 4 stats with verified wording |
| Problem | Cuff snapshots vs continuous waveform |
| Solution | 3-step explanation |
| Evidence strip | Accuracy summary and link to Clinical Evidence |
| Audience cards | Clinicians, Hospitals and Health Systems, Researchers and Sleep Medicine. <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm final audience-card wording.]</span> |
| Quote | Approved quote only |
| Backed-by row | Approved logos only. Placement is a flexible design decision and may move to the footer or be rearranged. Not fixed |
| Final CTA | Request a Demo and See Evidence. One-pager removed for now |

## Phase 4: Core Pages

| Page | Implementation Notes |
|---|---|
| Technology | Simple overview, deeper technical detail, spec table, roadmap, IP/science, CTA |
| Clinical Evidence | Stats, flagship study (clearly marked placeholder while the study is ongoing), our own data, a stylized Vena Vitals vs arterial-line comparison graphic (more stylized than the current site), ongoing studies, advisors, CTA. Publication library omitted for now |
| Partner With Us | Economic case, evaluation program, partner logos, FAQ, demo form |
| About | Story, founders, advisors, backers, careers |
| Contact | Form, inquiry routing, direct contacts, confirmation state |

## Phase 5: Setting Pages (Hospital Settings and Home)

Solutions is grouped into Hospital Settings (Anesthesiology, ICU) and Home (Sleep Medicine). Each use case is its own clickable page.

| Group | Page | Implementation Notes |
|---|---|---|
| Hospital Settings | Anesthesiology | Primary setting page, modeled on a Butterfly specialty page. Renamed from Operating Room. OR workflow, A-line pain points, validation, demo CTA |
| Hospital Settings | ICU | Near-term page, cautious language, evaluation CTA |
| Home | Sleep Medicine | Research page, apnea/hypopnea BP surge story, collaboration CTA |

## Phase 6: Content And Downloads

| Asset | Notes |
|---|---|
| Evidence summary PDF | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: create approved PDF.]</span> |
| Spec sheet | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: verify all product specifications.]</span> |
| Clinical charts | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: export approved figures.]</span> |
| Backer and partner logos | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm permission and final files.]</span> |

## Phase 7: Forms And Integrations

| Task | Notes |
|---|---|
| Demo form destination | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: choose email, CRM, database, or form provider.]</span> |
| Inquiry routing | Role-based options: Hospital, Clinician, Research, Investor, Press, Careers |
| Thank-you state | Clear message and follow-up expectation |
| Analytics | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm tracking tools and privacy requirements.]</span> |

## Phase 8: QA

| Check | Requirement |
|---|---|
| Desktop layout | No overlap, no clipping, clear hierarchy |
| Mobile layout | Nav usable, sections readable, no cropped text |
| Build | `npm run build` passes |
| Lint | `npm run lint` has no new errors |
| Content review | All claims are verified or marked |
| Regulatory review | Footer and page disclaimers approved |
