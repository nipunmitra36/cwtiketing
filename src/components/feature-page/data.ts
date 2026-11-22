import type { FeaturePageData } from "./types";

/**
 * The eight core CWTicketing modules, one flat-URL page each. Content follows
 * the "CW Ticketing System – Overview" deck. Order here is the order of the
 * header "Features" dropdown, the footer list, sitemap and llms.txt.
 */

export const adminPanel: FeaturePageData = {
  path: "/bus-ticketing-admin-panel",
  navLabel: "Admin Panel",
  navDesc: "Routes, fares, fleet & reports",
  navIcon: "desktop",
  demoTab: "admin-panel",
  metaTitle: "Bus Ticketing Admin Panel | Routes, Fares, Fleet & Reports",
  metaDescription:
    "Run your whole bus operation from one admin panel: routes, schedules, dynamic seat plans, ticket pricing, agents, accounts, coupons, fleet, fuel and reporting.",
  breadcrumb: "Bus Ticketing Admin Panel",
  appName: "CWTicketing — Admin Panel",
  appDescription:
    "The back office of the CWTicketing bus ticketing system: route and schedule management, dynamic seat plan maker, ticket price management, agent management, accounts, reporting, user privileges, coupons, fleet and fuel management.",
  operatingSystem: "Web",

  badge: "Bus Ticketing Admin Panel",
  heroLead: "One",
  heroHighlight: "Admin Panel",
  heroTail: "to Run Routes, Fares, Fleet & Revenue",
  heroDesc:
    "Set up routes and schedules, design seat plans, control every ticket price, manage agents and fleet, and read your accounts and reports — all from a single cloud-based control room.",
  heroTrust: ["Dynamic seat plan maker", "Flexible ticket pricing", "Role-based user privileges", "Reports & accounts"],
  cardTitle: "Operations Control Room",
  cardSubtitle: "Admin Panel",
  cardRows: [
    "Routes & schedules",
    "Seat plans & ticket prices",
    "Agents, coupons & accounts",
    "Fleet, fuel & reports",
  ],

  overviewLead: "What Is a Bus Ticketing",
  overviewHighlight: "Admin Panel?",
  overviewText:
    "The admin panel is where a transport operator configures and controls the whole ticketing system. Everything that counters, agents, drivers and customers see — routes, schedules, seat layouts, fares, discounts — is defined here, and everything they do flows back here as accounts and reports.",
  pillars: [
    { icon: "map", title: "Plan", desc: "Define routes, schedules and the seat plan of every coach." },
    { icon: "dollar", title: "Price", desc: "Control fares by passenger type, date, seat class and departure." },
    { icon: "group", title: "Delegate", desc: "Give agents, staff and managers exactly the access they need." },
    { icon: "chart", title: "Measure", desc: "Track accounts, fleet, fuel and sales in real time." },
  ],
  problemsTitle: "The problems it puts an end to",
  problemsIntro: "Most operators lose money to scattered tools, not to bad routes.",
  problems: [
    "Fares, routes and seat layouts maintained in separate spreadsheets",
    "No clear picture of agent sales and commission owed",
    "Fuel and fleet costs tracked on paper and reconciled weeks later",
    "Staff with more system access than their role requires",
  ],

  featuresHighlight: "Our Bus Ticketing Admin Panel",
  featuresIntro:
    "Twelve tools that cover planning, pricing, people, money and fleet — everything behind the ticket counter.",
  features: [
    { icon: "map", title: "Route Management", desc: "Create routes, stops and boarding and dropping points, and keep them current as your network changes." },
    { icon: "calendar", title: "Schedule Management & Swapping", desc: "Build departure schedules and swap schedules or coaches when plans change, without rebuilding the trip." },
    { icon: "grid", title: "Dynamic Seat Plan Maker", desc: "Draw the seat layout of any coach type and reuse it across trips, from standard to business class." },
    { icon: "group", title: "Agent Management", desc: "Onboard agents, set their commission and credit, and monitor what each one sells." },
    { icon: "dollar", title: "Dynamic Ticket Pricing", desc: "Price by passenger type (adult, child, senior), day or date range, seat category and departure." },
    { icon: "tag", title: "Package & Incremental Pricing", desc: "Offer package fares such as Flex, Saver and Normal, and raise prices step by step as seats fill." },
    { icon: "cash", title: "Accounts", desc: "Follow income and expense across counters, agents and online sales in one set of books." },
    { icon: "chart", title: "Strong Reporting", desc: "Sales, occupancy, collections and staff activity reports, ready whenever you need them." },
    { icon: "shield", title: "User Privilege", desc: "Define roles and permissions so each user sees and changes only what their job requires." },
    { icon: "ticket", title: "Coupon Management", desc: "Create and control coupons and discount campaigns to fill seats on slower departures." },
    { icon: "truck", title: "Fleet Management", desc: "Keep a register of coaches and assign them to trips and staff." },
    { icon: "bolt", title: "Fuel Management", desc: "Record fuel usage and cost per coach and trip, so running costs stay visible." },
  ],

  stepsTitle: "Setting Up Your Operation",
  stepsIntro: "From an empty system to a live, sellable timetable in four stages.",
  steps: [
    { title: "Define the network", desc: "Add routes, stops and the fleet that will run them." },
    { title: "Draw seat plans", desc: "Build a seat layout for each coach type." },
    { title: "Set prices & schedules", desc: "Publish departures with the right fares and discounts." },
    { title: "Monitor & adjust", desc: "Watch sales, accounts and reports, then refine." },
  ],

  faqHighlight: "the Bus Ticketing Admin Panel",
  faqIntro: "Straight answers about configuring routes, fares, agents and reports with CWTicketing.",
  faqs: [
    { q: "What can I manage from the admin panel?", a: "Routes, schedules, seat plans, ticket prices, agents, accounts, reports, user privileges, coupons, fleet and fuel — the full back office of your ticketing operation, in one cloud-based panel." },
    { q: "Can I set different prices for different passengers and dates?", a: "Yes. Fares can vary by passenger type (adult, child, senior), by day or date range, by seat category such as business or economy, and by departure. You can also run package fares and incremental pricing." },
    { q: "Can I control what each staff member can access?", a: "Yes. User privileges let you define roles so counter staff, managers and administrators each see only what their role allows." },
    { q: "Can I design my own seat layouts?", a: "Yes. The dynamic seat plan maker lets you build the layout for each coach type and reuse it across schedules." },
  ],
  ctaTitle: "Take Control of Your Whole Operation From One Admin Panel",
  ctaDesc:
    "Tell us about your routes, fleet and pricing rules, and we'll show you the admin panel configured around them.",
};

