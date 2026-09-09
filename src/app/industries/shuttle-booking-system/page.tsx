import type { Metadata } from "next";
import ShuttleHero from "@/components/shuttle-companies/ShuttleHero";
import SmartTools from "@/components/shuttle-companies/SmartTools";
import CounterTicketing from "@/components/shuttle-companies/CounterTicketing";
import Commuters from "@/components/shuttle-companies/Commuters";
import WhoBenefits from "@/components/shuttle-companies/WhoBenefits";
import WhyChoose from "@/components/shuttle-companies/WhyChoose";
import ClientShowcase from "@/components/shuttle-companies/ClientShowcase";
import SpecializedSystems from "@/components/shuttle-companies/SpecializedSystems";
import PaymentGateway from "@/components/shuttle-companies/PaymentGateway";
import FinalCTA from "@/components/shuttle-companies/FinalCTA";
import Faq from "@/components/shuttle-companies/Faq";
import { shuttleFaqs } from "@/components/shuttle-companies/faq-data";

const PAGE_URL = "/industries/shuttle-booking-system";

export const metadata: Metadata = {
  title: {
    absolute: "Shuttle Company Ticketing Software | Local & Shuttle Reservation System",
  },
  description:
    "Launch your own local & shuttle reservation software. Smart schedule, fare zone, driver shift and load management for school, office and city commute routes. Book a demo today.",
  keywords: [
    "shuttle ticketing software",
    "shuttle booking system",
    "local shuttle reservation software",
    "shuttle company software",
    "city commute ticketing system",
    "school shuttle booking software",
    "office shuttle booking system",
    "airport shuttle booking software",
    "shuttle route management software",
    "short route scheduling software",
    "stop to stop fare management",
    "driver shift management software",
    "shuttle ticketing platform",
    "shuttle POS system",
    "shuttle QR code ticketing",
    "white label shuttle booking platform",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    title: "Shuttle Company Ticketing Software | Local & Shuttle Reservation System",
    description:
      "Launch your own local & shuttle reservation software. Smart schedule, fare zone, driver shift and load management for school, office and city commute routes.",
    url: PAGE_URL,
    siteName: "CW Ticketing System",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shuttle Company Ticketing Software | Local & Shuttle Reservation System",
    description:
      "Launch your own local & shuttle reservation software. Smart schedule, fare zone, driver shift and load management for school, office and city commute routes.",
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
        { "@type": "ListItem", position: 2, name: "Industries", item: "https://www.cwticketingsystem.com/industries" },
        {
          "@type": "ListItem",
          position: 3,
          name: "Shuttle Companies",
          item: "https://www.cwticketingsystem.com/industries/shuttle-booking-system",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "CW Ticketing System — Shuttle Ticketing Software",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description:
        "Local & shuttle reservation software for school, office, airport and city commute routes with schedule management, fare zones, driver shifts, counter ticketing and mobile QR tickets.",
      url: "https://www.cwticketingsystem.com/industries/shuttle-booking-system",
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
        <ClientShowcase />
        <SpecializedSystems />
        <PaymentGateway />
        <FinalCTA />
        <Faq />
      </main>
    </>
  );
}