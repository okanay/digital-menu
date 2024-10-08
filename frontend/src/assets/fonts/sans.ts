import { Raleway } from "next/font/google";

declare global {
  type Sans = "Raleway";
}

const raleway = Raleway({
  subsets: ["latin-ext"],
  weight: ["200", "500", "600", "800"],
  fallback: ["sans-serif"],
  variable: "--font-sans",
});

// Font mapping
const SansFonts: Record<Sans, any> = {
  Raleway: raleway,
};

export const SelectableSans = (): Sans[] => {
  return Object.keys(SansFonts) as Sans[];
};

const getFontData = (fontName: Sans) => {
  const font = SansFonts[fontName];
  if (!font) {
    return undefined;
  }
  return font;
};

export const getSansVariable = (fontName: string): string => {
  const font = getFontData(fontName as Sans);
  if (!font) {
    return "";
  }

  return font.variable;
};

export const getSansClassName = (fontName: string): string => {
  const font = getFontData(fontName as Sans);
  if (!font) {
    return "";
  }

  return font.className;
};

export default raleway;
