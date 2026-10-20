---
name: site-seo
description: Change a page's browser-tab title, Google description, or link-preview text. Use for requests to edit the Vēna Vitals website.
---

Use this skill when someone asks for this kind of change to the Vēna Vitals website. The request is in their message (it should give: page, what should show in Google / the tab / link previews). If key details are missing, ask before editing.

Follow "How to make a change" in AGENTS.md.

- Every page's content file starts with an `seo` block: `title` (browser tab and
  Google headline), `description` (Google snippet), and on most pages
  `shareTitle` / `shareDescription` (LinkedIn, iMessage, Slack previews) and `url`.
  Site-wide defaults are in `content/site.json → seo`.
- Keep titles under about 60 characters. Inner pages follow
  `<Page> | Vēna Vitals`; the home page is `Vēna Vitals | <tagline>`. Keep descriptions under about 155 characters. Tell the user if
  theirs is longer and will get cut off in Google.
- **Share preview image:** the site doesn't set one yet (`og:image`). If asked,
  add an optional `shareImage` field: read it in the route `head()` as
  `og:image` and `twitter:image` with an absolute `https://` URL, fall back to a
  site-wide default in `site.json`, and put the image (1200x630 JPEG) in
  `public/assets/shared/`. Mention that LinkedIn caches previews and can be
  refreshed with its Post Inspector.
- Before editing, reply with the current and new text for each field.
- Build (check the new tags in `dist/client/<page>/index.html`), lint, open the
  PR, and report back.
