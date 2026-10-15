import { createFileRoute } from "@tanstack/react-router";
import { Partner } from "@/components/partner/Partner";
import { useReveal } from "@/components/shared/lib";
// All words on this page live in this file (the form's text is in site.json):
import page from "@content/partner.json";

export const Route = createFileRoute("/partner-with-us")({
  head: () => ({
    meta: [
      { title: page.seo.title },
      { name: "description", content: page.seo.description },
      { property: "og:title", content: page.seo.shareTitle },
      { property: "og:description", content: page.seo.shareDescription },
      { property: "og:url", content: "/partner-with-us" },
    ],
    links: [{ rel: "canonical", href: "/partner-with-us" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <Partner />;
}
