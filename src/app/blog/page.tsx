import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog | CWTicketing System",
  description:
    "Insights on ticketing, transport technology, and digital transformation for operators.",
  canonical: "/blog",
});

import BlogListClient from "./BlogListClient";

export default function BlogPage() {
  return <BlogListClient />;
}
