---
description: Change the contact form (labels, dropdown options, messages, or add a field)
argument-hint: what to change on the form
---

Contact form request:

$ARGUMENTS

Follow "How to make a change" in CLAUDE.md.

- The same form is on Contact and Partner With Us. Its text is in
  `content/site.json → contactForm` (labels, placeholders, the "role" dropdown
  `options`, `privacyNote`, `button`, `success` message, `errorMessage`). The
  form itself is `src/components/shared/ContactForm.tsx`.
- **Text and dropdown options:** change `site.json` only.
- **Adding a field:** add its text to `contactForm`, then add the input to
  `ContactForm.tsx` with a short lowercase `name` (e.g. `name="hospital"`). It
  must be in the prerendered HTML so Netlify Forms detects it, which it is
  because the form renders at build time.
- **Never rename or remove** the existing field names (`name`, `organization`,
  `role`, `email`, `phone`, `message`), `form-name`, `bot-field`, or
  `FORM_NAME = "contact"`. Netlify matches submissions by these, and renaming one
  silently drops that data.
- **Where submissions go** (email notifications, Slack) is set in Netlify →
  Forms → Form notifications, not in code. If that's what the request is about,
  explain the steps instead of changing code.
- Check the form at desktop and phone widths, including the error and success
  states.
- Build, lint, open the PR, and report back. Remind them to send one test
  submission from the Deploy Preview.
