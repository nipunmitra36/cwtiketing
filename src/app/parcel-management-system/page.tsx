import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Parcel Management System | Courier & Delivery Software",
  description:
    "Complete parcel management system for couriers & logistics. Track parcels, manage hubs, automate billing & notifications.",
  canonical: "/parcel-management-system",
});

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
const PAGE_URL = "/parcel-management-system";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Parcel Management System",
          item: `${SITE_URL}${PAGE_URL}`,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "CWTicketing System — Parcel Management Solution",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android",
      description:
        "A parcel management system for courier companies, transport operators and logistics businesses — parcel booking, barcoded waybills, barcode scanning, branch and hub transfers, rider assignment, real-time tracking, customer notifications and cash on delivery settlement.",
      url: `${SITE_URL}${PAGE_URL}`,
      publisher: {
        "@type": "Organization",
        name: "CWTicketing System",
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
        "The five stages a parcel moves through in the CWTicketing parcel management system, from counter booking to delivery and cash settlement.",
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
