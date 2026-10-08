import { absoluteUrl } from "@/lib/site";
import { POSTS } from "../blog/posts";

/**
 * /llms.txt — a plain-Markdown site summary for AI assistants and answer
 * engines (https://llmstxt.org). Built once at build time, like robots.txt
 * and sitemap.xml; the blog list comes from POSTS so new posts appear
 * automatically.
 */
export const dynamic = "force-static";

interface PageLink {
  title: string;
  path: string;
  description: string;
}

const SOLUTIONS: PageLink[] = [
  {
    title: "Bus Ticketing System",
    path: "/bus-ticketing-system",
    description:
      "Branded online bus booking with seat selection, routes, fares, payments, mobile apps and an admin dashboard for bus operators.",
  },
  {
    title: "Online Taxi Booking System",
    path: "/online-taxi-booking-system",
    description:
      "Branded taxi booking with dispatch, driver app, rider app, fare management and real-time tracking.",
  },
  {
    title: "Event Ticketing System",
    path: "/event-ticketing-system",
    description:
      "Online event ticketing with seat mapping, QR check-in, multiple sales channels and real-time reporting.",
  },
  {
    title: "Parcel Management System",
    path: "/parcel-management-system",
    description:
      "Courier and logistics software: parcel tracking, hub management, automated billing and notifications.",
  },
];

/** Mirrors the header's Industries menu: who each page is for, then the product it covers. */
const INDUSTRIES: PageLink[] = [
  {
    title: "Bus Operators — Intercity Bus Booking Software",
    path: "/intercity-coach-booking-software",
    description:
      "For intercity and coach lines: route management, fleet, online sales, agent panel and real-time reporting.",
  },
  {
    title: "Shuttle Companies — Shuttle Booking System",
    path: "/shuttle-booking-system",
    description:
      "For airport and point-to-point shuttles: routes, schedules, seats and online booking for schools, companies and airports.",
  },
  {
    title: "Travel Agencies — Bus Terminal Ticketing System",
    path: "/bus-terminal-ticketing-system",
    description:
      "For multi-operator ticket retail: manage counters, schedules, departures, ticket sales and passenger flow.",
  },
];

const COMPANY: PageLink[] = [
  {
    title: "Pricing",
    path: "/pricing",
    description: "Plans for transport businesses of different sizes.",
  },
  {
    title: "About Us",
    path: "/about-us",
    description:
      "CWTicketing is a product of Codeware Ltd., built for transport operators.",
  },
  {
    title: "Contact Us",
    path: "/contact-us",
    description: "Request a demo, pricing or support.",
  },
  {
    title: "Careers",
    path: "/careers",
    description: "Open roles at Codeware Ltd.",
  },
];

const LEGAL: PageLink[] = [
  { title: "Privacy Policy", path: "/privacy-policy", description: "How data is collected, used and protected." },
  { title: "Terms & Conditions", path: "/terms-and-condition", description: "Terms of use for CWTicketing." },
];

const link = ({ title, path, description }: PageLink) =>
  `- [${title}](${absoluteUrl(path)}): ${description}`;

export function GET() {
  const blog = POSTS.map((post) =>
    link({ title: post.title, path: `/blog/${post.slug}`, description: post.excerpt })
  );

  const body = `# CWTicketing

> White-label online ticket booking software for transport and event operators — bus, intercity coach, bus terminal, shuttle, taxi, event and parcel businesses. Operators launch their own branded booking website and mobile apps with seat selection, online payments, route and fleet management, agent/counter sales and an admin dashboard with real-time reporting.

CWTicketing is developed by Codeware Ltd., based in Dhaka, Bangladesh, and serves transport operators worldwide. It is sold as a SaaS platform, set up and branded for each operator.

- Website: ${absoluteUrl("/")}
- Email: info@cwticketingsystem.com
- Phone / WhatsApp: +8801614000401

## Solutions

${SOLUTIONS.map(link).join("\n")}

## Industries

${INDUSTRIES.map(link).join("\n")}

## Company

${COMPANY.map(link).join("\n")}

## Blog

${blog.join("\n")}

## Optional

${LEGAL.map(link).join("\n")}
- [Sitemap](${absoluteUrl("/sitemap.xml")}): Every public URL on the site.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
