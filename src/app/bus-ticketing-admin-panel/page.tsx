import { buildMetadata } from "@/lib/seo";
import FeaturePage from "@/components/feature-page/FeaturePage";
import { adminPanel } from "@/components/feature-page/data";

export const metadata = buildMetadata({
  title: adminPanel.metaTitle,
  description: adminPanel.metaDescription,
  canonical: adminPanel.path,
});

export default function AdminPanelPage() {
  return <FeaturePage data={adminPanel} />;
}
