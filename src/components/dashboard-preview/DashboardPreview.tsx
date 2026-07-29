"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
    HiOutlineChartSquareBar,
    HiOutlineViewGrid,
    HiOutlineDeviceMobile,
    HiOutlineUsers,
    HiOutlineCreditCard,
    HiOutlineClock,
    HiOutlineLocationMarker,
} from "react-icons/hi";

const tabs = [
    { id: "admin", label: "Admin Panel", icon: HiOutlineChartSquareBar },
    { id: "seat", label: "Seat Map", icon: HiOutlineViewGrid },
    { id: "mobile", label: "Mobile App", icon: HiOutlineDeviceMobile },
];

export default function DashboardPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeTab, setActiveTab] = useState("admin");

    useEffect(() => {
        const ctx = gsap.context(() => {
            const el = sectionRef.current;
            if (!el) return;

            gsap.fromTo(
                el.querySelectorAll("[data-gsap]"),
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
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
            className="relative overflow-hidden bg-gray-950 py-16 lg:py-24"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,106,28,0.08)_0%,_transparent_60%)]" />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span
                        data-gsap
                        className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[12px] font-medium text-brand"
                    >
                        Platform preview
                    </span>
                    <h2
                        data-gsap
                        className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
                    >
                        See the Platform in Action
                    </h2>
                    <p
                        data-gsap
                        className="mt-3 text-[14px] leading-relaxed text-gray-400 sm:text-[15px]"
                    >
                        Switch between views to explore the admin dashboard, seat
                        selection, and mobile booking experience.
                    </p>
                </div>

                <div data-gsap className="mb-8 flex justify-center">
                    <div className="inline-flex rounded-xl border border-gray-800 bg-gray-900 p-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-brand text-white shadow-sm"
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div data-gsap className="relative">
                    {activeTab === "admin" && <AdminPanel />}
                    {activeTab === "seat" && <SeatMap />}
                    {activeTab === "mobile" && <MobileApp />}
                </div>
            </div>
        </section>
    );
}