export const counterPanel: FeaturePageData = {
  path: "/bus-counter-ticketing-software",
  navLabel: "Counter Panel",
  navDesc: "Ticket sales at the counter",
  navIcon: "ticket",
  demoTab: "counter-panel",
  metaTitle: "Bus Counter Ticketing Software | Counter Panel",
  metaDescription:
    "Sell, book, cancel and reschedule bus tickets at the counter. Seat and no-seat ticketing, return tickets, passenger manifests, discounts and counter accounts.",
  breadcrumb: "Bus Counter Ticketing Software",
  appName: "CWTicketing — Counter Panel",
  appDescription:
    "Counter-side ticketing software for bus operators: ticket sell, book and cancel, seat and no-seat ticketing, return tickets, departure sheets, passenger manifests, discounts, reservations, fleet and staff assigning, and counter income and expense.",
  operatingSystem: "Web",

  badge: "Bus Counter Ticketing Software",
  heroLead: "A Faster",
  heroHighlight: "Counter Panel",
  heroTail: "for Selling & Managing Bus Tickets",
  heroDesc:
    "Give counter staff one screen to sell, book, cancel and reschedule tickets, assign fleet and staff, print the departure sheet, and close the day with counter income and expense.",
  heroTrust: ["Seat & no-seat ticketing", "Return tickets & reschedule", "Departure sheet & manifest", "Counter income & expense"],
  cardTitle: "Counter Sales Desk",
  cardSubtitle: "Counter Panel",
  cardRows: ["Sell, book or cancel", "Seat / no-seat tickets", "Departure sheet & manifest", "Counter income / expense"],

  overviewLead: "What Is a Bus",
  overviewHighlight: "Counter Panel?",
  overviewText:
    "The counter panel is the screen your ticket counters work in all day. It shows live seat availability, issues tickets, handles changes and cancellations, and produces the paperwork a departure needs — while every sale lands in the same system as your online and agent bookings.",
  pillars: [
    { icon: "ticket", title: "Sell", desc: "Issue tickets in seconds with live seat availability." },
    { icon: "switch", title: "Change", desc: "Cancel, reschedule or issue return tickets on the spot." },
    { icon: "clipboard", title: "Dispatch", desc: "Print the departure sheet and passenger manifest." },
    { icon: "cash", title: "Close", desc: "Reconcile counter income and expense at day end." },
  ],
  problemsTitle: "The problems it puts an end to",
  problemsIntro: "Busy counters break down on small things — double-sold seats and paper manifests.",
  problems: [
    "Seats sold twice because counters and online sales are not in sync",
    "Passenger lists compiled by hand before each departure",
    "Cancellations and reschedules handled with phone calls",
    "Counter cash that does not match tickets issued",
  ],

  featuresHighlight: "Our Counter Panel",
  featuresIntro: "Nine capabilities that cover the whole counter day, from first ticket to final cash count.",
  features: [
    { icon: "ticket", title: "Ticket Sell, Book or Cancel", desc: "Sell or hold a ticket, and cancel it later — all against live seat availability." },
    { icon: "grid", title: "With Seat / No Seat Ticketing", desc: "Sell numbered seats, or sell tickets without seat assignment where your service works that way." },
    { icon: "reply", title: "Return Tickets", desc: "Issue return tickets together with the outward journey." },
    { icon: "refresh", title: "Ticket Reschedule", desc: "Move a passenger to another departure without cancelling and rebooking." },
    { icon: "calendar", title: "Reservation", desc: "Reserve seats for passengers who will pay or collect later." },
    { icon: "clipboard", title: "Departure Sheet / Passenger Manifest", desc: "Print the passenger list for every departure, ready for the driver." },
    { icon: "truck", title: "Fleet / Staff Assigning", desc: "Assign the coach, driver and staff to each trip from the counter." },
    { icon: "tag", title: "Discount", desc: "Apply approved discounts at the point of sale." },
    { icon: "cash", title: "Counter Income, Expense & Reporting", desc: "Record counter income and expense and review reports for each counter and shift." },
  ],

  stepsTitle: "A Ticket at the Counter",
  stepsIntro: "The path a counter sale follows, from search to manifest.",
  steps: [
    { title: "Find the trip", desc: "Search the departure and see live seat availability." },
    { title: "Sell or book", desc: "Choose seats, apply a discount and issue or hold the ticket." },
    { title: "Handle changes", desc: "Cancel, reschedule or add a return ticket when plans change." },
    { title: "Dispatch & close", desc: "Print the manifest, then reconcile counter accounts." },
  ],

  faqHighlight: "the Counter Panel",
  faqIntro: "Straight answers about selling and managing tickets at your counters.",
  faqs: [
    { q: "Can counters sell tickets without assigning seats?", a: "Yes. The counter panel supports both seat-based and no-seat ticketing, so you can match how each service operates." },
    { q: "Can counter staff reschedule or cancel tickets?", a: "Yes. Tickets can be cancelled or rescheduled to another departure from the counter panel, and return tickets can be issued." },
    { q: "How does the driver get the passenger list?", a: "The counter panel prints a departure sheet and passenger manifest for each trip." },
    { q: "Do counter sales sync with online and agent sales?", a: "Yes. All channels share the same inventory, so a seat sold at the counter is no longer available online or to agents." },
  ],
  ctaTitle: "Give Every Counter a Faster Way to Sell",
  ctaDesc: "Tell us how your counters work today, and we'll show you the counter panel set up for your team.",
};

