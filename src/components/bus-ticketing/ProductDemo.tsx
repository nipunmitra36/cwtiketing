"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
  HiOutlineGlobeAlt,
  HiOutlineDeviceMobile,
  HiOutlineDesktopComputer,
  HiOutlineBriefcase,
  HiOutlineTemplate,
  HiOutlineTruck,
  HiOutlineCube,
  HiOutlineQrcode,
  HiOutlineCheck,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Tab {
  num: string;
  icon: IconType;
  label: string;
  title: string;
  desc: string;
  bullets: string[];
  images: string[];
}

const tabs: Tab[] = [
  {
    num: "01",
    icon: HiOutlineGlobeAlt,
    label: "Website",
    title: "White-Label Responsive Website",
    desc: "A super user-friendly website that lets passengers book or cancel tickets anytime, on any device.",
    bullets: [
      "Buy / purchase ticket",
      "Reprint & download ticket",
      "Ticket cancel request & rescheduling",
      "User profile & purchase history",
      "Live bus tracking",
      "Customer support",
    ],
    images: [
      "/media/bus-ticketing/White Label Responsive Website 1.webp",
      "/media/bus-ticketing/White Label Responsive Website 2.webp",
      "/media/bus-ticketing/White Label Responsive Website 3.webp",
      "/media/bus-ticketing/White Label Responsive Website 4.webp",
      "/media/bus-ticketing/White Label Responsive Website 5.webp",
      "/media/bus-ticketing/White Label Responsive Website 6.webp",
      "/media/bus-ticketing/White Label Responsive Website 7.webp",
      "/media/bus-ticketing/White Label Responsive Website 8.webp",
    ],
  },
  {
    num: "02",
    icon: HiOutlineDeviceMobile,
    label: "Passenger App",
    title: "Passenger App",
    desc: "The full booking journey, purpose-built for a phone.",
    bullets: ["Search routes & select seats", "Purchase and reprint tickets", "Reschedule journeys", "Track vehicles live"],
    images: [
      "/media/bus-ticketing/White Label Passenger App (Android & iOS) 1.webp",
      "/media/bus-ticketing/White Label Passenger App (Android & iOS) 2.webp",
      "/media/bus-ticketing/White Label Passenger App (Android & iOS) 3.webp",
    ],
  },
  {
    num: "03",
    icon: HiOutlineDesktopComputer,
    label: "Counter Panel",
    title: "Counter Panel",
    desc: "Everything front-desk staff need to sell and manage seats.",
    bullets: ["Sell, reserve, cancel tickets", "View passenger manifests", "Assign fleet and staff", "Review sales in real time"],
    images: [
      "/media/bus-ticketing/Web-Based Counter _ Staff _ Booth Panel.webp",
      "/media/bus-ticketing/Web-Based Counter _ Staff _ Booth Panel 2.webp",
      "/media/bus-ticketing/Web-Based Counter _ Staff _ Booth Panel 3.webp",
      "/media/bus-ticketing/Web-Based Counter _ Staff _ Booth Panel 4.webp",
    ],
  },
  {
    num: "04",
    icon: HiOutlineBriefcase,
    label: "Agent POS",
    title: "Agent POS",
    desc: "Field sales, on or offline, from a pocket-sized device.",
    bullets: ["Booking & ticket issuance", "Bluetooth / POS printing", "Offline ticket sales", "QR ticket validation"],
    images: [
      "/media/bus-ticketing/Android-Based POS (Agent App) 1.webp",
      "/media/bus-ticketing/Android-Based POS (Agent App) 2.webp",
    ],
  },
  {
    num: "05",
    icon: HiOutlineTemplate,
    label: "Admin Panel",
    title: "Admin Panel",
    desc: "Routes, pricing, staff and reports — all from one dashboard.",
    bullets: ["Routes, schedules, seat plans", "Pricing, promotions, coupons", "Agent & staff access", "Accounts and sales reports"],
    images: [
      "/media/bus-ticketing/Flexible Admin Panel 1.webp",
      "/media/bus-ticketing/Flexible Admin Panel 2.webp",
      "/media/bus-ticketing/Flexible Admin Panel 3.webp",
    ],
  },
  {
    num: "06",
    icon: HiOutlineTruck,
    label: "Driver App",
    title: "Driver App",
    desc: "Boarding, manifests and onboard sales for the crew.",
    bullets: ["Departure details & passenger lists", "Scan boarding QR codes", "Mark boarded / no-show", "Sell onboard tickets"],
    images: [
      "/media/bus-ticketing/Driver App 1.webp",
      "/media/bus-ticketing/Driver App 2.webp",
      "/media/bus-ticketing/Driver App 3.webp",
      "/media/bus-ticketing/Driver App 4.webp",
      "/media/bus-ticketing/Driver App 5.webp",
    ],
  },
  {
    num: "07",
    icon: HiOutlineCube,
    label: "Parcel Manager",
    title: "Parcel Manager",
    desc: "Run parcel bookings alongside passenger ticketing.",
    bullets: ["Parcel entry & assignment", "Collection and delivery", "Live tracking", "Parcel reports"],
    images: ["/media/bus-ticketing/Parcel Manager.webp"],
  },
  {
    num: "08",
    icon: HiOutlineQrcode,
    label: "Ticket Validation",
    title: "Ticket Validation",
    desc: "Fast, fraud-proof boarding for every departure.",
    bullets: ["Scan QR at boarding", "Instant valid / invalid check", "Prevent duplicate use", "Works online & offline"],
    images: ["/media/bus-ticketing/Ticket Validation Checker.webp"],
  },
];

