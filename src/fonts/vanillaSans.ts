import localFont from "next/font/local";

export const vanillaSans = localFont({
  src: [
    {
      path: "../../public/fonts/vanilla-sans/VanillaSansVF-Italic.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-vanilla-sans",
  display: "swap",
});
