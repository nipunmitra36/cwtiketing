"use client";

import FaqSection from "@/components/faq/FaqSection";
import { operatorFaqs } from "./operators-faq-data";

export default function OperatorsFaq() {
  return (
    <FaqSection
      items={operatorFaqs}
      heading="Frequently Asked Questions"
      highlight="Questions"
      description="Straight answers about running your fleet, schedules, and operations with CW Ticketing."
    />
  );
}
