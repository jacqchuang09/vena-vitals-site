import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useReveal } from "@/components/shared/lib";
// Copy shared by every solution page. This layout's meta is inherited by each
// setting page beneath it, so it lives here rather than in one page's file.
import shared from "@content/solutions/shared.json";

// /solutions has no landing page of its own — Solutions exists only as the nav
// dropdown, and this route survives purely as the layout parent for the
// individual setting pages (/solutions/anesthesiology and friends). Hitting the
// bare path directly redirects home rather than rendering an empty shell.
export const Route = createFileRoute("/solutions")({
  beforeLoad: ({ location }) => {
    if (location.pathname.replace(/\/$/, "") === "/solutions") {
      throw redirect({ to: "/" });
    }
  },
  head: () => ({
    meta: [
      { title: shared.seo.title },
      { name: "description", content: shared.seo.description },
      { property: "og:title", content: shared.seo.shareTitle },
      { property: "og:description", content: shared.seo.shareDescription },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return <Outlet />;
}
