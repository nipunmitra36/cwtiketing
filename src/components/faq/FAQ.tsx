"use client";

import FaqSection from "./FaqSection";

const faqs = [
  {
    q: "How long does it take to launch my booking platform?",
    a: "Most operators go live within 2–3 weeks. The timeline depends on your requirements, integrations, and data migration. We'll provide a clear timeline during our initial consultation.",
  },
  {
    q: "Can I customize the booking flow and branding?",
    a: "Absolutely. Every aspect of the booking experience — from the color scheme and logo to the checkout flow and email templates — is fully customizable to match your brand.",
  },
  {
    q: "What payment gateways do you support?",
    a: "We integrate with Stripe, PayPal, Square, Razorpay, and 20+ local payment providers. We also support cash-on-counter and mobile money options popular in specific markets.",
  },
  {
    q: "Do you offer mobile apps for my customers?",
    a: "Yes. We provide white-label Android and iOS apps that match your brand. Customers can book tickets, view schedules, select seats, and manage bookings on the go.",
  },
  {
    q: "Can I manage multiple routes, buses, and fare types?",
    a: "Yes. Our system supports unlimited routes, vehicles, fare classes (AC, non-AC, sleeper, etc.), and dynamic pricing. You can set different fares for peak/off-peak hours.",
  },
  {
    q: "What kind of support do you provide after launch?",
    a: "We offer 24/7 technical support, a dedicated account manager, and regular platform updates. Enterprise plans include SLA-backed support and priority issue resolution.",
  },
  {
    q: "What is a white label ticket booking platform?",
    a: "A white label ticket booking platform is a ready-made ticketing system you can rebrand as your own — with your logo, colors, domain, and apps. You get all the technology of a custom-built platform without the years of development time or cost.",
  },
  {
    q: "Can I launch my own branded booking app?",
    a: "Yes. We publish white-label Android and iOS apps under your brand on the Google Play Store and Apple App Store. Passengers download 'your' app to book, select seats, and manage trips, while you keep full ownership of the platform.",
  },
  {
    q: "Does it support multiple operators?",
    a: "Absolutely. The platform supports multi-operator and marketplace models — multiple transport companies can sell on one platform with separate dashboards, commissions, and reporting for each.",
  },
  {
    q: "Can I integrate my existing payment gateway?",
    a: "Yes. We support Stripe, PayPal, Square, Razorpay, and 20+ local providers out of the box, and we can connect your existing merchant account or custom gateway through our API during onboarding.",
  },
  {
    q: "How much does a booking system cost?",
    a: "Pricing depends on your routes, volumes, and features. Starter plans start at a modest monthly rate, while Growth and Enterprise are custom-quoted. Contact us for a free, no-obligation quote tailored to your operation.",
  },
];

export default function FAQ() {
  return (
    <FaqSection
      items={faqs}
      heading="Frequently Asked Questions"
      highlight="Questions"
      description="Everything operators ask before switching. Can't find your answer? Our team replies within minutes."
    />
  );
}
