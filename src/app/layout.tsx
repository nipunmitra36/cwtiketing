import type { Metadata } from "next";
import { vanillaSans } from "@/fonts/vanillaSans";
import { Poppins, Montserrat, Google_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import GSAPProvider from "../components/GSAPProvider";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Newsletter from "../components/newsletter/Newsletter";

// Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});
const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-google-sans",
});


const SITE_URL = "https://www.cwticketingsystem.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CW Ticketing System | Online Ticket Booking Platform for Transport Operators",
    template: "%s | CW Ticketing System",
  },
  description:
    "Launch your own online ticket booking system with seat selection, payments, mobile apps, route management, and powerful admin dashboards for bus, train, cruise, taxi, and event operators.",
  keywords: [
    "ticketing system",
    "online ticket booking software",
    "bus ticket booking system",
    "train booking platform",
    "transport management software",
    "seat selection software",
    "transit ticketing",
    "payment gateway integration",
    "mobile ticketing app",
    "transport operator dashboard",
  ],
  authors: [{ name: "CW Ticketing System" }],
  creator: "CW Ticketing System",
  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    title: "Online Ticket Booking System for Bus, Train & Transport Operators",
    description:
      "Launch your own online ticket booking system with seat selection, payments, mobile apps, route management, and powerful admin dashboards.",
    url: SITE_URL,
    siteName: "CW Ticketing System",
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
        ${poppins.variable}
        ${montserrat.variable}
        ${googleSans.variable}
        ${vanillaSans.variable}
      `}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <GSAPProvider>
          <Providers>
            <Header />
            <div id="smooth-wrapper">
              <div id="smooth-content">
                {children}
                <Footer />
              </div>
            </div>
          </Providers>
        </GSAPProvider>
        <Newsletter />
      </body>
    </html>
  );
}
