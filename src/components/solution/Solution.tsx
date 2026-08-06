"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
    HiOutlineTicket,
    HiOutlineCreditCard,
    HiOutlineViewGrid,
    HiOutlineCalendar,
    HiOutlineUserGroup,
} from "react-icons/hi";

const aspects = [
    { icon: HiOutlineTicket, label: "Booking" },
    { icon: HiOutlineCreditCard, label: "Payment" },
    { icon: HiOutlineViewGrid, label: "Seat" },
    { icon: HiOutlineCalendar, label: "Schedule" },
    { icon: HiOutlineUserGroup, label: "Passenger" },
];

export default function Solution() {
    const sectionRef = useRef<HTMLElement>(null);

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
            className="relative overflow-hidden bg-white py-16 lg:py-24"
        >
            <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand-light/60 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-brand/5 blur-3xl" />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <span
                            data-gsap
                            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-3 py-1 text-[12px] font-medium text-brand"
                        >
                            All-in-one platform
                        </span>
                        <h2
                            data-gsap
                            className="mt-4 text-3xl font-medium leading-tight tracking-tight text-text-dark sm:text-5xl"
                        >
                            One system for{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10">booking, payment, seat,</span>
                                <span className="absolute bottom-1 left-0 right-0 h-3 rounded bg-brand/15" />
                            </span>{" "}
                            schedule, and passenger management.
                        </h2>
                        <p
                            data-gsap
                            className="mt-4 text-[15px] leading-relaxed text-text-muted sm:text-[16px]"
                        >
                            Stop juggling five different tools. Our unified platform handles
                            every aspect of your ticketing operation — from online bookings
                            and real-time payments to seat selection, route scheduling, and
                            passenger data — all in one place.
                        </p>
                        <div data-gsap className="mt-6 flex flex-wrap gap-4">
                            {aspects.map((a) => {
                                const Icon = a.icon;
                                return (
                                    <span
                                        key={a.label}
                                        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-2 text-[12px] font-medium text-text-body transition-colors hover:border-brand/30 hover:bg-brand-light hover:text-brand"
                                    >
                                        <Icon className="h-3.5 w-3.5" />
                                        {a.label}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    <div data-gsap className="relative hidden lg:block">
                        <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 shadow-xl shadow-gray-200/60">
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-1">
                                        <div className="h-3 w-3 rounded-full bg-rose-400" />
                                        <div className="h-3 w-3 rounded-full bg-amber-400" />
                                        <div className="h-3 w-3 rounded-full bg-emerald-400" />
                                    </div>
                                    <span className="text-[11px] font-medium text-text-muted">
                                        Dashboard Overview
                                    </span>
                                </div>
                                <span className="flex items-center gap-1.5 text-[11px] text-emerald-600">
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                                    Live
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand">
                                            <HiOutlineTicket className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold text-text-dark">
                                                Today&apos;s Bookings
                                            </p>
                                            <p className="text-[11px] text-text-muted">
                                                234 reservations
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-[15px] font-medium text-text-dark">
                                        $8,420
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                            <HiOutlineCreditCard className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold text-text-dark">
                                                Payment Success
                                            </p>
                                            <p className="text-[11px] text-text-muted">
                                                98.5% success rate
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                                        +12%
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                                            <HiOutlineViewGrid className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold text-text-dark">
                                                Seats Filled
                                            </p>
                                            <p className="text-[11px] text-text-muted">
                                                Across all routes
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-[15px] font-medium text-text-dark">
                                        76%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
