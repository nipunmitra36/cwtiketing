import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { POSTS } from "../posts";
import BlogPostClient from "./BlogPostClient";

// Every post is prerendered at build time; any other slug is a real 404
// instead of silently rendering the first post (duplicate content).
export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

/** "Apr 23, 2026" → "2026-04-23" (schema.org / Open Graph want ISO 8601). */
function isoDate(date: string): string | undefined {
  const d = new Date(`${date} UTC`);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

/** Search results cut descriptions around 160 characters; trim on a word. */
function metaDescription(text: string, max = 160): string {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1))}…`;
}

/** Brand the title only while it still fits in a search result (~60 chars). */
function metaTitle(title: string): string {
  const branded = `${title} | CWTicketing`;
  return branded.length <= 65 ? branded : title;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const published = isoDate(post.date);
  return {
    ...buildMetadata({
      // Hand-written per post in posts.ts; derived from title/excerpt only as
      // a fallback for posts that don't have them yet.
      title: post.metaTitle ?? metaTitle(post.title),
      description: post.metaDescription ?? metaDescription(post.excerpt),
      canonical: `/blog/${post.slug}`,
      image: post.image,
      imageAlt: post.title,
      type: "article",
      publishedTime: published,
      authors: [post.author.name],
    }),
    keywords: post.tags,
    category: post.category,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blog/${post.slug}`);
  const published = isoDate(post.date);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.metaDescription ?? post.excerpt,
        image: absoluteUrl(post.image),
        url,
        mainEntityOfPage: url,
        ...(published ? { datePublished: published, dateModified: published } : {}),
        articleSection: post.category,
        keywords: post.tags.join(", "),
        inLanguage: "en",
        author: { "@type": "Organization", name: post.author.name, url: absoluteUrl("/") },
        publisher: {
          "@type": "Organization",
          name: "CWTicketing",
          url: absoluteUrl("/"),
          logo: { "@type": "ImageObject", url: absoluteUrl("/media/logo.png") },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <BlogPostClient slug={post.slug} />
    </>
  );
}
