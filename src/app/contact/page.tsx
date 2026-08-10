"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineCheck,
  HiOutlineChevronDown,
  HiOutlinePaperAirplane,
  HiOutlineChat,
  HiOutlineOfficeBuilding,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

// ── Types ─────────────────────────────────────────────────────────────────────
type FormState = "idle" | "sending" | "sent" | "error";

// ── Constants ─────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const OFFICES = [
  {
    city: "San Francisco",
    role: "Headquarters",
    address: "116 New Montgomery St, Suite 300",
    zip: "San Francisco, CA 94105",
    phone: "+1 (415) 000-1234",
    email: "sf@stellar.co",
    hours: "Mon–Fri, 9am – 6pm PST",
    lat: 37.7872,
    lng: -122.4005,
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1!2d-122.4005!3d37.7872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ3JzE0LjAiTiAxMjLCsDI0JzAxLjgiVw!5e0!3m2!1sen!2sus!4v1",
    active: true,
  },
  {
    city: "New York",
    role: "East Coast",
    address: "350 Fifth Avenue, Floor 21",
    zip: "New York, NY 10118",
    phone: "+1 (212) 000-5678",
    email: "nyc@stellar.co",
    hours: "Mon–Fri, 9am – 6pm EST",
    lat: 40.7484,
    lng: -73.9967,
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6!2d-73.9967!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknNDguMSJX!5e0!3m2!1sen!2sus!4v1",
    active: false,
  },
  {
    city: "London",
    role: "EMEA",
    address: "1 Canada Square, Canary Wharf",
    zip: "London E14 5AB, UK",
    phone: "+44 20 0000 9012",
    email: "london@stellar.co",
    hours: "Mon–Fri, 9am – 6pm GMT",
    lat: 51.5049,
    lng: -0.0196,
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.9!2d-0.0196!3d51.5049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzE3LjYiTiAwwrAwMScxMC42Ilc!5e0!3m2!1sen!2sus!4v1",
    active: false,
  },
];

const TOPICS = [
  "Sales & Pricing",
  "Technical Support",
  "Order & Shipping",
  "Press & Media",
  "Partnerships",
  "General Enquiry",
];

const FAQS = [
  {
    q: "What's the typical response time?",
    a: "We respond to all enquiries within 1 business day. Priority support customers receive responses within 4 hours.",
  },
  {
    q: "Do you offer phone support?",
    a: "Phone support is available for Enterprise customers. All other tiers receive chat and email support.",
  },
  {
    q: "Can I schedule a product demo?",
    a: "Absolutely — use the contact form and select 'Sales & Pricing'. Our team will set up a call at your convenience.",
  },
  {
    q: "Where do I track my order?",
    a: "Order tracking links are emailed at dispatch. You can also visit the Orders section in your account dashboard.",
  },
];

