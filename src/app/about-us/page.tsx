import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us | CWTicketing",
  description:
    "Learn about CWTicketing, a product of Codeware Ltd., built to empower transport operators with a modern, scalable online ticket booking platform.",
  canonical: "/about-us",
});

import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import WhatWeOffer from "@/components/about/WhatWeOffer";
import VisionTeam from "@/components/about/VisionTeam";
import MoveForwardCTA from "@/components/about/MoveForwardCTA";

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
