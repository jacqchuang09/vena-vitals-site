---
name: site-image
description: Replace a photo or video on the site. Use for requests to edit the Vēna Vitals website.
---

Use this skill when someone asks for this kind of change to the Vēna Vitals website. The request is in their message (it should give: Page › Section, which image, the new file (attached), alt text). If key details are missing, ask before editing.

Follow "How to make a change" in AGENTS.md.

- Find the section in `docs/SITE-MAP.md` and the field that holds the current
  path (`image`, `src`, `video`, `poster`).
- Before editing, reply with which file is being replaced and where the new one
  will go.
- Save the new file in `public/assets/<page>/` (or `public/assets/shared/` if more
  than one page uses it). Use a **new file name** (e.g. `josh-2026.jpg`), never
  overwrite the old name, so browser and CDN caches can't keep showing the old
  one. Move the replaced file to `archive/media/assets/...` only if nothing else
  uses it.
- Size it to match what it replaces: check the old file's pixel size and keep the
  same aspect ratio. Photos: JPEG around quality 80, ideally under 300 KB.
  Headshots: 720x720. Videos: MP4 (H.264), as small as looks good, no audio
  unless asked.
- Update the path and the `alt` text in the content file. If no alt text was
  given, write a short factual one and mention it in the PR.
- If no file was attached, stop and ask for it. Don't use stock or AI-generated
  images unless the request says to.
- Build, lint, open the PR, and report back.
