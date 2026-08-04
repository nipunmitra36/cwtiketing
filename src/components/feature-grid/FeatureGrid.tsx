"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
    HiOutlineTicket,
    HiOutlineViewGrid,
    HiOutlineMap,
    HiOutlineTrendingUp,
    HiOutlineCreditCard,
    HiOutlineUserGroup,
    HiOutlineDeviceMobile,
    HiOutlineChartSquareBar,
    HiOutlineUserCircle,
    HiOutlineTruck,
    HiOutlineSpeakerphone,
    HiOutlineTag,
    HiOutlineRefresh,
    HiOutlineDocumentReport,
    HiOutlineGlobe,
    HiOutlineQrcode,
} from "react-icons/hi";

const features = [
    {
        icon: HiOutlineTicket,
        title: "Online Ticket Booking",
        desc: "Sell tickets online 24/7 with a seamless booking experience across all devices.",
    },
    {
        icon: HiOutlineViewGrid,
        title: "Interactive Seat Selection",
        desc: "Let passengers pick their preferred seats with real-time visual seat maps.",
    },
    {
        icon: HiOutlineMap,
        title: "Route & Schedule Management",
        desc: "Create and manage complex route networks, timetables, and service schedules.",
    },
    {
        icon: HiOutlineTrendingUp,
        title: "Dynamic Fare Management",
        desc: "Implement flexible pricing with peak pricing, early bird discounts, and promotions.",
    },
    {
        icon: HiOutlineCreditCard,
        title: "Multiple Payment Gateways",
        desc: "Accept payments via credit cards, mobile wallets, and local payment methods.",
    },
    {
        icon: HiOutlineUserGroup,
        title: "Customer Booking Portal",
        desc: "Self-service portal for customers to book, manage, and track reservations.",
    },
    {
        icon: HiOutlineDeviceMobile,
        title: "Android & iOS Mobile Apps",
        desc: "Native mobile apps for passengers to book tickets and manage trips on the go.",
    },
    {
        icon: HiOutlineChartSquareBar,
        title: "Admin Dashboard",
        desc: "Complete business overview with real-time analytics and performance metrics.",
    },
    {
        icon: HiOutlineUserCircle,
        title: "Agent & Vendor Panel",
        desc: "Authorize agents and vendors to sell tickets with commission tracking.",
    },
    {
        icon: HiOutlineTruck,
        title: "Driver & Operator Panel",
        desc: "Empower drivers with trip details, passenger manifests, and route info.",
    },
    {
        icon: HiOutlineSpeakerphone,
        title: "SMS, Email & WhatsApp",
        desc: "Automated notifications for confirmations, reminders, and promotions.",
    },
    {
        icon: HiOutlineTag,
        title: "Coupon & Discount Management",
        desc: "Create promotional coupons, loyalty discounts, and seasonal offers.",
    },
    {
        icon: HiOutlineRefresh,
        title: "Cancellation & Refunds",
        desc: "Hassle-free cancellation and refund management with configurable policies.",
    },
    {
        icon: HiOutlineDocumentReport,
        title: "Reports & Analytics",
        desc: "Comprehensive reports on sales, revenue, and operational performance.",
    },
    {
        icon: HiOutlineGlobe,
        title: "Multi-Language & Currency",
        desc: "Serve a global audience with multi-language and currency support.",
    },
    {
        icon: HiOutlineQrcode,
        title: "QR Code Ticket Validation",
        desc: "Secure QR code and barcode scanning for fraud-proof ticket validation.",
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
                { opacity: 0, y: 30, scale: 0.97 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.04,
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
                        className="mt-4 text-3xl font-bold tracking-tight text-text-dark sm:text-4xl"
                    >
                        All Features, One Platform
                    </h2>
                    <p
                        data-gsap
                        className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]"
                    >
                        Every tool you need to launch, manage, and grow your ticketing
                        business.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={i}
                                data-gsap
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_10px_30px_-14px_rgba(17,17,17,0.14)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-[0_2px_4px_rgba(17,17,17,0.05),0_20px_40px_-16px_rgba(255,106,28,0.25)]"
                            >
                                <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-hover transition-transform duration-300 group-hover:scale-x-100" />
                                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/[0.06] blur-2xl transition-all duration-300 group-hover:bg-brand/10" />
                                <div className="relative mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-md shadow-brand/25 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand/40">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="relative mb-1 text-[14px] font-bold text-text-dark sm:text-[15px]">
                                    {f.title}
                                </h3>
                                <p className="relative text-[12.5px] leading-relaxed text-text-muted sm:text-[13px]">
                                    {f.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
