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
  HiOutlineZoomIn,
  HiOutlineX,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imgCount = tab.images.length;
  const safeIndex = imgCount > 0 ? imgIndex % imgCount : 0;

  useEffect(() => {
    setImgIndex(0);
  }, [tab.num]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setImgIndex((i) => (i + 1) % imgCount);
      if (e.key === "ArrowLeft") setImgIndex((i) => (i - 1 + imgCount) % imgCount);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, imgCount]);

  const prev = () => setImgIndex((i) => (i - 1 + imgCount) % imgCount);
  const next = () => setImgIndex((i) => (i + 1) % imgCount);

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

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="View full size"
          className="group relative block w-full overflow-hidden bg-gray-50"
        >
          {imgCount > 0 && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={safeIndex}
              src={tab.images[safeIndex]}
              alt={tab.title}
              className="mx-auto aspect-[16/9] h-auto w-full bg-white object-contain px-2 py-2"
            />
          )}
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
            <span className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white/95 text-brand opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              <HiOutlineZoomIn className="h-6 w-6" />
            </span>
          </span>
        </button>
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

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={tab.title}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/90 p-4 pt-24 backdrop-blur-sm sm:pt-28"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <HiOutlineX className="h-6 w-6" />
          </button>

          {imgCount > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
                className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-6"
              >
                <HiOutlineChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next image"
                className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6"
              >
                <HiOutlineChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <figure
            className="flex w-full max-w-6xl flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 bg-gray-50 px-5 py-3">
              <span className="truncate text-[14px] font-semibold text-text-dark">
                {tab.title}
              </span>
              <span className="shrink-0 rounded-full bg-brand/10 px-3 py-1 text-[12px] font-semibold text-brand">
                {safeIndex + 1} / {imgCount}
              </span>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center bg-gray-900 p-3 sm:p-6">
              {imgCount > 0 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={safeIndex}
                  src={tab.images[safeIndex]}
                  alt={tab.title}
                  className="max-h-full w-auto max-w-full object-contain"
                />
              )}
            </div>
          </figure>
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
