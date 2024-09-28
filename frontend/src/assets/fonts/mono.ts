import { Noto_Sans_Mono } from "next/font/google";

const fontMono = Noto_Sans_Mono({
  subsets: ["latin-ext"],
  weight: ["400", "500", "700"],
  fallback: ["monospace"],
  variable: "--font-mono",
});

export default fontMono;
