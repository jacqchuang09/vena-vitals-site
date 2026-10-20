---
name: site-list
description: Add, remove or reorder an item in a list (team member, card, FAQ, news post, stat). Use for requests to edit the Vēna Vitals website.
---

Use this skill when someone asks for this kind of change to the Vēna Vitals website. The request is in their message (it should give: Page › Section, add/remove/move, the item details, where it goes). If key details are missing, ask before editing.

Follow "How to make a change" in AGENTS.md.

- Find the list in the section's content file (`docs/SITE-MAP.md` lists the
  fields, e.g. `team.members`, `evidence.stats`, `questions`, `latest.posts`).
- Before editing, reply with the list, the item, and its new position.
- **Add:** copy the shape of an existing item exactly (same fields). Put any
  photo in `public/assets/<page>/` sized like the others. Missing details: ask,
  or leave a clearly marked placeholder and call it out as EDIT NEEDED.
- **Remove:** delete the item. If it had its own image that nothing else uses,
  move the image to `archive/media/assets/...` instead of deleting it.
- **Move:** reorder the array; the page follows the array order.
- Check the layout still works with the new count (e.g. a grid built for 4 now
  holding 5, or an odd item alone on the last row on phones). Fix it in the
  component if needed and say so in the PR.
- Build, lint, open the PR, and report back.
