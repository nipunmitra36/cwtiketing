import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bus Terminal Ticketing System | Manage Departures & Bookings",
  description:
    "Cloud-based bus terminal ticketing system to manage counters, schedules, departures, ticket sales and passenger flow.",
  canonical: "/bus-terminal-ticketing-system",
});

import MarketplaceHero from "@/components/bus-marketplace/MarketplaceHero";
import AdminControlCentre from "@/components/bus-marketplace/AdminControlCentre";
import OperatorFleetTools from "@/components/bus-marketplace/OperatorFleetTools";
import CounterBookingTools from "@/components/bus-marketplace/CounterBookingTools";
import PassengerBookingApp from "@/components/bus-marketplace/PassengerBookingApp";
import WhoBenefits from "@/components/bus-marketplace/WhoBenefits";
import WhyChoose from "@/components/bus-marketplace/WhyChoose";
import LogoTrustSection from "@/components/clients/LogoTrustSection";
import SpecializedSystems, {
  type SpecializedSystemsProps,
} from "@/components/shared/SpecializedSystems";
import ProductDemo from "@/components/bus-marketplace/ProductDemo";
import PaymentGateway from "@/components/bus-marketplace/PaymentGateway";
import FinalCTA from "@/components/bus-marketplace/FinalCTA";
import Faq from "@/components/bus-marketplace/Faq";
import { marketplaceFaqs } from "@/components/bus-marketplace/faq-data";

const PAGE_URL = "/bus-terminal-ticketing-system";

const SPECIALIZED_SYSTEMS: SpecializedSystemsProps["systems"] = [
  {
    icon: "intercity",
    title: "Intercity Bus Booking System",
    subtitle: "Long-distance travel made simple",
    href: "/intercity-bus-booking-software",
    items: [
      "Multi-city route planning",
      "Advanced seat selection",
      "Meal & amenity booking",
      "Real-time GPS tracking",
      "Flexible cancellation policy",
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
          name: "Bus Terminal Ticketing System",
          item: `https://www.cwticketingsystem.com${PAGE_URL}`,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "CWTicketing — Bus Ticketing Marketplace Software",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description:
        "A multi-operator bus ticketing marketplace platform for OTAs, terminal owners and network builders — operator onboarding, commission management, dispute resolution, dynamic pricing, POS ticketing and a passenger booking app in one system.",
      url: `https://www.cwticketingsystem.com${PAGE_URL}`,
      publisher: {
        "@type": "Organization",
        name: "CWTicketing",
        url: "https://www.cwticketingsystem.com/",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Request a free consultation and live demo.",
      },
      featureList: [
        "Operator Onboarding",
        "Analytics & Reports",
        "Content Management System",
        "Dispute Resolution",
        "Commission Management",
        "Support Center",
        "Company Agent Management",
        "Business Dashboard",
        "Route Setup / Management",
        "Dynamic Pricing Engine",
        "Fuel Management",
        "Dynamic Seat Plan Creator",
        "Fleet Management",
        "Walk-in Ticket Issuance",
        "Passenger Manifest",
        "POS-Compatible Interface",
        "Interactive Seat Maps",
        "Multicurrency & Multilingual Booking",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: marketplaceFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function BusTerminalTicketingSystemPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main>
        <MarketplaceHero />
        <AdminControlCentre />
        <OperatorFleetTools />
        <CounterBookingTools />
        <PassengerBookingApp />
        <WhoBenefits />
        <WhyChoose />
        <ProductDemo />
        <LogoTrustSection />
        <SpecializedSystems systems={SPECIALIZED_SYSTEMS} />
        <PaymentGateway />
        <FinalCTA />
        <Faq />
      </main>
    </>
  );
}
