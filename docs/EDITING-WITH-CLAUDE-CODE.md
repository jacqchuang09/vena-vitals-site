# Editing the site with Claude Code

How to change the Vēna Vitals website by asking Claude, step by step, with a
template for every kind of change.

Use this for anything bigger than a quick text or photo swap: new sections,
layout tweaks, moving things around, new pages. (Small text and photo edits can
also go through the visual editor once it's set up.)

## How a change goes live

```
1. Ask      you fill in a request template in Claude Code
2. Edit     Claude finds the section, makes the change on its own branch
3. Preview  Claude opens a pull request; Netlify builds a preview link (~2 min)
4. Approve  you check the preview on desktop and phone, then click Merge
5. Live     Netlify publishes main to the real site (~2 min)
```

Nothing reaches the live site until someone clicks **Merge**. If the preview
looks wrong, tell Claude what to fix in the same chat, or close the pull
request and nothing happens.

## One-time setup

### Editing in the browser

The web workflow below does not require installing tools on your computer.
For editing locally, use the local setup section instead.

1. Go to **claude.ai/code** and sign in.
2. Connect GitHub when it asks, and give it access to
   `jacqchuang09/vena-vitals-site`.
3. Start a new session on that repository.

Claude automatically reads `CLAUDE.md` in the repo, which tells it where
everything lives and the rules to follow.

### Local editing: tools and GitHub sign-in

Do this once on each computer used to make edits locally. If you only review
Deploy Previews and merge pull requests on GitHub, you only need a browser
and the appropriate repository permissions; skip the local setup.

1. Ask the repository owner for access to
   `jacqchuang09/vena-vitals-site`. Use your own GitHub account.
2. Install [Git](https://git-scm.com/downloads), a supported
   [Node.js LTS release](https://nodejs.org/en/download) (version 20 or newer
   for this project; includes npm), and
   [GitHub CLI](https://cli.github.com/).
   On a Mac with [Homebrew](https://brew.sh/) installed, you can run:

   ```sh
   brew install git node gh
   ```

3. In Terminal, sign in to GitHub:

   ```sh
   gh auth login
   ```

   Choose **GitHub.com → HTTPS → Log in with a web browser**. Complete the
   browser sign-in and allow GitHub CLI to authenticate Git when prompted.
   You do not need to paste a password or token into the AI chat.
4. Verify that the tools and sign-in work:

   ```sh
   git --version
   node --version
   npm --version
   gh --version
   gh auth status
   gh repo view jacqchuang09/vena-vitals-site
   ```

   If a command is not found after installation, reopen Terminal and the AI
   editor, then try again. If repository access fails, check that you signed
   in with the account invited to the repository.
5. If you do not already have a local copy, run this from the folder where
   you keep projects:

   ```sh
   gh repo clone jacqchuang09/vena-vitals-site
   cd vena-vitals-site
   npm install
   ```

   If you already have a copy, open that folder and run `npm install` there.
6. Open the repository folder in your AI editor. Before requesting changes,
   ask it to verify that it can run Git, npm, and `gh auth status`. GitHub
   CLI lets the agent open pull requests; Node/npm lets it build and check
   the site. The editor may request permission to run commands or access
   the network.

This setup is for local editing. Reviewers can open the PR and Netlify preview
in their browser. If a branch has been pushed but automatic PR creation is
unavailable, you can also
[create the pull request on GitHub](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request).
See GitHub's [CLI sign-in instructions](https://cli.github.com/manual/gh_auth_login)
for more details.

## Step by step

### 1. Find the section

Open [docs/SITE-MAP.md](SITE-MAP.md). Every page is listed top to bottom with a
screenshot of each section. Name the section as **`Page › Section`**, using
the small red label above its heading, e.g. `Home › Clinical Testing`.

### 2. Pick the right template

| You want to...                                                                     | Command             | Template                                  |
| ---------------------------------------------------------------------------------- | ------------------- | ----------------------------------------- |
| Change words, a number, a button label or a link                                   | `/site-text`        | [A](#a-change-text)                       |
| Replace a photo or video                                                           | `/site-image`       | [B](#b-swap-an-image-or-video)            |
| Add, remove or reorder an item in a list (team member, card, FAQ, news post, stat) | `/site-list`        | [C](#c-add-remove-or-reorder-a-list-item) |
| Hide a section, or bring back a hidden or archived one                             | `/site-show-hide`   | [D](#d-hide-or-bring-back-a-section)      |
| Add a new section that looks like ones already on the site                         | `/site-new-section` | [E](#e-add-a-new-section)                 |
| Change the layout of a section (columns, spacing, phone vs. desktop)               | `/site-layout`      | [F](#f-change-a-layout)                   |
| Add a new page                                                                     | `/site-new-page`    | [G](#g-add-a-new-page)                    |
| Undo a change that already went live                                               | `/site-undo`        | [H](#h-undo-a-change)                     |
| Add a section with a **new look**, based on a style you like                       | `/site-new-design`  | [I](#i-add-a-section-with-a-new-look)     |
| Change menu bar or footer links, or a page's URL                                   | `/site-nav`         | [J](#j-menu-footer-or-url)                |
| Change a page's tab title, Google text or link-preview text                        | `/site-seo`         | [K](#k-page-title-and-link-previews)      |
| Add, remove or swap a logo                                                         | `/site-logo`        | [L](#l-logos)                             |
| Change the contact form                                                            | `/site-form`        | [M](#m-contact-form)                      |
| Anything else                                                                      | `/site-other`       | [N](#n-anything-else)                     |

Type the command in Claude Code (type `/` to see the list), then paste the
filled-in template after it. If the command doesn't show up, just paste the
template on its own; it works the same.

### 3. Fill it in and send

Be specific: copy a few words of what's there now, and write exactly what it
should become. Attach images straight into the chat.

**One change per request.** Five small edits on the same page can go in one
request; changes to different pages should be separate requests so each one can
be checked and undone on its own.

### 4. Check what Claude says back

Before editing, Claude restates the change and what's there now. If it picked
the wrong section, say so. When it's done, it replies with the pull request
link and what to check.

### 5. Review the preview

On the pull request, find the Netlify comment with the **Deploy Preview** link
(about 2 minutes after it opens). Check:

- [ ] The change is there and reads right
- [ ] Nothing else on the page moved or broke
- [ ] It looks right on a phone too (open the preview link on your phone)
- [ ] Any clinical or accuracy claims are confirmed by the team

### 6. Merge

Click **Merge pull request**, then **Confirm**. The live site updates in about
2 minutes. Hard-refresh (Cmd+Shift+R) if you still see the old version.

---

## Templates

Copy one, fill in the blanks, delete lines you don't need.

### A. Change text

```
/site-text
Page › Section: Home › Clinical Testing
What it says now: "Evaluated where it matters: the operating room."
Change it to: "Evaluated where it matters most: the operating room."
Anything else on this section:
```

### B. Swap an image or video

```
/site-image
Page › Section: About › Core Team
Which image: Josh Kim's headshot
New file: (attach it here, or paste a link)
Description for screen readers (alt text): Josh Kim, co-founder and CTO
Crop / fit notes: square, face centered
```

### C. Add, remove or reorder a list item

```
/site-list
Page › Section: About › Core Team
Action: add / remove / move
Item: new team member
Details:
  Name: Jane Doe
  Role: Head of Regulatory
  Photo: (attach)
Position: after Sophia Lin
```

### D. Hide or bring back a section

```
/site-show-hide
Page › Section: About › Inside the Company
Action: show / hide
Notes: bring it back with the same four photos
```

Hidden sections stay in the code; archived ones live in `archive/` and are
listed in `archive/README.md`.

### E. Add a new section

```
/site-new-section
Page: Clinical Evidence
Put it: after "Research Pipeline", before "Standards"
Purpose: show our three publications
Looks like: like the Research Pipeline cards / like Home › Areas of Investigation / describe it
Content:
  Small label: Publications
  Heading: Peer-reviewed results.
  Items:
    1. Title, journal, year, link
    2. ...
Images: (attach, or "none")
```

Claude reuses an existing section style. For a section with a new look, use [template I](#i-add-a-section-with-a-new-look) instead.

### F. Change a layout

```
/site-layout
Page › Section: Home › Clinical Testing
What's wrong or what you want: the stats row feels cramped on phones
How it should look: two per row on phones, five across on desktop
Desktop, phone, or both: phone
Example to copy (optional): Clinical Evidence › Clinical Validation stats
```

### G. Add a new page

```
/site-new-page
Page name: Publications
URL: /publications
Where it's linked from: menu bar, after "Clinical Studies"; footer under "Company"
Sections, top to bottom:
  1. Banner: label, heading, one paragraph
  2. List of publications (title, journal, year, link)
  3. Closing call to action: "Request a reprint", goes to /contact
Copy: (paste it, or "draft placeholder text and mark it EDIT NEEDED")
```

### H. Undo a change

```
/site-undo
What to undo: the BMI stat change from last week (PR #6)
Why: numbers need to be confirmed before publishing
```

Claude finds the pull request and opens a new one that reverses it. You review
and merge it like any other change.

### I. Add a section with a new look

```
/site-new-design
Page: Clinical Evidence
Put it: after "Research Pipeline"
Purpose: show our three publications
Style reference:
  Screenshot or link: (attach a screenshot, or paste a URL)
  What I like about it: big numbers on the left, cards that slide in, lots of white space
  Avoid: dark backgrounds, carousels
Content: (paste it, or "draft it and mark EDIT NEEDED")
Images: (attach, or "none")
```

Claude replies with a short brief (what it'll borrow from the reference, and
what it won't), then builds **2 or 3 options**. Open the Deploy Preview link and
add `/design-preview` to the end of the address to see them one after another.
Reply with the one you want and any notes ("Option B, tighter spacing, no
animation on phones"). Claude then puts that one on the real page, removes the
others, and the pull request is reviewed like any other.

It keeps the site's colors and fonts. Borrowing a layout or feel from another
site is fine; copying its branding, images or wording is not.

### J. Menu, footer or URL

```
/site-nav
Where: menu bar / footer (which column) / page URL
Action: add / rename / remove / move
Label: Publications
Links to: /publications
Position: after "Clinical Studies"
```

Renaming a page's URL automatically sends the old address to the new one, so
old links keep working.

### K. Page title and link previews

```
/site-seo
Page: Technology
Browser tab / Google title: Technology | Vēna Vitals
Google description: How VeriTrack measures beat-to-beat blood pressure from the skin.
Link preview (LinkedIn, iMessage) title and text: (or "same as above")
Preview image: (attach, 1200x630, or "none")
```

### L. Logos

```
/site-logo
Where: footer "Backed by" / Clinical Evidence › Validation Program
Action: add / remove / swap
Organization: Example Health
Logo file: (attach; SVG or transparent PNG)
Permission to use the logo confirmed: yes / no / not sure
Position: (optional)
```

### M. Contact form

```
/site-form
Change: add "Hospital or institution" as a field after Organization
        / add "Investor" to the role dropdown / change the thank-you message to "..."
Required or optional: optional
```

Where form submissions are emailed is set in Netlify (Forms → Form
notifications), not in the code; Claude will walk you through it if that's
what you need.

### N. Anything else

```
/site-other
What you want: add Google Analytics
Where: every page
Why / extra details:
```

Claude replies with a plan first and waits for your OK before changing anything.

---

## Rules

- **Never merge without opening the preview.**
- **Clinical, regulatory, accuracy, partner and advisor claims** need team
  sign-off before merging. Claude marks anything unconfirmed as
  `EDIT NEEDED`.
- **Use real Vēna assets** (photos, figures, videos) over AI-generated ones.
- **Colors and fonts are fixed.** Ask for a change in look, not a new color.
- Claude never pushes straight to `main`; everything goes through a pull
  request.

## When something goes wrong

| Problem                                     | What to do                                                                                                           |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Claude changed the wrong section            | Reply in the same chat with the right `Page › Section` and a screenshot                                              |
| The preview link never shows up             | The build probably failed. Ask Claude: "the Netlify preview failed, check the build log and fix it"                  |
| Live site didn't change after merging       | Wait 2 minutes, hard-refresh (Cmd+Shift+R). Still old? Check Netlify → Deploys                                       |
| Something broke after merging               | Use template H right away, or in Netlify → Deploys click an older deploy → **Publish deploy** to roll back instantly |
| Screenshots in the site map are out of date | Ask Claude: "refresh the screenshots in docs/site-map and update docs/SITE-MAP.md"                                   |
