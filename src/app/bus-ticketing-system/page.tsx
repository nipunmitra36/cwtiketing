import type { Metadata } from "next";
import BusHero from "@/components/bus-ticketing/BusHero";
import RouteManagement from "@/components/bus-ticketing/RouteManagement";
import WhatIsBusTicketing from "@/components/bus-ticketing/WhatIsBusTicketing";
import HowItWorks from "@/components/bus-ticketing/HowItWorks";
import Benefits from "@/components/bus-ticketing/Benefits";
import WhoCanUse from "@/components/bus-ticketing/WhoCanUse";
import Ecosystem from "@/components/bus-ticketing/Ecosystem";
import PlatformTabs from "@/components/bus-ticketing/PlatformTabs";
import Payments from "@/components/bus-ticketing/Payments";
import BusinessIntelligence from "@/components/bus-ticketing/BusinessIntelligence";
import Onboarding from "@/components/bus-ticketing/Onboarding";
import PlatformScale from "@/components/bus-ticketing/PlatformScale";
import OperatorStories from "@/components/bus-ticketing/OperatorStories";
import BusTicketingFaq from "@/components/bus-ticketing/BusTicketingFaq";
import BuiltForOperations from "@/components/bus-ticketing/BuiltForOperations";
import { busFaqs } from "@/components/bus-ticketing/faq-data";

const PAGE_URL = "/bus-ticketing-system";

export const metadata: Metadata = {
  title: {
    absolute: "Bus Ticketing System | Online Bus Booking & Reservation Software",
  },
  description:
    "Manage routes, schedules, seats, bookings, payments and passengers with CW Ticketing's powerful bus ticketing system. Request a demo today.",
  keywords: [
    "bus ticketing software",
    "bus ticket booking system",
    "bus reservation system",
    "bus booking software",
    "bus ticket reservation system",
    "online bus ticketing system",
    "online bus booking system",
    "bus ticketing platform",
    "bus seat reservation system",
    "bus route management software",
    "bus ticket POS system",
    "bus ticketing mobile app",
    "bus ticketing admin panel",
    "bus ticket QR code validation",
    "bus fleet tracking software",
    "bus payment gateway integration",
    "white label bus ticketing system",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    title: "Bus Ticketing System | Online Bus Booking & Reservation Software",
    description:
      "Manage routes, schedules, seats, bookings, payments and passengers with CW Ticketing's powerful bus ticketing system. Request a demo today.",
    url: PAGE_URL,
    siteName: "CW Ticketing System",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bus Ticketing System | Online Bus Booking & Reservation Software",
    description:
      "Manage routes, schedules, seats, bookings, payments and passengers with CW Ticketing's powerful bus ticketing system. Request a demo today.",
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
          name: "Bus Ticketing System",
          item: "https://www.cwticketingsystem.com/bus-ticketing-system",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "CW Ticketing System — Bus Ticketing Software",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description:
        "Online bus ticketing system for routes, schedules, seats, bookings, payments, QR ticket validation and reporting for bus operators, agents and passengers.",
      url: "https://www.cwticketingsystem.com/bus-ticketing-system",
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
    },
    {
      "@type": "ItemList",
      name: "How Does a Bus Ticketing System Work?",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Search Routes" },
        { "@type": "ListItem", position: 2, name: "Select a Bus" },
        { "@type": "ListItem", position: 3, name: "Choose a Seat" },
        { "@type": "ListItem", position: 4, name: "Make Payment" },
        { "@type": "ListItem", position: 5, name: "Receive E-Ticket" },
        { "@type": "ListItem", position: 6, name: "Validate the Ticket" },
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
        <RouteManagement />
        <WhatIsBusTicketing />
        <HowItWorks />
        <Benefits />
        <WhoCanUse />
        <Ecosystem />
        <PlatformTabs />
        <Payments />
        <BusinessIntelligence />
        <Onboarding />
        <PlatformScale />
        <OperatorStories />
        <BusTicketingFaq />
        <BuiltForOperations />
      </main>
    </>
  );
}
