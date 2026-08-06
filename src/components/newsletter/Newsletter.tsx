"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiXMark } from "react-icons/hi2";

export default function Newsletter() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("newsletter_seen")) return;
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("newsletter_seen", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
            >
              <HiXMark className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="p-8 sm:p-10">
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light">
                <svg
                  className="h-7 w-7 text-brand"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>

              <h2 className="mb-2 text-center text-2xl font-medium text-gray-900">
                Let&apos;s Build Something Great
              </h2>
              <p className="mb-8 text-center text-sm leading-relaxed text-gray-600">
                Ready to transform your ticketing experience? Book a free demo or
                schedule a consultation to discuss the best design for your needs.
              </p>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <a
                  href="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-hover active:scale-[0.98]"
                  onClick={handleClose}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                  </svg>
                  Book a Free Demo
                </a>

                <a
                  href="/contact"
                  onClick={handleClose}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-800 transition-all hover:border-brand/30 hover:bg-brand-light active:scale-[0.98]"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  Discuss Your Design
                </a>
              </div>

              {/* Skip link */}
              <p className="mt-6 text-center">
                <button
                  onClick={handleClose}
                  className="text-xs text-gray-400 underline underline-offset-2 transition hover:text-gray-600"
                >
                  Not now, thanks
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
