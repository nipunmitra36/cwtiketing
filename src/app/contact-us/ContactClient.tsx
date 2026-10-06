"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
  HiOutlineExclamation,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import TurnstileWidget from "@/components/TurnstileWidget";
import {
  CONTACT_TOPICS,
  submitContact,
  type ContactDebugInfo,
  type ContactFieldErrors,
} from "@/lib/contact";

// ─── Types ─────────────────────────────────────────────────────────────────────
type FormStatus = "idle" | "sending" | "sent";

const EMPTY_FORM = { full_name: "", email: "", message: "" };

const noopSubscribe = () => () => {};

// ─── Constants ─────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const EMAIL = "info@cwticketingsystem.com";
const WHATSAPP = "+8801614000401";
const MOBILE = "+8801672691228";

const OFFICE = {
  city: "Dhaka",
  role: "Head Office",
  address: "House #629-685, Road # 12, Baitul Aman Housing Society",
  zip: "Adabor, Mohammadpur, Dhaka-1207, BD",
  mapQuery: "Baitul Aman Housing Society, Adabor, Mohammadpur, Dhaka 1207",
};

const TOPICS = CONTACT_TOPICS;

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

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
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

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ContactClient() {
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [topicOpen, setTopicOpen] = useState(false);
  const topicRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState(EMPTY_FORM);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string>("");
  // `?debug=1` shows the exact payload sent and the API's reply under the form.
  const debugMode = useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get("debug") === "1",
    () => false,
  );
  const [debugInfo, setDebugInfo] = useState<ContactDebugInfo | null>(null);

  const office = OFFICE;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&z=16&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`;

  useEffect(() => {
    if (!topicOpen) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!topicRef.current?.contains(e.target as Node)) setTopicOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTopicOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [topicOpen]);

  const sending = status === "sending";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    if (!turnstileToken) {
      setFormError("Verifying you're human — please wait a moment and press Send again (captcha).");
      return;
    }

    setStatus("sending");
    setFormError(null);
    setFieldErrors({});

    // Honeypot: real users never see this input, bots usually fill it in.
    const data = honeypot
      ? { ok: true as const }
      : await submitContact(
          {
            full_name: form.full_name.trim(),
            email: form.email.trim().toLowerCase(),
            topic,
            message: form.message.trim(),
          },
          turnstileToken,
          (info) => {
            console.info("[contact] submit", info);
            setDebugInfo(info);
          },
        );

    // Tokens are single-use: always get a fresh one for the next attempt.
    setTurnstileToken("");
    setCaptchaKey((k) => k + 1);

    if (data.ok) {
      setSentTo(form.email.trim());
      setForm(EMPTY_FORM);
      setHoneypot("");
      setStatus("sent");
      return;
    }

    if (data.fieldErrors) setFieldErrors(data.fieldErrors);
    setFormError(data.message);
    setStatus("idle");
  };

  const resetForm = () => {
    setStatus("idle");
    setForm(EMPTY_FORM);
    setFieldErrors({});
    setFormError(null);
    setSentTo("");
    setHoneypot("");
    setTurnstileToken("");
    setCaptchaKey((k) => k + 1);
    setTopic(TOPICS[0]);
  };

  const inputCls =
    "w-full rounded-xl border bg-white px-4 py-2.5 text-[13px] text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-brand/15";
  const okCls = "border-gray-200 focus:border-brand focus:ring-brand/15";
  const errCls = "border-rose-300 focus:border-rose-400 focus:ring-rose-100";
  const fieldCls = (field: keyof typeof EMPTY_FORM) =>
    `${inputCls} ${fieldErrors[field] ? errCls : okCls}`;
  const errorTextCls = "mt-1.5 text-[12px] font-medium text-rose-600";

  return (
    <main className="min-h-screen bg-gray-50">
      <p className="sr-only" role="status" aria-live="polite">
        {status === "sent"
          ? "Thank you. Your message has been sent to our team."
          : (formError ?? "")}
      </p>

      {/* ─── Hero header ─── */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:pt-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
            className="max-w-xl"
          >
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[12px] font-medium text-gray-500">
              <HiOutlineChat className="h-3.5 w-3.5" />
              We&apos;d love to hear from you
            </span>
            <h1 className="mb-3 text-4xl font-medium tracking-tight text-gray-900">
              Get in Touch
            </h1>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Have a question, a project in mind, or just want to say hello? Our team is ready and
              waiting — usually within one business day.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[12px] font-medium text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              All systems operational
            </span>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ─── Top grid: form + info ─── */}
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* ─── Contact Form ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.05 } }}
          >
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-1 text-xl font-medium text-gray-900">Send us a message</h2>
              <p className="mb-6 text-[13px] text-gray-500">
                Fill in the form and we&apos;ll get back to you shortly.
              </p>

              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE } }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                      <HiOutlineCheck className="h-8 w-8 text-emerald-600" />
                    </div>
                    <p className="text-[20px] font-semibold tracking-tight text-gray-900">
                      Your message has been submitted.
                    </p>
                    <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-gray-500">
                      Thanks for reaching out about{" "}
                      <span className="font-semibold text-gray-700">{topic}</span>. Our team has
                      your enquiry and will reply to{" "}
                      <span className="font-semibold text-gray-700">{sentTo}</span> within one
                      business day — usually a lot sooner.
                    </p>
                    <p className="mt-4 max-w-sm rounded-xl bg-brand-light px-4 py-3 text-[12px] leading-relaxed text-brand-dark">
                      Need it handled urgently? Call{" "}
                      <a href={`tel:${MOBILE}`} className="font-semibold underline">
                        {MOBILE}
                      </a>{" "}
                      or message us on{" "}
                      <a
                        href={`https://wa.me/${WHATSAPP.slice(1)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline"
                      >
                        WhatsApp
                      </a>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="mt-7 rounded-xl border border-gray-200 px-5 py-2 text-[13px] font-medium text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
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
                    noValidate
                    className="relative space-y-4"
                  >
                    {formError && (
                      <div
                        role="alert"
                        className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-700"
                      >
                        <HiOutlineExclamation className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Name + Email */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="full_name"
                          className="mb-1.5 block text-[12px] font-semibold text-gray-700"
                        >
                          Full name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="full_name"
                          name="full_name"
                          required
                          autoComplete="name"
                          maxLength={120}
                          placeholder="Alex Johnson"
                          value={form.full_name}
                          onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                          aria-invalid={Boolean(fieldErrors.full_name)}
                          aria-describedby={fieldErrors.full_name ? "full_name-error" : undefined}
                          className={fieldCls("full_name")}
                        />
                        {fieldErrors.full_name && (
                          <p id="full_name-error" className={errorTextCls}>
                            {fieldErrors.full_name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block text-[12px] font-semibold text-gray-700"
                        >
                          Email address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          maxLength={180}
                          placeholder="alex@example.com"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          aria-invalid={Boolean(fieldErrors.email)}
                          aria-describedby={fieldErrors.email ? "email-error" : undefined}
                          className={fieldCls("email")}
                        />
                        {fieldErrors.email && (
                          <p id="email-error" className={errorTextCls}>
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Honeypot — hidden from people, tempting for bots */}
                    <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {/* Topic */}
                    <div ref={topicRef}>
                      <label
                        id="topic-label"
                        className="mb-1.5 block text-[12px] font-semibold text-gray-700"
                      >
                        Topic <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setTopicOpen((p) => !p)}
                          aria-haspopup="listbox"
                          aria-expanded={topicOpen}
                          aria-labelledby="topic-label"
                          className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-2.5 text-[13px] text-gray-900 outline-none transition ${
                            fieldErrors.topic
                              ? "border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                              : "border-gray-200 hover:border-gray-300 focus:border-brand focus:ring-2 focus:ring-brand/15"
                          }`}
                        >
                          {topic}
                          <HiOutlineChevronDown
                            className={`h-4 w-4 text-gray-400 transition-transform ${topicOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {topicOpen && (
                            <motion.div
                              role="listbox"
                              initial={{ opacity: 0, y: 6, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: EASE } }}
                              exit={{ opacity: 0, y: 4, scale: 0.97, transition: { duration: 0.12 } }}
                              className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
                            >
                              {TOPICS.map((t) => (
                                <button
                                  type="button"
                                  role="option"
                                  aria-selected={t === topic}
                                  key={t}
                                  onClick={() => {
                                    setTopic(t);
                                    setTopicOpen(false);
                                  }}
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
                      {fieldErrors.topic && <p className={errorTextCls}>{fieldErrors.topic}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-[12px] font-semibold text-gray-700"
                      >
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        maxLength={2000}
                        placeholder="Tell us how we can help&hellip;"
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        aria-invalid={Boolean(fieldErrors.message)}
                        aria-describedby={fieldErrors.message ? "message-error" : undefined}
                        className={`${fieldCls("message")} resize-none`}
                      />
                      {fieldErrors.message ? (
                        <p id="message-error" className={errorTextCls}>
                          {fieldErrors.message}
                        </p>
                      ) : (
                        <p className="mt-1.5 text-[12px] text-gray-400">
                          The more detail you share, the faster we can point you to the right person.
                        </p>
                      )}
                    </div>

                    {/* Cloudflare Turnstile — bot protection */}
                    <div className="min-h-[65px] pt-1">
                      <TurnstileWidget
                        key={captchaKey}
                        onVerify={(token) => {
                          setTurnstileToken(token);
                          setFormError((prev) =>
                            prev && /captcha/i.test(prev) ? null : prev,
                          );
                        }}
                        // The widget refreshes expired tokens on its own.
                        onExpire={() => setTurnstileToken("")}
                        onError={() => {
                          setTurnstileToken("");
                          setFormError("Captcha couldn't load. Please refresh the page and try again.");
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      aria-busy={sending}
                      className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold transition-all active:scale-[0.98] ${
                        sending
                          ? "cursor-not-allowed bg-gray-400 text-white"
                          : "bg-brand text-white hover:bg-brand-hover"
                      }`}
                    >
                      {sending ? (
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
                          Sending&hellip;
                        </>
                      ) : (
                        <>
                          <HiOutlinePaperAirplane className="h-4 w-4 -rotate-45" />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] leading-relaxed text-gray-400">
                      We only use your details to reply to this enquiry. No spam, ever.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>

              {debugMode && (
                <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 font-mono text-[11px] leading-relaxed text-gray-700">
                  <p className="mb-2 font-sans text-[12px] font-semibold text-gray-900">
                    Debug: last submit
                  </p>
                  {debugInfo ? (
                    <>
                      <p>
                        POST {debugInfo.url} · {debugInfo.at}
                      </p>
                      <p
                        className={`mt-1 font-semibold ${
                          typeof debugInfo.status === "number" && debugInfo.status < 300
                            ? "text-emerald-700"
                            : "text-rose-700"
                        }`}
                      >
                        Status: {debugInfo.status}
                      </p>
                      <p className="mt-3 font-sans font-semibold">Payload</p>
                      <pre className="overflow-x-auto whitespace-pre-wrap break-all">
                        {JSON.stringify(debugInfo.payload, null, 2)}
                      </pre>
                      <p className="mt-3 font-sans font-semibold">Response</p>
                      <pre className="overflow-x-auto whitespace-pre-wrap break-all">
                        {JSON.stringify(debugInfo.response, null, 2)}
                      </pre>
                    </>
                  ) : (
                    <p>Submit the form to see the payload and the API response here.</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* ─── Contact Info ─── */}
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
                value: EMAIL,
                sub: "We reply within 1 business day",
                href: `mailto:${EMAIL}`,
                color: "bg-sky-50 text-sky-600",
                external: false,
              },
              {
                icon: <FaWhatsapp className="h-5 w-5" />,
                label: "WhatsApp",
                value: WHATSAPP,
                sub: "Chat with our team",
                href: `https://wa.me/${WHATSAPP.slice(1)}`,
                color: "bg-emerald-50 text-emerald-600",
                external: true,
              },
              {
                icon: <HiOutlinePhone className="h-5 w-5" />,
                label: "Call us",
                value: MOBILE,
                sub: "Talk to sales or support",
                href: `tel:${MOBILE}`,
                color: "bg-violet-50 text-violet-600",
                external: false,
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                    {item.label}
                  </p>
                  <p className="truncate text-[14px] font-semibold text-gray-900">{item.value}</p>
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
                <div
                  key={r.day}
                  className="flex justify-between border-b border-gray-100 py-1.5 text-[13px] last:border-0"
                >
                  <span className="text-gray-600">{r.day}</span>
                  <span
                    className={`font-medium ${r.hours === "Closed" ? "text-gray-400" : "text-gray-900"}`}
                  >
                    {r.hours}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── Offices + Map ─── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.2 } }}
          className="mt-14"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium text-gray-900">Our Office</h2>
              <p className="mt-1 text-[14px] text-gray-500">Visit us at our Dhaka head office.</p>
            </div>
          </div>

          {/* Map + office detail */}
          <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-[1fr_320px]">
            {/* Map iframe */}
            <div className="relative min-h-[360px] overflow-hidden">
              <iframe
                title={`${office.city} office map`}
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0, minHeight: 360 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc}
                className="absolute inset-0 h-full w-full"
              />
            </div>

            {/* Office info panel */}
            <div className="flex flex-col justify-between border-t border-gray-200 p-6 lg:border-l lg:border-t-0">
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
                    <div className="flex flex-col gap-1">
                      <a
                        href={`tel:${WHATSAPP}`}
                        className="text-[13px] text-gray-900 transition hover:text-gray-600"
                      >
                        {WHATSAPP}
                      </a>
                      <a
                        href={`tel:${MOBILE}`}
                        className="text-[13px] text-gray-900 transition hover:text-gray-600"
                      >
                        {MOBILE}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <HiOutlineMail className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                    <a
                      href={`mailto:${EMAIL}`}
                      className="break-all text-[13px] text-gray-900 transition hover:text-gray-600"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </div>
              </div>

              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-[13px] font-medium text-gray-700 transition hover:border-gray-300 hover:text-gray-900"
              >
                <HiOutlineLocationMarker className="h-4 w-4" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </motion.section>

        {/* ─── FAQ ─── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.26 } }}
          className="mt-14"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-medium text-gray-900">Frequently asked questions</h2>
            <p className="mt-1 text-[14px] text-gray-500">Quick answers before you hit send.</p>
          </div>
          <div className="max-w-3xl rounded-2xl border border-gray-200 bg-white px-6 py-2 shadow-sm sm:px-8">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
