import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import {
  HomeAudienceCards,
  HomeEvidenceStrip,
  HomeFinalCta,
  HomeOverview,
  HomeProblem,
} from "@/components/home/HomeSections";
import { useReveal } from "@/components/shared/lib";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vēna Vitals | Continuous, noninvasive blood pressure" },
      {
        name: "description",
        content:
          "Continuous blood pressure from the surface of the skin. A soft wearable sensor that streams beat-to-beat vitals to clinicians and care teams.",
      },
      { property: "og:title", content: "Vēna Vitals | Continuous, noninvasive blood pressure" },
      {
        property: "og:description",
        content: "Continuous blood pressure from the surface of the skin.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  useReveal();
  return (
    <>
      <Hero />
      <HomeProblem />
      <HomeOverview />
      <HomeEvidenceStrip />
      <HomeAudienceCards />
      <HomeFinalCta />
    </>
  );
}
