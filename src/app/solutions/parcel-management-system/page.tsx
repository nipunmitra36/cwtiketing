import type { Metadata } from "next";
import ParcelHero from "@/components/parcel-management/ParcelHero";
import WhatIsParcelSystem from "@/components/parcel-management/WhatIsParcelSystem";
import ParcelFeatures from "@/components/parcel-management/ParcelFeatures";
import ParcelJourney from "@/components/parcel-management/ParcelJourney";
import ParcelChannels from "@/components/parcel-management/ParcelChannels";
import WhoUses from "@/components/parcel-management/WhoUses";
import WhyChoose from "@/components/parcel-management/WhyChoose";
import ParcelFaq from "@/components/parcel-management/ParcelFaq";
import ParcelCTA from "@/components/parcel-management/ParcelCTA";
import { parcelFaqs } from "@/components/parcel-management/faq-data";

const SITE_URL = "https://www.cwticketingsystem.com";
const PAGE_URL = "/solutions/parcel-management-system";

const TITLE = "Parcel Management System | Complete Parcel Management Solution";
const DESCRIPTION =
  "A complete parcel management system for courier and transport businesses — parcel booking, barcoded waybills, real-time tracking, branch and rider management, and cash on delivery settlement. Book a free demo.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "parcel management solution",
    "parcel management system",
    "parcel management software",
    "courier management system",
    "courier management software",
    "parcel tracking system",
    "parcel booking software",
    "parcel delivery management system",
    "cash on delivery management software",
    "waybill management system",
    "logistics parcel software",
    "branch and hub management software",
    "delivery rider management app",
    "parcel management system for bus operators",
    "online parcel booking system",
    "white label parcel management software",
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
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE_URL}/solutions` },
        {
          "@type": "ListItem",
          position: 3,
          name: "Parcel Management System",
          item: `${SITE_URL}${PAGE_URL}`,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "CW Ticketing System — Parcel Management Solution",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android",
      description:
        "A parcel management system for courier companies, transport operators and logistics businesses — parcel booking, barcoded waybills, barcode scanning, branch and hub transfers, rider assignment, real-time tracking, customer notifications and cash on delivery settlement.",
      url: `${SITE_URL}${PAGE_URL}`,
      publisher: {
        "@type": "Organization",
        name: "CW Ticketing System",
        url: `${SITE_URL}/`,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Request a free consultation and live demo.",
      },
      featureList: [
        "Parcel Booking & Waybills",
        "Barcode & QR Scanning",
        "Real-Time Parcel Tracking",
        "Branch & Hub Management",
        "Rider & Delivery Agent Management",
        "Cash on Delivery Settlement",
        "Weight & Distance Based Pricing",
        "SMS & Email Notifications",
        "Returns & Reschedule Handling",
        "Reports & Analytics",
        "Customer & Rider Mobile Apps",
        "Role-Based Access Control",
      ],
    },
    {
      "@type": "HowTo",
      name: "How the Parcel Management System Works",
      description:
        "The five stages a parcel moves through in the CW Ticketing parcel management system, from counter booking to delivery and cash settlement.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Book the parcel",
          text: "Counter staff record sender, receiver, weight and service type; the system prices it instantly.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Print the waybill",
          text: "A barcoded label goes on the parcel and becomes its identity for the rest of the journey.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Move through hubs",
          text: "Each branch and sorting hub scans the parcel in and out, building a complete chain of custody.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Assign to a rider",
          text: "The parcel joins a rider's delivery list, and the receiver is notified that it is on the way.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Deliver and settle",
          text: "Proof of delivery is captured, cash on delivery is collected, and the branch account reconciles.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: parcelFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function ParcelManagementSystemPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main>
        <ParcelHero />
        <WhatIsParcelSystem />
        <ParcelFeatures />
        <ParcelJourney />
        <ParcelChannels />
        <WhoUses />
        <WhyChoose />
        <ParcelFaq />
        <ParcelCTA />
      </main>
    </>
  );
}
