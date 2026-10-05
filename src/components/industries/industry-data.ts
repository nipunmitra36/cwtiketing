import { HiOutlineTruck } from "react-icons/hi";
import { FaShuttleVan } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import type { IconType } from "react-icons";

export interface Industry {
  title: string;
  tagline: string;
  desc: string;
  href: string;
  icon: IconType;
  modules: string[];
}

export const industries: Industry[] = [
  {
    title: "Bus Operators",
    tagline: "Intercity & coach lines",
    desc: "A complete bus booking solution that helps long-route and cross-border operators manage bus reservation, ticketing, and fleet operations efficiently.",
    href: "/intercity-bus-booking-software",
    icon: HiOutlineTruck,
    modules: [
      "Counter/Staff Ticketing",
      "Website for Customer",
      "Native Android App",
      "Agent Ticketing",
      "Accounts",
      "Administration",
      "Parcel Booking System",
      "Native iOS App",
      "Fuel Management",
      "Maintenance",
      "Reservation",
      "Employee Management",
      "Inventory",
      "Driver App",
      "Bus Tracker",
    ],
  },
  {
    title: "Shuttle Companies",
    tagline: "Airport & point-to-point shuttles",
    desc: "Everything a shuttle or airport transfer business runs on — from counter and onboard ticketing to geo-fenced tracking and strong reporting.",
    href: "/shuttle-booking-system",
    icon: FaShuttleVan,
    modules: [
      "Counter/Staff Ticketing",
      "On Board App with Geo Fence",
      "Agent Ticketing App",
      "Accounts",
      "Strong Reporting",
      "Administration",
      "Android POS Based Counter",
      "Agent Ticketing",
      "Driver App",
      "Bus Tracker",
    ],
  },
  {
    title: "Travel Agencies",
    tagline: "Multi-operator ticket retail",
    desc: "Sell and manage inventory across many operators from a single control centre, with commission rules, per-operator administration, and your own branded marketplace.",
    href: "/bus-terminal-ticketing-system",
    icon: IoTicketOutline,
    modules: [
      "Counter/Staff Ticketing for Each operator",
      "Administration for Each Operator",
      "Marketplace Website",
      "Native Android App",
      "Native iOS App",
      "Agent System",
      "Commission Management",
      "Marketplace Administration",
      "Company Accounts",
      "Parcel Booking System",
      "Android POS Based Counter",
      "Agent Ticketing",
      "Driver App",
      "Bus Tracker",
    ],
  },
];
