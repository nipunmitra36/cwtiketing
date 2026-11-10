import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bus Ticketing System | Bus Booking Software for Bus Operators",
  description:
    "CWTicketing presents automated bus ticketing system to manage online ticket booking with seat selection, route management, payments and mobile apps.",
  canonical: "/bus-ticketing-system",
});

import BusHero from "@/components/bus-ticketing/BusHero";
import TrustStats from "@/components/bus-ticketing/TrustStats";
import WhatIsBusTicketing from "@/components/bus-ticketing/WhatIsBusTicketing";
import BusHowItWorks from "@/components/bus-ticketing/BusHowItWorks";
import CapabilityGrid from "@/components/bus-ticketing/CapabilityGrid";
import ProductDemo from "@/components/bus-ticketing/ProductDemo";
import IndustryLinks from "@/components/bus-ticketing/IndustryLinks";
import OperatorStories from "@/components/bus-ticketing/OperatorStories";
import SecurityTrust from "@/components/bus-ticketing/SecurityTrust";
import BusTicketingFaq from "@/components/bus-ticketing/BusTicketingFaq";
import { busFaqs } from "@/components/bus-ticketing/faq-data";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cwticketingsystem.com/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Bus Ticketing System",
          item: "https://www.cwticketingsystem.com/bus-ticketing-system",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "CWTicketing — Bus Ticketing Software",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description:
        "Online bus ticketing system for routes, schedules, seats, bookings, payments, QR ticket validation and reporting for bus operators, agents and passengers.",
      url: "https://www.cwticketingsystem.com/bus-ticketing-system",
      publisher: {
        "@type": "Organization",
        name: "CWTicketing",
        url: "https://www.cwticketingsystem.com/",
      },
    },
    {
      "@type": "ItemList",
      name: "How Passengers Complete Bus Ticket Booking",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Search routes by city and travel date" },
        { "@type": "ListItem", position: 2, name: "Select a seat from the live seat map" },
        { "@type": "ListItem", position: 3, name: "Pay online" },
        { "@type": "ListItem", position: 4, name: "Receive the ticket instantly on the phone" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: busFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function BusTicketingSystemPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main>
        <BusHero />
        <TrustStats />
        <WhatIsBusTicketing />
        <BusHowItWorks />
        <CapabilityGrid />
        <ProductDemo />
        <IndustryLinks />
        <OperatorStories />
        <SecurityTrust />
        <BusTicketingFaq />
      </main>
    </>
  );
}
