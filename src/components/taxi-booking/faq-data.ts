export interface TaxiFaq {
  q: string;
  a: string;
}

export const taxiFaqs: TaxiFaq[] = [
  {
    q: "What is an online taxi booking system?",
    a: "An online taxi booking system is software that manages the full ride cycle: a passenger requests a trip from an app or website, the system dispatches the nearest available driver, tracks the journey by GPS, calculates the fare from distance and time, captures payment, and records driver commission. It replaces radio dispatch, paper booking registers and manual fare reconciliation with one connected platform.",
  },
  {
    q: "How is taxi booking software different from a simple booking form?",
    a: "A booking form only captures a request. Taxi booking software acts on it — matching a driver, routing the vehicle, metering the fare, notifying the rider, taking payment and settling driver earnings. It manages the trip from request to receipt rather than just recording that someone asked for a car.",
  },
  {
    q: "Does the system dispatch drivers automatically?",
    a: "Yes. The online taxi management system locates the nearest available driver and offers the trip within seconds. Your dispatchers keep full manual control too, so they can assign a specific driver, reassign a trip if someone drops out, or handle phone bookings directly from the console.",
  },
  {
    q: "Can passengers schedule rides in advance?",
    a: "Yes. Riders can book instantly or schedule a trip for a future date and time — useful for airport transfers, hospital appointments and daily commutes. Scheduled trips enter the dispatch queue automatically at the right moment.",
  },
  {
    q: "How are taxi fares calculated?",
    a: "You define the rules and the online taxi reservation system applies them: base fare, per-kilometre and per-minute rates, waiting charges, minimum fares, night or peak multipliers, zone and fixed-route pricing. Riders see an upfront estimate before confirming, and the final fare is metered from the actual GPS trip.",
  },
  {
    q: "What payment methods are supported?",
    a: "Passengers can pay by cash in the car, by card, or through mobile wallets, with a digital receipt issued for every completed trip. Corporate clients can be billed to an account and invoiced monthly instead of paying per ride.",
  },
  {
    q: "Is there a separate app for drivers?",
    a: "Yes. Drivers get an Android app where they go on or off duty, receive ride offers with pickup distance and fare, navigate to the passenger, complete the trip, and see their daily earnings and commission — all synced with the dispatch console in real time.",
  },
  {
    q: "Can I manage driver commission and settlements?",
    a: "Yes. The taxi booking management software calculates each driver's share on a commission, rental or salary model, tracks cash collected against trips completed, and produces settlement statements per driver and per period.",
  },
  {
    q: "Can the apps be branded for my own taxi company?",
    a: "Yes. The passenger app, driver app and web booking portal all carry your company name, logo and colours. You run your own brand while CW Ticketing provides the booking, dispatch and payment infrastructure behind it.",
  },
];
