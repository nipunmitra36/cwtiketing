'use client';

import Hero from "@/components/hero/Hero";
import LogoTrustSection from "@/components/clients/LogoTrustSection";
import ProblemSolution from "@/components/problem-solution/ProblemSolution";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import FeatureGrid from "@/components/feature-grid/FeatureGrid";
import ProductSection from "@/components/products/ProductSection";
import CaseStudies from "@/components/case-studies/CaseStudies";
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
      <CaseStudies/>
      <FAQ/>
      <CTA/>
    </main>
  );
}