export const agentApp: FeaturePageData = {
  path: "/bus-agent-app",
  demoTab: "agent-pos",
  navLabel: "Agent App",
  navDesc: "Handheld ticketing for agents",
  navIcon: "mobile",
  metaTitle: "Bus Ticketing Agent App | Sell Tickets & Track Commission",
  metaDescription:
    "A ticketing app for bus agents: sell, book and cancel tickets, offline ticketing, return tickets, reschedule, discounts, manifests, reporting and commission.",
  breadcrumb: "Bus Agent App",
  appName: "CWTicketing — Agent App",
  appDescription:
    "A mobile and handheld ticketing app for bus ticket agents: ticket sell, book and cancel, seat and no-seat ticketing, return tickets, offline ticketing, discounts, rescheduling, departure sheets, reporting and commission.",
  operatingSystem: "Android",

  badge: "Bus Ticketing Agent App",
  heroLead: "An",
  heroHighlight: "Agent App",
  heroTail: "That Sells Tickets Anywhere & Tracks Commission",
  heroDesc:
    "Put ticket selling in your agents' hands. They sell, book and cancel tickets, work offline, print the ticket on a handheld device, and see their own reports and commission.",
  heroTrust: ["Offline ticketing", "Seat & no-seat sales", "Return tickets & reschedule", "Commission tracking"],
  cardTitle: "Agent Ticketing App",
  cardSubtitle: "Agent App",
  cardRows: ["Sell, book or cancel", "Works offline", "Discounts & rescheduling", "Reports & commission"],

  overviewLead: "What Is a Bus Ticketing",
  overviewHighlight: "Agent App?",
  overviewText:
    "The agent app lets your sales agents — at roadside stalls, small offices or terminals — sell tickets for your services from a handheld device or phone. Sales go into the same inventory as your counters and website, and commission is recorded automatically.",
  pillars: [
    { icon: "mobile", title: "Sell", desc: "Issue tickets from a handheld device or phone." },
    { icon: "offline", title: "Keep Selling", desc: "Offline ticketing when the connection drops." },
    { icon: "document", title: "Report", desc: "Departure sheets and sales reports in the app." },
    { icon: "cash", title: "Earn", desc: "Commission calculated on every ticket sold." },
  ],
  problemsTitle: "The problems it puts an end to",
  problemsIntro: "Agent networks widen your reach, but they are hard to keep accurate without the right tool.",
  problems: [
    "Agents selling from paper books that never match the system",
    "Lost sales when the signal drops at remote points",
    "Disputes over how much commission each agent has earned",
    "No live view of which seats agents have sold",
  ],

  featuresHighlight: "Our Agent App",
  featuresIntro: "Nine features that let an agent sell, change and account for tickets from a single device.",
  features: [
    { icon: "ticket", title: "Ticket Sell, Book & Cancel", desc: "Sell, hold or cancel tickets against live seat availability." },
    { icon: "grid", title: "Seat & No-Seat Ticketing", desc: "Assign seats on the seat map, or sell tickets without a seat where your service allows." },
    { icon: "reply", title: "Return Tickets", desc: "Issue a return ticket with the outward journey." },
    { icon: "clipboard", title: "Departure Sheet / Passenger Manifest", desc: "View and print the passenger list for a departure." },
    { icon: "offline", title: "Offline Ticketing", desc: "Keep issuing tickets without a connection and sync when you are back online." },
    { icon: "tag", title: "Discount", desc: "Apply the discounts you are authorised to give." },
    { icon: "refresh", title: "Ticket Rescheduling", desc: "Move a passenger to another departure from the app." },
    { icon: "cash", title: "Commission", desc: "Commission is recorded on each sale, so agents and operators see the same figure." },
    { icon: "chart", title: "Reporting", desc: "Sales and collection reports for the agent, by day or period." },
  ],

  stepsTitle: "An Agent's Sale",
  stepsIntro: "How an agent takes a booking from request to printed ticket.",
  steps: [
    { title: "Pick the trip", desc: "Choose route, date and departure." },
    { title: "Choose seats", desc: "Select seats on the seat map, or sell without a seat." },
    { title: "Issue the ticket", desc: "Apply a discount if allowed and print or send the ticket." },
    { title: "Review earnings", desc: "Check your reports and commission." },
  ],

  faqHighlight: "the Agent App",
  faqIntro: "Straight answers about equipping your agent network with CWTicketing.",
  faqs: [
    { q: "Can agents sell tickets without internet?", a: "Yes. The agent app includes offline ticketing, so agents can keep selling when the connection is poor." },
    { q: "How is agent commission calculated?", a: "Commission is configured by the operator in the admin panel, and the agent app records it against each ticket sold." },
    { q: "Can agents cancel or reschedule tickets?", a: "Yes. Agents can cancel tickets and reschedule passengers to another departure from the app." },
    { q: "Do agent sales share inventory with other channels?", a: "Yes. Agent sales draw from the same seat inventory as counters and the online booking website." },
  ],
  ctaTitle: "Extend Your Reach With a Ticketing App for Every Agent",
  ctaDesc: "Tell us about your agent network, and we'll show you the agent app set up for it.",
};

