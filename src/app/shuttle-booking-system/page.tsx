import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shuttle Booking System | Online Shuttle Reservation Software",
  description:
    "Shuttle booking system for schools, companies & airports. Manage routes, schedules, seats, and online reservations.",
  canonical: "/shuttle-booking-system",
});

import ShuttleHero from "@/components/shuttle-companies/ShuttleHero";
import SmartTools from "@/components/shuttle-companies/SmartTools";
import CounterTicketing from "@/components/shuttle-companies/CounterTicketing";
import Commuters from "@/components/shuttle-companies/Commuters";
import WhoBenefits from "@/components/shuttle-companies/WhoBenefits";
import WhyChoose from "@/components/shuttle-companies/WhyChoose";
import ProductDemo from "@/components/shuttle-companies/ProductDemo";
import LogoTrustSection from "@/components/clients/LogoTrustSection";
import SpecializedSystems from "@/components/shared/SpecializedSystems";
import PaymentGateway from "@/components/shuttle-companies/PaymentGateway";
import FinalCTA from "@/components/shuttle-companies/FinalCTA";
import Faq from "@/components/shuttle-companies/Faq";
import { shuttleFaqs } from "@/components/shuttle-companies/faq-data";

const PAGE_URL = "/shuttle-booking-system";

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
          name: "Shuttle Companies",
          item: `https://www.cwticketingsystem.com${PAGE_URL}`,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "CWTicketing System — Shuttle Ticketing Software",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description:
        "Local & shuttle reservation software for school, office, airport and city commute routes with schedule management, fare zones, driver shifts, counter ticketing and mobile QR tickets.",
      url: `https://www.cwticketingsystem.com${PAGE_URL}`,
      publisher: {
        "@type": "Organization",
        name: "CWTicketing System",
        url: "https://www.cwticketingsystem.com/",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Request a free consultation and live demo.",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: shuttleFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function ShuttleCompaniesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main>
        <ShuttleHero />
        <SmartTools />
        <CounterTicketing />
        <Commuters />
        <WhoBenefits />
        <WhyChoose />
        <ProductDemo />
        <LogoTrustSection />
        <SpecializedSystems />
        <PaymentGateway />
        <FinalCTA />
        <Faq />
      </main>
    </>
  );
}
