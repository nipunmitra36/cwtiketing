"use client";

import ChannelSection from "./ChannelSection";

const MEDIA = "/media/bus-operators";
const FEATURE_MEDIA = "/media/smart-and-seamless-travel-experience";

export default function PassengerExperienceSection() {
  return (
    <ChannelSection
      id="passenger-experience"
      tone="gray"
      reverse
      title="Smarter Travel Between Cities"
      paragraph="CWTicketing lets your passengers easily find, compare, and book tickets for long-distance travel. See real-time availability, choose from multiple operators, and receive instant booking confirmations."
      illustrationImage={`${MEDIA}/smarter-travel-between-cities.png`}
      illustrationLabel="Traveler walking toward a city bus with mobile ticketing and QR code"
      featuresHeading="Smart & Seamless Travel Experience"
      features={[
        { image: `${FEATURE_MEDIA}/distance-based.svg`, label: "Distance-Based Pricing" },
        { image: `${FEATURE_MEDIA}/ratings-and-reviews-01.svg`, label: "Ratings & Reviews" },
        { image: `${FEATURE_MEDIA}/live-route-maps.svg`, label: "Live Route Maps" },
        { image: `${FEATURE_MEDIA}/e-tickets-and-journey-01.svg`, label: "E-Ticket Printing & SMS Confirmation" },
        { image: `${FEATURE_MEDIA}/smart-filters-01.svg`, label: "Smart Filters" },
        { image: `${FEATURE_MEDIA}/secure-online-01.svg`, label: "Secure Online Payments" },
        { image: `${FEATURE_MEDIA}/mobile-friendly-01.svg`, label: "Mobile-Friendly Booking" },
        { image: `${FEATURE_MEDIA}/multilingual-support-01.svg`, label: "Multilingual Support" },
      ]}
    />
  );
}
