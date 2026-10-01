"use client";

import ChannelSection from "./ChannelSection";

const MEDIA = "/media/bus-operators";
const FEATURE_MEDIA = "/media/reliable-tools-for-intercity-terminals";

export default function CounterBookingSection() {
  return (
    <ChannelSection
      id="counter-booking"
      tone="white"
      title="Easy Counter Booking for Intercity Routes"
      paragraph="CWTicketing makes it simple for ticket counters and terminals to book city-to-city routes in real time. Sell tickets, issue receipts, handle walk-in passengers, and check seat availability instantly. Fast, accurate, and convenient — so you can provide the best counter service every time."
      illustrationImage={`${MEDIA}/easy-counter-booking-for-intercity-routes.png`}
      illustrationLabel="Staff managing intercity bus bookings on a computer"
      featuresHeading="Reliable Tools for Intercity Terminals"
      features={[
        { image: `${FEATURE_MEDIA}/seat-availability-check-01.svg`, label: "Seat Availability Check" },
        { image: `${FEATURE_MEDIA}/multi-city-route-access-01.svg`, label: "Multi-City Route Access" },
        { image: `${FEATURE_MEDIA}/walk-in-booking-and-payment-01.svg`, label: "Walk-in Booking & Payment" },
        { image: `${FEATURE_MEDIA}/multi-agent-role-controls-01.svg`, label: "Multi-Agent Role Controls" },
        { image: `${FEATURE_MEDIA}/pos-support-and-receipt-printing.svg`, label: "POS Support & Receipt Printing" },
        { image: `${FEATURE_MEDIA}/real-time-ticket-cancellation-and-refund.svg`, label: "Real-Time Ticket Cancellation & Refund" },
      ]}
    />
  );
}
