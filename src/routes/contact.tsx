import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/vena/Contact";
import { useReveal } from "@/components/vena/lib";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Vēna Vitals" },
      { name: "description", content: "Request a demo or talk to our clinical and sales team." },
      { property: "og:title", content: "Contact | Vēna Vitals" },
      {
        property: "og:description",
        content: "Request a demo or talk to our clinical and sales team.",
      },
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
