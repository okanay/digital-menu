import { Raleway } from "next/font/google";

const fontSans = Raleway({
  subsets: ["latin-ext"],
  weight: ["200", "500", "600", "800"],
  fallback: ["sans-serif"],
  variable: "--font-sans",
});

export default fontSans;
