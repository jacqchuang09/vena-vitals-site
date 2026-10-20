---
name: site-undo
description: Undo a change that already went live. Use for requests to edit the Vēna Vitals website.
---

Use this skill when someone asks for this kind of change to the Vēna Vitals website. The request is in their message (it should give: What to undo (PR number, date, or description) and why). If key details are missing, ask before editing.

- Find the change: search merged pull requests and `git log` on `main` for the
  PR number, date or description. Before doing anything, reply with the PR or
  commits you'll undo and what the site will look like afterwards.
- Make a branch `undo/<short-description>` from the latest `origin/main` and
  revert it with `git revert` (use `-m 1` for a merge commit). Don't rewrite
  history or force-push.
- If later changes depend on it and the revert conflicts, stop and explain the
  options instead of guessing.
- Build, lint, open a PR titled `Undo: <original title>` that links the original
  PR, and report back.
- If the site is broken right now, also tell them they can roll back instantly
  in Netlify → Deploys → pick the last good deploy → Publish deploy, while the
  PR is reviewed.
