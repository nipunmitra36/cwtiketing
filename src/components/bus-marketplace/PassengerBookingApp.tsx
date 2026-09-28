"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";

const MEDIA = "/media/cwticketing travel agency/icons";

const passengerFeatures: { image: string; label: string }[] = [
  { image: `${MEDIA}/smart-search.svg`, label: "Smart Search" },
  { image: `${MEDIA}/interactive-seat-maps.svg`, label: "Interactive Seat Maps" },
  { image: `${MEDIA}/real-tIme-availability.svg`, label: "Real-Time Availability" },
  { image: `${MEDIA}/multicurrency.svg`, label: "Multicurrency" },
  { image: `${MEDIA}/price-and-route-comparison.svg`, label: "Price and Route Comparison" },
  { image: `${MEDIA}/e-tickets-&-notifications.svg`, label: "E-Tickets & Notifications" },
  { image: `${MEDIA}/rating-&-reviews.svg`, label: "Rating & Reviews" },
  { image: `${MEDIA}/multilingual-01.svg`, label: "Multilingual" },
  { image: `${MEDIA}/ticket-purchase.svg`, label: "Ticket Purchase" },
  { image: `${MEDIA}/available-payment-gateway.svg`, label: "Available Payment Gateways" },
  { image: `${MEDIA}/user-profile.svg`, label: "User Profile" },
  { image: `${MEDIA}/Fleet Tracking.svg`, label: "Fleet Tracking" },
];

export default function PassengerBookingApp() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.05 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 -top-20 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-1/3 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header with section image (image left) ── */}
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-gsap className="order-1 overflow-hidden rounded-3xl ring-1 ring-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/cwticketing travel agency/fast-flexible-and-friendly-bus-booking.jpg"
              alt="Fast, flexible, and friendly bus booking"
              className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[400px]"
            />
          </div>
          <div data-gsap className="order-2">
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Fast, Flexible, and{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Friendly Bus Booking
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
            <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              With our easy-to-use platform, passengers can quickly find routes,
              check live seat availability, compare fares, and book tickets.
              Select a seat from an interactive map, choose a preferred payment
              method, and receive an e-ticket instantly — in their own language
              and currency, for a smooth, stress-free journey.
            </p>
          </div>
        </div>

        {/* ── Copy ── */}
        <div data-gsap className="mx-auto max-w-2xl text-center">
          <p className="text-[11.5px] font-semibold uppercase tracking-widest text-text-muted">
            Available on
          </p>
          <div className="mt-2.5 flex flex-wrap justify-center gap-2">
            {["Web Portal", "Android App", "Android POS"].map((a) => (
              <span
                key={a}
                className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-text-body shadow-sm transition-colors hover:border-brand/30 hover:text-brand"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* ── Feature tiles ── */}
        <div className="mt-16">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <h3 className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
              Digital-First Travel Experience
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {passengerFeatures.map((f) => (
              <div
                key={f.label}
                data-gsap
                className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/15"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-center scale-x-0 bg-gradient-to-r from-brand via-amber-400 to-brand-dark transition-transform duration-300 group-hover:scale-x-100" />
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-light via-white to-white p-2.5 shadow-inner ring-1 ring-brand/10 transition-transform duration-300 group-hover:scale-110">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.image} alt={f.label} loading="lazy" className="h-full w-full object-contain" />
                </span>
                <span className="text-[13.5px] font-semibold leading-snug tracking-tight text-text-dark">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
