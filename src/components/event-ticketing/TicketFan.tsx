"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  HiOutlineQrcode,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineCheckCircle,
  HiOutlineDeviceMobile,
} from "react-icons/hi";

interface Tier {
  name: string;
  price: string;
  seat: string;
  accent: string;
  ring: string;
}

const TIERS: Tier[] = [
  { name: "Early Bird", price: "৳ 850", seat: "GA · Standing", accent: "from-amber-400 to-amber-500", ring: "ring-amber-200" },
  { name: "General", price: "৳ 1,500", seat: "Gallery B · Row 12", accent: "from-sky-400 to-sky-500", ring: "ring-sky-200" },
  { name: "VIP Pass", price: "৳ 3,200", seat: "Front Row · A-07", accent: "from-brand to-brand-dark", ring: "ring-brand/25" },
];

export default function TicketFan() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll(".gsap-ticket-card");
      const tl = gsap.timeline({ delay: 0.45 });

      tl.fromTo(
        cards,
        { opacity: 0, y: 40, rotate: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.4)",
          clearProps: "transform",
        }
      );

      tl.fromTo(
        el.querySelector(".gsap-ticket-badge"),
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
        "-=0.2"
      );

      // Scanner beam sweeping across the front ticket
      const beam = el.querySelector(".gsap-scan-beam");
      if (beam) {
        gsap.fromTo(
          beam,
          { yPercent: -110, opacity: 0 },
          {
            yPercent: 110,
            opacity: 1,
            duration: 1.9,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 1.4,
            delay: 1.6,
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="gsap-hero-widget relative mx-auto w-full max-w-[430px] py-4 sm:py-8">
      {/* Stacked tier tickets behind */}
      <div className="relative">
        {TIERS.map((tier, i) => {
          const isFront = i === TIERS.length - 1;
          return (
            <div
              key={tier.name}
              className={`gsap-ticket-card ${
                isFront ? "relative z-30" : "absolute inset-x-0 z-10"
              }`}
              style={
                isFront
                  ? undefined
                  : {
                      top: `${(TIERS.length - 1 - i) * -18}px`,
                      transform: `scale(${1 - (TIERS.length - 1 - i) * 0.06})`,
                    }
              }
              aria-hidden={!isFront}
            >
              <div
                className={`flex overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ${tier.ring} ${
                  isFront ? "shadow-brand/20" : "shadow-gray-300/50"
                }`}
              >
                {/* Colour rail */}
                <div className={`w-2 shrink-0 bg-gradient-to-b ${tier.accent}`} />

                {/* Ticket body */}
                <div className="relative flex-1 p-4 sm:p-5">
                  {isFront && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <div className="gsap-scan-beam h-16 w-full bg-gradient-to-b from-transparent via-brand/20 to-transparent opacity-0" />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                        {tier.name}
                      </p>
                      <p className="mt-1 truncate text-[15px] font-semibold tracking-tight text-text-dark sm:text-[16px]">
                        Winter Live Fest 2026
                      </p>
                    </div>
                    <span className="shrink-0 rounded-lg bg-brand-light px-2.5 py-1 text-[12px] font-bold text-brand">
                      {tier.price}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <HiOutlineCalendar className="h-3.5 w-3.5 text-brand/70" />
                      12 Feb · 7:00 PM
                    </span>
                    <span className="flex items-center gap-1.5">
                      <HiOutlineLocationMarker className="h-3.5 w-3.5 text-brand/70" />
                      Army Stadium
                    </span>
                  </div>

                  {/* Perforation */}
                  <div className="relative my-3.5">
                    <div className="border-t border-dashed border-gray-200" />
                    <span className="absolute -left-6 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#FDF7F2]" />
                    <span className="absolute -right-6 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#FDF7F2]" />
                  </div>

                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[9.5px] font-semibold uppercase tracking-wide text-text-muted">
                        Seat
                      </p>
                      <p className="truncate text-[12.5px] font-semibold text-text-dark">
                        {tier.seat}
                      </p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-text-dark text-white">
                      <HiOutlineQrcode className="h-6 w-6" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Validation badge */}
      <div className="gsap-ticket-badge absolute -bottom-5 -left-2 z-40 flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/95 px-3.5 py-2.5 shadow-lg shadow-brand/10 backdrop-blur-xl sm:-left-6">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <HiOutlineCheckCircle className="h-4.5 w-4.5" />
        </span>
        <span>
          <span className="block text-[11px] font-bold uppercase tracking-wide text-text-dark">
            Ticket Valid
          </span>
          <span className="block text-[10px] text-text-muted">Scanned at Gate 3</span>
        </span>
      </div>

      {/* SMS verification chip */}
      <div className="gsap-ticket-badge absolute -right-1 top-2 z-40 hidden items-center gap-2 rounded-2xl border border-white/70 bg-white/95 px-3 py-2 shadow-lg shadow-brand/10 backdrop-blur-xl sm:flex lg:-right-5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
          <HiOutlineDeviceMobile className="h-4 w-4" />
        </span>
        <span className="text-[10.5px] font-semibold leading-tight text-text-dark">
          OTP verified
          <span className="block font-normal text-text-muted">via SMS</span>
        </span>
      </div>
    </div>
  );
}
