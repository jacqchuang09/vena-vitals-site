# Vēna Vitals website

The marketing site for Vēna Vitals. React + TanStack Start, styled with
Tailwind, every page prerendered to static HTML and hosted on Netlify.

**To change what the site says or shows, edit the files in `content/`.**
See [content/README.md](content/README.md) for how those files work.

**Making changes with Claude Code or Codex?** Start with
[docs/EDITING-WITH-AI.md](docs/EDITING-WITH-AI.md) (step by
step, with a template for every kind of change) and
[docs/SITE-MAP.md](docs/SITE-MAP.md) (every section of every page, with
screenshots).

## How a change goes live

```
your edit (VS Code, Claude Code, Codex, or the GitHub website)
   │  commit + push
   ▼
GitHub: jacqchuang09/vena-vitals-site
   │  Netlify watches this repo
   ├─ push to a branch / open a pull request → Netlify builds a preview link
   └─ merge into main → Netlify builds and publishes the live site (~2 min)
```

GitHub is the single source of truth. Netlify only ever builds what is on
GitHub, so a change on your laptop isn't live until it is pushed and on `main`.

## Folder map

```
content/              all words, images and video paths, one file per page   ← edit here
public/assets/        the image and video files, one folder per page         ← add files here
src/
  routes/             one file per URL; wires a page's content file to its components
  components/
    home/ about/ technology/ clinical-evidence/ solutions/
    partner/ contact/ news/ faq/ product/   sections for each page (layout only)
    layout/           nav, footer, legal page template (on every page)
    shared/           pieces several pages use (contact form, animated heading, tilt card)
  styles.css          colors, fonts, spacing tokens
  lib/                error handling
archive/              old sections, pages and media we might want back (not on the site)
docs/
  SITE-MAP.md         every section of every page, with screenshots and file locations
  EDITING-WITH-AI.md  how to request a change with Claude Code or Codex, with templates
  site-map/           the screenshots
  strategy/ vibe-code/   strategy docs and the original AI-agent planning docs
AGENTS.md             rules every AI agent follows (Codex reads it; CLAUDE.md imports it)
.agents/skills/       the site-* request templates (Codex: $site-text; Claude Code: /site-text
                      via the .claude/skills link)
scripts/shots.mjs     takes screenshots of every page locally (npm run shots)
```

## Site map

Summary below; [docs/SITE-MAP.md](docs/SITE-MAP.md) has every section with a
screenshot. Sections are listed top to bottom, by the name they have in the
content file.

| Page                 | URL                          | Content file                     | Sections                                                            | Components                                          |
| -------------------- | ---------------------------- | -------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------- |
| Home                 | `/`                          | `home.json`                      | hero, problem, overview, evidence, audiences, finalCta              | `home/Hero`, `home/HomeSections`                    |
| About                | `/about`                     | `about.json`                     | hero, team, moments, careers                                        | `about/About`                                       |
| Technology           | `/technology`                | `technology.json`                | hero, signalJourney, sensingMechanism                               | `technology/Technology`, `technology/SignalJourney` |
| Clinical Evidence    | `/clinical-evidence`         | `clinical-evidence.json`         | hero, validation, research, methodology                             | `clinical-evidence/Evidence`                        |
| Operating Room       | `/solutions/operating-room`  | `solutions/operating-room.json`  | hero, pain points (cards), how it fits, windows (videos), note, cta | `solutions/SolutionDetail`                          |
| Anesthesiology       | `/solutions/anesthesiology`  | `solutions/anesthesiology.json`  | hero, figures                                                       | `solutions/SolutionDetail`                          |
| Critical Care        | `/solutions/critical-care`   | `solutions/critical-care.json`   | same layout as Operating Room                                       | `solutions/SolutionDetail`                          |
| Sleep Medicine       | `/solutions/sleep-medicine`  | `solutions/sleep-medicine.json`  | hero + heroCards, gallery                                           | `solutions/SolutionDetail`                          |
| Home Monitoring      | `/solutions/home-monitoring` | `solutions/home-monitoring.json` | same layout as Operating Room                                       | `solutions/SolutionDetail`                          |
| (all solution pages) |                              | `solutions/shared.json`          | testimonials, figure and gallery labels, shared CTA text            | `solutions/*`                                       |
| Product              | `/product`                   | `product.json`                   | hero, features, finalCta                                            | `product/Product`                                   |
| News                 | `/news`                      | `news.json`                      | hero, latest, pressKit, pressContact                                | `news/News`                                         |
| FAQ                  | `/faq`                       | `faq.json`                       | hero, questions                                                     | `faq/FAQ`                                           |
| Partner With Us      | `/partner-with-us`           | `partner.json`                   | hero, waysToWork, contact form                                      | `partner/Partner`                                   |
| Contact              | `/contact`                   | `contact.json`                   | hero, contact form                                                  | `contact/Contact`                                   |
| Privacy Policy       | `/privacy-policy`            | `legal/privacy-policy.json`      | the policy text                                                     | `layout/LegalPage`                                  |
| FCOI Policy          | `/fcoi-policy`               | `legal/fcoi-policy.json`         | the policy text                                                     | `layout/LegalPage`                                  |
| Every page           |                              | `site.json`                      | nav, footer, contact form labels, 404 and error text                | `layout/Nav`, `layout/Footer`, `shared/ContactForm` |

Solution pages share one template (`SolutionDetail`). A section shows up only
if its fields are in that page's content file, so you can drop a section from
one setting by deleting its fields there.

## Run it on your computer

Needs Node 20 or newer.

```
npm install
npm run dev        # http://localhost:8080, updates as you save
npm run build      # the same build Netlify runs; fails on broken pages
npm run lint       # code style check
npm run shots      # screenshots of every page into shots/
```

## Getting something back from the archive

Old sections, the old /solutions overview page, and unused photos and videos
are in `archive/`. See [archive/README.md](archive/README.md).

## Rules for content

Never publish clinical, regulatory, partner or accuracy claims that the team
hasn't confirmed. The full list is in
[docs/vibe-code/rules.md](docs/vibe-code/rules.md).
