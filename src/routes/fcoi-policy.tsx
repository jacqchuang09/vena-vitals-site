import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/vena/LegalPage";
import { fcoiPolicy } from "@/components/vena/legal-text";

export const Route = createFileRoute("/fcoi-policy")({
  head: () => ({
    meta: [
      { title: "FCOI Policy | Vēna Vitals" },
      {
        name: "description",
        content:
          "Vēna Vitals' financial conflict of interest policy for PHS and NIH grant-funded research.",
      },
    ],
    links: [{ rel: "canonical", href: "/fcoi-policy" }],
  }),
  component: () => <LegalPage doc={fcoiPolicy} />,
});
