"use client";

import { useEffect, useRef, useState } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineCheck, HiOutlinePaperAirplane } from "react-icons/hi";

type FormState = "idle" | "sending" | "sent";

const checklist = [
  "Simple setup, built for fast launch",
  "Live seat maps and real payments from day one",
  "One platform for your entire operation",
  "Trusted for scaling fleets",
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    company: "",
    fleetSize: "",
    message: "",
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.1 });
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
      id="book-a-demo"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-brand-light/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[360px] w-[360px] rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-center lg:gap-16">
          {/* ── Left: copy ── */}
          <div data-gsap>
            <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">
              Final Stop
            </p>
            <h2 className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[30px] sm:leading-snug">
              Book a Demo With Our Experts
            </h2>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-text-muted">
              See exactly how CW Ticketing works for your operation — live,
              with someone who knows transport booking.
            </p>
            <ul className="mt-7 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <HiOutlineCheck className="h-3 w-3" />
                  </span>
                  <span className="text-[13.5px] leading-snug text-text-dark">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: form ── */}
          <div data-gsap>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/50 sm:p-8">
              {formState === "sent" ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                    <HiOutlineCheck className="h-7 w-7 text-emerald-600" />
                  </div>
                  <p className="text-[17px] font-medium text-text-dark">Thank you!</p>
                  <p className="mt-1 text-[13px] text-text-muted">
                    Our sales team will reach out within 1 business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-[14px] font-semibold text-text-dark">Contact Our Sales Team</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>
                        First name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={form.firstName}
                        onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>
                        Last name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={form.lastName}
                        onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>
                      Work email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Job title</label>
                    <input
                      type="text"
                      value={form.jobTitle}
                      onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>
                      Company name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Fleet size</label>
                    <input
                      type="text"
                      placeholder="e.g. 10-25 buses"
                      value={form.fleetSize}
                      onChange={(e) => setForm((f) => ({ ...f, fleetSize: e.target.value }))}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your routes and what you'd like to manage with CW Ticketing"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
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
                      "Sending..."
                    ) : (
                      <>
                        <HiOutlinePaperAirplane className="h-4 w-4 -rotate-45" />
                        Contact Sales
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] leading-relaxed text-text-muted">
                    By submitting this form, you agree to CW Ticketing&apos;s
                    Privacy Policy and consent to be contacted about this
                    request.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
