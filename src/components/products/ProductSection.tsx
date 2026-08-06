"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, ScrollSmoother } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
    HiOutlineArrowRight,
    HiOutlineTruck,
    HiOutlineClock,
    HiOutlineGlobeAlt,
    HiOutlineLocationMarker,
    HiOutlineTrendingUp,
    HiOutlineCalendar,
    HiOutlineCube,
    HiOutlineUserGroup,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Feature {
    title: string;
    desc: string;
    stat: string;
    statLabel: string;
    caption: string;
    icon: IconType;
    // "dark" / "light" alternate the card treatment so the stack reads
    // like distinct layers instead of eight identical panels.
    variant: "dark" | "light";
}

const features: Feature[] = [
    {
        title: "Bus Ticketing System",
        desc: "Online route, schedule, seat, fare, and passenger booking management.",
        stat: "50%",
        statLabel: "Faster ticket checkout",
        caption:
            "Real-time seat maps and live fares let passengers complete a booking in seconds, not minutes.",
        icon: HiOutlineTruck,
        variant: "dark",
    },
    {
        title: "Train Ticketing System",
        desc: "Real-time train schedules, seat availability, ticket sales, and notifications.",
        stat: "99.9%",
        statLabel: "Schedule accuracy, live",
        caption:
            "Live availability and instant alerts keep passengers and staff in sync at every station.",
        icon: HiOutlineClock,
        variant: "light",
    },
    {
        title: "Cruise Booking System",
        desc: "Manage trips, deck plans, availability, fares, and online reservations.",
        stat: "40%",
        statLabel: "More cabins booked online",
        caption:
            "Interactive deck plans and live fares turn browsing into confirmed reservations.",
        icon: HiOutlineGlobeAlt,
        variant: "dark",
    },
    {
        title: "Taxi Booking System",
        desc: "Booking requests, driver panel, fare calculation, tracking, and customer app.",
        stat: "3x",
        statLabel: "Faster driver dispatch",
        caption:
            "Automated fare calculation and live tracking connect riders to the nearest driver instantly.",
        icon: HiOutlineLocationMarker,
        variant: "light",
    },
    {
        title: "Cable Car Booking System",
        desc: "Sell timed tickets online and reduce queue pressure with digital booking.",
        stat: "70%",
        statLabel: "Shorter queue times",
        caption:
            "Timed digital tickets spread arrivals evenly, cutting wait times at the base station.",
        icon: HiOutlineTrendingUp,
        variant: "dark",
    },
    {
        title: "Event Ticketing System",
        desc: "Sell tickets, manage attendees, scan entries, and track bookings online.",
        stat: "2x",
        statLabel: "Faster gate scanning",
        caption:
            "Digital tickets and QR scanning move attendees through the gate in half the time.",
        icon: HiOutlineCalendar,
        variant: "light",
    },
    {
        title: "Parcel Management System",
        desc: "Pickup, dispatch, tracking, and delivery status management in one place.",
        stat: "60%",
        statLabel: "Faster delivery tracking",
        caption:
            "Live status updates keep senders, drivers, and recipients on the same page from pickup to drop-off.",
        icon: HiOutlineCube,
        variant: "dark",
    },
    {
        title: "Customer Management System",
        desc: "Centralized customer records, booking history, and support in one dashboard.",
        stat: "1",
        statLabel: "Single view of every customer",
        caption:
            "Booking history, preferences, and support tickets live in one record, not five different tools.",
        icon: HiOutlineUserGroup,
        variant: "light",
    },
];

