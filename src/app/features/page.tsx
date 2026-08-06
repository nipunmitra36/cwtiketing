import DashboardPreview from "@/components/dashboard-preview/DashboardPreview";
import FeatureGrid from "@/components/feature-grid/FeatureGrid";
import Comparison from "@/components/comparison/Comparison";
import CTA from "@/components/cta/CTA";

export default function FeaturesPage() {
  return (
    <main>
      <DashboardPreview />
      <FeatureGrid />
      <Comparison />
      <CTA />
    </main>
  );
}
