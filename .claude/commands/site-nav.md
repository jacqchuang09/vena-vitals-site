---
description: Change menu bar or footer links, or a page's URL (with a redirect from the old one)
argument-hint: menu or footer, add/rename/remove/move, label and where it links
---

Menu, footer or URL request:

$ARGUMENTS

Follow "How to make a change" in CLAUDE.md.

- **Menu bar:** `content/site.json → nav.items` (`label`, `href`; dropdowns use
  `children` with `label`, `description`, `href`). The phone menu is
  `nav.mobileMenu.items`; keep the two in step unless the request says otherwise.
- **Footer:** `content/site.json → footer.linkGroups` (`heading`, `links`: `label`,
  `href`).
- Internal links start with `/` (e.g. `/technology`); outside links are full
  `https://` URLs. Check every internal link points at a page that exists in
  `src/routes/`.
- **Renaming a page's URL:** rename the route file, update its canonical link and
  `seo.url`, update every link to it in `content/`, add a 301 redirect from the
  old path in `netlify.toml`, and update `prerender.pages` in `vite.config.ts` if
  it was listed there. Update `docs/SITE-MAP.md`.
- Before editing, reply with the before → after menu/footer order.
- Check the menu at desktop and phone widths (the phone menu is a separate panel).
- Build, lint, open the PR, and report back.
