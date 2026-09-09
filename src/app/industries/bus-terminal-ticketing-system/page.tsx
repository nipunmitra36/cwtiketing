import type { Metadata } from "next";
import MarketplaceHero from "@/components/bus-marketplace/MarketplaceHero";
import AdminControlCentre from "@/components/bus-marketplace/AdminControlCentre";
import OperatorFleetTools from "@/components/bus-marketplace/OperatorFleetTools";
import CounterBookingTools from "@/components/bus-marketplace/CounterBookingTools";
import PassengerBookingApp from "@/components/bus-marketplace/PassengerBookingApp";
import WhoBenefits from "@/components/bus-marketplace/WhoBenefits";
import WhyChoose from "@/components/bus-marketplace/WhyChoose";
import ClientShowcase from "@/components/bus-marketplace/ClientShowcase";
import SpecializedSystems from "@/components/bus-marketplace/SpecializedSystems";
import PaymentGateway from "@/components/bus-marketplace/PaymentGateway";
import FinalCTA from "@/components/bus-marketplace/FinalCTA";
import Faq from "@/components/bus-marketplace/Faq";
import { marketplaceFaqs } from "@/components/bus-marketplace/faq-data";

const PAGE_URL = "/industries/bus-terminal-ticketing-system";

const TITLE = "Bus Terminal Ticketing System | Bus Booking Marketplace Software";
const DESCRIPTION =
  "Build your own bus booking empire with CW Ticketing's marketplace platform — onboard operators, manage commissions, and run a central control centre for your entire bus network.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "bus terminal ticketing system",
    "bus ticketing marketplace software",
    "bus booking marketplace platform",
    "multi-operator bus booking system",
    "OTA bus ticketing software",
    "bus network management software",
    "operator onboarding software",
    "commission management software",
    "white label bus ticketing marketplace",
    "bus ticketing admin dashboard",
    "travel agency bus booking system",
    "bus terminal management software",
    "bus ticketing super admin panel",
    "multi-operator dashboard software",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "CW Ticketing System",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
          name: "Industries",
          item: "https://www.cwticketingsystem.com/industries",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Bus Terminal Ticketing System",
          item: `https://www.cwticketingsystem.com${PAGE_URL}`,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "CW Ticketing System — Bus Ticketing Marketplace Software",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description:
        "A multi-operator bus ticketing marketplace platform for OTAs, terminal owners and network builders — operator onboarding, commission management, dispute resolution, dynamic pricing, POS ticketing and a passenger booking app in one system.",
      url: `https://www.cwticketingsystem.com${PAGE_URL}`,
      publisher: {
        "@type": "Organization",
        name: "CW Ticketing System",
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
        <ClientShowcase />
        <SpecializedSystems />
        <PaymentGateway />
        <FinalCTA />
        <Faq />
      </main>
    </>
  );
}
