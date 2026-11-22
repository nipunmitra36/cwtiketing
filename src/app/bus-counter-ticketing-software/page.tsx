import { buildMetadata } from "@/lib/seo";
import FeaturePage from "@/components/feature-page/FeaturePage";
import { counterPanel } from "@/components/feature-page/data";

export const metadata = buildMetadata({
  title: counterPanel.metaTitle,
  description: counterPanel.metaDescription,
  canonical: counterPanel.path,
});

export default function CounterPanelPage() {
  return <FeaturePage data={counterPanel} />;
}
