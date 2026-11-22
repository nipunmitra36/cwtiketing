import { buildMetadata } from "@/lib/seo";
import FeaturePage from "@/components/feature-page/FeaturePage";
import { driverApp } from "@/components/feature-page/data";

export const metadata = buildMetadata({
  title: driverApp.metaTitle,
  description: driverApp.metaDescription,
  canonical: driverApp.path,
});

export default function DriverAppPage() {
  return <FeaturePage data={driverApp} />;
}
