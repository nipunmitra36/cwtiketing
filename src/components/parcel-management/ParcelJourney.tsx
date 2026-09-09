"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
  HiOutlineCube,
  HiOutlineQrcode,
  HiOutlineOfficeBuilding,
  HiOutlineTruck,
  HiOutlineCheckCircle,
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
    icon: HiOutlineCube,
    title: "Book the parcel",
    desc: "Counter staff record sender, receiver, weight and service type; the system prices it instantly.",
  },
  {
    num: "02",
    icon: HiOutlineQrcode,
    title: "Print the waybill",
    desc: "A barcoded label goes on the parcel and becomes its identity for the rest of the journey.",
  },
  {
    num: "03",
    icon: HiOutlineOfficeBuilding,
    title: "Move through hubs",
    desc: "Each branch and sorting hub scans the parcel in and out, building a complete chain of custody.",
  },
  {
    num: "04",
    icon: HiOutlineTruck,
    title: "Assign to a rider",
    desc: "The parcel joins a rider's delivery list, and the receiver gets an SMS that it is on the way.",
  },
  {
    num: "05",
    icon: HiOutlineCheckCircle,
    title: "Deliver & settle",
    desc: "Proof of delivery is captured, cash on delivery is collected, and the branch account reconciles.",
  },
];

export default function ParcelJourney() {
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
            The Parcel Journey, End to End
          </h2>
          <p data-gsap className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]">
            Five stages, one record — every scan adds to the same parcel
            history instead of a separate ledger.
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
