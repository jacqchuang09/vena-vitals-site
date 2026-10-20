---
name: site-show-hide
description: Hide a section, or bring back a hidden or archived section. Use for requests to edit the Vēna Vitals website.
---

Use this skill when someone asks for this kind of change to the Vēna Vitals website. The request is in their message (it should give: Page › Section, show or hide). If key details are missing, ask before editing.

Follow "How to make a change" in AGENTS.md.

- **Hide:** keep the code and content; don't delete either.
  - Solution pages (`/solutions/*`): a section shows only if its fields are in
    the page's content file. Cut those fields out of the page's JSON and paste
    them into `archive/sections/solutions/<page>-hidden.json` with the date, so
    they can be pasted back later.
  - Other pages: comment out the section in its component with a note
    (`{/* Hidden <date> at the team's request. Restore by uncommenting. */}`),
    leaving its content in the JSON. This is how About › Inside the Company and
    Technology › Signal Journey are hidden today.
- **Show / bring back:** look in the component for a commented-out section
  first, then in `archive/sections/<page>/` (listed in `archive/README.md`).
  Archived sections still have their text written in code; move it into the
  page's content file as you restore them, and move any media from
  `archive/media/assets/...` back into `public/assets/<page>/`.
- Before editing, reply with where the section is now and where it will appear.
- Update `docs/SITE-MAP.md` (and `archive/README.md` if something moved in or out
  of the archive).
- Build, lint, open the PR, and report back.