export const driverApp: FeaturePageData = {
  path: "/bus-driver-app",
  demoTab: "driver-app",
  navLabel: "Driver App",
  navDesc: "Boarding, validation & trips",
  navIcon: "truck",
  metaTitle: "Bus Driver App | Ticket Validation, Boarding & Trip Reports",
  metaDescription:
    "A driver app for bus operators: validate tickets, board passengers, see boarding-point passenger lists, record no-shows, sell tickets on board and report on the trip.",
  breadcrumb: "Bus Driver App",
  appName: "CWTicketing — Driver App",
  appDescription:
    "A mobile app for bus drivers and coach staff: ticket sell, ticket validation check, ticket status change, board passenger, boarding-point-wise passenger list, no-show, approximate reaching time to the next boarding point, trip management and reporting.",
  operatingSystem: "Android",

  badge: "Bus Driver App",
  heroLead: "A",
  heroHighlight: "Driver App",
  heroTail: "for Boarding, Ticket Validation & Trip Control",
  heroDesc:
    "Drivers and coach staff scan and validate tickets, board passengers by boarding point, mark no-shows, sell remaining seats and close the trip — all from their phone.",
  heroTrust: ["Ticket validation check", "Boarding-point passenger list", "No-show handling", "On-board ticket sales"],
  cardTitle: "Driver Trip View",
  cardSubtitle: "Driver App",
  cardRows: ["Scan & validate tickets", "Board passengers", "Boarding-point list", "Close the trip"],

  overviewLead: "What Is a Bus",
  overviewHighlight: "Driver App?",
  overviewText:
    "The driver app puts the trip in the hands of the person running it. It shows who is booked, where each passenger boards, and which tickets are valid, and it lets the driver sell remaining seats and report the trip — keeping the system in step with what happens on the road.",
  pillars: [
    { icon: "qr", title: "Validate", desc: "Scan tickets and check they are valid." },
    { icon: "users", title: "Board", desc: "Mark passengers boarded, by boarding point." },
    { icon: "ticket", title: "Sell", desc: "Sell empty seats along the way." },
    { icon: "document", title: "Report", desc: "Close the trip with a record of what happened." },
  ],
  problemsTitle: "The problems it puts an end to",
  problemsIntro: "What happens on the bus is often the least visible part of the operation.",
  problems: [
    "Ticket checks done by eye, so invalid or reused tickets slip through",
    "Drivers unsure who boards at which stop",
    "No-shows that leave seats empty and unrecorded",
    "Trip details reported by phone after the journey",
  ],

  featuresHighlight: "Our Driver App",
  featuresIntro: "Nine features that connect the coach to the rest of your ticketing system.",
  features: [
    { icon: "qr", title: "Ticket Validation Check", desc: "Scan a ticket and confirm it is valid for this trip before the passenger boards." },
    { icon: "badge", title: "Board Passenger", desc: "Mark each passenger as boarded so the manifest is always current." },
    { icon: "refresh", title: "Ticket Status Change", desc: "Update a ticket's status as the trip progresses." },
    { icon: "pin", title: "Boarding-Point-Wise Passenger List", desc: "See who boards at each stop, so no one is missed." },
    { icon: "users", title: "No Show", desc: "Record passengers who do not turn up." },
    { icon: "clock", title: "Approx. Reaching Time", desc: "See the approximate time to reach the next boarding point." },
    { icon: "ticket", title: "Ticket Sell", desc: "Sell available seats on board, against live inventory." },
    { icon: "truck", title: "Trip Management", desc: "See upcoming trips, trip status and close the trip when it ends." },
    { icon: "chart", title: "Reporting", desc: "Trip reports for sales, boardings and no-shows." },
  ],

  stepsTitle: "A Trip With the Driver App",
  stepsIntro: "From the first boarding point to closing the trip.",
  steps: [
    { title: "Open the trip", desc: "See route, coach, departure and the passenger list." },
    { title: "Validate & board", desc: "Scan tickets and board passengers at each stop." },
    { title: "Handle changes", desc: "Mark no-shows and sell any remaining seats." },
    { title: "Close the trip", desc: "Finish the trip and send the report to the office." },
  ],

  faqHighlight: "the Driver App",
  faqIntro: "Straight answers about running a trip with the CWTicketing driver app.",
  faqs: [
    { q: "How does the driver app validate tickets?", a: "The driver scans the ticket and the app checks it against the trip, confirming whether it is valid before the passenger boards." },
    { q: "Can drivers see where passengers board?", a: "Yes. The app shows a boarding-point-wise passenger list, so the driver knows who to expect at each stop." },
    { q: "Can drivers sell tickets on board?", a: "Yes. The driver app includes ticket selling for available seats." },
    { q: "Can the driver record no-shows?", a: "Yes. Passengers who do not turn up can be marked as no-shows, keeping the manifest and reports accurate." },
  ],
  ctaTitle: "Connect Every Coach to Your Ticketing System",
  ctaDesc: "Tell us how your trips run, and we'll show you the driver app set up for your drivers.",
};

