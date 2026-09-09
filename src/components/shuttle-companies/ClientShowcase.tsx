"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineStar } from "react-icons/hi";
import LogoMarquee from "../clients/LogoMarquee";

const clients = [
  { name: "Busbora", country: "Tanzania", src: "/media/client/busbora.webp" },
  { name: "Canvey", country: "United Kingdom", src: "/media/client/canvey.webp" },
  { name: "Gatwick Hoppa", country: "United Kingdom", src: "/media/client/gatwick-hoppa.webp" },
  { name: "Airport Hopper", country: "Ireland" },
  { name: "Musango", country: "Cameroon", src: "/media/client/musango.webp" },
  { name: "Rojos De Colima", country: "Mexico", src: "/media/client/rojos-logo.webp" },
  { name: "Capital Express", country: "UAE", src: "/media/client/capital-express.webp" },
  { name: "Carmel Group", country: "Qatar", src: "/media/client/carmel-group.webp" },
  { name: "Bus Online", country: "Ukraine" },
  { name: "TopBus", country: "United Kingdom", src: "/media/client/topbus.webp" },
  { name: "My Express", country: "Estonia", src: "/media/client/my-express.webp" },
  { name: "Ekesons", country: "Nigeria", src: "/media/client/ekesons.webp" },
  { name: "Rakaab", country: "Somaliland", src: "/media/client/rakaab.webp" },
  { name: "James Bus Line", country: "Belize", src: "/media/client/james.webp" },
  { name: "Asante Rabi Express", country: "Tanzania", src: "/media/client/asante-rabi-express.webp" },
  { name: "Motso", country: "Botswana", src: "/media/client/motso.webp" },
  { name: "Etiflex", country: "Mexico", src: "/media/client/etiflex.webp" },
  { name: "AfriKonekta", country: "Finland", src: "/media/client/afrikonekta.webp" },
  { name: "Zedicket", country: "Zambia", src: "/media/client/zedicket.webp" },
  { name: "Fetan Bus", country: "Ethiopia", src: "/media/client/fetanbus.webp" },
  { name: "Weyatri", country: "Nepal" },
  { name: "Lonex", country: "Bangladesh", src: "/media/client/lonex.webp" },
  { name: "Rabeya", country: "Bangladesh", src: "/media/client/rabeya.webp" },
  { name: "Six Base", country: "Bangladesh", src: "/media/client/six-base.webp" },
  { name: "BrandMyth", country: "Bangladesh", src: "/media/client/brandmyth.webp" },
];

export default function ClientShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.04 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 -top-10 h-80 w-80 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Short-Distance Bus Ticketing{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                System Client List
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            Trusted by transport companies worldwide
          </p>
        </div>

        <LogoMarquee logos={clients} />

        {/* ── Client review ── */}
        <figure
          data-gsap
          className="relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-light blur-2xl" />
          <div className="flex justify-center gap-1 text-brand">
            {Array.from({ length: 5 }).map((_, i) => (
              <HiOutlineStar key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <blockquote className="relative mx-auto mt-5 max-w-2xl text-[16px] font-medium leading-relaxed text-text-body sm:text-[18px]">
            &ldquo;CW Ticketing transformed our bus booking operations. The
            marketplace platform allowed us to scale rapidly while maintaining
            excellent customer service.&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-[14px] font-bold text-white shadow-lg shadow-brand/30">
              JS
            </span>
            <span className="text-left">
              <span className="block text-[14px] font-semibold text-text-dark">John Smith</span>
              <span className="block text-[12px] text-text-muted">CEO, Metro Bus Lines</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}