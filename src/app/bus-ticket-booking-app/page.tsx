import { buildMetadata } from "@/lib/seo";
import FeaturePage from "@/components/feature-page/FeaturePage";
import { passengerApp } from "@/components/feature-page/data";

export const metadata = buildMetadata({
  title: passengerApp.metaTitle,
  description: passengerApp.metaDescription,
  canonical: passengerApp.path,
});

export default function PassengerAppPage() {
  return <FeaturePage data={passengerApp} />;
}
