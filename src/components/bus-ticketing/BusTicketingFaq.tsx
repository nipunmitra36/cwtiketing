"use client";

import FaqSection from "@/components/faq/FaqSection";
import { busFaqs } from "./faq-data";

export default function BusTicketingFaq() {
  return (
    <FaqSection
      items={busFaqs}
      eyebrow="FAQ"
      heading="Questions Operators Ask Before Switching"
      description="Straight answers about launching your white-label bus ticketing platform, apps, payments, and pricing with CW Ticketing."
    />
  );
}