function ProductShowcase({ tab }: { tab: Tab }) {
  const [imgIndex, setImgIndex] = useState(0);
  const imgCount = tab.images.length;
  const safeIndex = imgCount > 0 ? imgIndex % imgCount : 0;

  useEffect(() => {
    setImgIndex(0);
  }, [tab.num]);

  return (
    <div className="relative">
      {/* glow behind */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand/15 via-transparent to-brand-light blur-2xl" />

      {/* main browser frame */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-900/10">
        <div className="flex items-center gap-2.5 border-b border-gray-100 bg-gray-50/80 px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </span>
          <span className="ml-2 flex flex-1 items-center rounded-lg bg-white px-3 py-1.5 text-[11px] font-medium text-text-muted ring-1 ring-gray-200">
            {tab.label} — {tab.title}
          </span>
        </div>
        <div key={safeIndex} className="relative flex w-full items-center justify-center bg-white py-4">
          {tab.images.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={tab.images[safeIndex]}
              alt={tab.title}
              className="mx-auto h-auto w-full rounded-lg object-contain"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/5 to-transparent" />
        </div>
      </div>

      {/* floating counter badge */}
      <div className="absolute -left-4 -top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
        <span className="text-[13px] font-bold">{tab.num}</span>
      </div>

      {/* thumbnails */}
      {imgCount > 1 && (
        <div className="mt-4 flex gap-3">
          {tab.images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setImgIndex(i)}
              aria-label={`View screenshot ${i + 1}`}
              className={`group relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                i === safeIndex
                  ? "border-brand shadow-md shadow-brand/25"
                  : "border-gray-200 opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const cancel = onSmootherReady(() => {
      ctx = gsap.context(() => {
        const el = sectionRef.current;
        if (!el) return;
        gsap.fromTo(
          el.querySelectorAll("[data-gsap]"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", once: true },
          }
        );
      }, sectionRef);
    });
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(panelRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
  }, [active]);

  const tab = tabs[active];

  return (
    <section
      ref={sectionRef}
      id="see-the-platform"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Product Demo
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            One Platform, Every Surface Your Business Runs On
          </h2>
          <p data-gsap className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]">
            From the passenger&apos;s phone to the driver&apos;s seat to your back
            office — every surface reads from the same live data.
          </p>
        </div>

        {/* Tab rail */}
        <div data-gsap className="flex flex-wrap justify-center gap-2">
          {tabs.map((t, i) => {
            const Icon = t.icon;
            const isActive = i === active;
            return (
              <button
                key={t.num}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-brand bg-brand text-white shadow-md shadow-brand/30"
                    : "border-gray-200 bg-white text-text-muted hover:border-brand/30 hover:text-brand"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div ref={panelRef} className="mt-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-brand">{tab.num}</p>
            <h3 className="mt-2 text-[20px] font-medium tracking-tight text-text-dark sm:text-[24px]">
              {tab.title}
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-text-muted">{tab.desc}</p>
            <ul className="mt-6 grid gap-x-8 gap-y-2.5 text-left sm:grid-cols-2">
              {tab.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand text-white">
                    <HiOutlineCheck className="h-3 w-3" />
                  </span>
                  <span className="text-[13.5px] leading-snug text-text-body">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto mt-10 w-full max-w-4xl">
            <ProductShowcase tab={tab} />
          </div>
        </div>
      </div>
    </section>
  );
}
