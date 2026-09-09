"use client";

import FaqSection from "@/components/faq/FaqSection";
import { shuttleFaqs } from "./faq-data";

export default function Faq() {
  return (
    <FaqSection
      items={shuttleFaqs}
      heading="Frequently Asked Questions"
      highlight="Questions"
      description="Straight answers about running school, office, and city commute routes with CW Ticketing."
    />
  );
}
