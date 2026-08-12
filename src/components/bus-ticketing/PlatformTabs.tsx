"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
  HiOutlineCalendar,
  HiOutlineIdentification,
  HiOutlineTicket,
  HiOutlineClipboardCheck,
  HiOutlineUsers,
  HiOutlineTag,
  HiOutlineCurrencyDollar,
  HiOutlineBadgeCheck,
  HiOutlineChartBar,
  HiOutlinePresentationChartLine,
  HiOutlineCheck,
  HiOutlineArrowRight,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Tab {
  num: string;
  icon: IconType;
  label: string;
  blurb: string;
  features: string[];
}

const tabs: Tab[] = [
  {
    num: "01",
    icon: HiOutlineTicket,
    label: "Booking Experience",
    blurb: "Make ticket purchase simple on every device.",
    features: [
      "Route search",
      "Departure selection",
      "Seat map",
      "Passenger information",
      "Checkout & digital ticket",
    ],
  },
  {
    num: "02",
    icon: HiOutlineClipboardCheck,
    label: "Operations",
    blurb: "Run every departure from a live, shared board.",
    features: [
      "Departure board",
      "Live seat status",
      "Passenger manifest",
      "Boarding QR scans",
      "Driver handover",
    ],
  },
  {
    num: "03",
    icon: HiOutlineCurrencyDollar,
    label: "Revenue Management",
    blurb: "Control fares, discounts and agent sales centrally.",
    features: [
      "Fare rules & seat categories",
      "Promotions & coupons",
      "Agent commissions",
      "Refunds & cancellations",
      "Daily settlement",
    ],
  },
  {
    num: "04",
    icon: HiOutlinePresentationChartLine,
    label: "Reporting",
    blurb: "Understand sales across every channel.",
    features: [
      "Daily & route sales",
      "Booking source split",
      "Payment reconciliation",
      "Passenger trends",
      "Export & share",
    ],
  },
];

// ── Mock visuals per tab ───────────────────────────────────────────────────────

