---
name: site-other
description: Any change that does not fit another site-* skill. Use for requests to edit the Vēna Vitals website.
---

Use this skill when someone asks for this kind of change to the Vēna Vitals website. The request is in their message (it should give: describe what you want changed and where). If key details are missing, ask before editing.

Follow "How to make a change" in AGENTS.md.

- First, check whether a more specific `site-*` skill fits (they're listed in
  `docs/EDITING-WITH-AI.md`). If one does, follow that skill's steps.
- Otherwise **reply with a plan before changing anything**: what you'll change,
  which files, what will look different, and anything risky (site-wide styling,
  deploy settings, forms, URLs, legal text, claims). Wait for an OK.
- Things that are not code changes (domain and DNS, Netlify form notifications,
  analytics accounts): explain the steps instead of editing files.
- Colors, fonts and site-wide styles are locked. Treat any change to them as a
  site-wide decision and say so.
- Build, lint, open the PR, and report back.
