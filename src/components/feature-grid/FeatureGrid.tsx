"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
    HiOutlineDeviceMobile,
    HiOutlineTicket,
    HiOutlineLocationMarker,
    HiOutlineCog,
    HiOutlineShoppingCart,
    HiOutlineCreditCard,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface FloatingCard {
    icon: IconType;
    title: string;
    // position as % of the stage, from the relevant edges
    style: React.CSSProperties;
}

const cards: FloatingCard[] = [
    {
        icon: HiOutlineDeviceMobile,
        title: "Passenger & Driver Mobile Apps",
        style: { top: "8%", left: "2%" },
    },
    {
        icon: HiOutlineTicket,
        title: "Online Bus Ticketing & Booking",
        style: { top: "8%", right: "2%" },
    },
    {
        icon: HiOutlineLocationMarker,
        title: "Bus Tracking & Fleet Management",
        style: { top: "42%", left: "2%" },
    },
    {
        icon: HiOutlineCog,
        title: "Bus Operator Admin & Management",
        style: { top: "42%", right: "2%" },
    },
    {
        icon: HiOutlineShoppingCart,
        title: "POS, Counter & Agent Management",
        style: { bottom: "14%", left: "4%" },
    },
    {
        icon: HiOutlineCreditCard,
        title: "Payments & Customer Notifications",
        style: { bottom: "14%", right: "4%" },
    },
];

const checklist = [
    "Every route, driver, and seat status in one live view",
    "Revenue and occupancy update the moment a ticket sells",
    "Jump into any trip without leaving the dashboard",
];

