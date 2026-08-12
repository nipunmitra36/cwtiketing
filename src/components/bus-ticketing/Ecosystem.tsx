"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, ScrollSmoother } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
  HiOutlineDeviceMobile,
  HiOutlineDesktopComputer,
  HiOutlineBriefcase,
  HiOutlineTruck,
  HiOutlineChartBar,
  HiOutlineCube,
  HiOutlineCheck,
  HiOutlineSearch,
  HiOutlineQrcode,
  HiOutlinePrinter,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Role {
  num: string;
  icon: IconType;
  role: string;
  title: string;
  features: string[];
}

const roles: Role[] = [
  {
    num: "01",
    icon: HiOutlineDeviceMobile,
    role: "Passenger",
    title: "Website & App",
    features: [
      "Search routes & select seats",
      "Purchase and reprint tickets",
      "Reschedule journeys",
      "Track vehicles live",
    ],
  },
  {
    num: "02",
    icon: HiOutlineDesktopComputer,
    role: "Front desk",
    title: "Counter & Booth Panel",
    features: [
      "Sell, reserve, cancel tickets",
      "View passenger manifests",
      "Assign fleet and staff",
      "Review sales in real time",
    ],
  },
  {
    num: "03",
    icon: HiOutlineBriefcase,
    role: "Field sales",
    title: "Agent POS App",
    features: [
      "Booking & ticket issuance",
      "Bluetooth / POS printing",
      "Offline ticket sales",
      "QR ticket validation",
    ],
  },
  {
    num: "04",
    icon: HiOutlineTruck,
    role: "Onboard",
    title: "Driver App",
    features: [
      "Departure details & passenger lists",
      "Scan boarding QR codes",
      "Mark boarded / no-show",
      "Sell onboard tickets",
    ],
  },
  {
    num: "05",
    icon: HiOutlineChartBar,
    role: "Management",
    title: "Admin & Reporting",
    features: [
      "Routes, schedules, seat plans",
      "Pricing, promotions, coupons",
      "Agent & staff access",
      "Accounts and sales reports",
    ],
  },
  {
    num: "06",
    icon: HiOutlineCube,
    role: "Cargo",
    title: "Parcel Manager",
    features: [
      "Parcel entry & assignment",
      "Collection and delivery",
      "Live tracking",
      "Parcel reports",
    ],
  },
];

// ── Mock UI panels per role ───────────────────────────────────────────────────

