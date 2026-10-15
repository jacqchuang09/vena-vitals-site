# Vena Vitals site: agent instructions

Before changing anything, read:

1. `README.md`: folder map, site map (page → content file → sections → components), how deploys work
2. `content/README.md`: how content files are laid out and named
3. `docs/vibe-code/rules.md`: content, design and testing rules

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

## After every change

1. `npm run build` must pass (it prerenders every page and fails on broken ones).
2. `npm run lint` must pass.
3. Check the page at desktop and phone widths (`npm run dev`, or `npm run shots`).
4. Work on a branch and open a pull request. Netlify posts a preview link on
   the PR; nothing reaches the live site until it's merged into `main`.
5. Report what changed and how to check it.

Do not invent medical, regulatory, clinical, partner, advisor, or accuracy claims. Anything marked with:

<span style="color:#0B63CE; font-weight:700;">[EDIT NEEDED]</span>

must be confirmed by the Vena Vitals team before it becomes final public copy.
