"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";

const MEDIA = "/media/bus-operators";

const reasons: { title: string; desc: string; image: string }[] = [
  {
    title: "Built for Real-World Bus Operations",
    desc: "CWTicketing takes the hassle out of running intercity routes. You can manage schedules, track seat availability, set flexible pricing, handle bookings, and so on. It's everything you need to keep your daily operations smooth and your passengers happy.",
    image: `${MEDIA}/built-for-real-world-bus-operations.png`,
  },
  {
    title: "Stay in Charge of Your Business",
    desc: "You decide how your system works. With CWTicketing, you keep full control over routes, fares, passenger data, and branding. You don't have to change how you work, we just help you do it better, faster, and with less stress.",
    image: `${MEDIA}/stay-in-charge-of-your-business.png`,
  },
  {
    title: "Fits Your Business, Grows With You",
    desc: "Whether you're managing one fleet or working with multiple operators, the system adjusts to your needs. Create branded portals, add new agents or routes, and connect mobile payment systems without any technical work. As your network grows, CWTicketing grows with you.",
    image: `${MEDIA}/fits-your-business-grows-with-you.png`,
  },
  {
    title: "Proven, Reliable, and Easy to Use",
    desc: "Bus companies around the world use CWTicketing to power their intercity ticketing systems. Operators, agents, and terminals trust it to run daily bookings smoothly. It's reliable, built for real transport needs, and easy for any team to use. If you're ready to stop dealing with paper tickets and phone calls, CWTicketing is here to help.",
    image: `${MEDIA}/proven-reliable-and-easy-to-use.png`,
  },
];

const gradientRing: Record<number, string> = {
  0: "from-brand to-amber-400",
  1: "from-emerald-500 to-teal-400",
  2: "from-sky-500 to-indigo-400",
  3: "from-brand to-brand-dark",
};

export default function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            data-gsap
            className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]"
          >
            Why Choose{" "}
            <span className="text-gradient-brand">
              CWTicketing
            </span>
          </h2>
          <span className="mx-auto mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {reasons.map((r, i) => {
            return (
              <div
                key={r.title}
                data-gsap
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/10"
              >
                <span
                  className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${gradientRing[i]} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-25`}
                />

                {/* card image */}
                <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="relative text-[17px] font-medium tracking-tight text-text-dark">{r.title}</h3>
                <p className="relative mt-4 text-[13.5px] leading-relaxed text-text-muted">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}