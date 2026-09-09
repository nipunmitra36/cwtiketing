export interface ParcelFaq {
  q: string;
  a: string;
}

export const parcelFaqs: ParcelFaq[] = [
  {
    q: "What is a parcel management system?",
    a: "A parcel management system is software that tracks every parcel from booking to delivery. It records sender and receiver details, prices the shipment, prints a barcoded waybill, logs each branch and hub handover, assigns the parcel to a delivery rider, notifies the customer, and reconciles any cash collected on delivery — replacing the notebooks and spreadsheets most courier operations still rely on.",
  },
  {
    q: "How does a parcel management solution improve delivery accuracy?",
    a: "Because every handover is a barcode scan, the system always knows which branch, vehicle or rider last held a parcel. If a consignment is delayed or missing, you can trace its exact chain of custody in seconds instead of calling around branches.",
  },
  {
    q: "Can customers track their parcels themselves?",
    a: "Yes. Customers can track a shipment using the waybill number through your web portal or mobile app, and automatic SMS and email updates go out at pickup, transit and delivery. That alone removes most of the calls a branch counter fields each day.",
  },
  {
    q: "Does the system handle cash on delivery?",
    a: "Yes. COD amounts are attached to the individual parcel, recorded by the rider at the doorstep, and reconciled against branch accounts. At any point you can see exactly how much cash is outstanding and which rider or branch is holding it.",
  },
  {
    q: "Can I manage multiple branches and hubs?",
    a: "Yes. Each branch, agent point and sorting hub runs under the same system with its own staff, stock and daily accounts, while head office keeps a consolidated view of volume, revenue and outstanding COD across the whole network.",
  },
  {
    q: "How is parcel pricing calculated?",
    a: "You define the rate charts — weight slabs, distance or zone, route and parcel category — and the parcel management system prices each booking automatically at the counter. Staff never have to look up a rate sheet or calculate a charge by hand.",
  },
  {
    q: "Can bus and transport operators use it for parcel delivery?",
    a: "Absolutely, and it is one of the most common uses. Operators already running scheduled routes can carry parcels on the same vehicles, book them at existing counters, and manage the cargo side of the business from the same platform as their ticketing.",
  },
  {
    q: "Is there a mobile app for delivery riders?",
    a: "Yes. Riders get an Android app with their assigned delivery list, barcode scanning at each handover, proof-of-delivery capture, and cash-on-delivery recording — so the parcel record updates from the road, not after the rider returns.",
  },
  {
    q: "Can the parcel management system be customized and branded for my company?",
    a: "Yes. The customer portal, mobile apps and printed waybills can carry your branding, and workflows are configured around your own service types, rate structure and operating rules before you go live.",
  },
];
