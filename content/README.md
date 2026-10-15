# content/

Every word, image and video on the site lives here, one file per page.
To change what the site says or shows, edit these files. The code in `src/`
only decides how things look.

```
content/
  site.json                 nav menu, footer, contact details (every page)
  home.json                 /
  about.json                /about
  technology.json           /technology
  clinical-evidence.json    /clinical-evidence
  product.json              /product
  news.json                 /news
  faq.json                  /faq
  partner.json              /partner-with-us
  contact.json              /contact
  legal/privacy-policy.json /privacy-policy
  legal/fcoi-policy.json    /fcoi-policy
  solutions/
    operating-room.json     /solutions/operating-room
    anesthesiology.json     /solutions/anesthesiology
    critical-care.json      /solutions/critical-care
    sleep-medicine.json     /solutions/sleep-medicine
    home-monitoring.json    /solutions/home-monitoring
```

## How a page file is laid out

- `seo` comes first: the browser tab title, the Google description, and
  (optionally) `shareTitle` / `shareDescription` for link previews.
- Then one block per section, **in the order the sections appear on the
  page, top to bottom**. Block names match what you see on screen
  (`hero`, `problem`, `evidence`, `finalCta`...).
- Lists (cards, team members, FAQ questions, news posts) are arrays. Add,
  remove or reorder items and the page follows.

## Field names

| Field | What it is |
| --- | --- |
| `eyebrow` | small all-caps label above a heading |
| `title` | the heading |
| `titleAccent` | the part of the heading shown in the accent color, after `title` |
| `titleLead` | accent-colored part shown before `title` |
| `body` / `intro` | paragraph text |
| `button`, `cta` | button label |
| `href` | where a button or link goes (`/contact`, or a full https:// link) |
| `image`, `src` | image path, starting with `/assets/...` (files live in `public/assets/`) |
| `video` | video path, `/assets/...mp4` |
| `poster` | still image shown before a video loads |
| `alt` | description of an image for screen readers (always fill this in) |
| `icon` | name of an icon from https://lucide.dev, e.g. `"HeartPulse"` |

## Rules

- Keep the quotes and commas valid JSON. If the site fails to build after
  an edit, a missing comma or quote is the usual cause.
- Images and videos go in `public/assets/<page>/` (same names as the
  content files: `home/`, `about/`, `solutions/operating-room/`...).
  Files used on more than one page go in `public/assets/shared/`.
  Reference them as `/assets/<page>/file.jpg` (no `public`).
- Don't add a new field and expect it to show up. A new field needs code.
  Ask for it through the change request form instead.
- Clinical, regulatory and accuracy claims must be confirmed by the team
  before they go in. See `docs/vibe-code/rules.md`.
