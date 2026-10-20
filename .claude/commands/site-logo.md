---
description: Add, remove or swap a logo (footer "Backed by" strip, study sites, press)
argument-hint: which logo strip, add/remove/swap, the logo file, organization name
---

Logo request:

$ARGUMENTS

Follow "How to make a change" in CLAUDE.md.

- **Where logos live:**
  - Footer "Backed by" (every page): `content/site.json → footer.backedBy.logos`
    (`image`, `alt`, optional `large: true` for logos that read small)
  - Clinical Evidence › Validation Program: `content/clinical-evidence.json →
    validation.sites` (`image`, `alt`)
  - Files: `public/assets/shared/logos/` (footer) or
    `public/assets/clinical-evidence/logos/`
- **Permission:** partner, backer, hospital and institution logos need written
  permission (see `docs/vibe-code/rules.md`). If the request doesn't say
  permission is confirmed, ask, or open the PR with "EDIT NEEDED: logo permission"
  at the top of the description.
- **The file:** prefer SVG, then a transparent PNG about 2x the size it's shown
  at. Never redraw or recreate a logo; if no file was attached, ask for one.
  Use a new file name rather than overwriting.
- `alt` is the organization's name.
- Removing a logo: delete the entry and move its file to `archive/media/...` if
  nothing else uses it.
- Check the strip at desktop and phone widths; logos should sit at a similar
  visual size.
- Build, lint, open the PR, and report back.
