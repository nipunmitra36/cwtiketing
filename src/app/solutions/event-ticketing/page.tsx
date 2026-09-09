import type { Metadata } from "next";
import EventHero from "@/components/event-ticketing/EventHero";
import EventOnlineFeatures from "@/components/event-ticketing/EventOnlineFeatures";
import EventJourney from "@/components/event-ticketing/EventJourney";
import SalesChannels from "@/components/event-ticketing/SalesChannels";
import GalleryStyles from "@/components/event-ticketing/GalleryStyles";
import EventFaq from "@/components/event-ticketing/EventFaq";
import EventCTA from "@/components/event-ticketing/EventCTA";
import { eventFaqs } from "@/components/event-ticketing/event-faq-data";

const SITE_URL = "https://www.cwticketingsystem.com";
const PAGE_URL = "/solutions/event-ticketing";

const TITLE =
  "Event Ticketing System | Online Event Ticket Booking Software";
const DESCRIPTION =
  "Sell tickets online for concerts, conferences and any event with CW's event ticketing system — multiple ticket types, secure payment gateways, SMS verification and QR ticket validation.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "event ticketing system",
    "online event ticketing system",
    "event ticket booking system",
    "event ticketing software",
    "event ticket management system",
    "sell tickets online",
    "concert ticketing system",
    "conference ticketing software",
    "event ticketing system in Bangladesh",
    "QR ticket validation",
    "ticket validation checker",
    "SMS verification ticketing",
    "custom ticket design",
    "event ticketing admin dashboard",
    "android app for ticket checking",
    "event seat map software",
    "white label event ticketing system",
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Solutions",
          item: `${SITE_URL}/solutions`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Event Ticketing System",
          item: `${SITE_URL}${PAGE_URL}`,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "CW Ticketing System — Event Ticketing Software",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android",
      description:
        "Online event ticketing system for creating events, selling multiple ticket types, taking payments through secure gateways, verifying attendees by SMS and validating QR tickets at the gate.",
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
        "Easy Event Creation",
        "Multiple Ticket Types",
        "Payment Gateway",
        "SMS Verification",
        "Tailored Ticket Design",
        "Ticket Validation Checker",
        "Website To Sell Tickets",
        "Android App For Ticket Checking",
        "Admin Dashboard",
      ],
    },
    {
      "@type": "ItemList",
      name: "How the Event Ticketing System Works",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Create the event" },
        { "@type": "ListItem", position: 2, name: "Set ticket types" },
        { "@type": "ListItem", position: 3, name: "Sell everywhere" },
        { "@type": "ListItem", position: 4, name: "Verify by SMS" },
        { "@type": "ListItem", position: 5, name: "Scan at the gate" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: eventFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function EventTicketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <EventHero />
        <EventOnlineFeatures />
        <EventJourney />
        <SalesChannels />
        <GalleryStyles />
        <EventFaq />
        <EventCTA />
      </main>
    </>
  );
}
