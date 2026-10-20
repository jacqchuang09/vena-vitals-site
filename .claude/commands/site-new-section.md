---
description: Add a new section to a page
argument-hint: Page, where it goes, purpose, what it should look like, the content
---

New section request:

$ARGUMENTS

Follow "How to make a change" in CLAUDE.md.

- Before building, reply with a short plan: the page, where the section goes
  (between which two sections), which existing section style you'll reuse (point
  to it in `docs/SITE-MAP.md`), its content key name, and the fields. Wait for an
  OK if the request was vague about look or placement; otherwise go ahead.
- Put all text, links and media paths in the page's content file under a new
  key placed in on-page order. Build the section in `src/components/<page>/`,
  reusing existing patterns (StretchText headings, TiltCard, eyebrow labels,
  `reveal` animation, the ink / ink-2 alternating backgrounds) and tokens from
  `src/styles.css`. No new colors or fonts.
- Missing copy: use clearly marked draft text and list it as EDIT NEEDED in the PR.
  Never invent clinical, regulatory, partner or accuracy claims.
- Check desktop and phone layouts.
- Add the section to `docs/SITE-MAP.md` (with a screenshot in
  `docs/site-map/<page>/` if you can take one).
- Build, lint, open the PR, and report back.