export const passengerApp: FeaturePageData = {
  path: "/bus-ticket-booking-app",
  demoTab: "passenger-app",
  navLabel: "Passenger App",
  navDesc: "Android & iOS booking app",
  navIcon: "mobile",
  metaTitle: "Bus Ticket Booking App | Android & iOS Passenger App",
  metaDescription:
    "A branded Android and iOS app for your passengers: search, book and pay for bus tickets, download tickets, cancel or reschedule, track the bus and use coupons.",
  breadcrumb: "Bus Ticket Booking App",
  appName: "CWTicketing — Passenger App",
  appDescription:
    "A mobile app for bus passengers on Android and iOS: purchase tickets, download tickets, cancel and reschedule tickets, profile management, booking and reservation history, live bus tracking, and coupons and offers.",
  operatingSystem: "Android, iOS",

  badge: "Bus Ticket Booking App",
  heroLead: "A Branded",
  heroHighlight: "Passenger App",
  heroTail: "for Android & iOS Bus Ticket Booking",
  heroDesc:
    "Let passengers search, book and pay from their phone, keep tickets in the app, change plans in a few taps and follow the bus live — under your brand.",
  heroTrust: ["Android & iOS apps", "Live bus tracking", "Cancel & reschedule", "Coupons & offers"],
  cardTitle: "Passenger Booking App",
  cardSubtitle: "Passenger App",
  cardRows: ["Search from, to & date", "Pay and download tickets", "Live bus tracking", "Coupons & offers"],

  overviewLead: "What Is a Bus",
  overviewHighlight: "Passenger App?",
  overviewText:
    "The passenger app is your booking channel on the customer's phone. Passengers find a trip, choose seats, pay, and carry their ticket with them — and your brand sits on their home screen instead of a third-party marketplace's.",
  pillars: [
    { icon: "search", title: "Search", desc: "Find a trip by from, to and date." },
    { icon: "card", title: "Book & Pay", desc: "Choose seats and pay online." },
    { icon: "pin", title: "Track", desc: "Follow the bus live on the day." },
    { icon: "refresh", title: "Manage", desc: "Cancel, reschedule and review bookings." },
  ],
  problemsTitle: "The problems it puts an end to",
  problemsIntro: "Passengers expect to book on their phone — and to stay with your brand when they do.",
  problems: [
    "Customers booking through marketplaces that take the relationship",
    "Passengers phoning the counter just to check a booking",
    "Paper tickets that get lost or forgotten",
    "No direct way to send offers to returning passengers",
  ],

  featuresHighlight: "Our Passenger Mobile App",
  featuresIntro: "Nine features that cover the passenger's journey, from search to arrival.",
  features: [
    { icon: "search", title: "Search & Seat Selection", desc: "Search by from, to and date, then pick seats on the seat map." },
    { icon: "card", title: "Purchase Tickets", desc: "Pay online and receive the ticket immediately." },
    { icon: "download", title: "Download Tickets", desc: "Save the ticket to the phone and show it at boarding." },
    { icon: "refresh", title: "Cancel & Reschedule Tickets", desc: "Change or cancel a booking without calling anyone." },
    { icon: "user", title: "Profile Management", desc: "Keep passenger details saved for faster future bookings." },
    { icon: "collection", title: "Booking or Reservation History", desc: "Review every past and upcoming booking and reservation." },
    { icon: "pin", title: "Live Bus Tracking", desc: "Follow the coach's position on the day of travel." },
    { icon: "tag", title: "Coupons & Offers", desc: "Apply coupons and see current offers in the app." },
    { icon: "mobile", title: "Android & iOS", desc: "Native apps for both platforms, under your own brand." },
  ],

  stepsTitle: "A Passenger's Booking",
  stepsIntro: "From opening the app to boarding the bus.",
  steps: [
    { title: "Search", desc: "Enter from, to and travel date." },
    { title: "Select seats", desc: "Pick seats on the seat map." },
    { title: "Pay", desc: "Complete payment and receive the ticket." },
    { title: "Travel", desc: "Track the bus and show the ticket to board." },
  ],

  faqHighlight: "the Passenger Mobile App",
  faqIntro: "Straight answers about offering a booking app to your passengers.",
  faqs: [
    { q: "Is the passenger app available on both Android and iOS?", a: "Yes. CWTicketing provides the passenger app for both Android and iOS." },
    { q: "Can passengers cancel or reschedule from the app?", a: "Yes. Passengers can cancel and reschedule tickets in the app, following the rules you set." },
    { q: "Can passengers track the bus?", a: "Yes. The app includes live bus tracking." },
    { q: "Can I run coupons and offers in the app?", a: "Yes. Coupons created in the admin panel can be applied by passengers in the app." },
  ],
  ctaTitle: "Put Your Brand on Every Passenger's Phone",
  ctaDesc: "Tell us about your services, and we'll show you the passenger app set up for your brand.",
};

