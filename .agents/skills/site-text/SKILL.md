---
name: site-text
description: Change words, numbers, button labels or links in a section of the site. Use for requests to edit the Vēna Vitals website.
---

Use this skill when someone asks for this kind of change to the Vēna Vitals website. The request is in their message (it should give: Page › Section, what it says now, what it should say). If key details are missing, ask before editing.

Follow "How to make a change" in AGENTS.md.

- Find the section in `docs/SITE-MAP.md` and the exact field in its content file
  (`content/...json`). Search the content file for the "what it says now" words
  to confirm you have the right spot.
- Before editing, reply with: the `Page › Section`, the file and field, the
  current text, and the new text.
- Change only the content file. Keep headings split the same way they are now
  (`title` / `titleAccent` / `titleLead`); if the red-highlighted part should
  change, say which words will be red.
- Keep valid JSON. Don't change claims, numbers or study details unless the
  request asks for it; if it does, mark anything unconfirmed EDIT NEEDED in the
  PR description.
- Build, lint, open the PR, and report back.
