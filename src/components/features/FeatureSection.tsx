"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, ScrollSmoother } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
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
        image: "/images/features/online-ticket-booking.jpg",
    },
    {
        icon: HiOutlineViewGrid,
        title: "Interactive Seat Selection",
        desc: "Let passengers pick their preferred seats with real-time visual seat maps.",
        image: "/images/features/interactive-seat-selection.jpg",
    },
    {
        icon: HiOutlineMap,
        title: "Route & Schedule Management",
        desc: "Create and manage complex route networks, timetables, and service schedules.",
        image: "/images/features/route-schedule-management.jpg",
    },
    {
        icon: HiOutlineTrendingUp,
        title: "Dynamic Fare Management",
        desc: "Implement flexible pricing with peak pricing, early bird discounts, and promotions.",
        image: "/images/features/dynamic-fare-management.jpg",
    },
    {
        icon: HiOutlineCreditCard,
        title: "Multiple Payment Gateways",
        desc: "Accept payments via credit cards, mobile wallets, and local payment methods.",
        image: "/images/features/multiple-payment-gateways.jpg",
    },
    {
        icon: HiOutlineUserGroup,
        title: "Customer Booking Portal",
        desc: "Self-service portal for customers to book, manage, and track reservations.",
        image: "/images/features/customer-booking-portal.jpg",
    },
    {
        icon: HiOutlineDeviceMobile,
        title: "Android & iOS Mobile Apps",
        desc: "Native mobile apps for passengers to book tickets and manage trips on the go.",
        image: "/images/features/mobile-apps.jpg",
    },
    {
        icon: HiOutlineChartSquareBar,
        title: "Admin Dashboard",
        desc: "Complete business overview with real-time analytics and performance metrics.",
        image: "/images/features/admin-dashboard.jpg",
    },
    {
        icon: HiOutlineUserCircle,
        title: "Agent & Vendor Panel",
        desc: "Authorize agents and vendors to sell tickets with commission tracking.",
        image: "/images/features/agent-vendor-panel.jpg",
    },
    {
        icon: HiOutlineTruck,
        title: "Driver & Operator Panel",
        desc: "Empower drivers with trip details, passenger manifests, and route info.",
        image: "/images/features/driver-operator-panel.jpg",
    },
    {
        icon: HiOutlineSpeakerphone,
        title: "SMS, Email & WhatsApp",
        desc: "Automated notifications for confirmations, reminders, and promotions.",
        image: "/images/features/notifications.jpg",
    },
    {
        icon: HiOutlineTag,
        title: "Coupon & Discount Management",
        desc: "Create promotional coupons, loyalty discounts, and seasonal offers.",
        image: "/images/features/coupon-discount-management.jpg",
    },
    {
        icon: HiOutlineRefresh,
        title: "Cancellation & Refunds",
        desc: "Hassle-free cancellation and refund management with configurable policies.",
        image: "/images/features/cancellation-refunds.jpg",
    },
    {
        icon: HiOutlineDocumentReport,
        title: "Reports & Analytics",
        desc: "Comprehensive reports on sales, revenue, and operational performance.",
        image: "/images/features/reports-analytics.jpg",
    },
    {
        icon: HiOutlineGlobe,
        title: "Multi-Language & Currency",
        desc: "Serve a global audience with multi-language and currency support.",
        image: "/images/features/multi-language-currency.jpg",
    },
    {
        icon: HiOutlineQrcode,
        title: "QR Code Ticket Validation",
        desc: "Secure QR code and barcode scanning for fraud-proof ticket validation.",
        image: "/images/features/qr-code-validation.jpg",
    },
];