export const bookingWebsite: FeaturePageData = {
  path: "/bus-ticket-booking-website",
  demoTab: "website",
  navLabel: "Booking Website",
  navDesc: "Your branded online booking site",
  navIcon: "globe",
  metaTitle: "Bus Ticket Booking Website | Branded Online Booking Platform",
  metaDescription:
    "Launch a branded bus ticket booking website: online purchase, ticket re-print, cancel requests, bus tracking, coupons, customer profile, booking history and payments.",
  breadcrumb: "Bus Ticket Booking Website",
  appName: "CWTicketing — Customer Booking Website",
  appDescription:
    "A branded customer website for bus operators: purchase tickets, re-print tickets, cancel requests, bus tracking, coupons and discounts, customer profile, bookings and reserves history, and online payment.",
  operatingSystem: "Web",

  badge: "Bus Ticket Booking Website",
  heroLead: "Your Own",
  heroHighlight: "Bus Ticket Booking Website",
  heroTail: "That Sells 24/7",
  heroDesc:
    "Give customers a branded website to search, book and pay for tickets at any hour, re-print tickets, request cancellations and follow the bus — on desktop and on mobile.",
  heroTrust: ["Online ticket purchase", "Secure online payment", "Coupons & discounts", "Works on mobile & desktop"],
  cardTitle: "Online Booking Platform",
  cardSubtitle: "Customer Website",
  cardRows: ["Search & purchase tickets", "Make payment online", "Re-print & cancel requests", "Booking history & profile"],

  overviewLead: "What Is a Bus Ticket",
  overviewHighlight: "Booking Website?",
  overviewText:
    "A booking website is your operator-branded storefront. Customers search routes, choose seats and pay online without calling or visiting a counter, and everything they book lands in the same system your counters, agents and drivers use.",
  pillars: [
    { icon: "globe", title: "Be Found", desc: "A branded site customers can reach any time." },
    { icon: "card", title: "Take Payment", desc: "Collect payment online through your gateways." },
    { icon: "user", title: "Know Customers", desc: "Profiles and booking history for every customer." },
    { icon: "tag", title: "Promote", desc: "Coupons and discounts that bring customers back." },
  ],
  problemsTitle: "The problems it puts an end to",
  problemsIntro: "Without a website of your own, every booking depends on someone else's channel.",
  problems: [
    "Sales limited to counter opening hours",
    "Customers phoning to ask about seats, fares and tickets",
    "Lost tickets and no easy way to re-print them",
    "No data on who your repeat customers are",
  ],

  featuresHighlight: "Our Customer Booking Website",
  featuresIntro: "Nine features that cover the whole customer journey online.",
  features: [
    { icon: "ticket", title: "Purchase Tickets", desc: "Search a route, pick seats and buy tickets online." },
    { icon: "card", title: "Make Payment", desc: "Pay through the payment gateways you choose." },
    { icon: "download", title: "Re-Print Tickets", desc: "Customers can re-print a ticket whenever they need it." },
    { icon: "reply", title: "Cancel Request", desc: "Submit a cancellation request online for your team to process." },
    { icon: "pin", title: "Bus Tracking", desc: "Follow the coach's progress on the day of travel." },
    { icon: "tag", title: "Coupon and Discount", desc: "Apply coupon codes and discounts at checkout." },
    { icon: "user", title: "Customer Profile", desc: "Saved details for faster repeat bookings." },
    { icon: "collection", title: "Bookings History", desc: "Review every past booking in one place." },
    { icon: "calendar", title: "Reserves History", desc: "See reservations that are held but not yet paid for." },
  ],

  stepsTitle: "A Customer's Online Booking",
  stepsIntro: "From search to ticket in hand.",
  steps: [
    { title: "Search", desc: "Select from, to and date." },
    { title: "Choose seats", desc: "Pick seats and apply any coupon." },
    { title: "Pay online", desc: "Pay through a supported gateway." },
    { title: "Get the ticket", desc: "Download or re-print it whenever needed." },
  ],

  faqHighlight: "the Booking Website",
  faqIntro: "Straight answers about launching an online booking site with CWTicketing.",
  faqs: [
    { q: "Will the website carry my brand?", a: "Yes. The customer website is set up and branded for your business." },
    { q: "Does it work on mobile phones?", a: "Yes. The booking website is built to be used on both desktop and mobile browsers." },
    { q: "Can customers re-print their tickets?", a: "Yes. Customers can re-print tickets and review their booking history from their profile." },
    { q: "How do customers pay?", a: "Through the payment gateways connected to your site. See our payment gateway integration page for the options." },
  ],
  ctaTitle: "Launch Your Own Online Booking Website",
  ctaDesc: "Tell us about your routes and brand, and we'll show you a booking website built around them.",
};

