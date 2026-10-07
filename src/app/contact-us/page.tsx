import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us | CWTicketing",
  description:
    "Contact CWTicketing for demos, pricing, or support. Get in touch to launch your online ticket booking platform.",
  canonical: "/contact-us",
});

import ContactClient from "./ContactClient";

export default function ContactUsPage() {
  return <ContactClient />;
}
