"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, ScrollSmoother, playOnce } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
    HiOutlineArrowRight,
    HiOutlineTruck,
    HiOutlineClock,
    HiOutlineGlobeAlt,
    HiOutlineLocationMarker,
    HiOutlineCalendar,
    HiOutlineCube,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Feature {
    title: string;
    desc: string;
    stat: string;
    statLabel: string;
    caption: string;
    icon: IconType;
    image?: string;
    href?: string;
}

const SERVICE_IMAGES = "/media/services";

const features: Feature[] = [
    {
        title: "Bus Ticketing System",
        desc: "Online route, schedule, seat, fare, and passenger booking management.",
        stat: "50%",
        statLabel: "Faster ticket checkout",
        caption:
            "Real-time seat maps and live fares let passengers complete a booking in seconds, not minutes.",
        icon: HiOutlineTruck,
        image: `${SERVICE_IMAGES}/bus.jpg`,
        href: "/bus-ticketing-system",
    },
    {
        title: "Train Ticketing System",
        desc: "Real-time train schedules, seat availability, ticket sales, and notifications.",
        stat: "99.9%",
        statLabel: "Schedule accuracy, live",
        caption:
            "Live availability and instant alerts keep passengers and staff in sync at every station.",
        icon: HiOutlineClock,
        image: `${SERVICE_IMAGES}/train.jpg`,
    },
    {
        title: "Cruise Booking System",
        desc: "Manage trips, deck plans, availability, fares, and online reservations.",
        stat: "40%",
        statLabel: "More cabins booked online",
        caption:
            "Interactive deck plans and live fares turn browsing into confirmed reservations.",
        icon: HiOutlineGlobeAlt,
        image: `${SERVICE_IMAGES}/curise.jpg`,
    },
    {
        title: "Taxi Booking System",
        desc: "Booking requests, driver panel, fare calculation, tracking, and customer app.",
        stat: "3x",
        statLabel: "Faster driver dispatch",
        caption:
            "Automated fare calculation and live tracking connect riders to the nearest driver instantly.",
        icon: HiOutlineLocationMarker,
        image: `${SERVICE_IMAGES}/taxi.jpg`,
        href: "/online-taxi-booking-system",
    },
    {
        title: "Event Ticketing System",
        desc: "Sell tickets, manage attendees, scan entries, and track bookings online.",
        stat: "2x",
        statLabel: "Faster gate scanning",
        caption:
            "Digital tickets and QR scanning move attendees through the gate in half the time.",
        icon: HiOutlineCalendar,
        image: `${SERVICE_IMAGES}/events.jpg`,
        href: "/event-ticketing-system",
    },
    {
        title: "Parcel Management System",
        desc: "Pickup, dispatch, tracking, and delivery status management in one place.",
        stat: "60%",
        statLabel: "Faster delivery tracking",
        caption:
            "Live status updates keep senders, drivers, and recipients on the same page from pickup to drop-off.",
        icon: HiOutlineCube,
        image: `${SERVICE_IMAGES}/parcel.jpg`,
        href: "/parcel-management-system",
    },
];


function FeaturePanel({
    feature,
    index,
    stacked,
    registerRef,
}: {
    feature: Feature;
    index: number;
    stacked: boolean;
    registerRef?: (el: HTMLDivElement | null) => void;
}) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const Icon = feature.icon;

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
                        ...playOnce,
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
                    ? "absolute inset-x-0 top-[14vh] h-[max(58vh,400px)]"
                    : "relative"
            }
            style={{ zIndex: index + 1 }}
        >
            <div className="relative mx-auto grid h-full w-full max-w-7xl gap-6 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-12">
                    {/* ── Left: copy ── */}
                    <div ref={textRef} className={index % 2 === 1 ? "lg:order-2" : ""}>
                        <h3 className="text-[22px] font-semibold leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
                            {feature.title}
                        </h3>
                        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-body">
                            {feature.desc}
                        </p>

                        <Link
                            href={feature.href ?? "/contact-us"}
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg transition-all hover:gap-2.5 active:scale-95"
                        >
                            Explore {feature.title.replace(" System", "")} Solution
                            <HiOutlineArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* ── Right: full image ── */}
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                        <div
                            ref={cardRef}
                            className="group relative mx-auto aspect-[77/46] w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg lg:max-w-none"
                            style={{ transformOrigin: "center" }}
                        >
                            {feature.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                                    <Icon className="h-16 w-16 text-gray-400" />
                                </div>
                            )}
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
                        scrub: 0.4,
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
            <div className="mx-auto max-w-7xl px-4 pt-20 text-center sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
                <p className="text-[12px] font-semibold uppercase tracking-widest text-brand sm:text-[13px]">
                    Solutions
                </p>
                <h2 className="mt-3 text-[24px] font-medium leading-snug tracking-tight text-text-dark sm:text-[26px] md:whitespace-nowrap lg:text-[34px]">
                    Built for How Each Industry <span className="text-gradient-brand">Actually Moves People</span>
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
                    One platform, shaped around the way each transport business sells tickets and runs its day.
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
                        stacked={false}
                    />
                ))}
            </div>
        </section>
    );
}
