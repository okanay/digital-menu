import { Noto_Sans_Mono } from "next/font/google";

declare global {
  type Mono = "Noto Mono";
}

const notoMono = Noto_Sans_Mono({
  subsets: ["latin-ext"],
  weight: ["400", "500", "700"],
  fallback: ["monospace"],
  variable: "--font-mono",
});

// Font mapping
const MonoFonts: Record<Mono, any> = {
  "Noto Mono": notoMono,
};

export const SelectableMono = (): Serif[] => {
  return Object.keys(MonoFonts) as Serif[];
};

const getFontData = (fontName: Mono) => {
  const font = MonoFonts[fontName];
  if (!font) {
    return undefined;
  }
  return font;
};

export const getMonoVariable = (fontName: string): string => {
  const font = getFontData(fontName as Mono);
  if (!font) {
    return "";
  }

  return font.variable;
};

export const getMonoClassName = (fontName: string): string => {
  const font = getFontData(fontName as Mono);
  if (!font) {
    return "";
  }

  return font.className;
};

export default notoMono;
