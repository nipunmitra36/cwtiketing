"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowUp } from "react-icons/hi";
import { ScrollSmoother } from "@/lib/gsap";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(0, true);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/30 transition-colors duration-200 hover:bg-brand-hover active:scale-95 sm:bottom-8 sm:right-8"
        >
          <HiOutlineArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
