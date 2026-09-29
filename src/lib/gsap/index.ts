import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

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

export { gsap, ScrollTrigger, ScrollSmoother };
