"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineCalendar,
  HiOutlineTicket,
  HiOutlineCreditCard,
  HiOutlineChatAlt2,
  HiOutlineColorSwatch,
  HiOutlineQrcode,
  HiOutlineCheck,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Feature {
  icon: IconType;
  title: string;
  desc: string;
  tags: string[];
  wide?: boolean;
}

const FEATURES: Feature[] = [
  {
    icon: HiOutlineCalendar,
    title: "Easy Event Creation",
    desc: "Event planning is already stressful without the ticketing part — why make it more troubling? Skip the hassle of the traditional ticketing process. The CW event ticketing system is easily customized to fit your event's needs, letting you sell tickets online for any type of event.",
    tags: ["Set the date", "Add the gallery", "Price the tiers", "Go live"],
    wide: true,
  },
  {
    icon: HiOutlineTicket,
    title: "Multiple Ticket Types",
    desc: "Sort your event tickets into categories such as VIP, general and early bird. You can also categorize tickets into no-seat and seat types, or by age and gender.",
    tags: ["VIP", "General", "Early bird"],
  },
  {
    icon: HiOutlineCreditCard,
    title: "Payment Gateway",
    desc: "Make your audience feel secure and comfortable with our multiple secure payment gateways — an array of payment options so attendees purchase tickets easily.",
    tags: ["Cards", "Mobile wallets", "Net banking"],
  },
  {
    icon: HiOutlineChatAlt2,
    title: "SMS Verification",
    desc: "Keep gatecrashers away and make your events more secure. SMS verification is a great way to verify attendees, since the user can access the SMS from anywhere.",
    tags: ["OTP login", "Booking alerts"],
  },
  {
    icon: HiOutlineColorSwatch,
    title: "Tailored Ticket Design",
    desc: "We provide customized ticket designs to meet your event's needs. Whether you want to add or modify any fields, or change the design entirely, we will do it for you.",
    tags: ["Custom fields", "Your branding"],
  },
  {
    icon: HiOutlineQrcode,
    title: "Ticket Validation Checker",
    desc: "Keep your event safe from gatecrashers and let only valid attendees in. It is also the quickest way for your attendees to join the event.",
    tags: ["QR scan", "Instant check"],
  },
];

export default function EventOnlineFeatures() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.07 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="event-features"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-80 w-80 rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p
            data-gsap
            className="text-[13px] font-semibold uppercase tracking-widest text-brand"
          >
            Get Ready To Be Online
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            Everything Your Event Needs, From Setup to the Front Gate
          </h2>
          <p
            data-gsap
            className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
          >
            Six essentials that turn ticket management from a scary affair into
            a few clicks — so you can host happy and sell out.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <article
                key={f.title}
                data-gsap
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-gray-50/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:bg-white hover:shadow-xl hover:shadow-brand/10 sm:p-7 ${
                  f.wide ? "sm:col-span-2" : ""
                }`}
              >
                {/* top accent line */}
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-dark transition-transform duration-300 group-hover:scale-x-100" />

                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-gray-100 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-5.5 w-5.5" />
                </span>

                <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-text-dark sm:text-[17px]">
                  {f.title}
                </h3>
                <p
                  className={`mt-2.5 text-[13.5px] leading-relaxed text-text-muted ${
                    f.wide ? "max-w-2xl" : ""
                  }`}
                >
                  {f.desc}
                </p>

                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {f.tags.map((tag) => (
                    <li
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11.5px] font-medium text-text-body transition-colors group-hover:border-brand/20"
                    >
                      <HiOutlineCheck className="h-3 w-3 text-brand" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
