---
description: Change words, numbers, button labels or links in a section of the site
argument-hint: Page › Section, what it says now, what it should say
---

Text change request:

$ARGUMENTS

Follow "How to make a change" in CLAUDE.md.

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