export default function FeatureSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const tabRowRef = useRef<HTMLDivElement>(null);
    const stRef = useRef<ScrollTrigger | null>(null);
    const mobileTrackRef = useRef<HTMLDivElement>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);

    const last = features.length - 1;

    // Jump to a given feature by scrubbing the pinned scroll distance
    // (desktop) to the matching progress point.
    const jumpToIndex = (i: number) => {
        const st = stRef.current;
        if (!st) return;
        const progress = i / last;
        const target = st.start + progress * (st.end - st.start);
        const smoother = ScrollSmoother.get();
        if (smoother) smoother.scrollTo(target, true);
        else window.scrollTo({ top: target, behavior: "smooth" });
    };

    const windowStart = Math.min(
        Math.max(activeIndex - 1, 0),
        Math.max(features.length - 4, 0)
    );

    // Softly cross-fade the 4-tab window whenever it shifts.
    useEffect(() => {
        if (!tabRowRef.current) return;
        gsap.fromTo(
            tabRowRef.current,
            { opacity: 0.3 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
    }, [windowStart]);

    // Gentle reveal for the center content whenever the active feature changes.
    useEffect(() => {
        if (!contentRef.current) return;
        gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
    }, [activeIndex]);

    useEffect(() => {
        const section = sectionRef.current;
        const header = headerRef.current;
        const viewport = viewportRef.current;
        if (!section || !viewport) return;

        const mm = gsap.matchMedia();

        const cancel = onSmootherReady(() => {
            mm.add("(min-width: 1024px)", () => {
            // Distance the section stays pinned while scrolling through
            // every feature, one step at a time.
            const distance = last * 420;

            const st = ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: () => "+=" + distance,
                pin: true,
                scrub: 0.5,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const idx = Math.round(self.progress * last);
                    if (idx !== activeIndexRef.current) {
                        activeIndexRef.current = idx;
                        setActiveIndex(idx);
                    }
                },
            });
            stRef.current = st;

            if (header) {
                gsap.fromTo(
                    header,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 88%",
                            toggleActions: "play none none none",
                            once: true,
                        },
                    }
                );
            }

            gsap.fromTo(
                viewport,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 82%",
                        toggleActions: "play none none none",
                        once: true,
                    },
                }
            );

            return () => {
                st.kill();
                stRef.current = null;
            };
        });

        mm.add("(max-width: 1023px)", () => {
            if (header) {
                gsap.fromTo(
                    header,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            toggleActions: "play none none none",
                            once: true,
                        },
                    }
                );
            }

            const cards = mobileTrackRef.current?.querySelectorAll<HTMLElement>("[data-mcard]");
            if (cards && cards.length) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 24 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.06,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 82%",
                            toggleActions: "play none none none",
                            once: true,
                        },
                    }
                );
            }

            // Sync the tab row + progress dashes to whichever card is
            // centered in the horizontal snap carousel.
            const track = mobileTrackRef.current;
            if (!track) return;
            const items = Array.from(track.querySelectorAll<HTMLElement>("[data-mcard]"));
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                            const idx = Number(entry.target.getAttribute("data-index"));
                            activeIndexRef.current = idx;
                            setActiveIndex(idx);
                        }
                    });
                },
                { root: track, threshold: [0.6] }
            );
            items.forEach((el) => observer.observe(el));

            return () => observer.disconnect();
        });
        });

        return () => {
            cancel();
            mm.revert();
        };
    }, [last]);

    const ActiveIcon = features[activeIndex].icon;
    const activeFeature = features[activeIndex];
    const prevFeature = activeIndex > 0 ? features[activeIndex - 1] : null;
    const nextFeature = activeIndex < last ? features[activeIndex + 1] : null;

    // Only ever show a window of 4 tab pills, centered on the active one,
    // so the tab row never overflows or shows cut-off pills.
    const visibleTabs = features.slice(windowStart, windowStart + 4);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white"
        >
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand/5 blur-3xl" />
            <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-brand-light/60 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
                <div ref={headerRef} className="mx-auto mb-10 max-w-2xl text-center">
                    <h2 className="mt-4 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
                        Powerful Features Built for{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10">Ticketing Operators</span>
                            <span className="absolute bottom-1 left-0 right-0 h-3 rounded bg-brand/15" />
                        </span>
                    </h2>
                    <p className="mt-3 text-[13px] leading-relaxed text-text-muted sm:text-[14px]">
                        Scroll down to step through every tool, one feature at a time.
                    </p>
                </div>

                {/* Tab pills — desktop: a fixed window of 4, never cut off */}
                <div
                    ref={tabRowRef}
                    className="mb-10 hidden justify-center gap-2 lg:flex"
                >
                    {visibleTabs.map((f, i) => {
                        const globalIndex = windowStart + i;
                        const isActive = globalIndex === activeIndex;
                        return (
                            <button
                                key={f.title}
                                ref={(el) => {
                                    tabRefs.current[globalIndex] = el;
                                }}
                                type="button"
                                onClick={() => jumpToIndex(globalIndex)}
                                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${isActive
                                    ? "bg-brand text-white shadow-sm shadow-brand/30"
                                    : "bg-brand-light text-brand/70 hover:bg-brand/15"
                                    }`}
                            >
                                {f.title}
                            </button>
                        );
                    })}
                </div>

                {/* Desktop: pinned single-feature stage with side peeks */}
                <div
                    ref={viewportRef}
                    data-viewport
                    className="relative mx-auto hidden max-w-5xl items-center justify-center gap-4 lg:flex"
                >
                    <PeekCard feature={prevFeature} onClick={() => prevFeature && jumpToIndex(activeIndex - 1)} side="left" />

                    <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/60">
                        <div ref={contentRef}>
                            <div className="mb-6 flex items-center justify-between">
                                {/* <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-sm shadow-brand/20">
                                    <ActiveIcon className="h-7 w-7" />
                                </div> */}
                                {/* <span className="text-[12px] font-medium tabular-nums text-text-muted">
                                    {String(activeIndex + 1).padStart(2, "0")} / {features.length}
                                </span> */}
                            </div>
                            <h3 className="mb-3 text-2xl font-medium text-text-dark">
                                {activeFeature.title}
                            </h3>
                            <p className="mb-6 text-[15px] leading-relaxed text-text-muted">
                                {activeFeature.desc}
                            </p>
                            <FeatureVisual feature={activeFeature} size="lg" />
                        </div>
                    </div>

                    <PeekCard feature={nextFeature} onClick={() => nextFeature && jumpToIndex(activeIndex + 1)} side="right" />
                </div>

                {/* Progress dashes — desktop */}
                <div className="mx-auto mt-10 hidden max-w-2xl gap-1.5 lg:flex">
                    {features.map((f, i) => (
                        <button
                            key={f.title}
                            type="button"
                            aria-label={`Go to ${f.title}`}
                            onClick={() => jumpToIndex(i)}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i === activeIndex ? "bg-brand" : "bg-gray-200 hover:bg-brand/30"
                                }`}
                        />
                    ))}
                </div>

                {/* Mobile / tablet: scrollable tabs + snap carousel */}
                <div className="lg:hidden">
                    <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto px-2">
                        {features.map((f, i) => (
                            <span
                                key={f.title}
                                className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors duration-300 ${i === activeIndex
                                    ? "bg-brand text-white"
                                    : "bg-brand-light text-brand/70"
                                    }`}
                            >
                                {f.title}
                            </span>
                        ))}
                    </div>

                    <div
                        ref={mobileTrackRef}
                        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-4 px-4 pb-2"
                    >
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div
                                    key={f.title}
                                    data-mcard
                                    data-index={i}
                                    className="flex w-[84%] shrink-0 snap-center flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/50 sm:w-[60%]"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-sm shadow-brand/20">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-[16px] font-medium text-text-dark">
                                        {f.title}
                                    </h3>
                                    <p className="mb-4 text-[13.5px] leading-relaxed text-text-muted">
                                        {f.desc}
                                    </p>
                                    <FeatureVisual feature={f} size="sm" />
                                </div>
                            );
                        })}
                    </div>

                    <div className="mx-auto mt-6 flex max-w-xs gap-1.5">
                        {features.map((f, i) => (
                            <div
                                key={f.title}
                                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i === activeIndex ? "bg-brand" : "bg-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function PeekCard({
    feature,
    onClick,
    side,
}: {
    feature: (typeof features)[number] | null;
    onClick: () => void;
    side: "left" | "right";
}) {
    if (!feature) {
        return <div className="hidden w-40 shrink-0 xl:block" />;
    }
    const Icon = feature.icon;
    return (
        <button
            type="button"
            onClick={onClick}
            className={`hidden w-40 shrink-0 flex-col rounded-2xl border border-gray-100 bg-white/70 p-5 text-left opacity-60 shadow-md shadow-gray-200/40 transition-all duration-300 hover:opacity-90 xl:flex ${side === "left" ? "translate-x-4" : "-translate-x-4"
                }`}
        >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand/80 text-white">
                <Icon className="h-4.5 w-4.5" />
            </div>
            <p className="mb-3 text-[12.5px] font-semibold leading-snug text-text-dark">
                {feature.title}
            </p>
            <FeatureVisual feature={feature} size="sm" />
        </button>
    );
}

// Renders the feature's real screenshot when one exists at the given path.
// Until you drop real product screenshots into /public/images/features/,
// it falls back to a lightweight brand-colored illustration built from the
// feature's own icon, so every card still shows *something* relevant.
function FeatureVisual({
    feature,
    size = "lg",
}: {
    feature: (typeof features)[number];
    size?: "lg" | "sm";
}) {
    const [broken, setBroken] = useState(false);
    const Icon = feature.icon;
    const heightClass = size === "lg" ? "h-56" : "h-24";

    if (feature.image && !broken) {
        return (
            <div className={`relative w-full overflow-hidden rounded-2xl bg-gray-50 ${heightClass}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={feature.image}
                    alt={feature.title}
                    onError={() => setBroken(true)}
                    className="h-full w-full object-cover"
                />
            </div>
        );
    }

    // Fallback illustration: icon at the center of soft concentric rings.
    return (
        <div
            className={`relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-light to-gray-50 ${heightClass}`}
        >
            {size === "lg" && (
                <>
                    <span className="absolute h-40 w-40 rounded-full border border-dashed border-brand/25" />
                    <span className="absolute h-28 w-28 rounded-full border border-dashed border-brand/30" />
                </>
            )}
            <div
                className={`relative flex items-center justify-center rounded-full bg-brand text-white shadow-md shadow-brand/30 ${size === "lg" ? "h-16 w-16" : "h-9 w-9"
                    }`}
            >
                <Icon className={size === "lg" ? "h-8 w-8" : "h-4.5 w-4.5"} />
            </div>
        </div>
    );
}