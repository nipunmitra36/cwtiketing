"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, ScrollSmoother } from "@/lib/gsap";
import {
    HiOutlineTruck,
    HiOutlineClock,
    HiOutlineGlobeAlt,
    HiOutlineLocationMarker,
    HiOutlineTrendingUp,
    HiOutlineCalendar,
    HiOutlineCube,
    HiOutlineUserGroup,
} from "react-icons/hi";

const features = [
    {
        title: "Bus Ticketing System",
        desc: "Online route, schedule, seat, fare, and passenger booking management.",
        stat: "50%",
        statLabel: "Faster ticket checkout",
        caption:
            "Real-time seat maps and live fares let passengers complete a booking in seconds, not minutes.",
        icon: HiOutlineTruck,
    },
    {
        title: "Train Ticketing System",
        desc: "Real-time train schedules, seat availability, ticket sales, and notifications.",
        stat: "99.9%",
        statLabel: "Schedule accuracy, live",
        caption:
            "Live availability and instant alerts keep passengers and staff in sync at every station.",
        icon: HiOutlineClock,
    },
    {
        title: "Cruise Booking System",
        desc: "Manage trips, deck plans, availability, fares, and online reservations.",
        stat: "40%",
        statLabel: "More cabins booked online",
        caption:
            "Interactive deck plans and live fares turn browsing into confirmed reservations.",
        icon: HiOutlineGlobeAlt,
    },
    {
        title: "Taxi Booking System",
        desc: "Booking requests, driver panel, fare calculation, tracking, and customer app.",
        stat: "3x",
        statLabel: "Faster driver dispatch",
        caption:
            "Automated fare calculation and live tracking connect riders to the nearest driver instantly.",
        icon: HiOutlineLocationMarker,
    },
    {
        title: "Cable Car Booking System",
        desc: "Sell timed tickets online and reduce queue pressure with digital booking.",
        stat: "70%",
        statLabel: "Shorter queue times",
        caption:
            "Timed digital tickets spread arrivals evenly, cutting wait times at the base station.",
        icon: HiOutlineTrendingUp,
    },
    {
        title: "Event Ticketing System",
        desc: "Sell tickets, manage attendees, scan entries, and track bookings online.",
        stat: "2x",
        statLabel: "Faster gate scanning",
        caption:
            "Digital tickets and QR scanning move attendees through the gate in half the time.",
        icon: HiOutlineCalendar,
    },
    {
        title: "Parcel Management System",
        desc: "Pickup, dispatch, tracking, and delivery status management in one place.",
        stat: "60%",
        statLabel: "Faster delivery tracking",
        caption:
            "Live status updates keep senders, drivers, and recipients on the same page from pickup to drop-off.",
        icon: HiOutlineCube,
    },
    {
        title: "Customer Management System",
        desc: "Centralized customer records, booking history, and support in one dashboard.",
        stat: "1",
        statLabel: "Single view of every customer",
        caption:
            "Booking history, preferences, and support tickets live in one record, not five different tools.",
        icon: HiOutlineUserGroup,
    },
];

const STEP_DISTANCE = 500;

