"use client";

import FaqSection from "@/components/faq/FaqSection";
import { marketplaceFaqs } from "./faq-data";

export default function Faq() {
  return (
    <FaqSection
      items={marketplaceFaqs}
      heading="Frequently Asked Questions"
      highlight="Questions"
      description="Straight answers about onboarding operators, managing commissions, and running a bus ticketing marketplace with CW Ticketing."
    />
  );
}
