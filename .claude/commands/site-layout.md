---
description: Change how a section looks or is laid out (spacing, columns, order, phone vs desktop)
argument-hint: Page › Section, what's wrong, how it should look, desktop/phone/both
---

Layout change request:

$ARGUMENTS

Follow "How to make a change" in CLAUDE.md.

- Find the section's component in `docs/SITE-MAP.md`.
- Before editing, reply with what you'll change in plain words (e.g. "stats go
  from 4 columns to 5 on desktop; on phones the fifth one centers under the
  rest").
- Change only that section. Use Tailwind classes and the tokens in
  `src/styles.css`; follow how similar sections on the site already do it. No new
  colors or fonts. Don't move text into the component; it stays in `content/`.
- Check the section at desktop (1280px) and phone (390px) widths, and make sure
  nothing else on the page shifted.
- Build, lint, open the PR, and report back with what to look at on the preview,
  at which screen size.
