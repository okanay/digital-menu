import {
  Noto_Serif,
  Young_Serif,
  Roboto_Serif,
  Bree_Serif,
  Inria_Serif,
  IBM_Plex_Serif,
  Hedvig_Letters_Serif,
  Lora,
  Spicy_Rice,
  Alfa_Slab_One,
  Prata,
  Fraunces,
} from "next/font/google";

// Fontları module scope'ta tanımlıyoruz
export const notoSerif = Noto_Serif({
  subsets: ["latin-ext"],
  weight: ["200", "400", "700", "900"],
  fallback: ["serif"],
  variable: "--font-serif",
});

export const youngSerif = Young_Serif({
  subsets: ["latin-ext"],
  weight: ["400"],
  fallback: ["serif"],
  variable: "--font-serif",
});

export const robotoSerif = Roboto_Serif({
  subsets: ["latin-ext"],
  weight: ["200", "400", "700", "900"],
  fallback: ["serif"],
  variable: "--font-serif",
});

export const breeSerif = Bree_Serif({
  subsets: ["latin-ext"],
  weight: ["400"],
  fallback: ["serif"],
  variable: "--font-serif",
});

export const inriaSerif = Inria_Serif({
  subsets: ["latin-ext"],
  weight: ["300", "400", "700"],
  fallback: ["serif"],
  variable: "--font-serif",
});

export const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin-ext"],
  weight: ["200", "400", "700"],
  fallback: ["serif"],
  variable: "--font-serif",
});

export const alfaSlabOne = Alfa_Slab_One({
  subsets: ["latin-ext"],
  weight: ["400"],
  fallback: ["serif"],
  variable: "--font-serif",
});

export const lora = Lora({
  subsets: ["latin-ext"],
  weight: ["400", "500", "700"],
  fallback: ["serif"],
  variable: "--font-serif",
});

export const spicyRice = Spicy_Rice({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["serif"],
  variable: "--font-serif",
});

export const prata = Prata({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["serif"],
  variable: "--font-serif",
});

export const fraunces = Fraunces({
  subsets: ["latin-ext"],
  weight: ["200", "400", "700", "900"],
  fallback: ["serif"],
  variable: "--font-serif",
});

declare global {
  type Serif =
    | "Alfa"
    | "Bree"
    | "Fraunces"
    | "Inria"
    | "Lora"
    | "Noto"
    | "Plex"
    | "Prata"
    | "Roboto"
    | "Spicy"
    | "Young";
}

// Font mapping
const SerifFonts: Record<Serif, any> = {
  Alfa: alfaSlabOne,
  Bree: breeSerif,
  Fraunces: fraunces,
  Inria: inriaSerif,
  Lora: lora,
  Noto: notoSerif,
  Plex: ibmPlexSerif,
  Prata: prata,
  Roboto: robotoSerif,
  Spicy: spicyRice,
  Young: youngSerif,
};

export const SelectableSerif = (): Serif[] => {
  return Object.keys(SerifFonts) as Serif[];
};

const getFontData = (fontName: Serif) => {
  const font = SerifFonts[fontName];
  if (!font) {
    return undefined;
  }
  return font;
};

export const getSerifVariable = (fontName: string): string => {
  const font = getFontData(fontName as Serif);
  if (!font) {
    return "";
  }

  return font.variable;
};

export const getSerifClassName = (fontName: string): string => {
  const font = getFontData(fontName as Serif);
  if (!font) {
    return "";
  }

  return font.className;
};

export default notoSerif;
