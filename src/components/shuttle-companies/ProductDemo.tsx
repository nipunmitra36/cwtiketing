"use client";

import ProductDemo, { type ProductDemoTab } from "@/components/shared/ProductDemo";
import {
  HiOutlineGlobeAlt,
  HiOutlineDeviceMobile,
  HiOutlineDesktopComputer,
  HiOutlineTruck,
} from "react-icons/hi";

const tabs: ProductDemoTab[] = [
  {
    num: "01",
    icon: HiOutlineGlobeAlt,
    label: "Website",
    title: "Book from any browser",
    desc: "A responsive booking site where riders reserve local shuttle seats anytime, on any device.",
    bullets: [
      "Search routes & select seats",
      "Buy / purchase ticket online",
      "Reprint & download ticket",
      "Live shuttle tracking",
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
    title: "Buy tickets on the go",
    desc: "The full ride journey, purpose-built for a phone.",
    bullets: ["Search stops & routes", "Purchase and reprint tickets", "Reschedule journeys", "Track shuttles live"],
    images: [
      "/media/bus-ticketing/passenger app/White-Label-Passenger-App-(Android-&-iOS)-1.jpg",
      "/media/bus-ticketing/passenger app/White-Label-Passenger-App-(Android-&-iOS)-2.jpg",
      "/media/bus-ticketing/passenger app/White-Label-Passenger-App-(Android-&-iOS)-3.jpg",
    ],
    device: "phone",
  },
  {
    num: "03",
    icon: HiOutlineDesktopComputer,
    label: "Counter Panel",
    title: "Serve walk-ins fast",
    desc: "Everything stop agents need to sell and manage seats.",
    bullets: ["Issue, reserve, cancel tickets", "View passenger manifests", "Assign drivers and shifts", "Review sales in real time"],
    images: [
      "/media/bus-ticketing/Web-Based Counter _ Staff _ Booth Panel.webp",
      "/media/bus-ticketing/Web-Based Counter _ Staff _ Booth Panel 2.webp",
      "/media/bus-ticketing/Web-Based Counter _ Staff _ Booth Panel 3.webp",
      "/media/bus-ticketing/Web-Based Counter _ Staff _ Booth Panel 4.webp",
    ],
  },
  {
    num: "04",
    icon: HiOutlineTruck,
    label: "Driver App",
    title: "Scan, board, depart",
    desc: "Boarding, manifests and onboard sales for the crew.",
    bullets: ["Departure details & passenger lists", "Scan boarding QR codes", "Mark boarded / no-show", "Sell onboard tickets"],
    images: [
      "/media/bus-ticketing/driver app/Driver-App-1.jpg",
      "/media/bus-ticketing/driver app/Driver-App-2.jpg",
      "/media/bus-ticketing/driver app/Driver-App-3.jpg",
      "/media/bus-ticketing/driver app/Driver-App-4.jpg",
      "/media/bus-ticketing/driver app/Driver-App-5.jpg",
    ],
    device: "phone",
  },
];

export default function ShuttleProductDemo() {
  return <ProductDemo tabs={tabs} />;
}