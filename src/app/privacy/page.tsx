import type { Metadata } from "next";
import { HiOutlineShieldCheck } from "react-icons/hi";
import LegalSection, { type LegalSectionData } from "@/components/legal/LegalSection";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Codeware Ltd. collects, uses, and safeguards your personal data across CW Ticketing System.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections: LegalSectionData[] = [
  {
    heading: "Information We Collect",
    intro:
      "CW Ticketing System collects only the personal data necessary to deliver our services efficiently and in compliance with applicable laws. This includes:",
    bullets: [
      "Contact Information: such as your full name, phone number, and email address, when you fill out forms or communicate with us through the platform.",
      "Booking Information: including travel details, selected routes, transaction ID, and booking history.",
      "Device and Usage Data: such as your IP address, browser type and version, device type, operating system, referring URLs, and interaction logs.",
      "Voluntarily Provided Data: such as information submitted during support requests, surveys, or promotional activities.",
    ],
    outro:
      "We do not intentionally collect sensitive personal information such as racial or ethnic origin, political opinions, religious beliefs, health information, or biometric data.",
  },
  {
    heading: "Purpose of Data Collection",
    intro: "We process your personal information for the following purposes:",
    bullets: [
      "Service Delivery: To enable ticket bookings, send booking confirmations, issue invoices, and provide customer support.",
      "User Communication: To respond to inquiries, notify you of service updates, and share important information related to your use of the platform.",
      "Performance Optimization: To monitor and improve system functionality, user experience, and service quality through analytics and technical logs.",
      "Legal Compliance: To fulfill our obligations under applicable legal and regulatory frameworks, including fraud detection and prevention.",
      "Marketing (where applicable and permitted): To share updates or promotions that may be relevant to your interests — only with your prior consent.",
    ],
  },
  {
    heading: "Cookies Policy",
    paragraphs: [
      "CW Ticketing System uses cookies to enhance user experience and understand how the platform is being used.",
      "At the beginning of your session, you will be notified about the use of cookies. By clicking “Accept,” you agree to the placement and use of cookies on your device.",
    ],
    intro: "Types of Cookies Used:",
    bullets: [
      "Necessary Cookies: Essential for platform functionality and security.",
      "Performance Cookies: Help us measure website usage and improve usability.",
      "Functionality Cookies: Store user preferences to personalize your experience.",
      "Analytics Cookies: Used with services like Google Analytics to track user interaction and behavior anonymously.",
    ],
    outro:
      "You may manage or disable cookies through your browser settings, though this may affect certain functionalities of the website.",
  },
  {
    heading: "Data Sharing and Disclosure",
    paragraphs: [
      "CW Ticketing System does not sell, rent, or trade your personal information to any third parties.",
    ],
    intro: "Limited data may be shared under the following circumstances:",
    bullets: [
      "With Service Providers: such as cloud hosting, analytics, or payment gateways, strictly for service-related purposes and under confidentiality agreements.",
      "With Business Partners: such as transport operators, only to the extent necessary to fulfill your ticket reservation or support requests.",
      "Where Legally Required: such as to comply with regulatory authorities, court orders, or other lawful requests.",
    ],
    outro:
      "All third-party access is governed by appropriate data processing agreements to ensure compliance with privacy and security standards.",
  },
  {
    heading: "User Rights",
    intro: "As a user of CW Ticketing, you are entitled to the following rights regarding your personal data:",
    bullets: [
      "Right to Access — You may request details of the personal information we hold about you.",
      "Right to Correction — You may request updates or corrections to inaccurate or incomplete information.",
      "Right to Erasure — You may request deletion of your personal data, subject to applicable retention obligations.",
      "Right to Object — You may object to the processing of your data in certain circumstances, including direct marketing.",
      "Right to Withdraw Consent — Where processing is based on consent, you may withdraw it at any time.",
    ],
  },
  {
    heading: "Data Retention",
    paragraphs: [
      "We retain your personal data only as long as is necessary to fulfill the purposes outlined in this Privacy Policy, or as required by applicable law.",
    ],
    bullets: [
      "Booking and transaction records may be retained for accounting, audit, and compliance purposes.",
      "Inactive user data may be anonymized or deleted after a reasonable period of inactivity.",
    ],
  },
  {
    heading: "Security Measures",
    paragraphs: [
      "CW Ticketing System implements appropriate technical and organizational measures to protect your personal data from unauthorized access, misuse, alteration, or loss. These include secure data transmission protocols, access controls, and regular system audits.",
      "While we take all reasonable precautions, no data transmission over the internet can be guaranteed to be 100% secure.",
    ],
  },
  {
    heading: "Changes to This Policy",
    paragraphs: [
      "This Privacy Policy may be updated from time to time to reflect changes in our services, legal obligations, or business practices. Updates will be posted on our website, with the revision date clearly indicated.",
      "We encourage you to review this policy periodically to stay informed about how we protect your data.",
    ],
  },
];

const EFFECTIVE_DATE = "July 30, 2025";

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      {/* ── Header ── */}
      <section className="border-b border-gray-200 bg-gray-50/60 pb-14 pt-32 sm:pt-40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-brand shadow-sm">
            <HiOutlineShieldCheck className="h-4 w-4" />
            Legal
          </span>
          <h1 className="mt-5 text-[2rem] font-semibold leading-[1.15] tracking-tight text-text-dark sm:text-[2.4rem]">
            Privacy Policy
          </h1>
          <p className="mt-2 text-[12.5px] text-text-muted">Effective as of {EFFECTIVE_DATE}</p>
          <p className="mt-6 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
            &ldquo;We,&rdquo; &ldquo;Us,&rdquo; &ldquo;Our,&rdquo; or
            &ldquo;Company&rdquo; refers to Codeware Ltd., the official
            developer and operator of CW Ticketing System (also referred to as
            &ldquo;CW Ticketing&rdquo;).
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
            CW Ticketing System is a digital ticketing solution designed to
            enable efficient and secure online reservations for buses, trains,
            cable cars, cruises, taxis, and events. We are committed to
            protecting your personal data and ensuring transparency in how
            your information is collected, used, and safeguarded.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
            This Privacy Policy outlines the principles that guide our data
            handling practices and explains your rights as a user of our
            platform.
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-gray-100">
            {sections.map((s) => (
              <LegalSection key={s.heading} {...s} />
            ))}

            {/* Contact */}
            <div className="py-8">
              <h2 className="text-[17px] font-semibold tracking-tight text-text-dark sm:text-[19px]">
                Contact
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-text-muted">
                To exercise your rights regarding your personal data, please
                contact us at:
              </p>
              <a
                href="mailto:info@cwticketingsystem.com"
                className="mt-2 inline-block text-[14px] font-medium text-brand hover:underline"
              >
                info@cwticketingsystem.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
