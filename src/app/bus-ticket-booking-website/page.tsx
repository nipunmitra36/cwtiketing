import { buildMetadata } from "@/lib/seo";
import FeaturePage from "@/components/feature-page/FeaturePage";
import { bookingWebsite } from "@/components/feature-page/data";

export const metadata = buildMetadata({
  title: bookingWebsite.metaTitle,
  description: bookingWebsite.metaDescription,
  canonical: bookingWebsite.path,
});

export default function BookingWebsitePage() {
  return <FeaturePage data={bookingWebsite} />;
}
