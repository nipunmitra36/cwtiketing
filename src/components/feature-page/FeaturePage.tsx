import { absoluteUrl } from "@/lib/site";
import FeatureHero from "./FeatureHero";
import { FeatureOverview, FeatureGrid, FeatureWorkflow } from "./FeatureBody";
import { FeatureFaq, FeatureCta } from "./FeatureFaqCta";
import type { FeaturePageData } from "./types";

export default function FeaturePage({ data }: { data: FeaturePageData }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: data.breadcrumb, item: absoluteUrl(data.path) },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: data.appName,
        applicationCategory: "BusinessApplication",
        operatingSystem: data.operatingSystem,
        description: data.appDescription,
        url: absoluteUrl(data.path),
        publisher: { "@type": "Organization", name: "CWTicketing", url: absoluteUrl("/") },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Request a free consultation and live demo.",
        },
        featureList: data.features.map((f) => f.title),
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main>
        <FeatureHero data={data} icon={data.navIcon} />
        <FeatureOverview data={data} />
        <FeatureGrid data={data} />
        <FeatureWorkflow data={data} />
        <FeatureFaq data={data} />
        <FeatureCta data={data} />
      </main>
    </>
  );
}
