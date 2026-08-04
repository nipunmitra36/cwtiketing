'use client';

import Hero from "@/components/hero/Hero";
import LogoTrustSection from "@/components/clients/LogoTrustSection";
import Solution from "@/components/solution/Solution";
import ProductSection from "@/components/products/ProductSection";
import FeatureGrid from "@/components/feature-grid/FeatureGrid";
import DashboardPreview from "@/components/dashboard-preview/DashboardPreview";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import CaseStudies from "@/components/case-studies/CaseStudies";
import FAQ from "@/components/faq/FAQ";
import CTA from "@/components/cta/CTA";

export default function Home() {
  return (
    <main>
      <Hero/>
      <LogoTrustSection/>
      <Solution/>
      <ProductSection/>
      <FeatureGrid/>
      <DashboardPreview/>
      <HowItWorks/>
      <CaseStudies/>
      <FAQ/>
      <CTA/>
    </main>
  );
}
