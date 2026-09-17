"use client";

import ChannelSection from "./ChannelSection";

const MEDIA = "/media/bus-operators";
const FEATURE_MEDIA = "/media/Reliable Tools for Intercity Terminals";

export default function CounterBookingSection() {
  return (
    <ChannelSection
      id="counter-booking"
      tone="white"
      title="Easy Counter Booking for Intercity Routes"
      paragraph="CWTicketing makes it simple for ticket counters and terminals to book city-to-city routes in real time. Sell tickets, issue receipts, handle walk-in passengers, and check seat availability instantly. Fast, accurate, and convenient — so you can provide the best counter service every time."
      availableOn={["Web Portal", "Android App", "Android POS"]}
      illustrationImage={`${MEDIA}/easy-counter-booking-for-intercity-routes.png`}
      illustrationLabel="Staff managing intercity bus bookings on a computer"
      featuresHeading="Reliable Tools for Intercity Terminals"
      features={[
        { image: `${FEATURE_MEDIA}/Seat Availability Check-01.svg`, label: "Seat Availability Check" },
        { image: `${FEATURE_MEDIA}/Multi-City Route Access-01.svg`, label: "Multi-City Route Access" },
        { image: `${FEATURE_MEDIA}/Walk-in Booking & Payment-01.svg`, label: "Walk-in Booking & Payment" },
        { image: `${FEATURE_MEDIA}/Multi-Agent Role Controls-01.svg`, label: "Multi-Agent Role Controls" },
        { image: `${FEATURE_MEDIA}/POS Support & Receipt Printing.svg`, label: "POS Support & Receipt Printing" },
        { image: `${FEATURE_MEDIA}/Real-Time Ticket Cancellation & Refund.svg`, label: "Real-Time Ticket Cancellation & Refund" },
      ]}
    />
  );
}
