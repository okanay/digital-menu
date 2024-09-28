type HexColorObject = {
  [key: string]: string;
};

type ColorMode = "light" | "dark";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function convertHexToTailwindRgb(
  hexObject: HexColorObject,
  prefix: string = "primary",
  mode: ColorMode = "light",
): string {
  let output = "";

  const sortedKeys = Object.keys(hexObject).sort(
    (a, b) => Number(a) - Number(b),
  );

  sortedKeys.forEach((key, index) => {
    const hexValue = hexObject[key];
    const rgb = hexToRgb(hexValue);
    if (rgb) {
      const colorKey =
        mode === "dark" ? sortedKeys[sortedKeys.length - 1 - index] : key;
      output += `--${prefix}-${colorKey}: ${rgb.r} ${rgb.g} ${rgb.b};\n`;
    }
  });

  return output;
}

// Örnek kullanım
const colorObject: HexColorObject = {
  "50": "#fcf3f8",
  "100": "#fae9f2",
  "200": "#f6d4e6",
  "300": "#f0b1d1",
  "400": "#e995be",
  "500": "#d95b95",
  "600": "#c63c74",
  "700": "#ab2b5c",
  "800": "#8d274c",
  "900": "#772442",
  "950": "#480f24",
};

console.log(convertHexToTailwindRgb(colorObject, "primary", "light"));
