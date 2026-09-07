import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import WhatWeOffer from "@/components/about/WhatWeOffer";
import VisionTeam from "@/components/about/VisionTeam";
import MoveForwardCTA from "@/components/about/MoveForwardCTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "CW Ticketing System is a modern SaaS platform by Codeware Ltd. that simplifies how transportation businesses operate — from booking and fleet management to payments and reporting.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <WhatWeOffer />
      <VisionTeam />
      <MoveForwardCTA />
    </main>
  );
}