export default function WorkInContext() {
    const sectionRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const avatarWrapRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const whiteAvatarRef = useRef<HTMLImageElement>(null);
    const colorAvatarRef = useRef<HTMLImageElement>(null);
    const textPanelRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        let ctx: gsap.Context | null = null;

        const cancel = onSmootherReady(() => {
            ctx = gsap.context(() => {
                const mm = gsap.matchMedia();

            // Desktop / tablet: pinned, scrubbed convergence animation
            mm.add(
                {
                    isDesktop: "(min-width: 1024px)",
                    reduceMotion: "(prefers-reduced-motion: reduce)",
                },
                (context) => {
                    const { isDesktop, reduceMotion } = context.conditions as {
                        isDesktop: boolean;
                        reduceMotion: boolean;
                    };

                    if (!isDesktop || reduceMotion) {
                        // Simple, non-pinned fallback: settle into the final state
                        gsap.set(colorAvatarRef.current, { opacity: 1, scale: 1 });
                        gsap.set(whiteAvatarRef.current, { opacity: 0 });
                        gsap.set(glowRef.current, { opacity: 1 });
                        gsap.set(cardRefs.current, { opacity: 0, scale: 0.2 });
                        gsap.fromTo(
                            textPanelRef.current,
                            { opacity: 0, y: 20 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.9,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: sectionRef.current,
                                    start: "top 65%",
                                    toggleActions: "play none none none",
                                    once: true,
                                },
                            }
                        );
                        return;
                    }

                    // Compute how far each card needs to travel to reach the
                    // man's lower body (so they tuck in under him), at any
                    // viewport size.
                    const stage = stageRef.current;
                    const avatar = avatarWrapRef.current;
                    if (!stage || !avatar) return;

                    const avatarBox = avatar.getBoundingClientRect();
                    const avatarCenterX = avatarBox.left + avatarBox.width / 2;
                    const avatarCenterY = avatarBox.top + avatarBox.height * 0.85;

                    const deltas = cardRefs.current.map((el) => {
                        if (!el) return { dx: 0, dy: 0 };
                        const box = el.getBoundingClientRect();
                        const cx = box.left + box.width / 2;
                        const cy = box.top + box.height / 2;
                        return { dx: avatarCenterX - cx, dy: avatarCenterY - cy };
                    });

                    gsap.set(colorAvatarRef.current, { opacity: 0 });
                    gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });
                    gsap.set(textPanelRef.current, { opacity: 0, x: -32 });

                    const tl = gsap.timeline({
                        scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=1400",
                        scrub: 0.5,
                            pin: stage,
                            anticipatePin: 1,
                        },
                    });

                    // Phase 1 — cards drift inward and dissolve into the man
                    tl.to(
                        cardRefs.current,
                        {
                            x: (i) => deltas[i].dx,
                            y: (i) => deltas[i].dy,
                            scale: 0.15,
                            opacity: 0,
                            duration: 0.85,
                            stagger: 0.04,
                            ease: "power1.in",
                        },
                        0
                    );

                    // Phase 1 — white cross-fades to color
                    tl.to(
                        whiteAvatarRef.current,
                        { opacity: 0, duration: 1, ease: "power1.inOut" },
                        0.05
                    );
                    tl.to(
                        colorAvatarRef.current,
                        { opacity: 1, duration: 1, ease: "power1.inOut" },
                        0.05
                    );
                    tl.to(
                        glowRef.current,
                        { opacity: 1, scale: 1.2, duration: 1.1, ease: "power2.out" },
                        0.1
                    );

                    // Phase 2 — avatar settles left, the payoff copy slides in
                    tl.to(avatarWrapRef.current, { x: "-16%", duration: 0.7, ease: "power2.inOut" }, 1.1);
                    tl.to(
                        textPanelRef.current,
                        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
                        1.2
                    );
                }
            );

            return () => mm.revert();
            }, sectionRef);
        });

        return () => {
            cancel();
            ctx?.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-gray-50">
            <div
                ref={stageRef}
                className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center overflow-hidden px-4 pb-0 pt-16 sm:px-6 lg:px-8"
            >
                <div className="mx-auto mb-10 max-w-xl text-center lg:mb-14">
                    <h2 className="mt-4 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
                        Everything about today, in one glance
                    </h2>
                    <p className="mt-3 text-[13px] leading-relaxed text-text-muted sm:text-[14px]">
                        Bookings, routes, and revenue update in real time. Scroll to
                        watch it come together.
                    </p>
                </div>

                {/* Stage: floating cards + avatar + payoff copy */}
                <div className="relative mx-auto h-[420px] w-full max-w-4xl sm:h-[480px] lg:h-[min(70vh,700px)]">
                    {/* Cards — hidden on small screens to keep things calm on mobile */}
                    <div className="pointer-events-none absolute inset-0 hidden lg:block">
                        {cards.map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={card.title}
                                    ref={(el) => {
                                        cardRefs.current[i] = el;
                                    }}
                                    style={card.style}
                                    className="absolute w-[220px] rounded-xl border border-gray-200 bg-white p-3 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_10px_24px_-12px_rgba(17,17,17,0.16)]"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <p className="text-[12.5px] font-medium leading-snug text-text-dark">
                                            {card.title}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Avatar */}
                    <div className="absolute inset-0 flex items-end justify-center">
                        <div ref={avatarWrapRef} className="relative h-[400px] w-[400px] sm:h-[480px] sm:w-[480px] lg:h-[min(70vh,680px)] lg:w-[min(70vh,680px)]">
                            <div
                                ref={glowRef}
                                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-brand/30 to-sky-400/20 blur-3xl"
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                ref={whiteAvatarRef}
                                src="/media/white-man.png"
                                alt=""
                                aria-hidden="true"
                                className="absolute inset-0 h-full w-full object-contain"
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                ref={colorAvatarRef}
                                src="/media/color-man.png"
                                alt="CwTicketing operator managing bookings, routes, and revenue"
                                className="absolute inset-0 h-full w-full object-contain opacity-0"
                            />
                        </div>
                    </div>

                    {/* Payoff copy panel */}
                    <div
                        ref={textPanelRef}
                        className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col justify-center opacity-0 lg:w-[300px]"
                    >
                        <h3 className="text-2xl font-medium tracking-tight text-text-dark">
                            Full control
                        </h3>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-text-muted">
                            One dashboard replaces the spreadsheets, group chats, and
                            phone calls it used to take to run a fleet.
                        </p>
                        <ul className="mt-4 space-y-2.5">
                            {checklist.map((item) => (
                                <li key={item} className="flex items-start gap-2.5">
                                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                                        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                                            <path
                                                d="M2 6.2 4.7 9 10 3"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <span className="text-[12.5px] leading-snug text-text-dark">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}