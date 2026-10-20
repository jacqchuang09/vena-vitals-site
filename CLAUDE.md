# Vena Vitals site: agent instructions

Before changing anything, read:

1. `README.md`: folder map, how deploys work
2. `docs/SITE-MAP.md`: every page and section, top to bottom, with screenshots,
   the content block and the component behind each one
3. `content/README.md`: how content files are laid out and named
4. `docs/vibe-code/rules.md`: content, design and testing rules

Requests from the team usually name a section as `Page › Section`, using the
small red label above the section heading. Look it up in `docs/SITE-MAP.md`.
The `/site-*` commands in `.claude/commands/` are templates for each kind of
change; `docs/EDITING-WITH-CLAUDE-CODE.md` is the guide the team follows.

## Where things go

- **Words, image/video paths, alt text, links, page titles** → `content/<page>.json`.
  Never hardcode user-visible text in components. If a change needs a new
  field, add it to the content file and read it in the component.
- **Image and video files** → `public/assets/<page>/` (or `public/assets/shared/`
  if more than one page uses it). Content files reference them as `/assets/...`.
- **Layout, styling, animation** → `src/components/<page>/`. Things on every
  page live in `src/components/layout/`; pieces several pages reuse live in
  `src/components/shared/`.
- **New page** → a route in `src/routes/`, a content file in `content/`, a
  component folder in `src/components/`, and a media folder in
  `public/assets/`. Add it to the site map table in `README.md`.
- **Removing a section or page** → move it into `archive/sections/<page>/`
  (and its media into `archive/media/`) instead of deleting it, and list it
  in `archive/README.md`.
- Colors, fonts and spacing come from the tokens in `src/styles.css`. Don't
  add new colors or fonts.

## How to make a change (every request)

1. **Confirm first.** Look the section up in `docs/SITE-MAP.md`. Restate the
   change in one or two lines: which `Page › Section`, which file and field,
   what it says now, what it will say. If the request is ambiguous or names a
   section that doesn't exist, ask before editing.
2. **Branch.** Never commit to `main`. Create `edit/<page>-<short-description>`
   from the latest `origin/main`.
3. **Edit the smallest thing.** Text, links, numbers and media paths change in
   `content/` only. Touch components only when the change needs layout or a new
   field. Reuse existing section styles and tokens.
4. **Check.**
   - `npm run build` must pass (it prerenders every page and fails on broken ones).
   - `npm run lint` must pass.
   - Look at the changed section at desktop (1280px) and phone (390px) widths if a
     browser is available (`npm run dev`, or `npm run shots` locally).
5. **Pull request.** Push the branch and open a PR into `main` titled
   `<Page>: <what changed>`. In the description: the `Page › Section`, before →
   after, files changed, anything marked EDIT NEEDED, and what to check on the
   Netlify preview.
6. **Report back** in plain language: what changed, the PR link, that the
   Deploy Preview link appears on the PR in about 2 minutes, and that nothing is
   live until someone clicks Merge.
7. If the change adds, removes, hides or reorders a section or page, update
   `docs/SITE-MAP.md` (and its screenshot in `docs/site-map/` if you can take one).

Do not invent medical, regulatory, clinical, partner, advisor, or accuracy claims. Anything marked with:

<span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED]</span>

must be confirmed by the Vena Vitals team before it becomes final public copy.
