"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
    HiOutlineChat,
    HiOutlineCog,
    HiOutlineLink,
    HiOutlinePaperAirplane,
    HiOutlineSupport,
} from "react-icons/hi";

const steps = [
    {
        num: "01",
        icon: HiOutlineChat,
        title: "Consultation",
        desc: "We learn about your business, routes, and requirements to design the perfect solution.",
    },
    {
        num: "02",
        icon: HiOutlineCog,
        title: "Customization",
        desc: "We tailor the platform to your brand, configure fare rules, seat maps, and integrations.",
    },
    {
        num: "03",
        icon: HiOutlineLink,
        title: "Integration",
        desc: "Seamless connection with your payment gateways, SMS/email providers, and existing tools.",
    },
    {
        num: "04",
        icon: HiOutlinePaperAirplane,
        title: "Launch",
        desc: "Go live with your fully tested platform. We handle migration, setup, and staff training.",
    },
    {
        num: "05",
        icon: HiOutlineSupport,
        title: "Support",
        desc: "24/7 ongoing support, regular updates, and a dedicated account manager for your success.",
    },
];

export default function HowItWorks() {
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
                    stagger: 0.12,
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
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span
                        data-gsap
                        className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-3 py-1 text-[12px] font-medium text-brand"
                    >
                        Your journey
                    </span>
                    <h2
                        data-gsap
                        className="mt-4 text-3xl font-bold tracking-tight text-text-dark sm:text-4xl"
                    >
                        How It Works
                    </h2>
                    <p
                        data-gsap
                        className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]"
                    >
                        From consultation to launch, we guide you through every step.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-brand via-brand/40 to-transparent lg:block" />

                    <div className="space-y-8 lg:space-y-0">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.num}
                                    data-gsap
                                    className={`relative flex flex-col gap-4 lg:flex-row lg:items-start ${
                                        i % 2 === 0 ? "" : "lg:flex-row-reverse"
                                    }`}
                                >
                                    <div className="hidden lg:block lg:w-1/2" />

                                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/30 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div
                                        className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/50 lg:w-1/2 ${
                                            i % 2 === 0
                                                ? "lg:pr-12 lg:text-right"
                                                : "lg:pl-12"
                                        }`}
                                    >
                                        <span className="text-[11px] font-semibold uppercase tracking-widest text-brand">
                                            Step {step.num}
                                        </span>
                                        <h3 className="mt-1 text-[17px] font-bold text-text-dark sm:text-[18px]">
                                            {step.title}
                                        </h3>
                                        <p className="mt-2 text-[13.5px] leading-relaxed text-text-muted">
                                            {step.desc}
                                        </p>
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
