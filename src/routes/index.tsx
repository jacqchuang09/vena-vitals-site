import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import {
  HomeAudienceCards,
  HomeEvidenceStrip,
  HomeFinalCta,
  HomeTeam,
  HomeOverview,
  HomeProblem,
} from "@/components/home/HomeSections";
import { useReveal } from "@/components/shared/lib";
// All words, images and videos on this page live in this file:
import home from "@content/home.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: home.seo.title },
      { name: "description", content: home.seo.description },
      { property: "og:title", content: home.seo.shareTitle },
      { property: "og:description", content: home.seo.shareDescription },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  useReveal();
  return (
    <>
      <Hero content={home.hero} />
      <HomeProblem content={home.problem} />
      <HomeOverview content={home.overview} />
      <HomeEvidenceStrip content={home.evidence} />
      <HomeAudienceCards content={home.audiences} />
      <HomeTeam content={home.team} />
      <HomeFinalCta content={home.finalCta} />
    </>
  );
}
