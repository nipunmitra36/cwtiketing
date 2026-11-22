import { buildMetadata } from "@/lib/seo";
import FeaturePage from "@/components/feature-page/FeaturePage";
import { rentalReservation } from "@/components/feature-page/data";

export const metadata = buildMetadata({
  title: rentalReservation.metaTitle,
  description: rentalReservation.metaDescription,
  canonical: rentalReservation.path,
});

export default function RentalReservationPage() {
  return <FeaturePage data={rentalReservation} />;
}
