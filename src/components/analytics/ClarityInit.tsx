"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

const CLARITY_PROJECT_ID = "r0vk6a74tt";

/**
 * Microsoft Clarity via the official npm package. `Clarity.init` touches
 * `window`/`document`, so it has to run on the client — once, after mount.
 *
 * Skipped for crawlers (`is-bot`, set by the <head> script in layout.tsx):
 * Clarity's tracking pixels (c.clarity.ms/c.gif, c.bing.com/c.gif) are blocked
 * for Googlebot and show up as "Page resources could not be loaded" in Search
 * Console. Bots also shouldn't count as recorded sessions.
 */
export default function ClarityInit() {
  useEffect(() => {
    if (document.documentElement.classList.contains("is-bot")) return;
    Clarity.init(CLARITY_PROJECT_ID);
  }, []);

  return null;
}
