import { buildMetadata } from "@/lib/seo";
import FeaturePage from "@/components/feature-page/FeaturePage";
import { agentApp } from "@/components/feature-page/data";

export const metadata = buildMetadata({
  title: agentApp.metaTitle,
  description: agentApp.metaDescription,
  canonical: agentApp.path,
});

export default function AgentAppPage() {
  return <FeaturePage data={agentApp} />;
}
