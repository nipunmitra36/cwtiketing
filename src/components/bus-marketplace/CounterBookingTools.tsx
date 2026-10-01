"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";

const MEDIA = "/media/cwticketing-travel-agency/icons";

const counterFeatures: { image: string; label: string }[] = [
  { image: `${MEDIA}/Walk-in Ticket.svg`, label: "Walk-in Ticket Issuance" },
  { image: `${MEDIA}/passenger-manifest.svg`, label: "Passenger Manifest" },
  { image: `${MEDIA}/route-and-schedule-access.svg`, label: "Route & Schedule Access" },
  { image: `${MEDIA}/e-ticket-printing-and-sms-confirmation.svg`, label: "E-Ticket Printing & SMS Confirmation" },
  { image: `${MEDIA}/booking-by-cash-card-or-qr-code.svg`, label: "Booking by Cash, Card, or QR Code" },
  { image: `${MEDIA}/pos-compatible-interface.svg`, label: "POS-Compatible Interface" },
  { image: `${MEDIA}/fleet-staff-assignment.svg`, label: "Fleet/Staff Assignment" },
  { image: `${MEDIA}/ticket-management.svg`, label: "Ticket Management (Cancellation + Rescheduling)" },
  { image: `${MEDIA}/counter-expense-management.svg`, label: "Counter Expense Management" },
];

export default function CounterBookingTools() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.05 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header with section image (image right) ── */}
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-gsap className="order-2 lg:order-1">
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Sell Smarter and{" "}
              <span className="text-gradient-brand">
                Serve Faster
              </span>{" "}
              with Less Effort
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
            <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              Help passengers quickly, manage bookings with ease, and keep lines
              moving. CWTicketing lets your team book seats, check availability,
              assign tickets, and print or issue e-tickets in real time. Designed
              for busy terminals, it keeps your operations smooth, even during
              rush hours.
            </p>
          </div>
          <div data-gsap className="order-1 overflow-hidden rounded-3xl ring-1 ring-gray-100 lg:order-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/cwticketing-travel-agency/sell-smarter-and-serve-faster-with-less-effort.jpg"
              alt="Sell smarter and serve faster with less effort"
              className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[400px]"
            />
          </div>
        </div>

        {/* ── Feature grid ── */}
        <div className="mt-16">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <h3 className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
              On-the-Spot Booking &amp; Ticketing Tools
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {counterFeatures.map((f) => (
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
