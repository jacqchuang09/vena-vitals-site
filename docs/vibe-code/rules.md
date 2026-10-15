# Project Rules For AI Agents

## Required Startup Routine

Before editing code, read:

1. `CLAUDE.md`
2. `README.md` (folder map and site map)
3. `content/README.md` (how content files work)
4. `docs/vibe-code/master-plan.md`
5. `docs/vibe-code/user-journeys.md`
6. `docs/vibe-code/rules.md`

## How To Work

1. Do one task at a time unless the task explicitly says otherwise.
2. Keep changes scoped to the task.
3. Follow the design guidelines exactly.
4. Do not invent clinical, regulatory, study, partner, advisor, or accuracy claims.
5. Preserve all blue `EDIT NEEDED` markers until a human confirms the item.
6. Describe the change in the pull request.
7. Report what changed and how to test it.
8. Structure is locked. We are in the design phase. Populate every page with placeholders and real assets first, then stylize.

## Reporting Format

After a task, report:

```text
Completed:
- Short summary

Files changed:
- path/to/file

How to test:
- command or URL

Notes:
- Any edit-needed or verification items
```

## Testing Rules

| Change Type                           | Required Check                                        |
| ------------------------------------- | ----------------------------------------------------- |
| Code or component change              | `npm run build`                                       |
| Formatting or TypeScript/React change | `npm run lint`                                        |
| Visual layout change                  | Check desktop and mobile widths                       |
| Form change                           | Test empty, invalid, and successful submission states |
| Navigation change                     | Verify every nav link loads                           |

## Content Rules

1. Mark unverified claims with `EDIT NEEDED`.
2. Use study results language, not cleared-product claims.
3. Do not say FDA-cleared unless confirmed.
4. Do not use institution names publicly unless permission is confirmed.
5. Do not use partner, advisor, or backer logos unless permission is confirmed.
6. Keep sleep medicine language research-framed unless cleared product claims are approved.
7. In this phase, do not finalize copy. Use boilerplate or AI-drafted text and mark it as draft. Final wording is set later by the team.

## Asset Rules

1. Prefer real Vena Vitals assets (figures, signal graphs, videos, device-on-foot images, and content from the old Google Drive) over generated renders or placeholders whenever they exist.
2. Use generated renders or placeholders only when a real asset does not exist yet, and mark them for later replacement.

## Design Rules

1. Use only the color tokens defined in `src/styles.css`.
2. Use only approved fonts.
3. Keep the site clinical, not consumer wellness.
4. No text overlap or clipping.
5. No decorative blobs, orbs, or random gradients.
6. Do not create new component styles when an existing pattern works.
7. Header and footer must stay shared and consistent.

## If Blocked

If blocked by missing copy, assets, citations, legal approval, or product decisions:

1. Add or keep a blue `EDIT NEEDED` marker.
2. Continue with a safe placeholder if possible.
3. Note the open item in the pull request description.
4. Do not stop unless the task cannot proceed without a decision.

## Standard Prompt To Continue

```text
Read CLAUDE.md, README.md, content/README.md and the docs in docs/vibe-code. Then make this change: <describe it>. Run the required checks, open a pull request, and report what changed and how to test it.
```
