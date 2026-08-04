'use client';

import Hero from "@/components/hero/Hero";
import LogoTrustSection from "@/components/clients/LogoTrustSection";
import ProblemSolution from "@/components/problem-solution/ProblemSolution";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import FeatureGrid from "@/components/feature-grid/FeatureGrid";
import ProductSection from "@/components/products/ProductSection";
import DashboardPreview from "@/components/dashboard-preview/DashboardPreview";
import Comparison from "@/components/comparison/Comparison";
import CaseStudies from "@/components/case-studies/CaseStudies";
import Pricing from "@/components/pricing/Pricing";
import FAQ from "@/components/faq/FAQ";
import CTA from "@/components/cta/CTA";

export default function Home() {
  return (
    <main>
      <Hero/>
      <LogoTrustSection/>
      <ProblemSolution/>
      <HowItWorks/>
      <FeatureGrid/>
      <ProductSection/>
      <DashboardPreview/>
      <Comparison/>
      <CaseStudies/>
      <Pricing/>
      <FAQ/>
      <CTA/>
    </main>
  );
}
