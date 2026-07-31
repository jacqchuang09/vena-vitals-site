import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { StretchText } from "./StretchText";

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

const fieldClass =
  "w-full rounded-[22px] border border-[color:var(--line)] bg-[color:var(--ink)] px-4 py-3 text-sm tracking-normal text-[color:var(--paper)] outline-none transition placeholder:text-[color:var(--mute)] focus:border-[color:var(--accent)] focus:bg-white";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-[11px] font-semibold tracking-normal text-[color:var(--mute)]">
      {children}
    </label>
  );
}

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink)] py-16 md:py-20">
        <div className="container-x grid gap-8 md:grid-cols-[0.72fr_1.28fr] md:items-center">
          <div className="mx-auto max-w-[350px] text-center reveal md:mx-0 md:text-left">
            <StretchText
              as="h1"
              className="font-display text-[clamp(28px,3.2vw,44px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[{ text: "See VeriTrack in a clinical workflow." }]}
            />
            <p className="mt-5 text-sm leading-relaxed text-[color:var(--mute)]">
              Tell us about your setting and a member of the team will follow up with the right
              evidence and evaluation materials.
            </p>
            <div className="mt-7 grid gap-3 text-left">
              {[
                "Operating room and anesthesia teams",
                "Critical care and hospital pilots",
                "Evidence and regulatory conversations",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-xs text-[color:var(--paper)]"
                >
                  <CheckCircle2 size={16} className="shrink-0 text-[color:var(--accent)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal rounded-[36px] bg-[color:var(--ink-2)] p-5 shadow-[0_24px_80px_rgba(43,43,43,0.05)] md:p-6">
            {sent ? (
              <div className="flex min-h-[460px] flex-col justify-center rounded-[30px] bg-white p-8">
                <CheckCircle2 size={34} className="text-[color:var(--accent)]" />
                <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-[color:var(--paper)]">
                  Request received.
                </h2>
                <p className="mt-4 max-w-[460px] text-sm leading-relaxed text-[color:var(--mute)]">
                  We will follow up with next steps for a demo, pilot conversation, or evidence
                  packet.
                </p>
              </div>
            ) : (
              <form
                className="grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldLabel>
                    Name
                    <input
                      required
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
                    placeholder="Optional"
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    className={fieldClass}
                  />
                </FieldLabel>

                <FieldLabel>
                  Message
                  <textarea
                    rows={4}
                    placeholder="Tell us about the setting, timeline, or question you have."
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    className={`${fieldClass} resize-none`}
                  />
                </FieldLabel>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <p className="max-w-[380px] text-[11px] leading-relaxed text-[color:var(--mute)]">
                    We use this information only to respond to your request.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--paper)] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[color:var(--accent)]"
                  >
                    Send request
                    <ArrowRight size={15} aria-hidden />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
