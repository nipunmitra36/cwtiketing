import type { IconKey } from "./icons";

export interface FeatureItem {
  icon: IconKey;
  title: string;
  desc: string;
}

export interface FeatureStep {
  title: string;
  desc: string;
}

export interface FeatureFaq {
  q: string;
  a: string;
}

export interface FeatureTrustPoint {
  icon: IconKey;
  title: string;
  desc: string;
}

export interface FeaturePageData {
  /** Flat URL, e.g. "/bus-agent-app" */
  path: string;

  // ── Header "Features" dropdown ──
  navLabel: string;
  navDesc: string;
  navIcon: IconKey;

  // ── SEO ──
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  appName: string;
  appDescription: string;
  operatingSystem: string;

  // ── Hero ──
  badge: string;
  heroLead: string;
  heroHighlight: string;
  heroTail: string;
  heroDesc: string;
  heroTrust: string[];
  /** Title shown on the hero preview card */
  cardTitle: string;
  cardSubtitle: string;
  cardRows: string[];

  /** Product Demo tab to open, e.g. "counter-panel". Omit to link to the demo section itself. */
  demoTab?: string;

  // ── Overview ──
  overviewLead: string;
  overviewHighlight: string;
  overviewText: string;
  pillars: FeatureTrustPoint[];
  problemsTitle: string;
  problemsIntro: string;
  problems: string[];

  // ── Features grid ──
  featuresHighlight: string;
  featuresIntro: string;
  features: FeatureItem[];

  // ── Optional name groups (used by the payment gateway page) ──
  groups?: { title: string; items: string[] }[];

  // ── Workflow ──
  stepsTitle: string;
  stepsIntro: string;
  steps: FeatureStep[];

  // ── FAQ / CTA ──
  faqHighlight: string;
  faqIntro: string;
  faqs: FeatureFaq[];
  ctaTitle: string;
  ctaDesc: string;
}
