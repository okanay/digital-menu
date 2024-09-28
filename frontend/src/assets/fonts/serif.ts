import { Noto_Serif } from "next/font/google";

const fontSerif = Noto_Serif({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  fallback: ["serif"],
  variable: "--font-serif",
});

export default fontSerif;
