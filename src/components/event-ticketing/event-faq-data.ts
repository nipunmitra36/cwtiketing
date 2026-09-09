export interface EventFaq {
  q: string;
  a: string;
}

export const eventFaqs: EventFaq[] = [
  {
    q: "What types of events can I sell tickets for?",
    a: "Any of them. The event ticketing system is flexible enough to bend for concerts, DJ parties, festivals, conferences, seminars, workshops, theatre nights, sports fixtures and expos. If sitting is not necessary you sell standing zones; if it is, you sell numbered seats.",
  },
  {
    q: "Can I create different ticket categories like VIP and early bird?",
    a: "Yes. Sort your tickets into as many categories as you need — VIP, general, early bird and anything else you name. Each category carries its own price and capacity, and tickets can be configured as seat or no-seat types, or split by criteria such as age and gender.",
  },
  {
    q: "Which payment methods can my attendees use?",
    a: "We integrate multiple secure payment gateways so your audience can choose from an array of options — cards, mobile wallets and net banking among them. The checkout is built to feel secure and comfortable, which is what turns browsers into buyers.",
  },
  {
    q: "How does SMS verification keep gatecrashers out?",
    a: "Every buyer confirms their booking with a one-time code sent to their phone. Because the user can access that SMS from anywhere, it is a practical way to verify attendees without adding friction — and it makes tickets much harder to fake or resell fraudulently.",
  },
  {
    q: "How are tickets checked at the entrance?",
    a: "Your gate team uses the ticket validation checker in the Android app to scan each ticket's QR code. Valid attendees are admitted in a second and the ticket is marked as used, so the same ticket cannot walk through the gate twice.",
  },
  {
    q: "Can the ticket design match my event branding?",
    a: "Yes. We provide customized ticket designs to meet your event's needs. Whether you want to add fields, modify existing ones or change the design entirely, we will do it for you before you go live.",
  },
  {
    q: "Do I get a website and a mobile app, or just one?",
    a: "You can have all three channels: an audience-driven event website that maximizes ticket sales, an Android app your attendees buy through and your team scans with, and an admin dashboard where you manage sales, fares and the gallery remotely.",
  },
  {
    q: "Do you customize the gallery arrangement for my venue?",
    a: "That is exactly what we do. Send us your venue layout and we will build the arrangement around it — standing floors, straight rows with aisles, curved auditorium tiers or lettered stadium blocks, each with its own pricing.",
  },
];
