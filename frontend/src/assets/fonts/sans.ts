import { Noto_Sans } from "next/font/google";

const fontSans = Noto_Sans({
  subsets: ["latin-ext"],
  weight: ["300", "500", "700", "900"],
  fallback: ["sans-serif"],
  variable: "--font-sans",
});

export default fontSans;
