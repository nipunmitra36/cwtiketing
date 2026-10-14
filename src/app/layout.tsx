import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { BOT_UA_PATTERN } from "@/lib/gsap/botPattern";
import "./globals.css";
import GSAPProvider from "../components/GSAPProvider";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BackToTop from "../components/back-to-top/BackToTop";
import ThirdPartyScripts from "../components/analytics/ThirdPartyScripts";

// Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "CWTicketing",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  title: {
    default: "Build Online Ticket Booking System for Transport Operators",
    template: "%s",
  },
  description:
    "Launch your own online ticket booking system with seat selection, payments, mobile apps, route management, and powerful admin dashboards for bus, train, cruise, taxi, and event operators.",
  authors: [{ name: "CWTicketing" }],
  creator: "CWTicketing",
  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    title: "Online Ticket Booking System for Bus, Train & Transport Operators",
    description:
      "Launch your own online ticket booking system with seat selection, payments, mobile apps, route management, and powerful admin dashboards.",
    url: SITE_URL,
    siteName: "CWTicketing",
    locale: "en_US",
    images: [
      {
        url: "/images/og-ticket-booking-platform.jpg",
        width: 1200,
        height: 630,
        alt: "Ticket booking platform dashboard with seat selection and transport management",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Online Ticket Booking System for Transport Businesses",
    description:
      "Build a branded online ticket booking system for buses, trains, cruises, taxis, and events with payments, apps, and analytics.",
    images: [
      {
        url: "/images/og-ticket-booking-platform.jpg",
        alt: "Online ticket booking software dashboard",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "J6ELoOXH34EA6ONzlcHBBg24vgZf2lWz29QyFMh4Kw4",
  },
};
export const viewport: Viewport = {
  themeColor: "#FF6A1C",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        no-js
        ${poppins.variable}
      `}
      suppressHydrationWarning
    >
      <head>
        {/*
          `[data-gsap]` starts at `opacity: 0` so the scroll reveals do not
          flash their content in after the first paint. The server ships
          `no-js` to keep that content visible for anyone without JS — this
          blocking script swaps it out before the body paints, so the hidden
          state is never seen and never left behind.

          Crawlers get `is-bot` instead: they render JS but never scroll, so
          scroll reveals would leave sections invisible in Google's snapshot.
          globals.css forces that content visible for them.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c){c.remove("no-js");if(/${BOT_UA_PATTERN}/i.test(navigator.userAgent))c.add("is-bot")})(document.documentElement.classList)`,
          }}
        />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        {/* Clarity, Google Analytics and iDesk chat — loaded on first
            interaction, see ThirdPartyScripts */}
        <ThirdPartyScripts />

        <GSAPProvider>
          <Header />
          <div id="smooth-wrapper">
            <div id="smooth-content">
              {children}
              <Footer />
            </div>
          </div>
        </GSAPProvider>
        <BackToTop />
      </body>
    </html>
  );
}
