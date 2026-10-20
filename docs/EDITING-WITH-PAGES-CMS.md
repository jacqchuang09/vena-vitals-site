# Editing content with Pages CMS

Pages CMS provides forms for the existing JSON files in `content/`. It does
not host the website or create new layouts. Use Codex, Claude Code, or a code
editor for new sections, layout changes, new routes, and form behavior.

## Connect the editor once

1. Open https://app.pagescms.org and sign in with GitHub.
2. Install/authorize its GitHub App for `jacqchuang09/vena-vitals-site` only.
3. Open the repository and choose the branch containing `.pages.yml`.
4. The sidebar should list Home, About, the other pages, and shared content.
   Open a page to edit its section fields.

The owner configures GitHub access. Pages CMS also documents email-invited
content collaborators; verify their access and branch selection in the hosted
app before onboarding them. Editors using the hosted app do not need a local
clone, Node/npm, or an AI subscription just to edit content.

## Save, review, publish

**Saving writes commits to the selected GitHub branch. Saving on `main` can
publish immediately through Netlify.** This configuration does not enforce
branch protection or automatically create pull requests.

For the review workflow:

1. Create an `edit/<page>-<description>` branch from current `main` on GitHub
   or ask your AI editor to create and push it.
2. Select that branch in Pages CMS before editing. Verify the branch name
   before each save, including image uploads.
3. Edit the fields and save. Uploads and content saves can create separate
   commits; save the page after choosing a new image.
4. Open a PR from that branch into `main` on GitHub, or ask the AI to open it.
5. Inspect **Files changed**: confirm only the intended content and media
   changed. Open Netlify's Deploy Preview when it is ready (often ~2 minutes).
6. Check desktop (1280px), phone (390px), image crops, links, and build checks.
7. Merge only when approved. Netlify then builds and publishes production.
   To reject, close the PR without merging. The branch and its files remain.

Configure GitHub branch protection/rulesets separately if the team wants to
require PRs before changes reach `main`. `AGENTS.md` is guidance for AI agents;
Pages CMS does not execute those instructions, run local checks, or obtain
clinical/legal approval for you.

## What is editable

The root `.pages.yml` maps all 18 current page/shared JSON files, including
SEO, navigation, footer, form labels, policy text, and the five solution pages.
Nested groups follow the content file. Lists such as team members, news cards,
FAQs, and statistics have fields for their existing item structure.

- Use plain-text fields; the components render strings, not rich-text HTML.
- Keep leading/trailing spaces between adjacent heading fragments.
- Images and videos use media pickers. Each content page has a media source
  under `public/assets/<page>/`, with `/assets/<page>/` public paths.
  Shared content uses `public/assets/shared/`.
- Choose the correct page media source for uploads. Existing files referenced
  from another page/shared folder can remain unchanged; they are not moved by
  this config. If a picker cannot locate one, choose its source or ask the AI
  to change the path without duplicating the asset.
- Enter accurate image alt text. Preserve existing content markers and
  investigational wording until the team approves replacements.
- Add/remove/reorder list items within their existing structure. Do not assume
  adding a field or list item creates a new kind of page or component.
- Hidden About / Inside the Company and Technology / Signal Journey groups
  are labeled hidden. Editing their content does not make them visible.
- Form labels/messages can change; submission behavior, field definitions,
  and Netlify email notifications need separate implementation/configuration.
- Changing SEO's canonical URL or a link does not rename a route or create a
  redirect. Ask for a code change if the page address itself must change.
- Legal copy must come from the policy owner. Clinical, regulatory, accuracy,
  study, partner, advisor, and logo-permission claims need team confirmation.

The configuration uses `settings.content.merge: true` to preserve unmanaged
keys, and disables creating, deleting, or renaming the page JSON files through
these forms. This is not an approval gate or a substitute for reviewing the
saved diff. Optional fields, null values, and list-item serialization must be
checked during the first real editor save.

## First-use demo and acceptance checks

Use a disposable editing branch, never `main`, for this test:

1. In Home → Hero, change only the primary button label to
   `DEMO — Contact our team` and save.
2. Inspect the commit diff. Confirm that all other sections, nested content,
   numbers/booleans, empty optional values, and media paths remain intact.
3. Open a PR and confirm the preview button changed and kept its destination.
4. In About → Core Team, select a member and upload a team-approved test photo.
   Set accurate alt text and save. Confirm the file lands in
   `public/assets/about/` and the content references `/assets/about/...`.
5. Check the member image in the preview at desktop and phone sizes.
6. Reorder two items, save, and confirm no fields from either item disappear.
   In particular check optional member bios/links and navigation items with
   and without dropdown children before using those forms in production.
7. Close the demo PR without merging. Keep or remove unused test uploads only
   on that demo branch; do not delete assets from production as cleanup.

For a presentation, say: “Pages CMS edits existing content through forms.
Codex or Claude Code handles structural changes. Both use GitHub; we review
the preview before deciding what to publish.”

## References

- [Quick start](https://pagescms.org/docs/quick-start/)
- [Configuration](https://pagescms.org/docs/configuration/)
- [Merge/preservation behavior](https://pagescms.org/docs/configuration/settings/)
- [Media paths](https://pagescms.org/docs/configuration/media/)
- [Collaborator access](https://pagescms.org/docs/configuration/collaborators/)
