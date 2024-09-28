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
  "50": "#f7f8f7",
  "100": "#f1f2f1",
  "200": "#e4e6e6",
  "300": "#cfd2d1",
  "400": "#b1b5b4",
  "500": "#969c9b",
  "600": "#7e8483",
  "700": "#686e6e",
  "800": "#585c5b",
  "900": "#4c4f4f",
  "950": "#2a2d2d",
};

console.log(convertHexToTailwindRgb(colorObject, "cold", "light"));
