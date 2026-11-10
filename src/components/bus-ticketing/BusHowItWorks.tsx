"use client";

import HowItWorks, { type HowItWorksStep } from "@/components/shared/HowItWorks";
import {
  HiOutlineChat,
  HiOutlineColorSwatch,
  HiOutlinePaperAirplane,
  HiOutlineLink,
} from "react-icons/hi";

const steps: HowItWorksStep[] = [
  {
    num: "1",
    icon: HiOutlineChat,
    title: "Discovery",
    desc: "We learn about your bus routes, fleet and booking process.",
  },
  {
    num: "2",
    icon: HiOutlineColorSwatch,
    title: "Customization",
    desc: "We brand the platform with your logo, colors and fares.",
  },
  {
    num: "3",
    icon: HiOutlinePaperAirplane,
    title: "Launch",
    desc: "Your website, passenger app and admin panel go live.",
  },
  {
    num: "4",
    icon: HiOutlineLink,
    title: "Integration",
    desc: "Payments, SMS and maps are connected to your system.",
  },
];

export default function BusHowItWorks() {
  return (
    <HowItWorks
      heading="Launch Your Bus Ticket Reservation System in Four Steps"
      description="From discovery to go-live, here is how your bus booking platform comes together."
      steps={steps}
      showCta
    />
  );
}
