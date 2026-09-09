"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
  HiOutlineSearch,
  HiOutlineLightningBolt,
  HiOutlineTruck,
  HiOutlineLocationMarker,
  HiOutlineCreditCard,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Step {
  num: string;
  icon: IconType;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    icon: HiOutlineSearch,
    title: "Passenger requests a ride",
    desc: "They set pickup and drop-off in the app or on your site and see the fare estimate before confirming.",
  },
  {
    num: "02",
    icon: HiOutlineLightningBolt,
    title: "System dispatches a driver",
    desc: "The nearest free vehicle is matched and notified in seconds, with dispatcher override always available.",
  },
  {
    num: "03",
    icon: HiOutlineTruck,
    title: "Driver accepts and arrives",
    desc: "The rider watches the car approach in real time and gets an alert the moment it reaches the pickup point.",
  },
  {
    num: "04",
    icon: HiOutlineLocationMarker,
    title: "Trip runs on live GPS",
    desc: "Distance, time and waiting are metered as the trip progresses, and the route is recorded end to end.",
  },
  {
    num: "05",
    icon: HiOutlineCreditCard,
    title: "Fare settles automatically",
    desc: "Payment is captured by cash, card or wallet, a receipt is issued, and driver commission is calculated.",
  },
];

export default function TaxiJourney() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const cancel = onSmootherReady(() => {
      ctx = gsap.context(() => {
        const el = sectionRef.current;
        if (!el) return;

        gsap.fromTo(
          el.querySelectorAll("[data-gsap]"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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

        const rail = el.querySelector<HTMLElement>("[data-journey-rail]");
        if (rail) {
          gsap.set(rail, { scaleX: 0 });
          gsap.to(rail, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el.querySelector("[data-journey-grid]"),
              start: "top 72%",
              end: "bottom 65%",
              scrub: 0.5,
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
      <div className="pointer-events-none absolute -right-32 -top-20 h-80 w-80 rounded-full bg-brand/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            How It Works
          </p>
          <h2
            data-gsap
            className="mt-3 text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]"
          >
            How an Online Taxi Reservation System Works
          </h2>
          <p data-gsap className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]">
            Five stages from request to receipt — every one of them recorded
            against the same trip.
          </p>
        </div>

        <div data-journey-grid className="relative">
          <span
            data-journey-rail
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-0.5 origin-left bg-gradient-to-r from-brand via-brand/50 to-brand/10 lg:block"
          />

          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.num} data-gsap className="group relative">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/15 bg-white text-brand shadow-md shadow-brand/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                    <Icon className="h-6 w-6" />
                  </span>

                  <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand/60">
                    Step {s.num}
                  </p>
                  <h3 className="mt-1.5 text-[15.5px] font-semibold tracking-tight text-text-dark">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{s.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
