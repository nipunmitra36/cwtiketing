import { buildMetadata } from "@/lib/seo";
import FeaturePage from "@/components/feature-page/FeaturePage";
import { paymentGateway } from "@/components/feature-page/data";

export const metadata = buildMetadata({
  title: paymentGateway.metaTitle,
  description: paymentGateway.metaDescription,
  canonical: paymentGateway.path,
});

export default function PaymentGatewayPage() {
  return <FeaturePage data={paymentGateway} />;
}
