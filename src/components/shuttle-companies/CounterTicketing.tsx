"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";

const MEDIA = "/media/suttle/built-for-bus-stop-agents";

const agentFeatures: { image: string; label: string }[] = [
  { image: `${MEDIA}/walk-in-ticket-issuance.svg`, label: "Walk-in Ticket Issuance" },
  { image: `${MEDIA}/real-time-seat-availability.svg`, label: "Real-Time Seat Availability" },
  { image: `${MEDIA}/qr-code-and-contactless-payments.svg`, label: "QR Code & Contactless Payments" },
  { image: `${MEDIA}/android-pos-integration.svg`, label: "Android POS Integration" },
  { image: `${MEDIA}/e-ticket-printing-and-sms-receipts.svg`, label: "E-Ticket Printing & SMS Receipts" },
  { image: `${MEDIA}/route-and-schedule-access.svg`, label: "Route & Schedule Access" },
  { image: `${MEDIA}/shift-and-sales-tracking.svg`, label: "Shift & Sales Tracking" },
  { image: `${MEDIA}/multi-agent-login-with-role-control.svg`, label: "Multi-Agent Login with Role Control" },
  { image: `${MEDIA}/fare-collection-reports.svg`, label: "Fare Collection Reports" },
];

export default function CounterTicketing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.06 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header with section image (image right) ── */}
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-gsap className="order-2 lg:order-1">
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Fast, Reliable Ticketing{" "}
              <span className="text-gradient-brand">
                at the Counter
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
            <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              Issue tickets. Assign seats. Take payments. All from one simple
              Android POS or web browser, no hassle, no delays.
            </p>
          </div>
          <div data-gsap className="order-1 overflow-hidden rounded-3xl ring-1 ring-gray-100 lg:order-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/suttle/Fast,-Reliable-Ticketing-at-the-Counter.jpg"
              alt="Fast, reliable ticketing at the counter"
              className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[400px]"
            />
          </div>
        </div>

        {/* ── Feature grid ── */}
        <div className="mt-16">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <h3 className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
              Built for Bus Stop Agents
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agentFeatures.map((f) => (
              <div
                key={f.label}
                data-gsap
                className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-b from-white to-brand-light/30 p-6 text-center shadow-sm shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/15"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-center scale-x-0 bg-gradient-to-r from-brand via-amber-400 to-brand-dark transition-transform duration-300 group-hover:scale-x-100" />
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-light via-white to-white p-2.5 shadow-inner ring-1 ring-brand/10 transition-transform duration-300 group-hover:scale-110">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.image}
                    alt={f.label}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
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