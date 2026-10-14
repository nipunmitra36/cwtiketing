"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

const CLARITY_PROJECT_ID = "r0vk6a74tt";
const GA_MEASUREMENT_ID = "G-MR7P7F18JZ";
const IDESK_CHAT_ACCOUNT = "1720436169000";
const IDESK_CHAT_CSS = "https://static.idesk360.com/chat/stylesheet.css";
const IDESK_CHAT_BUNDLE = "https://static.idesk360.com/chat/bundle.js";

// The first of these from the visitor loads the third-party scripts.
const INTERACTION_EVENTS = ["pointerdown", "pointermove", "keydown", "touchstart", "wheel", "scroll"];
// Fallback for a visitor who reads without touching anything.
const FALLBACK_DELAY_MS = 20000;

/** Google tag. The queue is set up right away so the page view is recorded
 *  from page load; only the ~500 KB gtag.js library waits. */
function setupGtag() {
  const w = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // gtag.js expects the `arguments` object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_MEASUREMENT_ID);
}

function loadGtag() {
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
}

/** iDesk360 live chat (~1 MB bundle). */
function loadIdeskChat() {
  const w = window as Window & {
    $_iDesk_Web_Chat_API?: { (c: unknown): void; _: unknown[] };
    __iDeskWebChat_account?: string;
    __iDeskWebChat_version?: number;
  };
  if (w.$_iDesk_Web_Chat_API) return;
  const api = ((c: unknown) => {
    api._.push(c);
  }) as { (c: unknown): void; _: unknown[] };
  api._ = [];
  w.$_iDesk_Web_Chat_API = api;
  w.__iDeskWebChat_account = IDESK_CHAT_ACCOUNT;
  w.__iDeskWebChat_version = 2;

  const link = document.createElement("link");
  link.href = IDESK_CHAT_CSS;
  link.rel = "stylesheet";
  document.head.appendChild(link);

  const webchat = document.createElement("div");
  webchat.id = "webchat";
  document.body.appendChild(webchat);

  const script = document.createElement("script");
  script.async = true;
  script.src = IDESK_CHAT_BUNDLE;
  document.head.appendChild(script);
}

/**
 * Third-party scripts: Microsoft Clarity (@microsoft/clarity), Google
 * Analytics and iDesk360 chat.
 *
 * Together they are ~1.6 MB of JavaScript that used to run during page load —
 * the bulk of Total Blocking Time and "unused JavaScript". They now load on
 * the visitor's first interaction (move, tap, scroll, key), or after
 * FALLBACK_DELAY_MS, so the page renders and becomes interactive first.
 *
 * Skipped for crawlers (`is-bot`, set by the <head> script in layout.tsx):
 * the tracking pixels are blocked for Googlebot and show up as "Page resources
 * could not be loaded" in Search Console, and bot visits shouldn't count.
 */
export default function ThirdPartyScripts() {
  useEffect(() => {
    if (document.documentElement.classList.contains("is-bot")) return;

    setupGtag();

    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      cleanup();
      Clarity.init(CLARITY_PROJECT_ID);
      loadGtag();
      loadIdeskChat();
    };

    const timer = setTimeout(load, FALLBACK_DELAY_MS);
    const cleanup = () => {
      clearTimeout(timer);
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, load));
    };
    INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, load, { passive: true }));

    return cleanup;
  }, []);

  return null;
}
