"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import LogoMarquee from "./LogoMarquee";

const logos = [
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

        <LogoMarquee logos={logos} />
      </div>
    </section>
  );
}