export default function ScrollFeatures() {
    const sectionRef = useRef<HTMLElement>(null);
    const stRef = useRef<ScrollTrigger | null>(null);
    const isProgrammaticScroll = useRef(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const st = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: () => "+=" + (features.length - 1) * STEP_DISTANCE,
                pin: true,
                scrub: 0.5,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                snap: {
                    snapTo: 1 / (features.length - 1),
                    duration: { min: 0.2, max: 0.35 },
                    ease: "power1.inOut",
                    delay: 0,
                },
                onUpdate: (self) => {
                    if (isProgrammaticScroll.current) return;
                    const idx = Math.min(
                        features.length - 1,
                        Math.floor(self.progress * features.length)
                    );
                    setActiveIndex((prev) => (prev === idx ? prev : idx));
                },
            });
            stRef.current = st;

            return () => {
                st.kill();
                stRef.current = null;
            };
        });

        const id = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
            cancelAnimationFrame(id);
            mm.revert();
        };
    }, []);

    const animateStatIn = useCallback((node: HTMLDivElement | null) => {
        if (!node) return;

        const statNum = node.querySelector<HTMLElement>("[data-stat-num]");
        const label = node.querySelector<HTMLElement>("[data-stat-label]");
        const divider = node.querySelector<HTMLElement>("[data-stat-divider]");
        const caption = node.querySelector<HTMLElement>("[data-stat-caption]");

        const tl = gsap.timeline();

        if (statNum)
            tl.fromTo(
                statNum,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
                0
            );
        if (label)
            tl.fromTo(
                label,
                { opacity: 0, y: 14 },
                { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
                0.08
            );
        if (divider)
            tl.fromTo(
                divider,
                { scaleX: 0, transformOrigin: "left" },
                { scaleX: 1, duration: 0.5, ease: "power2.out" },
                0.18
            );
        if (caption)
            tl.fromTo(
                caption,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
                0.28
            );

        if (statNum) {
            const raw = statNum.textContent || "";
            const m = raw.match(/([\d.]+)/);
            if (m) {
                const end = parseFloat(m[1]);
                const suffix = raw.replace(m[1], "");
                const obj = { v: 0 };
                gsap.to(obj, {
                    v: end,
                    duration: 1.2,
                    delay: 0.15,
                    ease: "power2.out",
                    onUpdate: () => {
                        statNum.textContent =
                            Number.isInteger(end)
                                ? Math.round(obj.v) + suffix
                                : obj.v.toFixed(1) + suffix;
                    },
                });
            }
        }
    }, []);

    const handleTabClick = useCallback(
        (i: number) => {
            setActiveIndex(i);

            const st = stRef.current;
            if (!st || st.end <= st.start) return;

            isProgrammaticScroll.current = true;

            const target =
                st.start +
                (i / (features.length - 1)) * (st.end - st.start);
            const smoother = ScrollSmoother.get();

            if (smoother) {
                smoother.scrollTo(target, true);
            } else {
                window.scrollTo({ top: target, behavior: "smooth" });
            }

            gsap.delayedCall(2, () => {
                setActiveIndex(i);
                isProgrammaticScroll.current = false;
            });
        },
        [],
    );

    const active = features[activeIndex];
    const ActiveIcon = active.icon;

    return (
        <section
            ref={sectionRef}
            id="solutions"
            className="relative overflow-hidden bg-white"
        >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:px-8 lg:py-16">
                <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-10">
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-3 py-1 text-[12px] font-medium text-brand">
                        Every booking business, one platform
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-dark sm:text-4xl">
                        Ticketing Solutions for Every Booking Business
                    </h2>
                    <p className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
                        Scroll or tap through to see how each module works,
                        from booking to back-office.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-14">
                    <div className="order-2 flex flex-col gap-2.5 lg:order-1 lg:h-[600px] lg:gap-3">
                        {features.map((f, i) => {
                            const isActive = i === activeIndex;
                            const Icon = f.icon;
                            return (
                                <button
                                    key={f.title}
                                    type="button"
                                    onClick={() => handleTabClick(i)}
                                    className={`group flex flex-col overflow-hidden rounded-xl border px-4 py-3 text-left transition-all duration-500 ease-out sm:px-5 sm:py-3.5 ${
                                        isActive
                                            ? "flex-1 border-brand/20 bg-white shadow-lg shadow-gray-200/60 lg:min-h-[64px]"
                                            : "h-14 shrink-0 border-gray-100 bg-gray-50/70 hover:border-gray-200 hover:bg-gray-50"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-500 ${
                                                isActive
                                                    ? "bg-brand text-white scale-110"
                                                    : "bg-gray-200/70 text-gray-400 group-hover:bg-gray-200"
                                            }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <span
                                            className={`text-[15px] font-semibold leading-snug transition-colors duration-500 sm:text-[16px] ${
                                                isActive
                                                    ? "text-text-dark"
                                                    : "text-text-body"
                                            }`}
                                        >
                                            {f.title}
                                        </span>
                                    </div>

                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-out ${
                                            isActive
                                                ? "mt-2.5 max-h-24 opacity-100"
                                                : "mt-0 max-h-0 opacity-0"
                                        }`}
                                    >
                                        <p className="pl-11 text-[12.5px] leading-relaxed text-text-muted sm:text-[13px]">
                                            {f.desc}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="relative h-[300px] overflow-hidden rounded-3xl border border-gray-800/50 bg-gradient-to-br from-[#1a2233] to-[#0c121e] shadow-xl shadow-gray-300/30 sm:h-[400px] lg:h-[600px]">
                            <svg
                                className="absolute inset-0 h-full w-full opacity-[0.14]"
                                viewBox="0 0 600 560"
                                fill="none"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M -20 420 C 120 380, 160 220, 300 200 S 480 60, 620 40"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeDasharray="2 10"
                                    strokeLinecap="round"
                                />
                                <circle cx="120" cy="380" r="4" fill="white" />
                                <circle cx="300" cy="200" r="4" fill="white" />
                                <circle cx="480" cy="60" r="4" fill="white" />
                            </svg>

                            <ActiveIcon className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rotate-6 text-white/[0.06] transition-all duration-700 sm:h-56 sm:w-56" />

                            {/* ── Dummy UI mockups ── */}
                            {/* Ticket card */}
                            <div className="pointer-events-none absolute left-6 top-8 w-44 rotate-[-4deg] rounded-xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur-sm sm:left-8 sm:top-10 sm:w-52 lg:left-10 lg:top-12">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="h-2 w-16 rounded-full bg-white/20" />
                                    <span className="h-2 w-8 rounded-full bg-emerald-400/40" />
                                </div>
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-white/70">DAC</span>
                                    <span className="h-px flex-1 bg-white/15" />
                                    <svg className="h-3 w-3 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                    <span className="h-px flex-1 bg-white/15" />
                                    <span className="text-[10px] font-bold text-white/70">CTG</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] text-white/40">15 Jul 2026 &middot; 08:30 AM</span>
                                    <span className="rounded-md bg-brand/30 px-1.5 py-0.5 text-[8px] font-semibold text-brand/80">
                                        CONFIRMED
                                    </span>
                                </div>
                            </div>

                            {/* Seat grid */}
                            <div className="pointer-events-none absolute right-6 top-12 rotate-[3deg] sm:right-10 sm:top-16 lg:right-12 lg:top-20">
                                <div className="rounded-lg border border-white/10 bg-white/[0.06] p-2.5 backdrop-blur-sm">
                                    <div className="mb-1.5 text-[8px] font-medium uppercase tracking-wider text-white/30">
                                        Seat Map
                                    </div>
                                    <div className="grid grid-cols-5 gap-1">
                                        {[
                                            0, 0, 1, 1, 0,
                                            0, 1, 1, 0, 0,
                                            1, 1, 0, 0, 1,
                                            0, 0, 0, 1, 0,
                                            0, 1, 0, 0, 0,
                                        ].map((occupied, si) => (
                                            <div
                                                key={si}
                                                className={`h-2.5 w-2.5 rounded-sm ${
                                                    occupied
                                                        ? "bg-brand/50"
                                                        : "bg-white/10"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Mini bar chart */}
                            <div className="pointer-events-none absolute bottom-40 left-8 rotate-[-2deg] sm:bottom-52 sm:left-10 lg:bottom-56 lg:left-12">
                                <div className="rounded-lg border border-white/10 bg-white/[0.06] p-2.5 backdrop-blur-sm">
                                    <div className="mb-1.5 text-[8px] font-medium uppercase tracking-wider text-white/30">
                                        Weekly Sales
                                    </div>
                                    <div className="flex items-end gap-1">
                                        {[40, 65, 45, 80, 55, 90, 70].map((h, bi) => (
                                            <div
                                                key={bi}
                                                className="w-2 rounded-t-sm bg-gradient-to-t from-brand/40 to-brand/70"
                                                style={{ height: `${h * 0.45}px` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-7 lg:p-8">
                                <div
                                    key={activeIndex}
                                    ref={animateStatIn}
                                >
                                    <p
                                        data-stat-num
                                        className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl"
                                    >
                                        {active.stat}
                                    </p>
                                    <p
                                        data-stat-label
                                        className="mt-2 text-[15px] font-medium text-white/90 sm:text-lg"
                                    >
                                        {active.statLabel}
                                    </p>
                                    <div
                                        data-stat-divider
                                        className="my-4 h-px w-full bg-white/15 sm:my-5"
                                    />
                                    <p
                                        data-stat-caption
                                        className="text-[12px] leading-relaxed text-white/60 sm:text-[13px]"
                                    >
                                        {active.caption}
                                    </p>
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 sm:mt-6">
                                    <span className="flex items-center gap-1.5">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                                        <span className="text-[11px] text-white/60">
                                            Live network
                                        </span>
                                    </span>
                                    <div className="flex flex-wrap justify-end gap-1.5">
                                        {features.map((_, di) => (
                                            <button
                                                key={di}
                                                type="button"
                                                aria-label={`Show ${features[di].title}`}
                                                onClick={() =>
                                                    handleTabClick(di)
                                                }
                                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                                    di === activeIndex
                                                        ? "w-5 bg-white"
                                                        : "w-1.5 bg-white/30 hover:bg-white/50"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
