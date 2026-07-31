import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useReveal } from "@/components/vena/lib";

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
      { title: "Solutions | Vēna Vitals" },
      {
        name: "description",
        content:
          "Operating room, critical care, and sleep research use cases for continuous noninvasive blood pressure monitoring.",
      },
      { property: "og:title", content: "Solutions | Vēna Vitals" },
      {
        property: "og:description",
        content: "How VeriTrack fits operating room workflows and future monitoring settings.",
      },
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
