import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/**
 * Play a ScrollTrigger animation once, then discard the trigger.
 *
 * Use instead of `once: true`. With `once`, a trigger whose start is already
 * behind the viewport (reload mid-page, #hash jump) kills itself *during*
 * ScrollTrigger's refresh loop, which mutates the internal trigger list while
 * it is being iterated and crashes with "Cannot read properties of undefined
 * (reading 'end')". Deferring the kill to the next tick avoids that.
 */
export const playOnce = {
  toggleActions: "play none none none",
  onEnter: (self: ScrollTrigger) => {
    gsap.delayedCall(0, () => self.kill(false, true));
  },
};

/**
 * True when the user has asked the OS to reduce motion.
 *
 * Scroll reveals must skip themselves for these users: the hidden start state
 * is declared in CSS, so an animation that still runs would fade content in
 * from `opacity: 0` for someone who opted out of movement.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  if (isBot()) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * True for crawlers. They never scroll, so scroll-triggered reveals would
 * leave `[data-gsap]` content at `opacity: 0` in their rendered snapshot.
 */
export function isBot(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("is-bot");
}

export { gsap, ScrollTrigger };
