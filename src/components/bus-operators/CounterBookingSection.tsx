"use client";

import {
  HiOutlineViewGrid,
  HiOutlineMap,
  HiOutlineCreditCard,
  HiOutlineUserGroup,
  HiOutlinePrinter,
  HiOutlineRefresh,
  HiOutlineDesktopComputer,
} from "react-icons/hi";
import ChannelSection from "./ChannelSection";

export default function CounterBookingSection() {
  return (
    <ChannelSection
      id="counter-booking"
      tone="white"
      title="Easy Counter Booking for Intercity Routes"
      paragraph="CWTicketing makes it simple for ticket counters and terminals to book city-to-city routes in real time. Sell tickets, issue receipts, handle walk-in passengers, and check seat availability instantly. Fast, accurate, and convenient — so you can provide the best counter service every time."
      availableOn={["Web Portal", "Android App", "Android POS"]}
      illustrationIcon={HiOutlineDesktopComputer}
      illustrationLabel="Staff managing intercity bus bookings on a computer"
      featuresHeading="Reliable Tools for Intercity Terminals"
      features={[
        { icon: HiOutlineViewGrid, label: "Seat Availability Check" },
        { icon: HiOutlineMap, label: "Multi-City Route Access" },
        { icon: HiOutlineCreditCard, label: "Walk-in Booking & Payment" },
        { icon: HiOutlineUserGroup, label: "Multi-Agent Role Controls" },
        { icon: HiOutlinePrinter, label: "POS Support & Receipt Printing" },
        { icon: HiOutlineRefresh, label: "Real-Time Ticket Cancellation & Refund" },
      ]}
    />
  );
}