export const rentalReservation: FeaturePageData = {
  path: "/bus-rental-reservation-system",
  navLabel: "Bus Rental & Reservation",
  navDesc: "Special hire, quotes & charters",
  navIcon: "calendar",
  metaTitle: "Bus Rental & Reservation System | Special Hire Software",
  metaDescription:
    "Manage special hire and rent-a-bus bookings: quotations, direct reservations, one-way and return trips, multiple fleets per reservation and payment processing.",
  breadcrumb: "Bus Rental & Reservation System",
  appName: "CWTicketing — Reservation / Special Hire / Rent-a-Bus",
  appDescription:
    "Reservation software for special hire and bus rental: quotation entry, reservation from quotation, direct reservation, one-way and return reservations, multiple fleets per reservation, reservation payment and reservation add or delete.",
  operatingSystem: "Web",

  badge: "Bus Rental & Reservation System",
  heroLead: "Manage Special Hire With a",
  heroHighlight: "Bus Rental & Reservation System",
  heroTail: "",
  heroDesc:
    "Quote a group, turn the quote into a reservation, add as many coaches as the trip needs, take payment and keep the whole charter on record.",
  heroTrust: ["Quotation to reservation", "One-way & return trips", "Multiple fleets per booking", "Reservation payments"],
  cardTitle: "Special Hire Desk",
  cardSubtitle: "Reservation / Special Hire",
  cardRows: ["Quotation entry", "Direct reservation", "Multiple fleets", "Payment process"],

  overviewLead: "What Is a Bus Rental &",
  overviewHighlight: "Reservation System?",
  overviewText:
    "Special hire is a different business from scheduled service: a group, a date, a destination and a price agreed in advance. A reservation system records the quote, converts it into a booking, assigns the coaches and tracks payment, so charters stop living in notebooks and message threads.",
  pillars: [
    { icon: "document", title: "Quote", desc: "Enter a quotation for the group's trip." },
    { icon: "calendar", title: "Reserve", desc: "Turn the quote, or a direct request, into a reservation." },
    { icon: "truck", title: "Assign", desc: "Add one or more coaches to the booking." },
    { icon: "cash", title: "Collect", desc: "Process payment against the reservation." },
  ],
  problemsTitle: "The problems it puts an end to",
  problemsIntro: "Charter bookings are high-value and easy to get wrong when managed informally.",
  problems: [
    "Quotes agreed by phone and forgotten or disputed later",
    "Large groups that need several coaches on one booking",
    "Return legs not linked to the outward trip",
    "Deposits and balances not matched to the reservation",
  ],

  featuresHighlight: "Our Reservation & Special Hire System",
  featuresIntro: "Six capabilities that carry a charter from quote to payment.",
  features: [
    { icon: "document", title: "Quotation Entry & Reservation from Quotation", desc: "Record a quotation, then convert it into a reservation once the customer accepts." },
    { icon: "calendar", title: "Direct Reservation", desc: "Create a reservation directly when no quotation is needed." },
    { icon: "switch", title: "One-Way or With Return", desc: "Reserve a one-way journey, or include the return leg in the same booking." },
    { icon: "truck", title: "Add Multiple Fleets to a Reservation", desc: "Assign several coaches to one reservation when the group is large." },
    { icon: "cash", title: "Reservation Payment Process", desc: "Take and record payment against each reservation." },
    { icon: "clipboard", title: "Reservation Add or Delete", desc: "Add new reservations and remove ones that fall through, keeping the record clean." },
  ],

  stepsTitle: "From Enquiry to Charter",
  stepsIntro: "The usual path of a special hire booking.",
  steps: [
    { title: "Enter a quotation", desc: "Record the trip, group and price." },
    { title: "Confirm the reservation", desc: "Convert the quotation, or reserve directly." },
    { title: "Assign coaches", desc: "Add the fleets the trip needs, one-way or return." },
    { title: "Take payment", desc: "Process payment and keep the reservation on record." },
  ],

  faqHighlight: "Bus Rental & Reservation Software",
  faqIntro: "Straight answers about managing special hire and rent-a-bus bookings.",
  faqs: [
    { q: "Can I create a reservation from a quotation?", a: "Yes. You can enter a quotation and then create the reservation from it once the customer confirms." },
    { q: "Can one reservation include more than one coach?", a: "Yes. You can add multiple fleets to a single reservation." },
    { q: "Does it handle return trips?", a: "Yes. Reservations can be one-way or include the return journey." },
    { q: "Can I take payment against a reservation?", a: "Yes. The reservation payment process records payments against each reservation." },
  ],
  ctaTitle: "Turn Special Hire Enquiries Into Organised Bookings",
  ctaDesc: "Tell us how you quote and run charters, and we'll show you the reservation system set up for it.",
};

