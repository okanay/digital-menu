import { Noto_Sans } from "next/font/google";

const fontSans = Noto_Sans({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  fallback: ["sans-serif"],
  variable: "--font-sans",
});

export default fontSans;
