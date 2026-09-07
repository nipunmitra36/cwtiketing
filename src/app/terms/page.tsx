import type { Metadata } from "next";
import Link from "next/link";
import { HiOutlineDocumentText } from "react-icons/hi";
import LegalSection, { type LegalSectionData } from "@/components/legal/LegalSection";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms of Use governing access to and use of CW Ticketing System, a product of Codeware Ltd.",
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type Section = LegalSectionData;

const sections: Section[] = [
  {
    heading: "Acceptance of Terms",
    paragraphs: [
      "By using this platform in any capacity — including browsing, booking tickets, managing schedules, or handling sales through an assigned panel — you agree to comply with these Terms of Use and all applicable laws and regulations.",
    ],
  },
  {
    heading: "User Access and Responsibilities",
    bullets: [
      "Users may access the system through web, mobile, or designated panel interfaces provided by the operator or CW Ticketing System.",
      "You are responsible for maintaining the confidentiality of your login credentials and any actions taken under your account.",
      "Any misuse of the system, unauthorized access, or fraudulent activity may result in suspension or termination of access.",
    ],
  },
  {
    heading: "Ticketing and Transactions",
    bullets: [
      "All ticket bookings are subject to seat availability and operator-defined policies.",
      "Fares, schedules, and refund policies are determined by the respective operators and are displayed at the time of booking.",
      "Payments processed through the platform are handled by authorized third-party gateways. CW Ticketing System does not store sensitive payment information and is not liable for transaction delays or failures caused by external payment systems.",
    ],
  },
  {
    heading: "System Usage and Restrictions",
    intro: "You agree not to:",
    bullets: [
      "Disrupt or interfere with the platform's performance or security.",
      "Access data not intended for your use or role within the system.",
      "Circumvent system limitations or attempt unauthorized data extraction.",
      "Upload or transmit any harmful or malicious content.",
    ],
  },
  {
    heading: "Data Use and Privacy",
    body: (
      <>
        Use of the platform is subject to our{" "}
        <Link href="/privacy" className="font-medium text-brand hover:underline">
          Privacy Policy
        </Link>
        , which outlines how we collect, store, and use your information. By
        using the service, you consent to our data practices as described
        therein.
      </>
    ),
  },
  {
    heading: "System Integrity",
    bullets: [
      "The platform is intended for legitimate and authorized use only.",
      "Any action taken within the system — whether booking, updating information, or managing ticketing at a counter — must reflect true and accurate data.",
      "Activities may be monitored to ensure quality control and security.",
    ],
  },
  {
    heading: "Intellectual Property",
    paragraphs: [
      "All content and functionality on the platform, including system architecture, interface design, and underlying software, are the intellectual property of Codeware Ltd. Reproduction, duplication, or distribution without permission is strictly prohibited.",
    ],
  },
  {
    heading: "Service Availability",
    paragraphs: [
      "We strive to maintain a reliable and responsive system, but we do not guarantee uninterrupted access. Scheduled maintenance, technical issues, or operator-specific outages may cause temporary disruptions.",
    ],
  },
  {
    heading: "Limitation of Liability",
    intro: "CW Ticketing System is not liable for indirect, incidental, or consequential damages arising from:",
    bullets: [
      "Errors in operator-provided schedules or pricing",
      "Failed or delayed payments due to third-party gateways",
      "User error, misuse, or unauthorized actions taken within the system",
    ],
  },
  {
    heading: "Termination",
    paragraphs: [
      "We reserve the right to suspend or terminate access to the system for violations of these Terms, unauthorized activities, or system abuse.",
    ],
  },
  {
    heading: "Changes to the Terms",
    paragraphs: [
      "CW Ticketing System may update these Terms of Use at any time. Notice of significant changes will be provided, and continued use of the system implies acceptance of the revised terms.",
    ],
  },
];

const LAST_UPDATED = "September 7, 2026";

export default function TermsPage() {
  return (
    <main className="bg-white">
      {/* ── Header ── */}
      <section className="border-b border-gray-200 bg-gray-50/60 pb-14 pt-32 sm:pt-40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-brand shadow-sm">
            <HiOutlineDocumentText className="h-4 w-4" />
            Legal
          </span>
          <h1 className="mt-5 text-[2rem] font-semibold leading-[1.15] tracking-tight text-text-dark sm:text-[2.4rem]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-[12.5px] text-text-muted">Last updated: {LAST_UPDATED}</p>
          <p className="mt-6 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
            Welcome to CW Ticketing System (&ldquo;CW Ticketing System&rdquo;,
            &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), a product
            of Codeware Ltd. These Terms of Use (&ldquo;Terms&rdquo;) govern
            your access to and use of our website, services, and applications
            (collectively, the &ldquo;Service&rdquo;) provided by Codeware Ltd.
            (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
            &ldquo;our&rdquo;). By accessing or using the Service, you agree to
            comply with and be bound by these Terms. If you do not agree,
            please do not use our Service.
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
                For support or inquiries regarding these Terms:
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
