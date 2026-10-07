"use client";

import FaqSection from "@/components/faq/FaqSection";
import { busFaqs } from "./faq-data";

export default function BusTicketingFaq() {
  return (
    <FaqSection
      items={busFaqs}
      eyebrow=""
      heading="Frequently Asked Questions"
      description="Straight answers about launching your white-label bus ticketing platform, apps, payments, and pricing with CWTicketing."
    />
  );
}
