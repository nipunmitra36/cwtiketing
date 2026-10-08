import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Intercity Coach Booking Software | Coach Booking System",
  description:
    "Complete intercity coach booking software with route management, fleet, online sales, agent panel, and real-time reporting.",
  canonical: "/intercity-coach-booking-software",
});


import OperatorsHero from "@/components/bus-operators/OperatorsHero";
import OperatorControl from "@/components/bus-operators/OperatorControl";
import CounterBookingSection from "@/components/bus-operators/CounterBookingSection";
import PassengerExperienceSection from "@/components/bus-operators/PassengerExperienceSection";
import WhoBenefits from "@/components/bus-operators/WhoBenefits";
import WhyChoose from "@/components/bus-operators/WhyChoose";
import LogoTrustSection from "@/components/clients/LogoTrustSection";
import SpecializedSystems, {
  type SpecializedSystemsProps,
} from "@/components/shared/SpecializedSystems";
import ProductDemo from "@/components/bus-operators/ProductDemo";
import PaymentGateway from "@/components/shared/PaymentGateway";
import OperatorsFinalCTA from "@/components/bus-operators/OperatorsFinalCTA";
import OperatorsFaq from "@/components/bus-operators/OperatorsFaq";
import { operatorFaqs } from "@/components/bus-operators/operators-faq-data";

const PAGE_URL = "/intercity-coach-booking-software";

const SPECIALIZED_SYSTEMS: SpecializedSystemsProps["systems"] = [
  {
    icon: "marketplace",
    title: "Bus Ticketing Marketplace",
    subtitle: "Connecting bus operators under one platform",
    href: "/bus-terminal-ticketing-system",
    items: [
      "Multi-Operator Management Dashboard",
      "Dynamic Pricing & Seat Plan Engine",
      "Real-Time Analytics & Reports",
      "POS-Compatible & QR-Based Ticketing",
      "Passenger Experience Tools",
    ],
  },
  {
    icon: "shuttle",
    title: "Shuttle Service Booking System",
    subtitle: "Short-distance & frequent routes",
    href: "/shuttle-booking-system",
    items: [
      "Frequent schedule management",
      "Quick boarding passes",
      "Corporate account integration",
      "Subscription-based booking",
      "Airport/hotel partnerships",
    ],
  },
];

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
          item: `https://www.cwticketingsystem.com${PAGE_URL}`,
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
        <ProductDemo />
        <LogoTrustSection />
        <SpecializedSystems systems={SPECIALIZED_SYSTEMS} />
        <PaymentGateway
          description="Cash, cards, wallets, and local rails — accept every payment your intercity passengers already use."
          lockNote="Encrypted end-to-end payments across every channel"
        />
        <OperatorsFinalCTA />
        <OperatorsFaq />
      </main>
    </>
  );
}
