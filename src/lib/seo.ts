import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export interface PageSeo {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

const DEFAULT_OG_IMAGE = "/images/og-ticket-booking-platform.jpg";
const DEFAULT_OG_ALT =
  "Ticket booking platform dashboard with seat selection and transport management";

export function buildMetadata({
  title,
  description,
  canonical,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_ALT,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noindex = false,
  nofollow = false,
}: PageSeo): Metadata {
  const url = absoluteUrl(canonical);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
    },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: "CWTicketing",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors && authors.length > 0 ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: ogImage,
          alt: imageAlt,
        },
      ],
    },
  };
}
