import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing | CWTicketing",
  description:
    "Transparent pricing for CWTicketing. Choose the plan that fits your transport business needs.",
  canonical: "/pricing",
});

import Pricing from "@/components/pricing/Pricing";

export default function PricingPage() {
  return (
    <main className="pt-24 lg:pt-28">
      <Pricing />
    </main>
  );
}