function MockWindow({
  title,
  badge,
  children,
}: {
  title: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-black/20">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-300" />
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
          </span>
          <p className="text-[11px] font-semibold text-text-dark">{title}</p>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-600">
          <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}

function PassengerMock() {
  return (
    <MockWindow title="Website & App" badge="Live">
      <div className="p-4">
        <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
          <HiOutlineSearch className="h-3.5 w-3.5 shrink-0 text-brand" />
          <p className="truncate text-[11px] text-text-muted">
            Dhaka → Sylhet · Today, 8:30 PM
          </p>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {["1A", "1B", "1C", "1D", "1E"].map((s, i) => (
            <span
              key={s}
              className={`flex h-9 items-center justify-center rounded-lg text-[9px] font-semibold ${
                i === 2 ? "bg-brand text-white" : "bg-gray-100 text-text-muted"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-brand-light/60 px-3 py-2.5">
          <div>
            <p className="text-[9px] text-text-muted">Total</p>
            <p className="text-[14px] font-bold leading-none text-text-dark">৳1,250</p>
          </div>
          <span className="rounded-full bg-brand px-3 py-1.5 text-[10.5px] font-semibold text-white">
            Book ticket
          </span>
        </div>
      </div>
    </MockWindow>
  );
}

function FrontDeskMock() {
  return (
    <MockWindow title="Counter & Booth Panel" badge="POS">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold text-text-dark">Departure · 8:30 PM</p>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-600">
            Boarding
          </span>
        </div>
        <div className="mt-3 grid grid-cols-8 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className={`h-6 rounded-md ${
                [2, 7, 11].includes(i)
                  ? "bg-brand/80"
                  : i % 3 === 0
                    ? "bg-gray-200"
                    : "bg-emerald-100"
              }`}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
          <p className="text-[10.5px] text-text-muted">Passenger manifest</p>
          <p className="text-[10.5px] font-semibold text-text-dark">41 / 44</p>
        </div>
      </div>
    </MockWindow>
  );
}

function AgentPosMock() {
  return (
    <div>
      <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
        <div className="flex items-center justify-between bg-brand px-3 py-2">
          <p className="text-[10px] font-semibold text-white">Agent POS</p>
          <HiOutlinePrinter className="h-3.5 w-3.5 text-white/80" />
        </div>
        <div className="px-3 py-3">
          <p className="text-[11px] font-bold text-text-dark">TKT-20491</p>
          <p className="text-[9.5px] text-text-muted">Dhaka → Sylhet · Seat A12</p>
          <p className="mt-2 text-[9.5px] text-text-muted">Passenger · Rahim Ahmed</p>
          <div className="mt-2.5 flex gap-1.5">
            <span className="flex-1 rounded-md bg-brand py-1 text-center text-[9.5px] font-semibold text-white">
              Print
            </span>
            <span className="flex-1 rounded-md border border-brand/30 bg-brand-light/50 py-1 text-center text-[9.5px] font-semibold text-brand">
              QR
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] font-medium text-text-muted">
        +5% agent commission
      </p>
    </div>
  );
}

function DriverMock() {
  const pax = ["A12 · Rahim Ahmed", "A10 · Nusrat Jahan", "C04 · Tanvir Hasan"];
  return (
    <MockWindow title="Driver App" badge="On route">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-text-dark">Dhaka → Sylhet</p>
            <p className="text-[9.5px] text-text-muted">Departure 8:30 PM · AC Sleeper</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-brand-light px-2.5 py-1 text-[9.5px] font-semibold text-brand">
            <HiOutlineQrcode className="h-3.5 w-3.5" />
            Scan
          </span>
        </div>
        <div className="mt-3 space-y-1.5">
          {pax.map((p) => (
            <div key={p} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
              <p className="text-[10px] text-text-dark">{p}</p>
              <HiOutlineCheck className="h-3.5 w-3.5 text-emerald-500" />
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl bg-gray-50 px-3 py-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-text-muted">Boarded</p>
            <p className="text-[10px] font-semibold text-text-dark">41 / 44</p>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-[93%] rounded-full bg-gradient-to-r from-brand to-brand-dark" />
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

function AdminMock() {
  const kpis = [
    { l: "Daily sales", v: "৳86K", t: "+12%" },
    { l: "Occupancy", v: "78%", t: "+4%" },
    { l: "Online", v: "62%", t: "+8%" },
  ];
  const bars = [40, 55, 48, 70, 64, 85, 78];
  return (
    <MockWindow title="Admin & Reporting" badge="Live">
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {kpis.map((k) => (
            <div key={k.l} className="rounded-xl bg-gray-50 px-3 py-2.5 text-center">
              <p className="text-[8.5px] text-text-muted">{k.l}</p>
              <p className="text-[14px] font-bold leading-none text-text-dark">{k.v}</p>
              <p className="mt-0.5 text-[8.5px] font-semibold text-emerald-600">{k.t}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex h-16 items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-md ${
                i === bars.length - 1
                  ? "bg-gradient-to-t from-brand to-brand-dark"
                  : "bg-gradient-to-t from-brand/25 to-brand/70"
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
          <p className="text-[10px] text-text-muted">Route sales · Dhaka → Sylhet</p>
          <p className="text-[10px] font-semibold text-brand">৳120,760</p>
        </div>
      </div>
    </MockWindow>
  );
}

function CargoMock() {
  const steps = [
    { t: "Picked up", s: "done" },
    { t: "Loaded on bus", s: "done" },
    { t: "Out for delivery", s: "current" },
    { t: "Delivered", s: "todo" },
  ];
  return (
    <MockWindow title="Parcel Manager" badge="In transit">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-text-dark">PKG-0932</p>
            <p className="text-[9.5px] text-text-muted">Dhaka → Chittagong · 12 kg</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-600">
            In transit
          </span>
        </div>
        <div className="mt-3">
          {steps.map((st) => (
            <div key={st.t} className="relative flex items-center gap-2.5 pb-3 last:pb-0">
              {st.s !== "todo" ? (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <HiOutlineCheck className="h-2.5 w-2.5" />
                </span>
              ) : (
                <span
                  className={`h-4 w-4 shrink-0 rounded-full border ${
                    st.s === "current" ? "border-brand bg-brand/20" : "border-gray-200 bg-white"
                  }`}
                />
              )}
              <p className={`text-[10px] ${st.s === "todo" ? "text-text-muted" : "text-text-dark"}`}>
                {st.t}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MockWindow>
  );
}

function VisualCard({ dark, children }: { dark: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-5 shadow-2xl transition-all duration-300 sm:p-6 ${
        dark
          ? "border-white/10 bg-gradient-to-br from-[#1a2233] to-[#0c121e] shadow-black/30"
          : "border-gray-100 bg-white shadow-gray-300/40"
      }`}
    >
      <div
        className={`pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full blur-3xl ${
          dark ? "bg-brand/25" : "bg-brand/15"
        }`}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function RoleVisual({ role, dark }: { role: Role; dark: boolean }) {
  const Icon = role.icon;
  return (
    <VisualCard dark={dark}>
      <div className="flex items-center justify-between">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg ${
            dark
              ? "bg-gradient-to-br from-brand to-brand-dark text-white shadow-brand/30"
              : "bg-brand-light text-brand"
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span
          className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-medium ${
            dark
              ? "border-white/10 bg-white/5 text-white/70"
              : "border-gray-200 bg-gray-50 text-text-muted"
          }`}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live network
        </span>
      </div>
      <div className="mt-5">
        {role.role === "Passenger" && <PassengerMock />}
        {role.role === "Front desk" && <FrontDeskMock />}
        {role.role === "Field sales" && <AgentPosMock />}
        {role.role === "Onboard" && <DriverMock />}
        {role.role === "Management" && <AdminMock />}
        {role.role === "Cargo" && <CargoMock />}
      </div>
    </VisualCard>
  );
}

// ── Panel ──────────────────────────────────────────────────────────────────────

function EcosystemPanel({
  role,
  index,
  stacked,
  registerRef,
}: {
  role: Role;
  index: number;
  stacked: boolean;
  registerRef?: (el: HTMLDivElement | null) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const Icon = role.icon;
  const dark = index % 2 === 0;

  useEffect(() => {
    // In the desktop stack every card is positioned absolutely and animated
    // by the parent's single pinned timeline, so nothing to set up here.
    if (stacked) return;

    let mm: gsap.MatchMedia | null = null;

    const cancel = onSmootherReady(() => {
      mm = gsap.matchMedia();

      // Mobile / tablet: simple fade-up reveal, no pin, no stacking math.
      mm.add("(max-width: 1023px)", () => {
        const wrapper = wrapperRef.current;
        const card = cardRef.current;
        const text = textRef.current;
        if (!wrapper) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });
        if (text) tl.fromTo(text, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0);
        if (card) tl.fromTo(card, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.1);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    });

    return () => {
      cancel();
      mm?.revert();
    };
  }, [stacked]);

  return (
    <div
      ref={(el) => {
        wrapperRef.current = el;
        registerRef?.(el);
      }}
      className={
        stacked
          ? "absolute inset-x-0 top-[11vh] h-[max(78vh,440px)]"
          : "relative"
      }
      style={{ zIndex: index + 1 }}
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 bg-[#F3F4F5] sm:px-6 lg:h-full lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:py-0 lg:rounded-2xl lg:border lg:border-gray-200">
        {/* ── Left: copy ── */}
        <div ref={textRef} className={index % 2 === 1 ? "lg:order-2" : ""}>
          <div className="relative">
            <span className="pointer-events-none absolute -top-9 left-0 select-none text-[80px] font-black leading-none text-brand/[0.06]">
              {role.num}
            </span>
            <p className="relative flex items-center gap-2 text-[13px] font-semibold uppercase tracking-widest text-brand">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-brand shadow-sm ring-1 ring-gray-100">
                <Icon className="h-5 w-5" />
              </span>
              {role.role}
            </p>
            <h3 className="relative mt-4 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
              {role.title}
            </h3>
            <ul className="relative mt-6 space-y-3">
              {role.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand-light text-brand">
                    <HiOutlineCheck className="h-3 w-3" />
                  </span>
                  <span className="text-[13px] leading-snug text-text-body">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right: role visual ── */}
        <div className={index % 2 === 1 ? "lg:order-1" : ""}>
          <div ref={cardRef}>
            <RoleVisual role={role} dark={dark} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────

export default function Ecosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prevActiveRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [railVisible, setRailVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    let mm: gsap.MatchMedia | null = null;
    let timeline: gsap.core.Timeline | null = null;

    const cancel = onSmootherReady(() => {
      mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const section = sectionRef.current;
        const stack = stackRef.current;
        if (!section || !stack) return;

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          onToggle: (self) => setRailVisible(self.isActive),
        });

        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        const vh = window.innerHeight;
        // ScrollSmoother scrolls content at `speed` (2x here), so pin
        // distances run in that accelerated space; scale by it so each
        // phase feels like one viewport of wheel scroll.
        const speed =
          (ScrollSmoother.get() as { vars?: { speed?: number } } | undefined)
            ?.vars?.speed ?? 1;

        cards.forEach((el, i) => {
          gsap.set(el, { y: i === 0 ? 0 : vh });
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stack,
            start: "top top",
            end: () => "+=" + (roles.length - 1) * window.innerHeight * speed,
            scrub: 0.4,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const next = Math.min(
                roles.length - 1,
                Math.ceil(self.progress * (roles.length - 1))
              );
              if (next !== prevActiveRef.current) {
                prevActiveRef.current = next;
                setActiveIndex(next);
              }
            },
          },
        });
        timeline = tl;

        for (let k = 1; k < roles.length; k++) {
          tl.to(cards[k], { y: 0, duration: 1, ease: "none" }, k - 1);
        }

        return () => {
          st.kill();
          timeline?.scrollTrigger?.kill();
          timeline?.kill();
          timeline = null;
        };
      });
    });

    return () => {
      cancelAnimationFrame(id);
      cancel();
      mm?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="ecosystem" className="relative bg-white">
      <div className="mx-auto max-w-3xl px-4 pt-16 text-center sm:px-6 lg:px-8">
        <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">
          Everything Connected
        </p>
        <h2 className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
          One Ticketing Ecosystem for{" "}
          <span className="text-brand">Passengers, Staff and Operators</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-relaxed text-text-muted sm:text-[14px]">
          Every interface works with the same routes, departures, seats, bookings
          and transaction information — so your team works consistently across
          every sales channel. Scroll to explore each one.
        </p>
      </div>

      {/* ── progress rail (desktop only, visible only while this section is on screen) ── */}
      <div
        className={`pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 transition-opacity duration-300 lg:flex ${
          railVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {roles.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === activeIndex ? "w-6 bg-brand" : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Desktop: pinned compact-card stack */}
      <div className="relative mt-10 hidden lg:block lg:mt-10">
        <div ref={stackRef} className="relative h-screen overflow-hidden">
          {roles.map((role, i) => (
            <EcosystemPanel
              key={role.num}
              role={role}
              index={i}
              stacked
              registerRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile / tablet: plain flow, one card after another */}
      <div className="mt-10 lg:hidden">
        {roles.map((role, i) => (
          <EcosystemPanel key={role.num} role={role} index={i} stacked={false} />
        ))}
      </div>
    </section>
  );
}
