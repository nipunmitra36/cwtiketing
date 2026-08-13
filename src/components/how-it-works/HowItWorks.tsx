"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";

import {
    HiOutlineChat,
    HiOutlineColorSwatch,
    HiOutlineLink,
    HiOutlinePaperAirplane,
    HiOutlineViewGrid,
    HiOutlineCurrencyDollar,
    HiOutlineCreditCard,
    HiOutlineChatAlt,
    HiOutlineMap,
    HiOutlineServer,
    HiOutlineGlobe,
    HiOutlineDeviceMobile,
    HiOutlineChartBar,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface StepItem {
    icon: IconType;
    label: string;
}

interface Step {
    num: string;
    icon: IconType;
    title: string;
    desc?: string;
    items?: StepItem[];
}

const steps: Step[] = [
    {
        num: "1",
        icon: HiOutlineChat,
        title: "Discovery",
        desc: "We understand your routes, pricing, passengers, and operational requirements.",
    },
    {
        num: "2",
        icon: HiOutlineColorSwatch,
        title: "Customization",
        items: [
            { icon: HiOutlineColorSwatch, label: "Brand colors" },
            { icon: HiOutlineViewGrid, label: "Seat layout" },
            { icon: HiOutlineCurrencyDollar, label: "Fare rules" },
        ],
    },
    {
        num: "3",
        icon: HiOutlineLink,
        title: "Integration",
        items: [
            { icon: HiOutlineCreditCard, label: "Payment" },
            { icon: HiOutlineChatAlt, label: "SMS" },
            { icon: HiOutlineMap, label: "Maps" },
            { icon: HiOutlineServer, label: "ERP" },
        ],
    },
    {
        num: "4",
        icon: HiOutlinePaperAirplane,
        title: "Launch",
        items: [
            { icon: HiOutlineGlobe, label: "Web app" },
            { icon: HiOutlineDeviceMobile, label: "Mobile apps" },
            { icon: HiOutlineChartBar, label: "Dashboard" },
        ],
    },
];

export default function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let ctx: gsap.Context | null = null;

        const cancel = onSmootherReady(() => {
            ctx = gsap.context(() => {
                const el = sectionRef.current;
                if (!el) return;

                // ── Content reveal ──
                gsap.fromTo(
                    el.querySelectorAll("[data-gsap]"),
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            toggleActions: "play none none none",
                            once: true,
                        },
                    }
                );

            // ── Progress fill across the steps (scrubbed) ──
            const grid = el.querySelector<HTMLElement>("[data-gsap-grid]");
            const lineH = el.querySelector<HTMLElement>("[data-gsap-line]");
            const lineV = el.querySelector<HTMLElement>("[data-gsap-line-v]");
            const nodes = el.querySelectorAll<HTMLElement>("[data-gsap-node]");

            const draw = {
                ease: "none",
                scrollTrigger: {
                    trigger: grid,
                    start: "top 72%",
                    end: "bottom 55%",
                    scrub: 0.5,
                    onUpdate(self: ScrollTrigger) {
                        if (!nodes.length) return;
                        const current = Math.min(
                            nodes.length - 1,
                            Math.floor(self.progress * nodes.length)
                        );
                        nodes.forEach((node, i) => {
                            node.classList.toggle("is-active", i === current);
                            node.classList.toggle("is-done", i < current);
                        });
                    },
                },
            };

            if (lineH) {
                gsap.set(lineH, { scaleX: 0 });
                gsap.to(lineH, { scaleX: 1, ...draw });
            }
            if (lineV) {
                gsap.set(lineV, { scaleY: 0 });
                gsap.to(lineV, { scaleY: 1, ...draw });
            }

            // ── Thin progress bar across the top of the section ──
            const bar = el.querySelector<HTMLElement>("[data-gsap-progress]");
            if (bar) {
                gsap.set(bar, { scaleX: 0 });
                gsap.to(bar, {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 70%",
                        end: "bottom 55%",
                        scrub: 0.4,
                    },
                });
            }
        }, sectionRef);
        });

        return () => {
            cancel();
            ctx?.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="how-it-works"
            className="relative overflow-hidden bg-white py-16 lg:py-24"
        >
            {/* ── Progress bar ── */}
            <div
                data-gsap-progress
                className="absolute left-0 top-0 h-1 w-full origin-left bg-gradient-to-r from-brand via-brand to-brand/30"
            />

            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />

            <style jsx>{`
                @keyframes howitworks-node-pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(255, 106, 28, 0.45);
                    }
                    70% {
                        box-shadow: 0 0 0 12px rgba(255, 106, 28, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(255, 106, 28, 0);
                    }
                }
                [data-gsap-node] {
                    transition: background-color 0.35s ease, color 0.35s ease, box-shadow 0.35s ease;
                }
                [data-gsap-node].is-active {
                    background-image: linear-gradient(135deg, var(--color-brand), #f97316);
                    color: #ffffff;
                    box-shadow: 0 14px 24px -10px rgba(255, 106, 28, 0.55);
                    animation: howitworks-node-pulse 1.8s ease-out infinite;
                }
                [data-gsap-node].is-active .node-badge {
                    background-color: #ffffff;
                    border-color: var(--color-brand);
                    color: var(--color-brand);
                }
                [data-gsap-node].is-done {
                    background-image: linear-gradient(135deg, var(--color-brand-light), #ffe7d1);
                    color: var(--color-brand);
                }
                [data-gsap-node].is-done .node-badge {
                    background-color: #ffffff;
                    border-color: var(--color-brand);
                    color: var(--color-brand);
                }
                [data-gsap-node] .node-icon {
                    transition: color 0.35s ease;
                }
                [data-gsap-node] .node-badge {
                    transition: background-color 0.35s ease, border-color 0.35s ease, color 0.35s ease;
                }
            `}</style>

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <p
                        data-gsap
                        className="text-[13px] font-semibold uppercase tracking-widest text-brand"
                    >
                        How it works
                    </p>
                    <h2
                        data-gsap
                        className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
                    >
                        Launch Your Platform in 4 Simple Steps
                    </h2>
                    <p
                        data-gsap
                        className="mt-3 text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
                    >
                        From discovery to launch, we guide you through every step.
                    </p>
                </div>

                <div className="relative">
                    {/* ── Vertical connector (mobile) ── */}
                    <div className="absolute bottom-7 left-7 top-7 w-0.5 lg:hidden">
                        <div className="h-full w-full rounded-full bg-gray-100" />
                        <div
                            data-gsap-line-v
                            className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-brand via-brand/70 to-brand/30"
                        />
                    </div>

                    {/* ── Horizontal connector (desktop) ── */}
                    <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 lg:block">
                        <div className="h-full w-full rounded-full bg-gray-100" />
                        <div
                            data-gsap-line
                            className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-brand via-brand/70 to-brand/30"
                        />
                    </div>

                    <div data-gsap-grid className="grid gap-y-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.num}
                                    data-gsap
                                    className="group relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center"
                                >
                                    {/* Node badge */}
                                    <div
                                        data-gsap-node
                                        className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 transition-colors duration-300 lg:mb-0"
                                    >
                                        <Icon className="node-icon h-6 w-6" />
                                        <span className="node-badge absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-[10px] font-extrabold text-gray-400">
                                            {step.num}
                                        </span>
                                    </div>

                                    {/* Step card */}
                                    <div className="relative flex-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-gray-200/40 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-brand/25 group-hover:shadow-xl group-hover:shadow-brand/10 lg:mt-5 lg:w-full">
                                        <span className="pointer-events-none absolute right-4 top-2 select-none text-[48px] font-extrabold leading-none text-brand/10 transition-colors duration-300 group-hover:text-brand/20">
                                            {step.num}
                                        </span>
                                        <p className="text-[10px] font-semibold uppercase tracking-widest text-brand">
                                            Step {step.num}
                                        </p>
                                        <h3 className="mt-1 text-[15px] font-medium text-text-dark">
                                            {step.title}
                                        </h3>
                                        {step.desc ? (
                                            <p className="mt-1.5 text-[12.5px] leading-relaxed text-text-muted">
                                                {step.desc}
                                            </p>
                                        ) : (
                                            <ul className="mt-3 space-y-2">
                                                {step.items?.map((item) => {
                                                    const ItemIcon = item.icon;
                                                    return (
                                                        <li
                                                            key={item.label}
                                                            className="flex items-center gap-2 text-[12.5px] font-medium text-text-body"
                                                        >
                                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand-light text-brand">
                                                                <ItemIcon className="h-3 w-3" />
                                                            </span>
                                                            {item.label}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
