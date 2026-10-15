import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";
import { privacyPolicy } from "@/components/layout/legal-text";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Vēna Vitals" },
      {
        name: "description",
        content: "How Vēna Vitals VeriTrack handles information, and your privacy rights.",
      },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: () => <LegalPage doc={privacyPolicy} />,
});
