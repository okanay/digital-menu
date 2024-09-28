import { Noto_Sans_Mono } from "next/font/google";

const fontMono = Noto_Sans_Mono({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  fallback: ["monospace"],
  variable: "--font-mono",
});

export default fontMono;
