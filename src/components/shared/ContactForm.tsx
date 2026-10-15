import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type FormState = {
  name: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  organization: "",
  role: "",
  email: "",
  phone: "",
  message: "",
};

/**
 * Must match the `name` on the form and the hidden `form-name` input, and is
 * the name submissions appear under in the Netlify dashboard.
 */
const FORM_NAME = "contact";

const fieldClass =
  "w-full rounded-none border border-[color:var(--line)] bg-[color:var(--ink)] px-4 py-3 text-sm tracking-normal text-[color:var(--paper)] outline-none transition placeholder:text-[color:var(--mute)] focus:border-[color:var(--accent)] focus:bg-white";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-[11px] font-semibold tracking-normal text-[color:var(--mute)]">
      {children}
    </label>
  );
}

/**
 * The site's single lead form, as a self-contained panel.
 *
 * Lifted out of Contact.tsx so the Partner With Us page can carry the same
 * form rather than a second copy of it, or a button that sends people to
 * /contact to find one. There is one form on this site and this is it.
 *
 * Submissions go to Netlify Forms. Netlify finds the form by parsing the
 * deployed HTML for `data-netlify`, which works here because every route is
 * prerendered at build time, so the form is real markup in the output rather
 * than something the browser assembles. Two things that look redundant are
 * not: every field needs a `name`, since that is what Netlify records it
 * under, and the hidden `form-name` field has to travel in the POST body for
 * Netlify to know which form the submission belongs to.
 *
 * The POST goes through fetch rather than letting the browser submit the form,
 * which would navigate away and lose the confirmation below. A failed POST
 * keeps the form on screen with its values rather than claiming a request was
 * received that never arrived.
 *
 * Submitting only works on a Netlify deploy. The dev server has nothing
 * listening for it, so a local submit lands in the error state.
 */
export function ContactForm({ className = "" }: { className?: string }) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    setSending(true);
    setError(null);

    // Read the fields off the form itself so the hidden form-name and the
    // honeypot travel with the rest of them.
    const body = new URLSearchParams();
    new FormData(formEl).forEach((value, key) => {
      body.append(key, typeof value === "string" ? value : "");
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(String(response.status));
      setSent(true);
    } catch {
      setError("That did not send. Please try again, or email INFO@VENAVITALS.COM.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className={`reveal rounded-none bg-[color:var(--ink-2)] p-5 shadow-[0_24px_80px_rgba(43,43,43,0.05)] md:p-6 ${className}`}
    >
      {sent ? (
        <div className="flex min-h-[460px] flex-col justify-center rounded-none bg-white p-8">
          <CheckCircle2 size={34} className="text-[color:var(--accent)]" />
          <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-[color:var(--paper)]">
            Request received.
          </h2>
          <p className="mt-4 max-w-[460px] text-sm leading-relaxed text-[color:var(--mute)]">
            Thank you for reaching out, we will get back to you as soon as we can.
          </p>
        </div>
      ) : (
        <form
          className="grid gap-4"
          name={FORM_NAME}
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          {/* Netlify needs this in the POST body to route the submission. */}
          <input type="hidden" name="form-name" value={FORM_NAME} />
          {/* Spam trap, hidden from people, so anything filling it is a bot. */}
          <p className="hidden">
            <label>
              Leave this field empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <FieldLabel>
              Name
              <input
                required
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className={fieldClass}
              />
            </FieldLabel>
            <FieldLabel>
              Organization
              <input
                required
                name="organization"
                placeholder="Hospital or company"
                value={form.organization}
                onChange={(event) => setForm({ ...form, organization: event.target.value })}
                className={fieldClass}
              />
            </FieldLabel>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FieldLabel>
              Role
              <select
                required
                name="role"
                value={form.role}
                onChange={(event) => setForm({ ...form, role: event.target.value })}
                className={fieldClass}
              >
                <option value="">Select role</option>
                <option>Clinician</option>
                <option>Hospital administrator</option>
                <option>Researcher</option>
                <option>Industry partner</option>
                <option>Other</option>
              </select>
            </FieldLabel>
            <FieldLabel>
              Work email
              <input
                required
                name="email"
                type="email"
                placeholder="name@organization.com"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className={fieldClass}
              />
            </FieldLabel>
          </div>

          <FieldLabel>
            Phone
            <input
              name="phone"
              placeholder="Optional"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              className={fieldClass}
            />
          </FieldLabel>

          <FieldLabel>
            Message
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about the setting, timeline, or question you have."
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              className={`${fieldClass} resize-none`}
            />
          </FieldLabel>

          {error ? (
            <p role="alert" className="text-[11px] leading-relaxed text-[color:var(--accent)]">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <p className="max-w-[380px] text-[11px] leading-relaxed text-[color:var(--mute)]">
              We use this information only to respond to your request.
            </p>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--paper)] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[color:var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send request"}
              <ArrowRight size={15} aria-hidden />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
