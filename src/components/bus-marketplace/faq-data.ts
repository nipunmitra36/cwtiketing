export interface MarketplaceFaq {
  q: string;
  a: string;
}

export const marketplaceFaqs: MarketplaceFaq[] = [
  {
    q: "What is a bus ticketing marketplace platform?",
    a: "It's a single system that lets a marketplace owner onboard multiple bus operators, manage their routes and schedules, take bookings across web and mobile, and track sales and performance — all from one central admin dashboard, rather than each operator running a separate system.",
  },
  {
    q: "How do I onboard new bus operators onto my marketplace?",
    a: "The Operator Onboarding tool in the admin control centre walks new operators through setting up their profile, fleet, routes, and fares. You approve and activate each operator, and they start selling through your platform immediately.",
  },
  {
    q: "Can I set my own commission structure per operator?",
    a: "Yes. Commission Management lets you define commission rates by operator, route, or ticket type, and every booking is settled against those rules automatically — no manual reconciliation required.",
  },
  {
    q: "Is the marketplace white-label and can I use my own branding?",
    a: "Yes. You can launch fully branded web and mobile portals under your own name and domain, while CWTicketing runs the booking, payment, and fleet infrastructure behind the scenes.",
  },
  {
    q: "How are disputes between operators and passengers handled?",
    a: "The built-in Dispute Resolution tool logs cancellations, refund requests, and complaints in one place, so your support team can review, respond, and resolve issues without digging through separate operator systems.",
  },
  {
    q: "Does the platform support counter agents and walk-in ticket sales?",
    a: "Yes. Counter agents can issue walk-in tickets, check the passenger manifest, and manage bookings through the web portal, Android app, or Android POS — with cash, card, and QR code payments all supported.",
  },
  {
    q: "Can passengers book in their own language and currency?",
    a: "Yes. The passenger app supports multilingual interfaces and multicurrency pricing, so travelers can search, compare, and book routes in the language and currency they're most comfortable with.",
  },
  {
    q: "What payment methods can my operators accept?",
    a: "The marketplace supports major cards, Google Pay and Apple Pay, and regional mobile wallets like bKash, Nagad, M-Pesa, Wave and AmarPay — configured per market so every operator can accept what their passengers already use.",
  },
];
