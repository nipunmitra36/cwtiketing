"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
    HiOutlinePaperAirplane,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

type FormState = "idle" | "sending" | "sent";

const BUSINESS_TYPES = [
    "Bus",
    "Train",
    "Event",
    "Taxi",
    "Cruise",
    "Cable Car",
    "Other",
];

const CONTACT_INFO = [
    {
        icon: FaWhatsapp,
        label: "WhatsApp",
        value: "+1 (415) 000-1234",
        href: "https://wa.me/14150001234",
        bg: "bg-emerald-50",
        color: "text-emerald-600",
    },
    {
        icon: HiOutlineMail,
        label: "Email",
        value: "hello@cwsticketing.com",
        href: "mailto:hello@cwsticketing.com",
        bg: "bg-sky-50",
        color: "text-sky-600",
    },
    {
        icon: HiOutlinePhone,
        label: "Phone",
        value: "+1 (415) 000-1234",
        href: "tel:+14150001234",
        bg: "bg-violet-50",
        color: "text-violet-600",
    },
    {
        icon: HiOutlineLocationMarker,
        label: "Office",
        value: "116 New Montgomery St, Suite 300, San Francisco, CA 94105",
        href: "https://maps.google.com/?q=37.7872,-122.4005",
        bg: "bg-orange-50",
        color: "text-orange-600",
    },
];

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState<FormState>("idle");
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        businessType: "",
        country: "",
        message: "",
    });

    useEffect(() => {
        let ctx: gsap.Context | null = null;

        const cancel = onSmootherReady(() => {
            ctx = gsap.context(() => {
                const formEl = formRef.current;
                const infoEl = infoRef.current;

                if (formEl) {
                    gsap.fromTo(
                        formEl,
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 80%",
                                toggleActions: "play none none none",
                                once: true,
                            },
                        }
                    );
                }

                if (infoEl) {
                    const items = infoEl.querySelectorAll("[data-info-card]");
                    if (items.length) {
                        gsap.fromTo(
                            items,
                            { opacity: 0, x: 30 },
                            {
                                opacity: 1,
                                x: 0,
                                duration: 0.5,
                                stagger: 0.1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: sectionRef.current,
                                    start: "top 75%",
                                    toggleActions: "play none none none",
                                    once: true,
                                },
                            }
                        );
                    }
                }
            }, sectionRef);
        });

        return () => {
            cancel();
            ctx?.revert();
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("sending");
        await new Promise((r) => setTimeout(r, 1200));
        setFormState("sent");
    };

    const inputCls =
        "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] text-text-dark placeholder-gray-400 outline-none transition focus:border-brand/40 focus:ring-2 focus:ring-brand/10";
    const labelCls = "mb-1.5 block text-[12px] font-semibold text-text-dark";

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-white py-16 lg:py-20"
        >
            <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand-light/60 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-brand/5 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="mt-4 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
                        Ready to Launch Your{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10">Ticket Booking Platform</span>
                            <span className="absolute bottom-1 left-0 right-0 h-3 rounded bg-brand/15" />
                        </span>
                        ?
                    </h2>
                    <p className="mt-3 text-[13px] leading-relaxed text-text-muted sm:text-[14px]">
                        Tell us about your business and we'll help you build the perfect
                        ticketing solution.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
                    {/* ── Form ── */}
                    <div ref={formRef}>
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/50 sm:p-8">
                            {formState === "sent" ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                                        <svg
                                            className="h-7 w-7 text-emerald-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-[17px] font-medium text-text-dark">
                                        Thank you!
                                    </p>
                                    <p className="mt-1 text-[13px] text-text-muted">
                                        We&apos;ll get back to you within 1 business day.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setFormState("idle");
                                            setForm({
                                                name: "",
                                                email: "",
                                                phone: "",
                                                company: "",
                                                businessType: "",
                                                country: "",
                                                message: "",
                                            });
                                        }}
                                        className="mt-6 rounded-xl border border-gray-200 px-5 py-2 text-[13px] font-medium text-text-muted transition hover:border-gray-300 hover:text-text-dark"
                                    >
                                        Send another request
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className={labelCls}>
                                                Name <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="John Doe"
                                                value={form.name}
                                                onChange={(e) =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        name: e.target.value,
                                                    }))
                                                }
                                                className={inputCls}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelCls}>
                                                Email <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="john@example.com"
                                                value={form.email}
                                                onChange={(e) =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        email: e.target.value,
                                                    }))
                                                }
                                                className={inputCls}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className={labelCls}>
                                                WhatsApp / Phone{" "}
                                                <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="+1 234 567 890"
                                                value={form.phone}
                                                onChange={(e) =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        phone: e.target.value,
                                                    }))
                                                }
                                                className={inputCls}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelCls}>Company name</label>
                                            <input
                                                type="text"
                                                placeholder="Your company"
                                                value={form.company}
                                                onChange={(e) =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        company: e.target.value,
                                                    }))
                                                }
                                                className={inputCls}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className={labelCls}>
                                                Business type{" "}
                                                <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                required
                                                value={form.businessType}
                                                onChange={(e) =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        businessType: e.target.value,
                                                    }))
                                                }
                                                className={`${inputCls} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23999%22%3E%3Cpath%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.17l3.71-3.94a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10`}
                                            >
                                                <option value="" disabled>
                                                    Select business type
                                                </option>
                                                {BUSINESS_TYPES.map((t) => (
                                                    <option key={t} value={t}>
                                                        {t}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelCls}>Country</label>
                                            <input
                                                type="text"
                                                placeholder="Your country"
                                                value={form.country}
                                                onChange={(e) =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        country: e.target.value,
                                                    }))
                                                }
                                                className={inputCls}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelCls}>
                                            Message{" "}
                                            <span className="text-rose-500">*</span>
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="Tell us about your project..."
                                            value={form.message}
                                            onChange={(e) =>
                                                setForm((f) => ({
                                                    ...f,
                                                    message: e.target.value,
                                                }))
                                            }
                                            className={`${inputCls} resize-none`}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={formState === "sending"}
                                        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold transition-all active:scale-[0.98] ${
                                            formState === "sending"
                                                ? "cursor-not-allowed bg-gray-400 text-white"
                                                : "bg-brand text-white hover:bg-brand-hover shadow-sm shadow-brand/20 hover:shadow-md hover:shadow-brand/30"
                                        }`}
                                    >
                                        {formState === "sending" ? (
                                            <>
                                                <svg
                                                    className="h-4 w-4 animate-spin"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8z"
                                                    />
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <HiOutlinePaperAirplane className="h-4 w-4 -rotate-45" />
                                                Request Free Consultation
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* ── Contact Info ── */}
                    <div ref={infoRef} className="flex flex-col gap-4">
                        {CONTACT_INFO.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.label}
                                    data-info-card
                                    href={item.href}
                                    target={
                                        item.href.startsWith("http")
                                            ? "_blank"
                                            : undefined
                                    }
                                    rel={
                                        item.href.startsWith("http")
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-gray-200/60"
                                >
                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bg}`}
                                    >
                                        <Icon className={`h-5 w-5 ${item.color}`} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                                            {item.label}
                                        </p>
                                        <p className="truncate text-[14px] font-semibold text-text-dark">
                                            {item.value}
                                        </p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
