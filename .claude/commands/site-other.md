---
description: Any change that doesn't fit another /site-* template
argument-hint: describe what you want changed and where
---

General change request:

$ARGUMENTS

Follow "How to make a change" in CLAUDE.md.

- First, check whether a more specific `/site-*` template fits (they're listed in
  `docs/EDITING-WITH-CLAUDE-CODE.md`). If one does, follow that template's steps.
- Otherwise **reply with a plan before changing anything**: what you'll change,
  which files, what will look different, and anything risky (site-wide styling,
  deploy settings, forms, URLs, legal text, claims). Wait for an OK.
- Things that are not code changes (domain and DNS, Netlify form notifications,
  analytics accounts): explain the steps instead of editing files.
- Colors, fonts and site-wide styles are locked. Treat any change to them as a
  site-wide decision and say so.
- Build, lint, open the PR, and report back.
