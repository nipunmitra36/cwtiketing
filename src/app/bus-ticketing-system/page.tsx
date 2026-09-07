import type { Metadata } from "next";
import BusHero from "@/components/bus-ticketing/BusHero";
import TrustStats from "@/components/bus-ticketing/TrustStats";
import WhatIsBusTicketing from "@/components/bus-ticketing/WhatIsBusTicketing";
import Onboarding from "@/components/bus-ticketing/Onboarding";
import CapabilityGrid from "@/components/bus-ticketing/CapabilityGrid";
import ProductDemo from "@/components/bus-ticketing/ProductDemo";
import OperatorStories from "@/components/bus-ticketing/OperatorStories";
import SecurityTrust from "@/components/bus-ticketing/SecurityTrust";
import BusTicketingFaq from "@/components/bus-ticketing/BusTicketingFaq";
import FinalCTA from "@/components/bus-ticketing/FinalCTA";
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
        { "@type": "ListItem", position: 1, name: "Search Route" },
        { "@type": "ListItem", position: 2, name: "Select Seat" },
        { "@type": "ListItem", position: 3, name: "Online Payment" },
        { "@type": "ListItem", position: 4, name: "Ticket Issued" },
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
        <Onboarding />
        <CapabilityGrid />
        <ProductDemo />
        <OperatorStories />
        <SecurityTrust />
        <BusTicketingFaq />
        <FinalCTA />
      </main>
    </>
  );
}
