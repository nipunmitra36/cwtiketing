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


export const metadata: Metadata = {
  title: {
    default: "Your Brand Name | Modern Web Solutions",
    template: "%s | Your Brand Name",
  },
  description:
    "We build scalable, high-performance web applications using modern technologies like Next.js, Laravel, and React. Fast, SEO-optimized, and conversion-focused solutions.",
  keywords: [
    "web development",
    "Next.js developer",
    "Laravel development",
    "React development",
    "SEO optimized websites",
    "UI UX design",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Brand Name",
  metadataBase: new URL("https://yourdomain.com"),

  openGraph: {
    title: "Your Brand Name | Modern Web Solutions",
    description:
      "High-performance web development services built for scalability and SEO growth.",
    url: "https://yourdomain.com",
    siteName: "Your Brand Name",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Your Brand Name | Web Development Agency",
    description:
      "Scalable, SEO-friendly web solutions built with modern frameworks.",
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
