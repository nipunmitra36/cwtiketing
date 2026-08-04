"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
    HiOutlineTicket,
    HiOutlineViewGrid,
    HiOutlineUserGroup,
    HiOutlineMap,
    HiOutlineTruck,
    HiOutlineCalendar,
    HiOutlineTrendingUp,
    HiOutlineCreditCard,
    HiOutlineTag,
    HiOutlineChartSquareBar,
    HiOutlineDocumentReport,
    HiOutlineDeviceMobile,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Feature {
    icon: IconType;
    title: string;
    desc: string;
}

interface FeatureGroup {
    title: string;
    accent: string;
    icon: IconType;
    features: Feature[];
}

const groups: FeatureGroup[] = [
    {
        title: "Booking Experience",
        accent: "from-brand to-brand-hover",
        icon: HiOutlineTicket,
        features: [
            {
                icon: HiOutlineTicket,
                title: "Online Booking",
                desc: "Sell tickets online 24/7 with a seamless flow across all devices.",
            },
            {
                icon: HiOutlineViewGrid,
                title: "Seat Selection",
                desc: "Let passengers pick seats with real-time visual seat maps.",
            },
            {
                icon: HiOutlineUserGroup,
                title: "Customer Portal",
                desc: "Self-service booking, management, and trip tracking for customers.",
            },
        ],
    },
    {
        title: "Operations",
        accent: "from-sky-500 to-sky-600",
        icon: HiOutlineMap,
        features: [
            {
                icon: HiOutlineMap,
                title: "Route Management",
                desc: "Build complex route networks, timetables, and service schedules.",
            },
            {
                icon: HiOutlineTruck,
                title: "Driver Panel",
                desc: "Trips, passenger manifests, and route info for every driver.",
            },
            {
                icon: HiOutlineCalendar,
                title: "Schedule Management",
                desc: "Keep every timetable live, accurate, and always in sync.",
            },
        ],
    },
    {
        title: "Revenue",
        accent: "from-emerald-500 to-emerald-600",
        icon: HiOutlineTrendingUp,
        features: [
            {
                icon: HiOutlineTrendingUp,
                title: "Dynamic Pricing",
                desc: "Peak pricing, early-bird discounts, and flexible fare rules.",
            },
            {
                icon: HiOutlineCreditCard,
                title: "Payments",
                desc: "Credit cards, mobile wallets, and 20+ local gateways.",
            },
            {
                icon: HiOutlineTag,
                title: "Coupons",
                desc: "Promotional codes, loyalty discounts, and seasonal offers.",
            },
        ],
    },
    {
        title: "Growth",
        accent: "from-violet-500 to-violet-600",
        icon: HiOutlineChartSquareBar,
        features: [
            {
                icon: HiOutlineChartSquareBar,
                title: "Analytics",
                desc: "Real-time dashboards for bookings, sales, and performance.",
            },
            {
                icon: HiOutlineDocumentReport,
                title: "Reports",
                desc: "Deep-dive reports on revenue, routes, and occupancy.",
            },
            {
                icon: HiOutlineDeviceMobile,
                title: "Mobile Apps",
                desc: "White-label Android & iOS apps for your passengers.",
            },
        ],
    },
];

export default function FeatureGrid() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const el = sectionRef.current;
            if (!el) return;

            gsap.fromTo(
                el.querySelectorAll("[data-gsap]"),
                { opacity: 0, y: 30, scale: 0.98 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.06,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="features"
            className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
        >
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span
                        data-gsap
                        className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-3 py-1 text-[12px] font-medium text-brand"
                    >
                        Everything included
                    </span>
                    <h2
                        data-gsap
                        className="mt-4 text-3xl font-bold tracking-tight text-text-dark sm:text-5xl"
                    >
                        Everything You Need
                    </h2>
                    <p
                        data-gsap
                        className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]"
                    >
                        Four pillars, one platform — plus cancellations &amp; refunds,
                        QR validation, notifications, and more.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {groups.map((group) => {
                        const GroupIcon = group.icon;
                        return (
                            <div
                                key={group.title}
                                data-gsap
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(17,17,17,0.04),0_10px_30px_-14px_rgba(17,17,17,0.14)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_2px_4px_rgba(17,17,17,0.05),0_20px_40px_-16px_rgba(255,106,28,0.22)]"
                            >
                                {/* Group header */}
                                <div className={`flex items-center gap-3 bg-gradient-to-r ${group.accent} px-5 py-4`}>
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                                        <GroupIcon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-[15px] font-bold text-white">{group.title}</p>
                                        <p className="text-[11px] text-white/70">
                                            {group.features.length} core tools
                                        </p>
                                    </div>
                                </div>

                                {/* Feature list */}
                                <div className="space-y-1.5 p-3 sm:p-4">
                                    {group.features.map((f) => {
                                        const Icon = f.icon;
                                        return (
                                            <div
                                                key={f.title}
                                                className="flex items-start gap-3.5 rounded-xl border border-transparent px-3 py-3 transition-all duration-200 hover:border-gray-100 hover:bg-gray-50"
                                            >
                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand transition-transform duration-300 group-hover:scale-110">
                                                    <Icon className="h-[18px] w-[18px]" />
                                                </span>
                                                <div>
                                                    <h3 className="text-[14px] font-bold text-text-dark">
                                                        {f.title}
                                                    </h3>
                                                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-text-muted">
                                                        {f.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
