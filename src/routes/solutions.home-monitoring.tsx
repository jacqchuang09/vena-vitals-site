import { createFileRoute } from "@tanstack/react-router";
import { SolutionDetail } from "@/components/solutions/SolutionDetail";
import { useReveal } from "@/components/shared/lib";
// All words, images and videos on this page live in this file:
import page from "@content/solutions/home-monitoring.json";

export const Route = createFileRoute("/solutions/home-monitoring")({
  head: () => ({
    meta: [{ title: page.seo.title }, { name: "description", content: page.seo.description }],
    links: [{ rel: "canonical", href: "/solutions/home-monitoring" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <SolutionDetail content={page} />;
}