function AdminPanel() {
    const bookings = [
        { route: "NYC–Boston", count: 234, pct: 82 },
        { route: "LA–SF", count: 189, pct: 67 },
        { route: "Chicago–Dallas", count: 156, pct: 55 },
    ];

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                        <div className="h-3 w-3 rounded-full bg-rose-500" />
                        <div className="h-3 w-3 rounded-full bg-amber-500" />
                        <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[12px] font-medium text-gray-400">
                        Admin Dashboard
                    </span>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live
                </span>
            </div>

            <div className="p-6">
                <div className="mb-6 grid grid-cols-3 gap-4">
                    {[
                        {
                            icon: HiOutlineUsers,
                            value: "1,247",
                            label: "Today",
                            color: "text-brand",
                        },
                        {
                            icon: HiOutlineCreditCard,
                            value: "$84K",
                            label: "Revenue",
                            color: "text-emerald-400",
                        },
                        {
                            icon: HiOutlineClock,
                            value: "98.2%",
                            label: "Uptime",
                            color: "text-sky-400",
                        },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 text-center"
                        >
                            <span className={`mb-1 flex justify-center ${s.color}`}>
                                <s.icon className="h-4 w-4" />
                            </span>
                            <p className="text-lg font-bold text-white">{s.value}</p>
                            <p className="text-[11px] text-gray-500">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                        Top Routes
                    </p>
                    <div className="space-y-3">
                        {bookings.map((b) => (
                            <div key={b.route} className="flex items-center gap-3">
                                <span className="w-24 truncate text-[12px] text-gray-300">
                                    {b.route}
                                </span>
                                <div className="flex-1 overflow-hidden rounded-full bg-gray-800">
                                    <div
                                        className="h-2 rounded-full bg-gradient-to-r from-brand to-brand-hover"
                                        style={{ width: `${b.pct}%` }}
                                    />
                                </div>
                                <span className="w-8 text-right text-[12px] font-semibold text-gray-300">
                                    {b.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-xl bg-brand/10 px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
                    <p className="text-[12px] text-gray-300">
                        <span className="font-semibold text-white">John D.</span> booked
                        NYC→Boston for{" "}
                        <span className="font-semibold text-brand">$65</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

function SeatMap() {
    const rows = [
        [0, 1, 0, 2, 1, 0],
        [1, 0, 0, 1, 0, 1],
        [0, 2, 1, 0, 0, 2],
        [1, 0, 0, 2, 1, 0],
        [0, 1, 1, 0, 0, 1],
    ];
    const seatColors: Record<number, string> = {
        0: "bg-gray-700",
        1: "bg-brand",
        2: "bg-emerald-500",
    };
    const seatLabels = ["Available", "Selected", "Booked"];

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                        <div className="h-3 w-3 rounded-full bg-rose-500" />
                        <div className="h-3 w-3 rounded-full bg-amber-500" />
                        <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[12px] font-medium text-gray-400">
                        Interactive Seat Map
                    </span>
                </div>
                <span className="rounded-full border border-gray-700 px-3 py-1 text-[11px] text-gray-400">
                    Bus • AC Sleeper
                </span>
            </div>

            <div className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-600" />
                    <span className="text-[11px] text-gray-400">Driver</span>
                </div>

                <div className="mx-auto max-w-md space-y-2.5">
                    {rows.map((row, ri) => (
                        <div key={ri} className="flex items-center gap-2">
                            <span className="w-5 text-center text-[11px] font-medium text-gray-500">
                                {ri + 1}
                            </span>
                            {row.map((seat, si) => (
                                <div key={si} className="flex flex-1 items-center gap-1">
                                    <div
                                        className={`h-7 w-7 rounded-md transition-colors ${
                                            seatColors[seat] || "bg-gray-700"
                                        } ${seat === 0 ? "hover:bg-brand/70 cursor-pointer" : ""}`}
                                    />
                                    {(si === 1 || si === 3) && (
                                        <div className="h-7 w-3" />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-6 border-t border-gray-800 pt-5">
                    {seatLabels.map((label, i) => (
                        <span key={label} className="flex items-center gap-2">
                            <span
                                className={`h-3 w-3 rounded-sm ${
                                    i === 0 ? "bg-gray-700" : i === 1 ? "bg-brand" : "bg-emerald-500"
                                }`}
                            />
                            <span className="text-[11px] text-gray-400">{label}</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MobileApp() {
    return (
        <div className="mx-auto max-w-[320px]">
            <div className="overflow-hidden rounded-[32px] border-[3px] border-gray-700 bg-gray-900 shadow-2xl shadow-black/40">
                <div className="flex items-center justify-between px-5 pb-2 pt-4">
                    <span className="text-[11px] font-semibold text-white">9:41</span>
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-400">●●●●</span>
                        <span className="text-[11px] text-gray-400">100%</span>
                    </div>
                </div>

                <div className="border-b border-gray-800 px-4 pb-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-white">
                            Book Ticket
                        </span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/20 text-brand">
                            <HiOutlineLocationMarker className="h-3.5 w-3.5" />
                        </span>
                    </div>
                </div>

                <div className="space-y-3 p-4">
                    <div className="rounded-xl border border-gray-800 bg-gray-950 p-3.5">
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <p className="text-[10px] text-gray-500">From</p>
                                <p className="text-[13px] font-bold text-white">
                                    New York
                                </p>
                                <p className="text-[9px] text-gray-500">07:00 AM</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <svg
                                    className="h-5 w-5 text-brand"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                                <span className="text-[9px] text-gray-500">6h 30m</span>
                            </div>
                            <div className="flex-1 text-right">
                                <p className="text-[10px] text-gray-500">To</p>
                                <p className="text-[13px] font-bold text-white">Boston</p>
                                <p className="text-[9px] text-gray-500">01:30 PM</p>
                            </div>
                        </div>
                    </div>

                    {[
                        {
                            name: "Greyhound",
                            type: "AC Sleeper",
                            price: "$65",
                            selected: true,
                        },
                        {
                            name: "Megabus",
                            type: "Non-AC",
                            price: "$45",
                            selected: false,
                        },
                    ].map((bus) => (
                        <div
                            key={bus.name}
                            className={`rounded-xl border p-3.5 ${
                                bus.selected
                                    ? "border-brand/40 bg-brand/10"
                                    : "border-gray-800 bg-gray-950"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[12px] font-bold text-white">
                                        {bus.name}
                                    </p>
                                    <p className="text-[10px] text-gray-500">
                                        {bus.type}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[13px] font-bold text-brand">
                                        {bus.price}
                                    </p>
                                    <button
                                        className={`mt-0.5 rounded-md px-2.5 py-1 text-[9px] font-semibold transition-colors ${
                                            bus.selected
                                                ? "bg-brand text-white"
                                                : "border border-gray-700 text-gray-400"
                                        }`}
                                    >
                                        {bus.selected ? "Selected" : "Select"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-around border-t border-gray-800 px-4 py-3">
                    {["Search", "My Trips", "Profile"].map((tab, i) => (
                        <span
                            key={tab}
                            className={`text-[10px] font-medium ${
                                i === 0 ? "text-brand" : "text-gray-500"
                            }`}
                        >
                            {tab}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
