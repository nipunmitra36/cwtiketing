'use client';

import Hero from "@/components/hero/Hero";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import Solution from "@/components/solution/Solution";
import FeatureGrid from "@/components/feature-grid/FeatureGrid";
import DashboardPreview from "@/components/dashboard-preview/DashboardPreview";
import Products from "@/components/products/ProductSection";
import FeatureSection from "@/components/features/FeatureSection";
import CaseStudies from "@/components/case-studies/CaseStudies";
import Clients from "@/components/clients/Client";
import FAQ from "@/components/faq/FAQ";
import CTA from "@/components/cta/CTA";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero/>
      <HowItWorks/>
      <Solution/>
      <FeatureGrid/>
      <DashboardPreview/>
      <Products/>
      <FeatureSection/>
      <CaseStudies/>
      <Clients/>
      <FAQ/>
      <CTA/>
    </main>
  );
}
