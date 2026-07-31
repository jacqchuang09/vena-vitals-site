# Vēna Vitals site — manual Framer to-do

Items that must be done by hand in the Framer editor because the MCP tooling can't reach them (component internals that won't serialize, asset imports, form wiring). Everything else on the site has been built/rebranded programmatically.

Project: the **dark** Framer project. Design language: black background, Figtree, coral accent `rgb(217,83,79)`.

---

## 1. Navbar (highest priority)

The `Navigation/Navbar` component is still the Xtract template, and it is **not placed on any page** — every page currently starts straight at its hero with no top nav. The component won't open via the MCP, so do this by hand.

**a. Edit the component**
1. In the Assets/Layers panel, double-click the **Navigation/Navbar** component to edit it.
2. Set the **logo** wordmark to `Vēna Vitals`, link → `/`. (Replace the Xtract arrow glyph with the real Vēna icon/favicon once it exists — see §2.)
3. Replace the placeholder nav links with this IA (label → link):
   - Technology → `/technology`
   - Clinical Evidence → `/clinical-evidence`
   - Anesthesiology & ICU → `/care-settings/anesthesiology`
   - Sleep Medicine → `/care-settings/sleep`
   - Partner → `/partner`
   - News → `/news`
   - About → `/about`
   - (Optional grouping: put the two care-setting links under a "Care Settings" dropdown if the component supports it.)
4. Set the CTA button to `Request a Demo` → `/contact`, color `rgb(217,83,79)`.

**b. Place it on every page**
Drag the Navbar instance to the **top** of each page (above the hero), for: Home, Technology, Clinical Evidence, Anesthesiology & ICU, Sleep Medicine, Partner, News, About, Contact. As a linked component it stays in sync after this.

> Note on links: the **Footer** already uses exactly this IA and is correct site-wide — mirror it.

---

## 2. Footer leftovers

The footer body is rebranded (logo wordmark, tagline, Explore + Company columns, LinkedIn). Still manual:
- **Logo icon glyph** next to the wordmark is still the Xtract arrow. Swap for a real Vēna mark / favicon.
- **Copyright** line (the `Footer/Copyright` component) wouldn't serialize — confirm it doesn't still say "Xtract" and update the year/company.
- **Newsletter signup** is an unconfigured Xtract waitlist widget. Either wire it to a real endpoint or delete the newsletter block.

---

## 3. Wire the Contact form

`/contact` form fields are correct (First Name, Last Name, Email, Organization, Message) but the **submit button isn't connected**. Point it at the real destination (email and/or CRM per the copy doc). Also fill:
- Contact **email** (currently `[VERIFY contact email]`; the email card link is still `mailto:mail@test.com`).
- **LinkedIn** URL on the contact card and footer (currently `linkedin.com/company/vena-vitals`, placeholder).

---

## 4. Real media to import

The MCP can't place video and can't import binaries reliably; do these in Framer. Source files live under `~/Downloads/Vena Vitals Website Source Docs/` and `~/Downloads/Untitled design/*.mp4`.
- **Hero video** (Home).
- **Founder headshots** — About founders cards (ray.jpg, michelle.png, josh.jpeg) + advisor headshots on Clinical Evidence.
- **Backer logos** — replace the Xtract logo ticker on About + the LogoMarquee on Home (Samsung NEXT, NIH, Y Combinator, MedTech Innovator, EvoNexus). Samsung NEXT + NIH logo files still needed.
- **Study-site logos** — Partner "Where we work" (currently text chips): UC Irvine, UCSF, University of Vermont, Arkansas Heart Hospital.
- **Figures** — waveform-vs-A-line and Bland-Altman/accuracy figures (Technology + Clinical Evidence placeholders); healthy-vs-OSA surge figure (Sleep placeholder); OR/sensor-on-foot photo (Anesthesiology workflow placeholder).

---

## 5. Resolve `[VERIFY]` flags before publishing

Search the canvas for `[VERIFY]` / `[IMAGE]`. Key ones need team/counsel sign-off:
- **Regulatory:** confirm the exact 510(k) / investigational disclaimer wording.
- **Stats:** 600+ patients, ages/BMI/BP ranges, A-line 10–13% complication & 0.6% infection, sleep figures (936M, 2–3×, 82–93%, $8B), accuracy numbers.
- **Quotes/claims:** Rinehart quote (permission), inVibe "20 of 22", Sleep "first and only to quantify BP spikes."
- **People:** founder titles/bios, advisor roster.
- **News:** 510(k) date, press article date/link/permission.
- **Logos:** rights + relationship type for backers and study sites.

---

## Reference: what's already done programmatically
- Pages built from finalized copy: Anesthesiology & ICU (combined), Sleep, Partner, News.
- Pages rebranded from the Xtract template: About, Contact, Footer.
- Card heights equalized on every page.
- Standalone `/care-settings/icu` page deleted (folded into Anesthesiology per Josh).