// ── FAQ Accordion ─────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between py-4 text-left text-[14px] font-semibold text-gray-900"
      >
        {q}
        <HiOutlineChevronDown
          className={`ml-4 h-4 w-4 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.3, ease: EASE } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-[13px] leading-relaxed text-gray-500">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [activeOffice, setActiveOffice] = useState(0);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [topicOpen, setTopicOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const office = OFFICES[activeOffice];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    await new Promise((r) => setTimeout(r, 1400));
    setFormState("sent");
  };

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-900/10";

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Hero header ── */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:pt-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
            className="max-w-xl"
          >
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[12px] font-medium text-gray-500">
              <HiOutlineChat className="h-3.5 w-3.5" />
              We'd love to hear from you
            </span>
            <h1 className="mb-3 text-4xl font-medium tracking-tight text-gray-900">
              Get in Touch
            </h1>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Have a question, a project in mind, or just want to say hello? Our team is ready and
              waiting — usually within one business day.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* ── Top grid: form + info ── */}
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* ── Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.05 } }}
          >
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-1 text-xl font-medium text-gray-900">Send us a message</h2>
              <p className="mb-6 text-[13px] text-gray-500">
                Fill in the form and we'll get back to you shortly.
              </p>

              <AnimatePresence mode="wait">
                {formState === "sent" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE } }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                      <HiOutlineCheck className="h-7 w-7 text-emerald-600" />
                    </div>
                    <p className="text-[17px] font-medium text-gray-900">Message sent!</p>
                    <p className="mt-1 text-[13px] text-gray-500">
                      Thanks, {form.name.split(" ")[0] || "there"}. We'll be in touch soon.
                    </p>
                    <button
                      onClick={() => { setFormState("idle"); setForm({ name: "", email: "", message: "" }); }}
                      className="mt-6 rounded-xl border border-gray-200 px-5 py-2 text-[13px] font-medium text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Name + Email */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-[12px] font-semibold text-gray-700">
                          Full name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Alex Johnson"
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[12px] font-semibold text-gray-700">
                          Email address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="alex@example.com"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Topic */}
                    <div>
                      <label className="mb-1.5 block text-[12px] font-semibold text-gray-700">
                        Topic
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setTopicOpen((p) => !p)}
                          className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] text-gray-900 outline-none transition hover:border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-900/10"
                        >
                          {topic}
                          <HiOutlineChevronDown
                            className={`h-4 w-4 text-gray-400 transition-transform ${topicOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {topicOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: EASE } }}
                              exit={{ opacity: 0, y: 4, scale: 0.97, transition: { duration: 0.12 } }}
                              className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
                            >
                              {TOPICS.map((t) => (
                                <button
                                  type="button"
                                  key={t}
                                  onClick={() => { setTopic(t); setTopicOpen(false); }}
                                  className={`flex w-full items-center justify-between px-4 py-2.5 text-[13px] transition-colors hover:bg-gray-50 ${
                                    t === topic ? "font-semibold text-gray-900" : "text-gray-600"
                                  }`}
                                >
                                  {t}
                                  {t === topic && <HiOutlineCheck className="h-4 w-4 text-gray-900" />}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-1.5 block text-[12px] font-semibold text-gray-700">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell us how we can help…"
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
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-brand text-white hover:bg-brand-hover"
                      }`}
                    >
                      {formState === "sending" ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <HiOutlinePaperAirplane className="h-4 w-4 -rotate-45" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.12 } }}
            className="flex flex-col gap-5"
          >
            {/* Quick links */}
            {[
              {
                icon: <HiOutlineMail className="h-5 w-5" />,
                label: "Email us",
                value: "hello@stellar.co",
                sub: "We reply within 1 business day",
                href: "mailto:hello@stellar.co",
                color: "bg-sky-50 text-sky-600",
              },
              {
                icon: <HiOutlinePhone className="h-5 w-5" />,
                label: "Call us",
                value: "+1 (415) 000-1234",
                sub: "Mon–Fri, 9am – 6pm PST",
                href: "tel:+14150001234",
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                icon: <HiOutlineGlobeAlt className="h-5 w-5" />,
                label: "Live chat",
                value: "Open chat",
                sub: "Available during business hours",
                href: "#",
                color: "bg-violet-50 text-violet-600",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                    {item.label}
                  </p>
                  <p className="text-[14px] font-semibold text-gray-900 truncate">{item.value}</p>
                  <p className="text-[12px] text-gray-400">{item.sub}</p>
                </div>
              </a>
            ))}

            {/* Hours card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <HiOutlineClock className="h-4 w-4 text-gray-400" />
                <p className="text-[12px] font-semibold uppercase tracking-widest text-gray-400">
                  Business Hours
                </p>
              </div>
              {[
                { day: "Monday – Friday", hours: "9:00 am – 6:00 pm" },
                { day: "Saturday", hours: "10:00 am – 2:00 pm" },
                { day: "Sunday", hours: "Closed" },
              ].map((r) => (
                <div key={r.day} className="flex justify-between py-1.5 text-[13px] border-b border-gray-100 last:border-0">
                  <span className="text-gray-600">{r.day}</span>
                  <span className={`font-medium ${r.hours === "Closed" ? "text-gray-400" : "text-gray-900"}`}>
                    {r.hours}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Offices + Map ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.2 } }}
          className="mt-14"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium text-gray-900">Our Offices</h2>
              <p className="mt-1 text-[14px] text-gray-500">Three offices, one global team.</p>
            </div>
          </div>

          {/* Office tab pills */}
          <div className="mb-5 flex flex-wrap gap-2">
            {OFFICES.map((o, i) => (
              <button
                key={o.city}
                onClick={() => setActiveOffice(i)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-[13px] font-medium transition-all ${
                  activeOffice === i
                    ? "border-brand bg-brand text-white shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <HiOutlineOfficeBuilding className="h-4 w-4" />
                {o.city}
                <span className={`text-[11px] ${activeOffice === i ? "text-gray-400" : "text-gray-400"}`}>
                  {o.role}
                </span>
              </button>
            ))}
          </div>

          {/* Map + office detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOffice}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-[1fr_320px]"
            >
              {/* Map iframe */}
              <div className="relative min-h-[360px] overflow-hidden">
                <iframe
                  title={`${office.city} office map`}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  style={{ border: 0, minHeight: 360 }}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${office.lat},${office.lng}&z=15&output=embed`}
                  className="absolute inset-0 h-full w-full"
                />
              </div>

              {/* Office info panel */}
              <div className="flex flex-col justify-between border-l border-gray-200 p-6">
                <div>
                  <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                    {office.role}
                  </p>
                  <h3 className="mb-4 text-xl font-medium text-gray-900">{office.city}</h3>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <HiOutlineLocationMarker className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                      <div>
                        <p className="text-[13px] font-medium text-gray-900">{office.address}</p>
                        <p className="text-[13px] text-gray-500">{office.zip}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <HiOutlinePhone className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                      <a href={`tel:${office.phone}`} className="text-[13px] text-gray-900 hover:text-gray-600 transition">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex gap-3">
                      <HiOutlineMail className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                      <a href={`mailto:${office.email}`} className="text-[13px] text-gray-900 hover:text-gray-600 transition">
                        {office.email}
                      </a>
                    </div>
                    <div className="flex gap-3">
                      <HiOutlineClock className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                      <p className="text-[13px] text-gray-500">{office.hours}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://maps.google.com/?q=${office.lat},${office.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-[13px] font-medium text-gray-700 transition hover:border-gray-300 hover:text-gray-900"
                >
                  <HiOutlineLocationMarker className="h-4 w-4" />
                  Open in Google Maps
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.section>
      </div>
    </main>
  );
}