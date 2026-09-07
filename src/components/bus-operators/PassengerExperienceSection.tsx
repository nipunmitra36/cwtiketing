"use client";

import {
  HiOutlineCurrencyDollar,
  HiOutlineClipboardList,
  HiOutlineStar,
  HiOutlineCalendar,
  HiOutlineMap,
  HiOutlinePrinter,
  HiOutlineBell,
  HiOutlineAdjustments,
  HiOutlineLockClosed,
  HiOutlineDeviceMobile,
  HiOutlineTranslate,
  HiOutlineQrcode,
} from "react-icons/hi";
import ChannelSection from "./ChannelSection";

export default function PassengerExperienceSection() {
  return (
    <ChannelSection
      id="passenger-experience"
      tone="gray"
      reverse
      title="Smarter Travel Between Cities"
      paragraph="CWTicketing lets your passengers easily find, compare, and book tickets for long-distance travel. See real-time availability, choose from multiple operators, and receive instant booking confirmations."
      availableOn={["Web Portal", "Android App", "Android POS"]}
      illustrationIcon={HiOutlineQrcode}
      illustrationLabel="Traveler walking toward a city bus with mobile ticketing and QR code"
      featuresHeading="Smart & Seamless Travel Experience"
      features={[
        { icon: HiOutlineCurrencyDollar, label: "Distance-Based Pricing" },
        { icon: HiOutlineClipboardList, label: "Passenger Manifest" },
        { icon: HiOutlineStar, label: "Ratings & Reviews" },
        { icon: HiOutlineCalendar, label: "Route & Schedule Access" },
        { icon: HiOutlineMap, label: "Live Route Maps" },
        { icon: HiOutlinePrinter, label: "E-Ticket Printing & SMS Confirmation" },
        { icon: HiOutlineBell, label: "E-Tickets & Journey Alerts" },
        { icon: HiOutlineAdjustments, label: "Smart Filters" },
        { icon: HiOutlineLockClosed, label: "Secure Online Payments" },
        { icon: HiOutlineDeviceMobile, label: "Mobile-Friendly Booking" },
        { icon: HiOutlineTranslate, label: "Multilingual Support" },
      ]}
    />
  );
}
