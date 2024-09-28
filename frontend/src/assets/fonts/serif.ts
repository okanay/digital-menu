import { Noto_Serif } from "next/font/google";

const fontSerif = Noto_Serif({
  subsets: ["latin-ext"],
  weight: ["200", "400", "700", "900"],
  fallback: ["serif"],
  variable: "--font-serif",
});

export default fontSerif;
