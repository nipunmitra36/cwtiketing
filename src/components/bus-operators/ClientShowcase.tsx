"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineStar } from "react-icons/hi";

interface Client {
  name: string;
  country: string;
  src?: string;
}

const clients: Client[] = [
  { name: "Busbora", country: "Tanzania", src: "/media/client/busbora.webp" },
  { name: "Musango", country: "Cameroon", src: "/media/client/musango.webp" },
  { name: "Rojos De Colima", country: "Mexico", src: "/media/client/rojos-logo.webp" },
  { name: "Capital Express", country: "UAE", src: "/media/client/capital-express.webp" },
  { name: "TopBus", country: "United Kingdom", src: "/media/client/topbus.webp" },
  { name: "Asante Rabi Express", country: "Tanzania", src: "/media/client/asante-rabi-express.webp" },
  { name: "Canvey", country: "United Kingdom", src: "/media/client/canvey.webp" },
  { name: "Gatwick Hoppa", country: "United Kingdom", src: "/media/client/gatwick-hoppa.webp" },
  { name: "Carmel Group", country: "Qatar", src: "/media/client/carmel-group.webp" },
  { name: "Bus Online", country: "Ukraine" },
  { name: "My Express", country: "Estonia", src: "/media/client/my-express.webp" },
  { name: "Ekesons", country: "Nigeria", src: "/media/client/ekesons.webp" },
  { name: "Rakaab", country: "Somaliland", src: "/media/client/rakaab.webp" },
  { name: "James Bus Line", country: "Belize", src: "/media/client/james.webp" },
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
    <section ref={sectionRef} className="relative overflow-hidden bg-gray-50 py-16 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
            Intercity Bus Ticketing System Client List
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {clients.map((c) => (
            <div
              key={c.name}
              data-gsap
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-6 text-center shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/10"
            >
              {c.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.src} alt={c.name} loading="lazy" className="h-8 w-auto max-w-[110px] object-contain" />
              ) : (
                <span className="text-[15px] font-black tracking-tight text-gray-300">{c.name}</span>
              )}
              <span className="text-[11px] font-medium text-text-muted">{c.country}</span>
            </div>
          ))}
        </div>

        {/* ── Client review ── */}
        <figure
          data-gsap
          className="relative mx-auto mt-14 max-w-2xl overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-10"
        >
          <div className="flex justify-center gap-1 text-brand">
            {Array.from({ length: 5 }).map((_, i) => (
              <HiOutlineStar key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <blockquote className="mt-5 text-[16px] font-medium leading-relaxed text-text-body sm:text-[18px]">
            &ldquo;CW Ticketing transformed our bus booking operations. The
            marketplace platform allowed us to scale rapidly while maintaining
            excellent customer service.&rdquo;
          </blockquote>
          <figcaption className="mt-6">
            <span className="block text-[14px] font-semibold text-text-dark">John Smith</span>
            <span className="block text-[12px] text-text-muted">CEO, Metro Bus Lines</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
