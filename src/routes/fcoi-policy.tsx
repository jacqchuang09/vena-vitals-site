import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalDoc } from "@/components/layout/LegalPage";
// The whole policy text lives in this file:
import page from "@content/legal/fcoi-policy.json";

// JSON imports type `kind` as a plain string; the file follows LegalDoc.
const doc = page as LegalDoc;

export const Route = createFileRoute("/fcoi-policy")({
  head: () => ({
    meta: [{ title: page.seo.title }, { name: "description", content: page.seo.description }],
    links: [{ rel: "canonical", href: "/fcoi-policy" }],
  }),
  component: () => <LegalPage doc={doc} />,
});
