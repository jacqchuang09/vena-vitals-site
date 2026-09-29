import { CheckCircle2 } from "lucide-react";
import { StretchText } from "./StretchText";
import { useNoSnap } from "./lib";
import { ContactForm } from "./ContactForm";

export function Contact() {
  // Taller than a phone screen, so it opts out of the page snap.
  useNoSnap();
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

          <ContactForm />
        </div>
      </section>
    </>
  );
}
