import type { Metadata } from "next";
import TaxiHero from "@/components/taxi-booking/TaxiHero";
import WhatIsTaxiSystem from "@/components/taxi-booking/WhatIsTaxiSystem";
import TaxiFeatures from "@/components/taxi-booking/TaxiFeatures";
import TaxiJourney from "@/components/taxi-booking/TaxiJourney";
import TaxiChannels from "@/components/taxi-booking/TaxiChannels";
import WhoUses from "@/components/taxi-booking/WhoUses";
import WhyChoose from "@/components/taxi-booking/WhyChoose";
import TaxiFaq from "@/components/taxi-booking/TaxiFaq";
import TaxiCTA from "@/components/taxi-booking/TaxiCTA";
import { taxiFaqs } from "@/components/taxi-booking/faq-data";

const SITE_URL = "https://www.cwticketingsystem.com";
const PAGE_URL = "/solutions/online-taxi-booking-system";

const TITLE = "Online Taxi Booking System | Taxi Booking Software";
const DESCRIPTION =
  "A complete online taxi booking system and taxi booking software — app and web ride booking, automatic driver dispatch, live GPS tracking, fare metering, and driver commission settlement. Book a free demo.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "online taxi booking system",
    "taxi booking software",
    "online taxi management system",
    "online taxi reservation system",
    "taxi booking management software",
    "taxi dispatch software",
    "taxi management system",
    "cab booking software",
    "ride hailing software",
    "taxi booking app development",
    "taxi fleet management software",
    "taxi driver app",
    "automatic taxi dispatch system",
    "taxi fare calculation software",
    "white label taxi booking system",
    "corporate taxi booking system",
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
          name: "Online Taxi Booking System",
          item: `${SITE_URL}${PAGE_URL}`,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "CW Ticketing System — Online Taxi Booking Software",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description:
        "An online taxi booking system for taxi companies, ride-hailing startups and corporate fleets — app and web ride booking, automatic driver dispatch, scheduled rides, live GPS tracking, fare metering, multi-channel payments, driver commission settlement and fleet management.",
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
        "Multi-Channel Ride Booking",
        "Automatic Driver Dispatch",
        "Instant & Scheduled Rides",
        "Live GPS Trip Tracking",
        "Fare Estimation & Metering",
        "Cash, Card & Wallet Payments",
        "Driver Management & Commission",
        "Fleet & Vehicle Management",
        "Ratings & Rider Feedback",
        "Corporate & Account Billing",
        "Reports & Analytics",
        "Safety & SOS Controls",
      ],
    },
    {
      "@type": "HowTo",
      name: "How an Online Taxi Reservation System Works",
      description:
        "The five stages of a trip in the CW Ticketing online taxi booking system, from ride request to fare settlement.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Passenger requests a ride",
          text: "They set pickup and drop-off in the app or on your site and see the fare estimate before confirming.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "System dispatches a driver",
          text: "The nearest free vehicle is matched and notified in seconds, with dispatcher override always available.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Driver accepts and arrives",
          text: "The rider watches the car approach in real time and is alerted when it reaches the pickup point.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Trip runs on live GPS",
          text: "Distance, time and waiting are metered as the trip progresses, and the route is recorded end to end.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Fare settles automatically",
          text: "Payment is captured by cash, card or wallet, a receipt is issued, and driver commission is calculated.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: taxiFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function OnlineTaxiBookingSystemPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main>
        <TaxiHero />
        <WhatIsTaxiSystem />
        <TaxiFeatures />
        <TaxiJourney />
        <TaxiChannels />
        <WhoUses />
        <WhyChoose />
        <TaxiFaq />
        <TaxiCTA />
      </main>
    </>
  );
}
