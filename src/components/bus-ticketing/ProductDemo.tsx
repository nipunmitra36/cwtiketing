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
    title: "White-Label Responsive Website",
    desc: "A super user-friendly website that lets passengers book or cancel tickets anytime, on any device.",
    bullets: [
      "Buy / purchase ticket",
      "Reprint & download ticket",
      "Ticket cancel request & rescheduling",
      "User profile & purchase history",
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
    desc: "The full booking journey, purpose-built for a phone.",
    bullets: ["Search routes & select seats", "Purchase and reprint tickets", "Reschedule journeys", "Track vehicles live"],
    images: [
      "/media/bus-ticketing/bus-tiketing-mobile-app/white-label-passenger-app-android-and-ios-1.png",
      "/media/bus-ticketing/bus-tiketing-mobile-app/white-label-passenger-app-android-and-ios-2.png",
      "/media/bus-ticketing/bus-tiketing-mobile-app/white-label-passenger-app-android-and-ios-3.png",
    ],
    device: "phone",
  },
  {
    num: "03",
    icon: HiOutlineDesktopComputer,
    label: "Counter Panel",
    title: "Counter Panel",
    desc: "Everything front-desk staff need to sell and manage seats.",
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
    desc: "Field sales, on or offline, from a pocket-sized device.",
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
    title: "Admin Panel",
    desc: "Routes, pricing, staff and reports — all from one dashboard.",
    bullets: ["Routes, schedules, seat plans", "Pricing, promotions, coupons", "Agent & staff access", "Accounts and sales reports"],
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
    desc: "Boarding, manifests and onboard sales for the crew.",
    bullets: ["Departure details & passenger lists", "Scan boarding QR codes", "Mark boarded / no-show", "Sell onboard tickets"],
    images: [
      "/media/bus-ticketing/bus-tiketing-mobile-app/Driver-App-1.png",
      "/media/bus-ticketing/bus-tiketing-mobile-app/Driver-App-2.png",
      "/media/bus-ticketing/bus-tiketing-mobile-app/Driver-App-3.png",
      "/media/bus-ticketing/bus-tiketing-mobile-app/Driver-App-4.png",
      "/media/bus-ticketing/bus-tiketing-mobile-app/Driver-App-5.png",
    ],
    device: "phone",
  },
  {
    num: "07",
    icon: HiOutlineCube,
    label: "Parcel Manager",
    title: "Parcel Manager",
    desc: "Run parcel bookings alongside passenger ticketing.",
    bullets: ["Parcel entry & assignment", "Collection and delivery", "Live tracking", "Parcel reports"],
    images: ["/media/bus-ticketing/Parcel Manager.webp"],
  },
  {
    num: "08",
    icon: HiOutlineQrcode,
    label: "Ticket Validation",
    title: "Ticket Validation",
    desc: "Fast, fraud-proof boarding for every departure.",
    bullets: ["Scan QR at boarding", "Instant valid / invalid check", "Prevent duplicate use", "Works online & offline"],
    images: ["/media/bus-ticketing/Ticket Validation Checker.webp"],
  },
];

export default function BusTicketingProductDemo() {
  return (
    <ProductDemo
      tabs={tabs}
      heading={
        <>
          All-in-One Bus Ticket Management System for{" "}
          <span className="text-gradient-brand">Web, Mobile &amp; Admin Operations</span>
        </>
      }
    />
  );
}