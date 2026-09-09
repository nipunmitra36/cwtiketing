import type { Metadata } from "next";

import OperatorsHero from "@/components/bus-operators/OperatorsHero";
import OperatorControl from "@/components/bus-operators/OperatorControl";
import CounterBookingSection from "@/components/bus-operators/CounterBookingSection";
import PassengerExperienceSection from "@/components/bus-operators/PassengerExperienceSection";
import WhoBenefits from "@/components/bus-operators/WhoBenefits";
import WhyChoose from "@/components/bus-operators/WhyChoose";
import ClientShowcase from "@/components/bus-operators/ClientShowcase";
import SpecializedSystems from "@/components/bus-operators/SpecializedSystems";
import PaymentMethods from "@/components/bus-operators/PaymentMethods";
import OperatorsFinalCTA from "@/components/bus-operators/OperatorsFinalCTA";
import OperatorsFaq from "@/components/bus-operators/OperatorsFaq";
import { operatorFaqs } from "@/components/bus-operators/operators-faq-data";

const PAGE_URL = "/industries/intercity-bus-booking-software";

export const metadata: Metadata = {
  title: "Intercity Bus Operators | Smart Ticketing Software",
  description:
    "Power your intercity bus operations with smart ticketing — automate bookings, manage routes and terminals, and expand your reach with CW Ticketing.",
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
          name: "Intercity Bus Operators",
          item: "https://www.cwticketingsystem.com/industries/intercity-bus-booking-software",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: operatorFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function BusOperatorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main>
        <OperatorsHero />
        <OperatorControl />
        <CounterBookingSection />
        <PassengerExperienceSection />
        <WhoBenefits />
        <WhyChoose />
        <ClientShowcase />
        <SpecializedSystems />
        <PaymentMethods />
        <OperatorsFinalCTA />
        <OperatorsFaq />
      </main>
    </>
  );
}
