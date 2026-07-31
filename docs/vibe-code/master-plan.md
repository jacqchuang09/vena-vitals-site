# Master Plan

## Purpose

Build a clinical-grade marketing website for Vena Vitals that explains what the product does, why it matters, who it is for, what evidence exists, and how hospitals or clinical partners can start an evaluation.

## Core Positioning

Vena Vitals is building continuous, noninvasive blood pressure monitoring from a soft sensor placed over an arterial site.

<span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm final product name, including whether the site should say Vena Vitals, VeriTrack, or both.]</span>

## What We Are Building

| Area | What It Needs To Do | Notes |
|---|---|---|
| Homepage | Explain what Vena Vitals is, why it matters, proof, and next action | Must work for hospital administrators first. Trust bar and backer-logo placement are flexible design decisions, not fixed |
| Technology | Explain how the sensor works with simple and technical layers | Must be credible for clinicians |
| Clinical Evidence | Show our own validation data, methods, the Vena Vitals vs arterial-line comparison, and study status | Proof and data only. Flagship study is ongoing, so keep it as a clearly marked placeholder. Publication library omitted for now |
| Solutions, Hospital Settings: Anesthesiology | Show OR workflow, pain points, and validation relevance | Primary setting page, modeled on a Butterfly specialty page. Renamed from Operating Room |
| Solutions, Hospital Settings: ICU | Show near-term critical care relevance | Careful with claims |
| Solutions, Home: Sleep Medicine | Show research direction around sleep events | Must be research-framed |
| Partner With Us | Convert hospitals into demo or pilot conversations | Buyer path |
| About | Build trust through story, founders, advisors, and backers | Permission-sensitive |
| News | House updates, press, and evidence announcements | Secondary audience |
| Contact | Capture demo, partner, research, press, and career inquiries | Main conversion point |

## Evidence vs Settings Split

Clinical Evidence is the proof and data. The setting pages are where the product is used. Setting pages link to Clinical Evidence instead of repeating the data, so the two do not overlap.

## Primary Audiences

| Priority | Audience | What They Need |
|---|---|---|
| 1 | Hospital administrators and health-system decision makers | Value, evidence, regulatory status, economic case, demo path |
| 2 | Anesthesiologists and perioperative clinicians | Mechanism, accuracy, waveform, workflow, validation data |
| 3 | Researchers and clinical trial sites | Evidence, research directions, collaboration path |
| 4 | Investors, press, talent | Company credibility, team, milestones, contact path |

## Audience Rule

If two audiences conflict, the higher-priority audience wins.

Example: if homepage copy could be consumer-friendly or hospital-buyer-friendly, choose hospital-buyer-friendly.

## Homepage Audience Cards

The homepage groups these audiences into three cards: Clinicians, Hospitals and Health Systems, and Researchers and Sleep Medicine. The overlapping hospital-administrator and anesthesiologist cards are merged into the single Clinicians card. This grouping is for the homepage only. The audience priority order above does not change.

<span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm final homepage audience-card wording.]</span>

## Sitemap

| Page | Status | Notes |
|---|---|---|
| Home | In progress | Needs final proof points and approved imagery |
| Technology | In progress | Needs verified specs and product naming |
| Clinical Evidence | In progress | Our own data and the Vena Vitals vs arterial-line comparison. Flagship study is a clearly marked placeholder while the study is ongoing. Publication library omitted for now |
| Solutions, Hospital Settings: Anesthesiology | Template needed or in progress | Primary setting page, modeled on a Butterfly specialty page. Renamed from Operating Room |
| Solutions, Hospital Settings: ICU | Template needed | Mark near-term or future if not validated |
| Solutions, Home: Sleep Medicine | Template needed | Research-framed only |
| Partner With Us | In progress | Needs economic case and pilot details |
| About | In progress | Story format, UC Irvine lab to validated sensor. Founders are placeholders from the old Drive. Keep team and advisors prominent |
| News | Template needed or in progress | Needs approved announcements |
| Contact | In progress | Needs real destination for form submissions |

## Solutions Grouping

Solutions is grouped, not a flat list. The nav dropdown shows two groups: Hospital Settings (Anesthesiology, ICU) and Home (Sleep Medicine). Each use case is its own clickable page. Anesthesiology is the primary page and replaces the old Operating Room page.

<span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm the top-level nav label for this grouped section and the final page routes.]</span>

## Claims And Permissions

| Claim Or Asset | Requirement |
|---|---|
| 600+ OR patients | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: verify exact number and approved wording.]</span> |
| FDA 510(k) submitted or pending | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm exact regulatory language.]</span> |
| Accuracy data | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: cite source and confirm public use.]</span> |
| Study site names | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm permission to use each site name.]</span> |
| Backer logos | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm logo permissions.]</span> |
| Advisor names and photos | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm names, titles, institutions, and photo permissions.]</span> |
| Founder names, titles, photos | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: confirm founder names, titles, and photos. Current founders are placeholders pulled from the old Drive.]</span> |
| Product photos and UI screenshots | <span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED: replace placeholder assets with approved final assets.]</span> |

## Definition Of Done

A page or feature is done only when:

1. It matches the approved structure.
2. It follows the design guidelines.
3. It has no visible overlap or text clipping on desktop and mobile.
4. All unverified claims are either removed or marked.
5. Build passes with `npm run build`.
6. Lint has no new errors.
