"use client";

import ProductDemo, { type ProductDemoTab } from "@/components/shared/ProductDemo";
import {
  HiOutlineGlobeAlt,
  HiOutlineDeviceMobile,
  HiOutlineDesktopComputer,
  HiOutlineBriefcase,
  HiOutlineTemplate,
  HiOutlineTruck,
  HiOutlineCube,
  HiOutlineQrcode,
} from "react-icons/hi";

const tabs: ProductDemoTab[] = [
  {
    num: "01",
    icon: HiOutlineGlobeAlt,
    label: "Website",
    title: "White-Label Booking Website",
    desc: "A branded booking site where passengers reserve seats across every operator on your marketplace.",
    bullets: [
      "Search routes & select seats",
      "Buy / purchase ticket online",
      "Reprint & download ticket",
      "Cancel request & rescheduling",
      "Live bus tracking",
      "Customer support",
    ],
    images: [
      "/media/bus-ticketing/White Label Responsive Website 1.webp",
      "/media/bus-ticketing/White Label Responsive Website 2.webp",
      "/media/bus-ticketing/White Label Responsive Website 3.webp",
      "/media/bus-ticketing/White Label Responsive Website 4.webp",
      "/media/bus-ticketing/White Label Responsive Website 5.webp",
      "/media/bus-ticketing/White Label Responsive Website 6.webp",
      "/media/bus-ticketing/White Label Responsive Website 7.webp",
      "/media/bus-ticketing/White Label Responsive Website 8.webp",
    ],
  },
  {
    num: "02",
    icon: HiOutlineDeviceMobile,
    label: "Passenger App",
    title: "Passenger App",
    desc: "One app for passengers to book across every operator on your marketplace.",
    bullets: ["Search routes & select seats", "Purchase and reprint tickets", "Reschedule journeys", "Track vehicles live"],
    images: [
      "/media/bus-ticketing/bus tiketing mobile app/White-Label-Passenger-App-(Android-&-iOS)-1.png",
      "/media/bus-ticketing/bus tiketing mobile app/White-Label-Passenger-App-(Android-&-iOS)-2.png",
      "/media/bus-ticketing/bus tiketing mobile app/White-Label-Passenger-App-(Android-&-iOS)-3.png",
    ],
    device: "phone",
  },
  {
    num: "03",
    icon: HiOutlineDesktopComputer,
    label: "Counter Panel",
    title: "Counter Panel",
    desc: "Front-desk tools for every operator's terminal staff to sell and manage seats.",
    bullets: ["Sell, reserve, cancel tickets", "View passenger manifests", "Assign fleet and staff", "Review sales in real time"],
    images: [
      "/media/bus-ticketing/Web-Based Counter _ Staff _ Booth Panel.webp",
      "/media/bus-ticketing/Web-Based Counter _ Staff _ Booth Panel 2.webp",
      "/media/bus-ticketing/Web-Based Counter _ Staff _ Booth Panel 3.webp",
      "/media/bus-ticketing/Web-Based Counter _ Staff _ Booth Panel 4.webp",
    ],
  },
  {
    num: "04",
    icon: HiOutlineBriefcase,
    label: "Agent POS",
    title: "Agent POS",
    desc: "Field sales for commission-based agents, on or offline, from a pocket-sized device.",
    bullets: ["Booking & ticket issuance", "Bluetooth / POS printing", "Offline ticket sales", "QR ticket validation"],
    images: [
      "/media/bus-ticketing/agent pos/Driver-App-1.png",
      "/media/bus-ticketing/agent pos/Driver-App-2.png",
      "/media/bus-ticketing/agent pos/Driver-App-3.png",
      "/media/bus-ticketing/agent pos/Driver-App-4.png",
      "/media/bus-ticketing/agent pos/Driver-App-5.png",
      "/media/bus-ticketing/agent pos/Driver-App-6.png",
    ],
    device: "phone",
  },
  {
    num: "05",
    icon: HiOutlineTemplate,
    label: "Admin Panel",
    title: "Super Admin Panel",
    desc: "Onboard operators, manage commissions, and control the whole network from one dashboard.",
    bullets: ["Operator onboarding & routes", "Commission management", "Agent & staff access", "Accounts and sales reports"],
    images: [
      "/media/bus-ticketing/Flexible Admin Panel 1.webp",
      "/media/bus-ticketing/Flexible Admin Panel 2.webp",
      "/media/bus-ticketing/Flexible Admin Panel 3.webp",
    ],
  },
  {
    num: "06",
    icon: HiOutlineTruck,
    label: "Driver App",
    title: "Driver App",
    desc: "Boarding, manifests and onboard sales for every operator's crew.",
    bullets: ["Departure details & passenger lists", "Scan boarding QR codes", "Mark boarded / no-show", "Sell onboard tickets"],
    images: [
      "/media/bus-ticketing/bus tiketing mobile app/Driver-App-1.png",
      "/media/bus-ticketing/bus tiketing mobile app/Driver-App-2.png",
      "/media/bus-ticketing/bus tiketing mobile app/Driver-App-3.png",
      "/media/bus-ticketing/bus tiketing mobile app/Driver-App-4.png",
      "/media/bus-ticketing/bus tiketing mobile app/Driver-App-5.png",
    ],
    device: "phone",
  },
  {
    num: "07",
    icon: HiOutlineCube,
    label: "Parcel Manager",
    title: "Parcel Manager",
    desc: "Run parcel bookings alongside passenger ticketing across the marketplace.",
    bullets: ["Parcel entry & assignment", "Collection and delivery", "Live tracking", "Parcel reports"],
    images: ["/media/bus-ticketing/Parcel Manager.webp"],
  },
  {
    num: "08",
    icon: HiOutlineQrcode,
    label: "Ticket Validation",
    title: "Ticket Validation",
    desc: "Fast, fraud-proof boarding for every departure, on any operator's fleet.",
    bullets: ["Scan QR at boarding", "Instant valid / invalid check", "Prevent duplicate use", "Works online & offline"],
    images: ["/media/bus-ticketing/Ticket Validation Checker.webp"],
  },
];

export default function MarketplaceProductDemo() {
  return (
    <ProductDemo
      tabs={tabs}
      description="From the passenger's phone to every operator's counter — every surface reads from the same live marketplace data."
    />
  );
}
