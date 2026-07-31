# Vēna Vitals — Website Build Spec (Cursor Prompt)

> Paste this whole document into Cursor as the source of truth. It defines the
> product, content, information architecture, functionality, and guardrails for
> the Vēna Vitals marketing site. **You have creative freedom over the visual
> design** (layout, color, type, motion) as long as you preserve the content,
> structure, tone, and functional/compliance requirements below.

---

## 0. How to use this spec

- Treat every section's **copy as approved content** — reproduce it faithfully. Do not invent new medical, clinical, regulatory, or performance claims.
- Anything marked **[VERIFY]** or **[PLACEHOLDER]** is not final — render a sensible version but flag it in a code comment; it must be confirmed before launch.
- Build the full site (all routes in §5). Ship it responsive, accessible, and SEO-ready.
- Framework is **your choice** (see §3). Optimize for correctness and polish over cleverness.

---

## 1. Product & company context

**Company:** Vēna Vitals. **Product:** VeriTrack.

VeriTrack is a soft, skin-worn **capacitive sensor** that measures **continuous, non‑invasive, beat‑to‑beat arterial blood pressure**. It adheres like a bandage over the dorsalis pedis artery on the foot and streams systolic, diastolic, and mean arterial pressure (plus pulse) to a bedside tablet over Bluetooth — delivering the continuous visibility of an arterial line without the needle, and far more than an intermittent cuff.

