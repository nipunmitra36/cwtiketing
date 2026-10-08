import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { BOT_UA_PATTERN } from "@/lib/gsap/botPattern";
import "./globals.css";
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


const GA_MEASUREMENT_ID = "G-MR7P7F18JZ";
const CLARITY_PROJECT_ID = "r0vk6a74tt";
const IDESK_CHAT_ACCOUNT = "1720436169000";
const IDESK_CHAT_CSS = "https://static.idesk360.com/chat/stylesheet.css";
const IDESK_CHAT_BUNDLE = "https://static.idesk360.com/chat/bundle.js";

// Skipped for crawlers (`is-bot`): the widget pulls in its own CSS, JS and
// sound files, which only add to the resources Googlebot has to fetch.
const IDESK_CHAT_SCRIPT = `(function (d, w) {
  if (w.$_iDesk_Web_Chat_API || d.documentElement.classList.contains("is-bot")) return;
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
        {/* Microsoft Clarity */}
        {/*
          Skipped for crawlers (`is-bot`, set by the <head> script): Clarity's
          tracking pixels (c.clarity.ms/c.gif, c.bing.com/c.gif) are blocked
          for Googlebot and show up as "Page resources could not be loaded" in
          Search Console. Bots also shouldn't count as recorded sessions.
        */}
        <Script id="clarity" strategy="afterInteractive">
          {`if(!document.documentElement.classList.contains("is-bot"))(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
        </Script>

        {/* Google tag (gtag.js) — skipped for crawlers, like Clarity above:
            bot visits shouldn't count, and its collect requests fail for
            Googlebot and show up as unloaded page resources. */}
        <Script id="ga" strategy="afterInteractive">
          {`if(!document.documentElement.classList.contains("is-bot")){
var s=document.createElement("script");s.async=1;
s.src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}";
document.head.appendChild(s);
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
}`}
        </Script>

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

        {/* iDesk360 Live Chat */}
        <Script id="idesk-chat" strategy="afterInteractive">
          {IDESK_CHAT_SCRIPT}
        </Script>
      </body>
    </html>
  );
}
