---
description: Add a new page to the site
argument-hint: Page name, URL, where it's linked from, sections top to bottom, copy
---

New page request:

$ARGUMENTS

Follow "How to make a change" in CLAUDE.md.

- Before building, reply with the plan: URL, menu and footer placement, the
  sections top to bottom and which existing section style each one reuses. Wait
  for an OK if anything is unclear.
- A new page needs:
  - a route in `src/routes/` (copy the pattern of `src/routes/technology.tsx`: SEO
    from the content file, `useReveal()`, canonical link)
  - `content/<page>.json` with `seo` first, then one block per section in order
  - components in `src/components/<page>/`
  - a media folder `public/assets/<page>/`
  - menu/footer links in `content/site.json` if requested
  - if nothing links to it, add it to `prerender.pages` in `vite.config.ts` so it
    still gets prerendered
- Missing copy: draft placeholder text marked EDIT NEEDED. Never invent claims.
- Add the page to `docs/SITE-MAP.md`, the folder map in `README.md` if needed,
  and `content/README.md`'s file list.
- Build (confirm the new page appears in the prerender output), lint, open the
  PR, and report back.
