import { useState } from "react";
import { ArrowRight, CheckCircle2, Linkedin, Mail } from "lucide-react";
import { TiltCard } from "./TiltCard";
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

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[color:var(--ink-2)] py-16 md:py-20">
        <div className="container-x grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="mx-auto max-w-[340px] text-center reveal md:mx-0 md:text-left">
            <StretchText
              as="h2"
              className="font-display text-[clamp(26px,3vw,42px)] font-bold leading-none tracking-tight text-[color:var(--paper)]"
              segments={[{ text: "A focused follow-up, not a sales maze." }]}
            />
            <p className="mt-5 text-sm leading-relaxed text-[color:var(--mute)]">
              The team can route your request to clinical, research, pilot, or partnership context.
            </p>
          </div>

          <div className="reveal grid gap-4">
            <TiltCard className="rounded-[30px] bg-white p-6">
              <h3 className="font-display text-lg font-bold tracking-tight text-[color:var(--paper)]">
                Typical response
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--mute)]">
                We aim to reply within one business day with the right next step or person.
              </p>
            </TiltCard>
            <div className="grid gap-4 sm:grid-cols-2">
              <TiltCard
                as="a"
                href="mailto:INFO@VENAVITALS.COM"
                className="group rounded-[30px] bg-white p-6 transition hover:shadow-[0_18px_60px_rgba(43,43,43,0.06)]"
              >
                <Mail size={18} className="text-[color:var(--accent)]" />
                <div className="mt-5 font-display text-base font-bold tracking-tight text-[color:var(--paper)]">
                  Email
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[color:var(--mute)]">
                  INFO@VENAVITALS.COM
                </p>
              </TiltCard>
              <TiltCard
                as="a"
                href="https://www.linkedin.com/company/vena-vitals"
                target="_blank"
                rel="noreferrer"
                className="group rounded-[30px] bg-white p-6 transition hover:shadow-[0_18px_60px_rgba(43,43,43,0.06)]"
              >
                <Linkedin size={18} className="text-[color:var(--accent)]" />
                <div className="mt-5 font-display text-base font-bold tracking-tight text-[color:var(--paper)]">
                  LinkedIn
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[color:var(--mute)]">
                  Vena Vitals company page
                </p>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
