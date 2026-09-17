"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";

const MEDIA = "/media/bus-operators";

const reasons: { image: string; title: string; desc: string }[] = [
  {
    image: `${MEDIA}/built-for-real-world-bus-operations.png`,
    title: "Built for Real-World Bus Operations",
    desc: "CWTicketing takes the hassle out of running intercity routes. You can manage schedules, track seat availability, set flexible pricing, handle bookings, and so on. It's everything you need to keep your daily operations smooth and your passengers happy.",
  },
  {
    image: `${MEDIA}/stay-in-charge-of-your-business.png`,
    title: "Stay in Charge of Your Business",
    desc: "You decide how your system works. With CWTicketing, you keep full control over routes, fares, passenger data, and branding. You don't have to change how you work, we just help you do it better, faster, and with less stress.",
  },
  {
    image: `${MEDIA}/fits-your-business-grows-with-you.png`,
    title: "Fits Your Business, Grows With You",
    desc: "Whether you're managing one fleet or working with multiple operators, the system adjusts to your needs. Create branded portals, add new agents or routes, and connect mobile payment systems without any technical work. As your network grows, CWTicketing grows with you.",
  },
  {
    image: `${MEDIA}/proven-reliable-and-easy-to-use.png`,
    title: "Proven, Reliable, and Easy to Use",
    desc: "Bus companies around the world use CWTicketing to power their intercity ticketing systems. Operators, agents, and terminals trust it to run daily bookings smoothly. It's reliable, built for real transport needs, and easy for any team to use. If you're ready to stop dealing with paper tickets and phone calls, CWTicketing is here to help.",
  },
];

export default function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.08 });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
            Why Choose CW Ticketing
          </h2>
        </div>

        <div className="space-y-14 lg:space-y-24">
          {reasons.map((r, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={r.title}
                data-gsap
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={reversed ? "lg:order-2" : ""}>
                  <div className="overflow-hidden rounded-3xl border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.title}
                      loading="lazy"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </div>

                <div className={reversed ? "lg:order-1" : ""}>
                  <h3 className="text-[24px] font-medium leading-snug tracking-tight text-text-dark">
                    {r.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-text-muted">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}