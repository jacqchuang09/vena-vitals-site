import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/contact/Contact";
import { useReveal } from "@/components/shared/lib";
// All words on this page live in this file (the form's text is in site.json):
import page from "@content/contact.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: page.seo.title },
      { name: "description", content: page.seo.description },
      { property: "og:title", content: page.seo.shareTitle },
      { property: "og:description", content: page.seo.shareDescription },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <Contact />;
}
