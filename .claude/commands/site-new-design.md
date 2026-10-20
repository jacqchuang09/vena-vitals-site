---
description: Add a section with a new look, based on a style reference (screenshot, link or description)
argument-hint: page, placement, purpose, style reference and what you like about it, content
---

New-design section request:

$ARGUMENTS

Follow "How to make a change" in CLAUDE.md, with these extra steps.

1. **Read the reference.** Look at any attached screenshots or linked pages.
   Reply with a short brief before building:
   - what you'll borrow (layout, spacing, rhythm, type scale, motion)
   - what you won't (their colors, fonts, logos, illustrations, wording; never
     copy another company's branding or assets)
   - where the section goes and its content key
2. **Build 2 or 3 options** on one branch as separate components
   (`<Name>OptionA`, `B`, `C`) in `src/components/<page>/`, all reading the same
   content block in the page's content file. Add a temporary preview page at
   `src/routes/design-preview.tsx` that shows every option one after another,
   each under a clear "Option A / B / C" label, with
   `{ name: "robots", content: "noindex" }` in its head. Add `/design-preview` to
   `prerender.pages` in `vite.config.ts`. Don't put any option on the real page yet.
3. **Stay on brand.** Use the colors, fonts and spacing tokens in
   `src/styles.css`. If the reference needs something new (a new color, font or
   heavy effect), describe it in the PR as a site-wide decision and don't add it
   unless the request explicitly asks. Animations must respect
   `prefers-reduced-motion` and stay light on phones.
4. **Open the PR as a draft** titled `<Page>: new <section> (options)`. Report
   the preview address (`<Deploy Preview link>/design-preview`) and a
   one-line description of each option. Ask which one to keep and what to change.
5. **When they pick one:** apply their notes, put the chosen option on the real
   page in place, delete the other options and the preview route, and remove
   `/design-preview` from `vite.config.ts`. Make sure all text is in `content/`.
   Add the section to `docs/SITE-MAP.md` with a screenshot if you can take one,
   and note it as a reusable section type. Mark the PR ready for review.

Check desktop and phone at each round. Missing copy: draft it and mark it
EDIT NEEDED. Never invent clinical, regulatory, partner or accuracy claims.
