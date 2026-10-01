import type { Metadata } from "next";
import Script from "next/script";
import { vanillaSans } from "@/fonts/vanillaSans";
import { Poppins, Montserrat, Google_Sans } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import Providers from "./providers";
import GSAPProvider from "../components/GSAPProvider";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BackToTop from "../components/back-to-top/BackToTop";

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


const GA_MEASUREMENT_ID = "G-MR7P7F18JZ";
const CLARITY_PROJECT_ID = "r0vk6a74tt";
const IDESK_CHAT_ACCOUNT = "1720436169000";
const IDESK_CHAT_CSS = "https://static.idesk360.com/chat/stylesheet.css";
const IDESK_CHAT_BUNDLE = "https://static.idesk360.com/chat/bundle.js";

const IDESK_CHAT_SCRIPT = `(function (d, w) {
  if (w.$_iDesk_Web_Chat_API) return;
  var r = (w.$_iDesk_Web_Chat_API = function (c) {
    r._.push(c);
  });
  r._ = [];
  w.__iDeskWebChat_account = "${IDESK_CHAT_ACCOUNT}";
  w.__iDeskWebChat_version = 2;
  var link = d.createElement("link");
  link.href = "${IDESK_CHAT_CSS}";
  link.rel = "stylesheet";
  d.head.appendChild(link);
  var webchat = d.createElement("div");
  webchat.setAttribute("id", "webchat");
  d.body.appendChild(webchat);
  var rc = d.createElement("script");
  rc.type = "text/javascript";
  rc.async = true;
  rc.src = "${IDESK_CHAT_BUNDLE}";
  var s = d.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(rc, s);
})(document, window);`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CWTicketing System | Online Ticket Booking Platform for Transport Operators",
    template: "%s | CWTicketing System",
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
  authors: [{ name: "CWTicketing System" }],
  creator: "CWTicketing System",
  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    title: "Online Ticket Booking System for Bus, Train & Transport Operators",
    description:
      "Launch your own online ticket booking system with seat selection, payments, mobile apps, route management, and powerful admin dashboards.",
    url: SITE_URL,
    siteName: "CWTicketing System",
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
      <body className="font-sans" suppressHydrationWarning>
        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
        </Script>

        {/* Google tag (gtag.js) */}
        <Script
          id="ga-src"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>

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
        <BackToTop />

        {/* iDesk360 Live Chat */}
        <Script id="idesk-chat" strategy="afterInteractive">
          {IDESK_CHAT_SCRIPT}
        </Script>
      </body>
    </html>
  );
}