export const paymentGateway: FeaturePageData = {
  path: "/payment-gateway-integration",
  navLabel: "Payment Gateway Integration",
  navDesc: "Global and local payment options",
  navIcon: "card",
  metaTitle: "Payment Gateway Integration for Ticketing | Global & Local",
  metaDescription:
    "Integrate any payment gateway, global or local, with your ticketing system: cards, wallets and mobile money including Stripe, PayPal, M-Pesa, Flutterwave, bKash and more.",
  breadcrumb: "Payment Gateway Integration",
  appName: "CWTicketing — Payment Gateway Integration",
  appDescription:
    "Payment gateway integration for the CWTicketing ticketing system: global card and wallet gateways, mobile money and regional gateways, connected to your website, apps and counters.",
  operatingSystem: "Web, Android, iOS",

  badge: "Payment Gateway Integration",
  heroLead: "Accept Payments With Any",
  heroHighlight: "Payment Gateway",
  heroTail: "— Global or Local",
  heroDesc:
    "Connect the gateways your customers already trust — cards, wallets, mobile money and local banks — to your booking website and apps, without changing how you sell.",
  heroTrust: ["Cards & digital wallets", "Mobile money", "Local & regional gateways", "Custom gateway integration"],
  cardTitle: "Checkout Options",
  cardSubtitle: "Payment Gateways",
  cardRows: ["Cards & wallets", "Mobile money", "Local bank gateways", "Your own gateway"],

  overviewLead: "Why Payment Gateway",
  overviewHighlight: "Integration Matters",
  overviewText:
    "A customer who cannot pay the way they want will not book. CWTicketing integrates with many global and local gateways, and can integrate others, so your online checkout offers the payment methods your market actually uses.",
  pillars: [
    { icon: "globe", title: "Global", desc: "International cards and wallets." },
    { icon: "mobile", title: "Mobile Money", desc: "The wallets people use every day." },
    { icon: "office", title: "Local", desc: "Regional banks and payment providers." },
    { icon: "cog", title: "Custom", desc: "Other gateways can be integrated on request." },
  ],
  problemsTitle: "The problems it puts an end to",
  problemsIntro: "Payment friction is the quietest way to lose bookings.",
  problems: [
    "Customers who abandon checkout because their method is not offered",
    "Cash-only sales outside counter hours",
    "Manual confirmation of transfers and mobile money payments",
    "Different payment setups for web, app and counter",
  ],

  featuresHighlight: "Our Payment Gateway Integration",
  featuresIntro:
    "Six ways CWTicketing connects your ticketing system to the payment methods your customers use.",
  features: [
    { icon: "card", title: "Cards & Digital Wallets", desc: "Accept card payments and wallets such as Apple Pay and Google Pay through supported gateways." },
    { icon: "mobile", title: "Mobile Money", desc: "Take payments from mobile money wallets used across many markets." },
    { icon: "office", title: "Local & Regional Gateways", desc: "Connect local banks and payment providers so customers can pay in familiar ways." },
    { icon: "globe", title: "Global or Local, Your Choice", desc: "Use a global gateway, a local one, or several together." },
    { icon: "cog", title: "Integration of Any Gateway", desc: "If your preferred gateway is not listed, we can integrate it with your system." },
    { icon: "lock", title: "Secure Online Checkout", desc: "Payment is handled by the gateway you choose, so card data stays with a payment provider." },
  ],
  groups: [
    {
      title: "Cards, wallets & global gateways",
      items: ["Stripe", "PayPal", "Mastercard Gateway Services", "Apple Pay", "Google Pay", "Authorize.Net", "Clover", "EveryPay", "Openpay", "WayForPay", "Dojo", "Revolut"],
    },
    {
      title: "Mobile money & regional gateways",
      items: ["M-Pesa", "Safaricom", "MTN MoMo", "Orange Money", "Telebirr", "Paystack", "Flutterwave", "DPO Group", "Tingg", "Monnify", "SasaPay", "AzamPay", "WAAFIPay", "Tranzak", "ZynlePay", "Payzana", "Amwal Pay", "Bank Dhofar"],
    },
    {
      title: "Bangladesh gateways",
      items: ["bKash", "SSLCommerz", "aamarPay"],
    },
  ],

  stepsTitle: "Going Live With a Gateway",
  stepsIntro: "How a gateway is connected to your ticketing system.",
  steps: [
    { title: "Choose gateways", desc: "Pick the payment methods your market uses." },
    { title: "Connect your account", desc: "Link your merchant account to your system." },
    { title: "Test checkout", desc: "Run test bookings end to end." },
    { title: "Go live", desc: "Switch on online payment for web and apps." },
  ],

  faqHighlight: "Payment Gateway Integration",
  faqIntro: "Straight answers about taking online payments with CWTicketing.",
  faqs: [
    { q: "Which payment gateways can you integrate?", a: "CWTicketing integrates with many global and local gateways, including Stripe, PayPal, M-Pesa, Flutterwave, Paystack and bKash, and can integrate other gateways on request." },
    { q: "Can I use more than one gateway?", a: "Yes. You can offer several payment methods at checkout, for example a card gateway alongside a mobile money option." },
    { q: "What if my gateway is not on your list?", a: "Contact us. We can integrate other payment gateways, global or local, with your ticketing system." },
    { q: "Who handles the card data?", a: "Payment is processed by the gateway you choose, so sensitive payment details are handled by that provider." },
  ],
  ctaTitle: "Let Customers Pay the Way They Prefer",
  ctaDesc: "Tell us which payment methods your customers use, and we'll show you how they connect.",
};

export const FEATURE_PAGES: FeaturePageData[] = [
  adminPanel,
  counterPanel,
  agentApp,
  driverApp,
  passengerApp,
  bookingWebsite,
  rentalReservation,
  paymentGateway,
];