function PanelFrame({ title, badge, children }: { title: string; badge: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-900/10">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </span>
          <p className="text-[12px] font-semibold text-text-dark">{title}</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}

function BookingVisual() {
  const steps = ["Select seat", "Passenger", "Checkout", "Digital ticket"];
  return (
    <div className="p-6 sm:p-7">
      {/* Journey header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] font-semibold text-text-dark">
          Dhaka <HiOutlineArrowRight className="inline h-4 w-4 text-brand" /> Sylhet
        </p>
        <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-text-muted">
          <HiOutlineCalendar className="h-3.5 w-3.5 text-brand" />
          Today, 8:30 PM
        </span>
      </div>

      {/* Steps */}
      <div className="mt-5 flex items-center">
        {steps.map((s, i) => (
          <div key={s} className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}>
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                  i === 0 ? "bg-brand text-white shadow-md shadow-brand/30" : "bg-gray-100 text-text-muted"
                }`}
              >
                {i === 0 ? <HiOutlineCheck className="h-3 w-3" /> : i + 1}
              </span>
              <span className={`text-[11px] font-medium ${i === 0 ? "text-brand" : "text-text-muted"}`}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && <span className="mx-2 h-px flex-1 bg-gray-200" />}
          </div>
        ))}
      </div>

      {/* Seat map */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex flex-1 flex-col gap-1.5">
          {[
            ["free", "free", "taken", "free"],
            ["free", "picked", "taken", "free"],
            ["taken", "free", "free", "free"],
            ["free", "free", "free", "taken"],
          ].map((row, r) => (
            <div key={r} className="flex gap-1.5">
              <span className="w-4" />
              {row.map((state, c) => (
                <span
                  key={c}
                  className={`flex h-8 flex-1 items-center justify-center rounded-lg border text-[10px] font-semibold ${
                    state === "picked"
                      ? "border-brand bg-brand text-white shadow-sm shadow-brand/40"
                      : state === "taken"
                      ? "border-gray-200 bg-gray-100 text-gray-300"
                      : "border-gray-200 bg-white text-gray-500"
                  }`}
                >
                  {state === "picked" ? "5A" : ""}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          {["A", "B", "C", "D"].map((l) => (
            <span key={l} className="flex h-8 items-center text-[10px] font-semibold text-text-muted">
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Checkout footer */}
      <div className="mt-6 flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <HiOutlineIdentification className="h-4 w-4 text-brand" />
          <p className="text-[11.5px] text-text-muted">
            Passenger <span className="font-semibold text-text-dark">·</span> Checkout{" "}
            <span className="font-semibold text-text-dark">·</span> Digital ticket
          </p>
        </div>
        <span className="text-[13px] font-bold text-text-dark">৳1,250</span>
      </div>
    </div>
  );
}

function OperationsVisual() {
  const rows = [
    { time: "8:30 PM", route: "Dhaka → Sylhet", status: "Boarding", tone: "bg-emerald-50 text-emerald-600", pax: "41 / 44" },
    { time: "9:00 PM", route: "Dhaka → Chittagong", status: "Boarding", tone: "bg-emerald-50 text-emerald-600", pax: "38 / 44" },
    { time: "10:30 PM", route: "Dhaka → Cox's Bazar", status: "Departed", tone: "bg-sky-50 text-sky-600", pax: "44 / 44" },
    { time: "11:15 PM", route: "Dhaka → Sylhet", status: "Seat fill", tone: "bg-amber-50 text-amber-600", pax: "27 / 44" },
    { time: "12:00 AM", route: "Dhaka → Rajshahi", status: "Scheduled", tone: "bg-gray-100 text-gray-500", pax: "— / 44" },
  ];
  return (
    <div className="p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-semibold text-text-dark">Tonight&apos;s departures</p>
        <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-text-muted">
          <HiOutlineUsers className="h-3.5 w-3.5 text-brand" />
          4 active trips
        </span>
      </div>

      <div className="mt-5 space-y-2.5">
        {rows.map((row) => (
          <div
            key={row.time}
            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 transition-colors hover:border-brand/25"
          >
            <div className="flex items-center gap-3">
              <span className="w-14 text-[12px] font-semibold text-text-dark">{row.time}</span>
              <span className="h-8 w-1 rounded-full bg-gradient-to-b from-brand to-brand/30" />
              <div>
                <p className="text-[13px] font-semibold text-text-dark">{row.route}</p>
                <p className="text-[11px] text-text-muted">
                  {row.pax} seats · manifest ready
                </p>
              </div>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${row.tone}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueVisual() {
  const promos = [
    { code: "FESTIVE10", desc: "10% off online bookings", usage: "1,284 uses" },
    { code: "SLEEPER15", desc: "৳150 off AC sleeper seats", usage: "942 uses" },
    { code: "AGENT5", desc: "5% agent commission boost", usage: "Active" },
  ];
  return (
    <div className="p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-semibold text-text-dark">Fares & promotions</p>
        <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-text-muted">
          <HiOutlineTag className="h-3.5 w-3.5 text-brand" />
          3 active
        </span>
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
        {promos.map((p) => (
          <div key={p.code} className="rounded-2xl border border-dashed border-brand/30 bg-brand-light/50 p-4">
            <span className="inline-block rounded-lg bg-brand px-2 py-0.5 text-[11px] font-bold text-white">
              {p.code}
            </span>
            <p className="mt-2.5 text-[12px] leading-snug text-text-body">{p.desc}</p>
            <p className="mt-2 text-[10.5px] font-semibold text-brand">{p.usage}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
            <HiOutlineCurrencyDollar className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12px] font-semibold text-text-dark">Fare rules</p>
            <p className="text-[10.5px] text-text-muted">By seat category & route</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
            <HiOutlineBadgeCheck className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12px] font-semibold text-text-dark">Settlement</p>
            <p className="text-[10.5px] text-text-muted">Daily agent & counter totals</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportingVisual() {
  const heights = [34, 48, 40, 62, 56, 74, 68, 88];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Avg"];
  return (
    <div className="p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] font-semibold text-text-dark">Sales this week</p>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600">
          <HiOutlineChartBar className="h-3.5 w-3.5" />
          +18% vs last week
        </span>
      </div>

      <div className="mt-6 flex items-end gap-3">
        {heights.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-[9px] font-semibold text-text-muted">{i === 7 ? `৳${h}` : ""}</span>
            <div
              className={`w-full rounded-t-lg ${
                i === 7 ? "bg-gradient-to-t from-brand to-brand-dark" : "bg-gradient-to-t from-brand/25 to-brand"
              }`}
              style={{ height: `${h * 1.6}px` }}
            />
            <span className="text-[9.5px] font-medium text-text-muted">{days[i]}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { label: "Online", value: "62%" },
          { label: "Counter", value: "21%" },
          { label: "Agents", value: "13%" },
          { label: "Onboard", value: "4%" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-gray-50 px-3.5 py-3 text-center">
            <p className="text-[16px] font-bold text-text-dark">{s.value}</p>
            <p className="text-[10.5px] text-text-muted">{s.label} bookings</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────

export default function PlatformTabs() {
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
            stagger: 0.1,
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
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
    );
  }, [active]);

  const tab = tabs[active];

  return (
    <section
      ref={sectionRef}
      id="see-the-platform"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            See the Platform
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            Powerful Tools Without Operational Complexity
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          {/* Tab rail */}
          <div
            data-gsap
            className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0"
          >
            {tabs.map((t, i) => {
              const Icon = t.icon;
              const isActive = i === active;
              return (
                <button
                  key={t.num}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`group relative flex min-w-[220px] flex-col gap-1.5 rounded-2xl border p-4 text-left transition-all duration-300 lg:min-w-0 lg:p-5 ${
                    isActive
                      ? "border-brand/30 bg-brand-light/60 shadow-lg shadow-brand/10"
                      : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 hidden h-10 w-1 -translate-y-1/2 rounded-full bg-brand lg:block" />
                  )}
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isActive ? "bg-brand text-white shadow-md shadow-brand/30" : "bg-gray-100 text-text-muted"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[10px] font-semibold uppercase tracking-widest text-brand">
                        {t.num}
                      </span>
                      <span className={`block text-[13.5px] font-medium ${isActive ? "text-brand" : "text-text-dark"}`}>
                        {t.label}
                      </span>
                    </span>
                  </span>
                  <p className="mt-0.5 hidden text-[12px] leading-snug text-text-muted lg:block lg:pl-[52px]">
                    {t.blurb}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div data-gsap ref={panelRef} className="min-w-0">
            <PanelFrame title={tab.label} badge="Live demo">
              {active === 0 && <BookingVisual />}
              {active === 1 && <OperationsVisual />}
              {active === 2 && <RevenueVisual />}
              {active === 3 && <ReportingVisual />}
            </PanelFrame>

            {/* Feature checklist under the panel */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {tab.features.map((f) => (
                <div key={f} className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/60 px-3.5 py-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand text-white">
                    <HiOutlineCheck className="h-3 w-3" />
                  </span>
                  <span className="text-[12.5px] font-medium text-text-body">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
