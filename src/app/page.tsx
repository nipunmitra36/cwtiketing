'use client';

import Hero from "@/components/hero/Hero";
import LogoTrustSection from "@/components/clients/LogoTrustSection";
import ProblemSolution from "@/components/problem-solution/ProblemSolution";
import Solution from "@/components/solution/Solution";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import ProductSection from "@/components/products/ProductSection";
import FeatureGrid from "@/components/feature-grid/FeatureGrid";
import DashboardPreview from "@/components/dashboard-preview/DashboardPreview";
import CaseStudies from "@/components/case-studies/CaseStudies";
import Comparison from "@/components/comparison/Comparison";
import Pricing from "@/components/pricing/Pricing";
import FAQ from "@/components/faq/FAQ";
import CTA from "@/components/cta/CTA";

export default function Home() {
  return (
    <main>
      <Hero/>
      <LogoTrustSection/>
      <ProblemSolution/>
      <Solution/>
      <HowItWorks/>
      <ProductSection/>
      <FeatureGrid/>
      <DashboardPreview/>
      <CaseStudies/>
      <Comparison/>
      <Pricing/>
      <FAQ/>
      <CTA/>
    </main>
  );
}
