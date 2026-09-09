"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";

interface Logo {
  name: string;
  src: string;
}

const logos: Logo[] = [
  { name: "Afrikonekta", src: "/media/client/afrikonekta.webp" },
  { name: "Asante Rabi Express", src: "/media/client/asante-rabi-express.webp" },
  { name: "BrandMyth", src: "/media/client/brandmyth.webp" },
  { name: "BusBora", src: "/media/client/busbora.webp" },
  { name: "Canvey", src: "/media/client/canvey.webp" },
  { name: "Capital Express", src: "/media/client/capital-express.webp" },
  { name: "Carmel Group", src: "/media/client/carmel-group.webp" },
  { name: "Ekesons", src: "/media/client/ekesons.webp" },
  { name: "Etiflex", src: "/media/client/etiflex.webp" },
  { name: "Fetan Bus", src: "/media/client/fetanbus.webp" },
  { name: "Gatwick Hoppa", src: "/media/client/gatwick-hoppa.webp" },
  { name: "Hoba Yakpaiha", src: "/media/client/hoba-yakpaiha.webp" },
  { name: "James", src: "/media/client/james.webp" },
  { name: "Purabi", src: "/media/client/logo_purabi.webp" },
  { name: "Lonex", src: "/media/client/lonex.webp" },
  { name: "Motso", src: "/media/client/motso.webp" },
  { name: "Musango", src: "/media/client/musango.webp" },
  { name: "My Express", src: "/media/client/my-express.webp" },
  { name: "Rabeya", src: "/media/client/rabeya.webp" },
  { name: "Rakaab", src: "/media/client/rakaab.webp" },
  { name: "Rojos", src: "/media/client/rojos-logo.webp" },
  { name: "Six Base", src: "/media/client/six-base.webp" },
  { name: "TopBus", src: "/media/client/topbus.webp" },
  { name: "Yatru", src: "/media/client/yatru.webp" },
  { name: "Zedicket", src: "/media/client/zedicket.webp" },
];

const third = Math.ceil(logos.length / 3);
const logosRow1: Logo[] = logos.slice(0, third);
const logosRow2: Logo[] = logos.slice(third, third * 2);
const logosRow3: Logo[] = logos.slice(third * 2);

function MarqueeRow({
  logos,
  direction,
  speed = 45,
}: {
  logos: Logo[];
  direction: "left" | "right";
  speed?: number;
}) {
  const track = [...logos, ...logos];

  return (
    <div className="group/row relative overflow-hidden">
      <div
        className={`flex w-max items-center ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
          } [animation-duration:var(--marquee-duration)] group-hover/row:[animation-play-state:paused]`}
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {track.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="mr-4 flex shrink-0 items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(16,24,40,0.08)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              loading="lazy"
              className="h-9 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoTrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 24, stagger: 0.1, start: "top 85%" });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="customers"
      className="relative overflow-hidden border-b border-gray-100 bg-white py-14 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p
          data-gsap
          className="mb-10 text-center text-[12px] font-medium uppercase tracking-widest text-text-muted sm:text-[13px]"
        >
          Trusted by transport companies worldwide
        </p>

        {/* ── Three-row marquee, contained to container width ── */}
        <div data-gsap className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-20" />

          <div className="flex flex-col gap-6">
            <MarqueeRow logos={logosRow1} direction="left" speed={60} />
            <MarqueeRow logos={logosRow2} direction="right" speed={70} />
            <MarqueeRow logos={logosRow3} direction="left" speed={60} />
          </div>
        </div>
      </div>
    </section>
  );
}
