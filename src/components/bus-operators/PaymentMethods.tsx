"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";

const MEDIA = "/media/payment method";

const methods: { image: string; label: string }[] = [
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

export default function PaymentMethods() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 28, stagger: 0.04 });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gray-50 py-16 lg:py-20">
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
          Payment Gateway
        </h2>
<div data-gsap className="mx-auto mt-9 flex flex-wrap items-center justify-center gap-3">
          {methods.map((m) => (
            <span
              key={m.label}
              className="flex h-16 items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 shadow-sm shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lg hover:shadow-brand/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.image}
                alt={m.label}
                loading="lazy"
                className="h-9 w-auto max-w-[130px] object-contain"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}