"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineLockClosed } from "react-icons/hi";

interface Method {
  image: string;
  label: string;
}

interface PaymentGatewayProps {
  heading?: string;
  headingHighlight?: string;
  eyebrow?: string;
  description?: string;
  methods?: Method[];
  lockNote?: string;
}

const MEDIA = "/media/payment method";

const defaultMethods: Method[] = [
  { image: `${MEDIA}/amar-pay.png`, label: "AmarPay" },
  { image: `${MEDIA}/m-pesa.png`, label: "M-Pesa" },
  { image: `${MEDIA}/bkash.png`, label: "bKash" },
  { image: `${MEDIA}/rocket.png`, label: "Rocket" },
  { image: `${MEDIA}/npay.png`, label: "nPay" },
  { image: `${MEDIA}/paypal.png`, label: "PayPal" },
  { image: `${MEDIA}/stripe.png`, label: "Stripe" },
  { image: `${MEDIA}/paystack.png`, label: "Paystack" },
  { image: `${MEDIA}/google-pay.png`, label: "Google Pay" },
  { image: `${MEDIA}/apple-pay.png`, label: "Apple Pay" },
  { image: `${MEDIA}/ssl.png`, label: "SSLCommerz" },
  { image: `${MEDIA}/everypay.png`, label: "EveryPay" },
  { image: `${MEDIA}/pesapal.png`, label: "PesaPal" },
  { image: `${MEDIA}/dpo.png`, label: "DPO Group" },
  { image: `${MEDIA}/edahab.png`, label: "eDahab" },
  { image: `${MEDIA}/flutterwave.png`, label: "Flutterwave" },
  { image: `${MEDIA}/telesom_zaad.png`, label: "Telesom Zaad" },
  { image: `${MEDIA}/TeleBirr-Logo.png`, label: "TeleBirr" },
  { image: `${MEDIA}/vodafone.png`, label: "Vodafone Cash" },
  { image: `${MEDIA}/tngg.png`, label: "TNG Global" },
  { image: `${MEDIA}/Airtel-and-Comviva_IMTC.jpg`, label: "Airtel & Comviva IMTC" },
  { image: `${MEDIA}/t-ticketi.png`, label: "T-Ticketing" },
];

export default function PaymentGateway({
  heading = "Payment",
  headingHighlight = "Gateway",
  eyebrow,
  description = "Accept every payment your riders already use — cards, wallets, and contactless.",
  methods = defaultMethods,
  lockNote = "Encrypted end-to-end payments on every channel",
}: PaymentGatewayProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 28, stagger: 0.05 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute -left-32 -bottom-32 h-72 w-72 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-amber-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {eyebrow && (
            <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
              {eyebrow}
            </p>
          )}
          <h2
            data-gsap
            className={`text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px] ${
              eyebrow ? "mt-3" : ""
            }`}
          >
            {heading}{" "}
            <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              {headingHighlight}
            </span>
          </h2>
          <span className="mx-auto mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          <p data-gsap className="mx-auto mt-6 max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
            {description}
          </p>
        </div>

        {/* ── Methods board ── */}
        <div
          data-gsap
          className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-900/5 sm:p-10"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

          {/* Payment method logos */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {methods.map((m) => (
              <span
                key={m.label}
                className="flex h-16 items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 shadow-sm shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lg hover:shadow-brand/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.image}
                  alt={m.label}
                  title={m.label}
                  loading="lazy"
                  className="h-9 w-auto max-w-[130px] object-contain"
                />
              </span>
            ))}
          </div>
        </div>

        <p data-gsap className="mx-auto mt-6 flex items-center justify-center gap-1.5 text-[11.5px] text-text-muted">
          <HiOutlineLockClosed className="h-3.5 w-3.5" />
          {lockNote}
        </p>
      </div>
    </section>
  );
}