function FeaturePanel({
    feature,
    index,
    total,
    stacked,
    registerRef,
}: {
    feature: Feature;
    index: number;
    total: number;
    stacked: boolean;
    registerRef?: (el: HTMLDivElement | null) => void;
}) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const Icon = feature.icon;
    const isDark = feature.variant === "dark";

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
                    ? "absolute inset-x-0 top-[11vh] h-[78vh]"
                    : "relative"
            }
            style={{ zIndex: index + 1 }}
        >
            <div
                className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 bg-[#F3F4F5] sm:px-6 lg:h-full lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:py-0 lg:rounded-2xl lg:border lg:border-gray-200">
                    {/* ── Left: copy ── */}
                    <div ref={textRef} className={index % 2 === 1 ? "lg:order-2" : ""}>
                        <span
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-medium ${isDark
                                    ? "border-brand/20 bg-brand-light text-brand"
                                    : "border-gray-200 bg-gray-50 text-text-muted"
                                }`}
                        >
                            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} &middot; Solutions by industry
                        </span>

                        <h3 className="mt-5 text-3xl font-medium tracking-tight text-text-dark sm:text-4xl lg:text-[42px]">
                            {feature.title}
                        </h3>
                        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-muted">
                            {feature.desc}
                        </p>

                        <Link
                            href="/contact"
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-text-dark px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:gap-2.5 hover:bg-black active:scale-95"
                        >
                            Explore {feature.title.replace(" System", "")} Solution
                            <HiOutlineArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* ── Right: feature card ── */}
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                        <div
                            ref={cardRef}
                            className={`group relative overflow-hidden rounded-3xl border p-6 shadow-2xl transition-all duration-300 sm:p-8 ${
                                isDark
                                    ? "border-white/10 bg-gradient-to-br from-[#1a2233] to-[#0c121e] shadow-black/30"
                                    : "border-gray-100 bg-white shadow-gray-300/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-300/60"
                            }`}
                            style={{ transformOrigin: "center" }}
                        >
                            {/* brand glow */}
                            <div
                                className={`pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 ${
                                    isDark ? "bg-brand/25" : "bg-brand/15"
                                }`}
                            />

                            {/* faint decorative path, dark cards only */}
                            {isDark && (
                                <svg
                                    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
                                    viewBox="0 0 600 400"
                                    fill="none"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M -20 300 C 120 260, 160 140, 300 130 S 480 40, 620 20"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeDasharray="2 10"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}

                            <div className="relative z-10 flex items-center justify-between">
                                <span
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg ${
                                        isDark
                                            ? "bg-gradient-to-br from-brand to-brand-dark text-white shadow-brand/30"
                                            : "bg-brand-light text-brand"
                                    }`}
                                >
                                    <Icon className="h-6 w-6" />
                                </span>
                                <span
                                    className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-medium ${
                                        isDark ? "border-white/10 bg-white/5 text-white/70" : "border-gray-200 bg-gray-50 text-text-muted"
                                    }`}
                                >
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                                    Live network
                                </span>
                            </div>

                            {/* big stat */}
                            <div className="relative z-10 mt-8 sm:mt-9">
                                <p
                                    className={`text-5xl font-black tracking-tight sm:text-6xl ${
                                        isDark ? "text-white" : "text-text-dark"
                                    }`}
                                >
                                    {feature.stat}
                                </p>
                                <p
                                    className={`mt-1 text-[13px] font-medium ${
                                        isDark ? "text-white/60" : "text-text-muted"
                                    }`}
                                >
                                    {feature.statLabel}
                                </p>
                            </div>

                            {/* mini seat / status grid — quick visual texture */}
                            <div className="relative z-10 mt-8 grid grid-cols-8 gap-1.5 sm:mt-10">
                                {Array.from({ length: 24 }).map((_, gi) => {
                                    const on = (gi * 7 + index * 3) % 5 === 0;
                                    return (
                                        <div
                                            key={gi}
                                            className={`h-3 rounded-sm transition-all duration-300 ${
                                                on
                                                    ? isDark
                                                        ? "bg-gradient-to-br from-brand to-brand-dark"
                                                        : "bg-brand"
                                                    : isDark
                                                        ? "bg-white/10"
                                                        : "bg-gray-100"
                                            }`}
                                        />
                                    );
                                })}
                            </div>

                            <div
                                className={`relative z-10 mt-8 border-t border-dashed pt-6 sm:mt-10 ${
                                    isDark ? "border-white/15" : "border-gray-200"
                                }`}
                            >
                                <p
                                    className={`text-[13px] leading-relaxed ${
                                        isDark ? "text-white/60" : "text-text-muted"
                                    }`}
                                >
                                    {feature.caption}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default function ScrollFeatures() {
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

                // Compact full-cover cards: each card is a shorter, centered
                // panel (positioned by CSS `top`, not transform). Card 0 shows
                // immediately at its rest position (y: 0, no transform); the rest
                // start one viewport below, clipped out of view by the stack's
                // overflow-hidden until their phase begins.
                cards.forEach((el, i) => {
                    gsap.set(el, { y: i === 0 ? 0 : vh });
                });
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: stack,
                        start: "top top",
                        end: () => "+=" + (features.length - 1) * window.innerHeight * speed,
                        scrub: 0.6,
                        pin: true,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            const next = Math.min(
                                features.length - 1,
                                Math.ceil(self.progress * (features.length - 1))
                            );
                            if (next !== prevActiveRef.current) {
                                prevActiveRef.current = next;
                                setActiveIndex(next);
                            }
                        },
                    },
                });
                timeline = tl;

                // One pinned container, all cards absolutely positioned above each
                // other. Each phase slides the next card up from one viewport
                // below to its rest position (y: 0), completely covering the
                // previous card, which stays hidden underneath at the same spot.
                // Every card rests at y: 0, so none carries a persistent transform.
                // Scrolling up simply reverses the cover.
                for (let k = 1; k < features.length; k++) {
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
        <section ref={sectionRef} id="solutions" className="relative bg-white">
            <div className="mx-auto max-w-2xl px-4 pt-16 text-center sm:px-6 lg:px-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-3 py-1 text-[12px] font-medium text-brand">
                    Solutions by industry
                </span>
                <h2 className="mt-4 text-3xl font-medium tracking-tight text-text-dark sm:text-5xl">
                    Built for How Each Industry Actually Moves People
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
                    Scroll to see how each module works, from booking to back-office.
                </p>
            </div>

            {/* ── progress rail (desktop only, visible only while this section is on screen) ── */}
            <div
                className={`pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 transition-opacity duration-300 lg:flex ${railVisible ? "opacity-100" : "opacity-0"
                    }`}
            >
                {features.map((_, i) => (
                    <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? "w-6 bg-brand" : "w-1.5 bg-gray-300"
                            }`}
                    />
                ))}
            </div>

            {/* Desktop: pinned compact-card stack */}
            <div className="relative mt-10 hidden lg:block lg:mt-10">
                <div ref={stackRef} className="relative h-screen overflow-hidden">
                    {features.map((f, i) => (
                        <FeaturePanel
                            key={f.title}
                            feature={f}
                            index={i}
                            total={features.length}
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
                {features.map((f, i) => (
                    <FeaturePanel
                        key={f.title}
                        feature={f}
                        index={i}
                        total={features.length}
                        stacked={false}
                    />
                ))}
            </div>
        </section>
    );
}