**Origin:** Born at UC Irvine (Michelle Khine's lab), founded 2019. Built on wrinkled‑gold (wAu) capacitive sensing and peer‑reviewed materials science. Currently investigational: **submitted for FDA 510(k) review, not yet available for commercial sale.**

**The core narrative (the "why"):** Blood pressure is continuous, but monitoring is not. The cuff checks every 3–5 minutes and misses events between readings; the arterial line is continuous but invasive (complication/infection risk, placement time). VeriTrack closes that gap: continuous + non‑invasive.

---

## 2. Goals, audiences, tone

**Primary goals**
1. Communicate the product and the clinical problem it solves.
2. Establish credibility (clinical validation, advisors, backers, peer‑reviewed science).
3. Drive two conversions: **Request a demo** and **Partner with us** (institutional pilots).

**Audiences:** anesthesiologists & OR teams; critical‑care/ICU; hospital administrators & value‑analysis committees; researchers (sleep medicine, CHF, etc.); investors/press.

**Tone & design direction (open to reinterpret):** premium, trustworthy, clinical‑but‑human. The current site is a **light, editorial** aesthetic with generous whitespace, large confident headlines, a single **red accent**, and Inter as the typeface. Signature experiential moments worth preserving *in spirit*: an **operating‑room video hero**, an **animated simulated bedside monitor**, and **interactive/animated data visualizations** (waveforms, a 3D signal surface). You may redesign the look, but keep it feeling like a serious medical‑device company, not a generic SaaS template.

---

## 3. Technical requirements (framework‑agnostic)

Pick any modern stack; these requirements are mandatory:

- **SSR or SSG** for SEO (each route needs its own `<title>`, meta description, and OG tags — see §5 per page).
- **Responsive** (mobile → desktop), **accessible** (semantic HTML, keyboard nav, alt text, reduced‑motion support), **performant** (lazy‑load/compress video & images; posters on videos).
- **Client routing** with scroll‑to‑top on route change.
- A small **design system**: color tokens, type scale, spacing/radius scale, and a handful of reusable components (§4).
- Respect `prefers-reduced-motion` for every animation.

**Recommended (not required):** a React meta‑framework (Next.js/TanStack Start/Remix), utility‑first CSS (Tailwind), TypeScript.

---

## 4. Global layout & reusable components

### Navigation (fixed, transparent over hero; text is light over dark hero, dark/accent elsewhere)
- Logo (links home). Links: **Technology, Clinical Evidence, Solutions (dropdown), Partner With Us, About, News**.
- **Solutions dropdown**, two groups:
  - Clinical settings → Anesthesiology (`/solutions/anesthesiology`), ICU (`/solutions/critical-care`)
  - Future settings → Home monitoring (`/solutions/home-monitoring`), Sleep Medicine (`/solutions/sleep-medicine`)
- Mobile: full‑screen menu adding **Home** and **Contact**.

### Footer (its own full section)
- Wordmark + tagline: "Continuous, noninvasive arterial blood pressure. Born at UCI."
- **Product:** Technology, Clinical Evidence, Solutions
- **Company:** About, News, Partner With Us, Contact
- **Connect:** Request a Demo (`/contact`), Email (`mailto:INFO@VENAVITALS.COM`), LinkedIn (`https://www.linkedin.com/company/vena-vitals`), Official site (`https://www.venavitals.com/`), Privacy (`…/privacy-policy`), Conflict disclosure (`…/terms-and-conditions`)
- A **rotating "Backed by" logo marquee** (partner/investor logos, spaced so no logo repeats on screen at once).
- Legal: "© {year} Vena Vitals. All rights reserved." + **required disclaimer**: "VeriTrack has been submitted for Food and Drug Administration 510(k) review and is not yet available for commercial sale."

### Reusable components (build these as primitives)
- **Section shell**: full‑height (`min-h-screen`), vertically centered content, alternating light/subtle‑gray backgrounds section to section.
- **Reveal‑on‑scroll**: elements fade/slide in when entering the viewport (one‑way; don't re‑hide).
- **Count‑up number**: animates 0 → target (supports decimals and ranges like "30–300") when scrolled into view.
- **Tilt card**: subtle cursor‑follow 3D tilt on hover.
- **Accent heading**: headline where part of the phrase is in the red accent color.
- **Simulated bedside monitor** (SVG/CSS, no video): dark UI showing a live arterial waveform, SYS/DIA/MAP + HR readouts that drift slightly, a trend plot, and a toolbar. Present it **inside an iPad‑style frame** (bezel, rounded screen, front camera on the short edge).
- **Signal graphs** (SVG): a **3D "waterfall" surface** of the pressure field that pulses like an arterial beat, beside **8 capacitance‑channel** mini‑plots (Ch. 1–8) that scroll like a live monitor. Interactive where possible.
- **Waveform comparison** (SVG): VeriTrack trace vs. a simultaneous arterial‑line trace, drawing in on scroll.

> Motion philosophy: tasteful and medical, not flashy. Everything degrades gracefully with reduced‑motion.

---

## 5. Pages (routes, sections, copy, assets, links)

> Copy below is approved unless flagged. Headlines list the accented phrase in **bold**.

### `/` — Home  — *title:* "Vēna Vitals | Continuous, cuffless blood pressure"
1. **Hero** — "Continuous. Non‑invasive. **Blood pressure.**" / body: "Beat‑to‑beat arterial pressure from a soft sensor the size of a bandage. No cuff, no arterial line." / CTAs: **Request a demo** → `/contact`, **See the evidence** → `/clinical-evidence`. Background: looping **operating‑room video**.
2. **The Problem** (eyebrow "The Problem") — "Blood pressure is continuous. **Monitoring is not.**" Body contrasts the cuff (every 3–5 min, misses events) with the arterial line (10–13% complication rate, 0.6% infection risk, 5–20 min placement). Include the **simulated monitor in an iPad frame**, two stat cards (Cuff / Arterial line), and a pull‑quote: *"It's very binary… there's nothing really in between."* — Anesthesiologist · inVibe survey, n=22.
3. **The Solution** (eyebrow "The Solution") — "Continuous. Non‑invasive. **Beat‑to‑beat.**" Body: "VeriTrack is a soft, wearable sensor that adheres to the foot and measures blood pressure with every heartbeat. No cuff cycles, no needle. It delivers the continuous hemodynamic visibility of an arterial line without the procedural risk, placement delay, or invasive cannulation." Three points (Beat‑to‑beat resolution / Non‑invasive placement / Wearable form factor) + a product video. CTA: **Explore the technology** → `/technology`.
4. **Clinical Evidence** (eyebrow "Clinical Evidence") — "Validated where it matters: **the operating room.**" Body about tracking rapid BP changes beat‑for‑beat vs. the arterial line. Include the **waveform comparison** figure (caption: "Patient #UVM005 · 59 year‑old male · BMI 32 · Abdominal mass removal, UVM.") + a stat row (**[VERIFY]** patient count — see §6 discrepancy: home currently says **600+ subjects**, 6+ study sites, ages 18–89 · BMI 17–48, 30–300 mmHg). CTA: **See the full data** → `/clinical-evidence`.
5. **Overview** (eyebrow "Overview") — "The company behind **VeriTrack.**" A featured **"Meet Vēna Vitals" video** (poster + controls), vertically centered.
6. **Use Cases** (eyebrow "Use Cases") — "From the OR to **the bedside.**" Two cards each with a short clip:
   - *For Clinicians* — "Anesthesiology & Critical Care": "Continuous, non‑invasive BP monitoring for the OR and ICU. See the clinical data, waveform accuracy, and use cases." → `/solutions/anesthesiology`
   - *For Researchers* — "Sleep Medicine": "Studying autonomic response, sleep‑disordered breathing, or nocturnal hypertension? VeriTrack enables beat‑to‑beat BP monitoring outside the hospital." → `/solutions/sleep-medicine`
7. **Perspectives** (eyebrow "Perspectives") — "From the **experts.**" Three quote cards (photo on top where available):
   - Joseph Rinehart, MD (Anesthesiology, Clinical Advisor): "A thin bandage‑like patch for monitoring blood pressure continuously could revolutionize not just in‑hospital monitoring, but outpatient monitoring as well; this is an exciting concept!"
   - Anesthesiologist (User research): "A great advantage to not have to insert invasive monitoring."
   - Ray Liu (CEO): "Everyone's blood pressure is changing constantly, but we've only had two tools to measure it: one is uncomfortable and inaccurate, the other is invasive and risky."
8. **Final CTA** (eyebrow "Get Started") — "Evaluating continuous blood pressure for **your facility?**" CTAs: **Request a Demo** → `/contact`, **Partner With Us** → `/partner-with-us`.

### `/technology` — Technology — *title:* "Technology | Vēna Vitals"
1. **Hero** (eyebrow "Meet VeriTrack") — "Arterial‑line insight. **Bandage form factor.**" Body: "VeriTrack is built on a soft capacitive sensing stack developed at UC Irvine and grounded in peer‑reviewed materials science. It captures beat‑to‑beat arterial pressure without puncturing skin, inflating a cuff, or occupying the arm." + product video.
2. **The Workflow** (eyebrow "The Workflow") — "From skin contact to **clinical context.**" Body: "Applied in under five minutes in pre‑op, the VeriTrack stays in place and monitors continuously, without the placement time, complication risk, or nursing burden of an arterial line." A **horizontal, scroll‑through filmstrip** of 4 video cards: 01 **Place** ("A clinician applies the soft sensor over an arterial site before monitoring begins."), 02 **Sense** ("A wrinkled capacitive stack reads subtle arterial motion on every beat."), 03 **Stream** ("Beat‑to‑beat blood pressure trends move to a bedside tablet for review."), 04 **Review** ("Teams can see trends and context instead of isolated cuff snapshots.").
3. **Sensing Mechanism** (eyebrow "Sensing Mechanism") — "Soft enough to wear. **Accurate enough to trust.**" Body: "The VeriTrack sensor sits over the dorsalis pedis artery on the foot. Its soft, stretchable material detects the subtle deflections of the artery beneath the skin with every heartbeat, converting that motion into a continuous blood pressure waveform: systolic, diastolic, and mean arterial pressure, beat to beat. It moves with the patient through position changes and motion without losing signal. Biocompatible materials mean no skin irritation over the course of a case." A **collapsible "technical detail"**: "The sensing element is a wrinkled‑gold (wAu) capacitive stack: a dielectric layer, silicone elastomer, air gap, and PDMS spacer. Each arterial pulse compresses the micropillar structure and changes the capacitance. An onboard algorithm converts those capacitance changes into continuous SBP, DBP, and MAP values with beat‑to‑beat resolution." Beside it, **"The Vena advantage"** — hover‑to‑expand list with icons: **Sensitivity** ("Wrinkled device provides 600% more surface area than traditional capacitive sensors"; "Micro‑rigid flexibility enables advanced structures beyond the parallel plate"), **Dynamic Range** ("Soft substrate and flexible structural design enables a wider range of motion"), **Skin Compatibility** ("Skin‑safe biocompatible material conforms to the skin for a superior mechanical interface between sensor and body"), **Robustness** ("Wrinkled structures enable repeated bending, flexing, and stretching"), **Manufacturing** ("Low‑cost scalability without the need for cleanrooms or photolithography"), **Low Powered** ("Compatible with low‑powered IC components, allowing for minimal power requirements"). Background: sensor‑stretching video, dimmed; content readable on top. **[VERIFY: "600% more surface area" and other engineering figures.]**
4. **The Signal** (eyebrow "The Signal") — "A **continuous arterial waveform**, not intermittent numbers." Body: "Shown beside a simultaneous arterial‑line trace, the VeriTrack waveform resolves each beat: systolic upstroke, dicrotic notch, and the transitions in between. In head‑to‑head OR validation, the signal tracked across pre‑induction, post‑induction, vasopressor administration, and central line use, the exact states where a cuff goes silent. Mean bias against the arterial line: 0.03 mmHg, sustained across five‑hour cases." Include the **interactive signal graphs** component (3D surface + 8 channels) and three **count‑up stat callouts**: **0.03 mmHg** (mean bias vs arterial line), **5 hrs** (continuous capture with motion), **30–300 mmHg** (BP range validated). **[VERIFY: 0.03 mmHg mean bias.]**
5. **SPECS** (eyebrow "SPECS") — "How VeriTrack **compares.**" A **comparison table** (VeriTrack / Arterial Line / Cuff) with ✓/✗ per row: Monitoring (Continuous, beat‑to‑beat / Continuous, beat‑to‑beat / Intermittent, every 3–5 min); Invasive (No / Yes, arterial catheter / No); Setup time (Under 5 minutes / 5–20 minutes / Under 1 minute); Complication risk (None / 10–13% / None); Infection risk (None / 0.6% per placement / None); Requires arm access (No / Yes / Yes); Waveform output (Yes / Yes / No); Connectivity (Wireless, Bluetooth to tablet / Wired to bedside monitor / Wired to bedside monitor); High‑BMI / hypertensive patients (Validated BMI 17–48 / Yes / Limited accuracy); Surgical field disruption (None, foot placement / Potential arm dependency / Repeated cuff inflation); Patient comfort (Minimal / Procedural pain / Arm pain from inflation); Accuracy vs. arterial line (0.03 mmHg mean bias / Gold standard / Varies, unreliable at extremes). Rows highlight on hover; the VeriTrack column is emphasized.
6. **IP & Science** (eyebrow "IP & Science") — "Patents and **peer‑reviewed science.**" Body: "VeriTrack is built on a suite of patents protecting the wrinkled‑metal sensing technology, grounded in peer‑reviewed research published in Advanced Healthcare Materials (Kim et al., 2019). The foundational paper demonstrated beat‑to‑beat blood pressure sensing with a soft wearable sensor, the basis for the clinical system used in operating rooms today." A citation card: **Kim et al., 2019** — "Soft Wearable Pressure Sensors for Beat‑to‑Beat Blood Pressure Monitoring." *Advanced Healthcare Materials* → link `https://doi.org/10.1002/adhm.201900109`.

### `/clinical-evidence` — Clinical Evidence — *title:* "Clinical Evidence | Vēna Vitals"
1. **Hero** (eyebrow "Clinical Validation") — "Beat‑to‑beat accuracy, **proven against the arterial line.**" Body: "VeriTrack has been validated across 300+ operating room patients at 6+ academic and community hospital sites. In direct comparison against the invasive radial arterial line, the clinical gold standard for continuous pressure, VeriTrack tracked beat‑to‑beat hemodynamic changes across a wide range of patients and surgical cases." **[VERIFY: "300+" — reconcile with the home page's "600+".]**
2. **Stat strip** (count‑up numbers): 300+ OR patients · 6+ study sites · Validated vs. radial arterial line · Ages 18–89 · BMI 17–48 · BP range 30–300 mmHg.
3. **Operating room validation** (eyebrow "Validation Program") — "Operating room **validation.**" Body: "Our validation program spans 6+ academic and community hospital sites, including UC Irvine, University of Vermont Medical Center, UCSF, and Henry Ford, with studies comparing VeriTrack directly against the invasive radial arterial line in OR patients undergoing general anesthesia. The validation follows AAMI ISO 81060‑2 methodology for comparison against an arterial reference. Data from our design‑freeze studies demonstrate accuracy within ISO 81060‑3 standards. In cases where the arterial line dropped signal due to clotting or required repeated flushing, VeriTrack maintained a clean continuous trace. Full study results are forthcoming." Two stat cards (300+ OR patients, 6+ hospital study sites) and a **sensor cross‑section diagram** (diastole vs. systole; layers: dielectric, wAu, silicone elastomer, air gap, PDMS spacer, epidermis, radial artery) — caption "Placeholder. Cleaned study figures forthcoming." **[VERIFY: hospital names + ISO claims.]**
4. **Ongoing research** (eyebrow "Research Pipeline") — "Ongoing **research.**" Five cards: Head‑to‑head vs arterial line ("Prospective comparison in surgical patients across multiple OR settings."), CHF BP variability ("Characterizing blood pressure variability in congestive heart failure patients."), Motion‑artifact neural network ("Algorithm development to filter motion artifact from continuous waveform data."), ER beat‑to‑beat ("Feasibility of continuous noninvasive BP in the emergency department setting."), Stroke / dementia BPV ("Blood pressure variability as a biomarker in stroke and dementia populations.").
5. **Methodology** (eyebrow "Standards") — "**Methodology.**" Body: "Validation follows AAMI ISO 81060‑2 methodology for comparison against an arterial reference. Head‑to‑head beat‑to‑beat comparison with the radial arterial line in the operating room." + "Reference standard" card ("Radial arterial line (invasive intra‑arterial catheter), the current gold standard for continuous blood pressure monitoring.").
6. **Clinical advisory board** (eyebrow "Clinical Advisory Board") — "Clinical advisory **board.**" Four profile cards (photo on top, name, role): Joseph Rinehart, MD (Anesthesiology, Clinical Advisor); Dawn Lombardo, MD (Cardiology); Shaista Malik, MD (Preventive Cardiology); Gregory Washington, PhD (Engineering).

### `/solutions` — Solutions — *title:* "Solutions | Vēna Vitals"
- Intro: "Where continuous blood pressure could be used." + "Solutions are the clinical settings and workflows. Clinical Evidence is the proof and data." CTAs: Request a Demo → `/contact`, See the evidence → `/clinical-evidence`.
- **Hospital settings** group ("Clinical workflows where continuous pressure may matter during active care."): **Anesthesiology** (Operating room) → `/solutions/anesthesiology`; **ICU** (Critical care) → `/solutions/critical-care`.
- **Home and sleep settings** group ("Future and research‑facing use cases outside the core operating‑room proof story."): **Home monitoring** → `/solutions/home-monitoring`; **Sleep Medicine** → `/solutions/sleep-medicine`.
- Footer CTA: "See it in your setting" → Request a Demo → `/contact`.

### Solution detail pages (shared template: hero → problem cards → "How VeriTrack fits" → media "windows" → note box → CTA → `/contact`)
- **`/solutions/anesthesiology`** & **`/solutions/operating-room`** — "Every beat of every case." Pain points (A‑line delay / A‑line risk / Cuff blind spots), "Apply in pre‑op, out of the surgical field," and OR media windows. Note: evidence lives on Clinical Evidence.
- **`/solutions/critical-care`** — "Continuous visibility for critical care." Need (step‑down blind spots / spot‑check reliance / line burden), "Continuous, noninvasive, fewer lines." Note: near‑term direction, includes the 510(k) disclaimer.
- **`/solutions/home-monitoring`** — "Toward continuous pressure outside the hospital." Future use case; **Important note: not a commercial home product today** (+ 510(k) disclaimer).
- **`/solutions/sleep-medicine`** — "Toward continuous nocturnal blood pressure." Research direction; **note: a research direction, not a product** (+ 510(k) disclaimer).
> Full copy for each solution page exists in the reference site — reproduce the pain‑point cards, "How VeriTrack fits" paragraph, and note boxes; keep "research/future direction" language distinct from cleared claims.

### `/about` — About — *title:* "About | Vēna Vitals"
Hero "Born at UCI. **Built for clinical care.**" → Story ("From a university lab to the operating room," incl. Michelle Khine's lab, founded 2019, tested in ORs) with a **timeline** (UCI · 2019 · Irvine · 600+ patients · 510(k) · Pilots) → **Founders** (Ray Liu — CEO; Michelle Khine — co‑founder/UCI professor; Josh Kim — co‑founder/CTO) → Team cards (clinical advisory board; the team — **[PLACEHOLDER: confirm names]**) → **Backers** (Y Combinator, MedTech Innovator, EvoNexus, NIH, NSF, Morado Ventures — external links) → "Work with us" → `/contact`.

### `/news` — News — *title:* "News | Vēna Vitals"
Hero "Company updates and **press resources.**" → 3 update items (Company / Evidence / Research — all placeholders to fill on approval) → press‑kit cards (Boilerplate / Logos & media / Press contact) → press contact `mailto:INFO@VENAVITALS.COM`.

### `/contact` — Contact — *title:* "Contact | Vēna Vitals"
"See VeriTrack in a clinical workflow." **Demo‑request form** (Name*, Organization*, Role* [Clinician / Hospital administrator / Researcher / Industry partner / Other], Work email*, Phone, Message*) with success state, privacy note, and follow‑up cards (typical response, Email, LinkedIn). Wire submission to a form endpoint of your choice (**[VERIFY: destination]**).

### `/partner-with-us` — Partner With Us — *title:* "Partner With Us | Vēna Vitals"
Hero "Bring continuous, noninvasive blood pressure to **your facility.**" → "Build the case" (Economic / Workflow / Internal assets) → **Evaluation program** (Scope → Prepare → Run → Review) → **Partner institutions** (UC Irvine, University of Vermont, Hoag, UCSF, Henry Ford, Arkansas Heart — external links; **[VERIFY: use only with approval]**) → **Pilot FAQs** (regulatory status, integration, training, consumables, data & privacy) → evaluation form (same fields as Contact).

### `/product` — Product *(optional, not in nav)* — three components: Sensor / Patient app / Clinician monitor → CTA `/contact`. Currently placeholders.

### `/faq` — FAQ *(optional, not in nav)* — "Common **questions.**" Accordion of 6 Q&As (how it measures without a cuff; accuracy vs. invasive; where worn; how data reaches the chart; regulatory status; home use). **[VERIFY: the "under 3 mmHg" accuracy answer.]**

---

## 6. Content & compliance guardrails (mandatory)

- **Do not invent** medical, clinical, regulatory, partner, advisor, or accuracy claims. Reproduce only what's in this spec; flag anything uncertain.
- **Required disclaimer** in the footer (and on future‑use pages): "VeriTrack has been submitted for Food and Drug Administration 510(k) review and is not yet available for commercial sale."
- **Known discrepancy to resolve:** patient count is **600+** on Home/About/Solutions but **300+** on Clinical Evidence. Pick one before launch; flag until confirmed.
- **[VERIFY] figures** to confirm before public copy: 0.03 mmHg mean bias, "600% more surface area," "under 3 mmHg" (FAQ), 300+/600+ patient count, hospital/partner names, ISO 81060‑2/3 statements.
- **Style:** no em‑dashes in prose (use commas/colons/periods); use hyphens for numeric ranges (18‑89, 30‑300).
- Keep "future/research direction" (home monitoring, sleep) clearly separated from cleared indications.

---

## 7. Asset manifest (provide or re‑create)

- **Video:** OR hero footage; product/device clips; "Meet Vēna Vitals" company video (+ poster); sensor‑stretching & setup clips; use‑case clips (clinical, sleep); workflow filmstrip clips. *(Compress; add poster frames; lazy‑load.)*
- **Images:** advisor headshots (Rinehart, Lombardo, Malik, Washington); founder photos; partner/backer logos (YC, NIH, NSF, MedTech Innovator, EvoNexus, HeartX, Samsung NEXT, etc.); brand logo/wordmark.
- **Generated in‑code (no asset file):** simulated bedside monitor, 3D signal surface + 8 channels, waveform comparison, sensor cross‑section diagram.

---

## 8. Acceptance criteria

- All routes in §5 build and are linked correctly (nav, footer, in‑page CTAs).
- Copy matches this spec; all **[VERIFY]/[PLACEHOLDER]** items are code‑commented and listed for review.
- Responsive from ~360px to wide desktop; passes basic a11y (labels, alt, focus, contrast); respects reduced‑motion.
- Each page has unique SEO metadata; videos have posters and are lazy‑loaded.
- The footer disclaimer is present site‑wide; the count‑up, reveal, comparison table, and monitor/signal visuals work and degrade gracefully.
```
