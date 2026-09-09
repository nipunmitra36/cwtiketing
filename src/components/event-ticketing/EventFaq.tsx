"use client";

import FaqSection from "@/components/faq/FaqSection";
import { eventFaqs } from "./event-faq-data";

export default function EventFaq() {
  return (
    <FaqSection
      items={eventFaqs}
      heading="What Event Hosts Ask Us First"
      description="Straight answers about launching your online event ticketing platform, payments, and promotions with CW Ticketing."
    />
  );
}
