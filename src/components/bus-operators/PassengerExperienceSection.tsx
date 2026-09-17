"use client";

import ChannelSection from "./ChannelSection";

const MEDIA = "/media/bus-operators";
const FEATURE_MEDIA = "/media/Smart & Seamless Travel Experience";

export default function PassengerExperienceSection() {
  return (
    <ChannelSection
      id="passenger-experience"
      tone="gray"
      reverse
      title="Smarter Travel Between Cities"
      paragraph="CWTicketing lets your passengers easily find, compare, and book tickets for long-distance travel. See real-time availability, choose from multiple operators, and receive instant booking confirmations."
      availableOn={["Web Portal", "Android App", "Android POS"]}
      illustrationImage={`${MEDIA}/smarter-travel-between-cities.png`}
      illustrationLabel="Traveler walking toward a city bus with mobile ticketing and QR code"
      featuresHeading="Smart & Seamless Travel Experience"
      features={[
        { image: `${FEATURE_MEDIA}/Distance-Based.svg`, label: "Distance-Based Pricing" },
        { image: `${FEATURE_MEDIA}/Ratings & Reviews-01.svg`, label: "Ratings & Reviews" },
        { image: `${FEATURE_MEDIA}/Live Route Maps.svg`, label: "Live Route Maps" },
        { image: `${FEATURE_MEDIA}/E-Tickets & Journey-01.svg`, label: "E-Ticket Printing & SMS Confirmation" },
        { image: `${FEATURE_MEDIA}/Smart Filters -01.svg`, label: "Smart Filters" },
        { image: `${FEATURE_MEDIA}/Secure Online-01.svg`, label: "Secure Online Payments" },
        { image: `${FEATURE_MEDIA}/Mobile-Friendly -01.svg`, label: "Mobile-Friendly Booking" },
        { image: `${FEATURE_MEDIA}/Multilingual support-01.svg`, label: "Multilingual Support" },
      ]}
    />
  );
}
