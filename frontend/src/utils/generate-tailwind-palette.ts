// Tip tanımlamaları
interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface ColorPalette {
  [key: string]: string;
}

type LightnessValues = {
  [key: string]: number;
};

// Sabitler
const LIGHTNESS_VALUES: LightnessValues = {
  50: 0.98,
  100: 0.9,
  200: 0.82,
  300: 0.74,
  400: 0.66,
  500: 0.56,
  600: 0.46,
  700: 0.38,
  800: 0.3,
  900: 0.2,
  950: 0.1,
};

// Özel hata sınıfı
class ColorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ColorError";
  }
}

// Ana fonksiyon
export function generateSimplifiedTailwindPalette(
  hexColor: string,
): ColorPalette {
  try {
    // Hex renk doğrulama
    if (!isValidHexColor(hexColor)) {
      throw new ColorError("Geçersiz HEX renk kodu" + hexColor);
    }

    // HEX'i HSL'ye çevir
    const hsl = hexToHsl(hexColor);

    // Paleti oluştur
    const palette: ColorPalette = {};

    for (const [shade, lightness] of Object.entries(LIGHTNESS_VALUES)) {
      const newColor: HSL = { ...hsl, l: lightness };
      const hex = hslToHex(newColor);
      const rgb = hexToRgb(hex);

      if (!rgb) {
        throw new ColorError(`${shade} tonu için RGB dönüşümü başarısız`);
      }

      // RGB değerlerini sınırla ve formatla
      const clampedRgb = {
        r: clamp(rgb.r, 0, 255),
        g: clamp(rgb.g, 0, 255),
        b: clamp(rgb.b, 0, 255),
      };

      palette[shade] = formatRgbString(clampedRgb);
    }

    return palette;
  } catch (error) {
    if (error instanceof ColorError) {
      throw error;
    }
    throw new ColorError(
      "Renk paleti oluşturulurken beklenmeyen bir hata oluştu",
    );
  }
}

// Yardımcı fonksiyonlar
function isValidHexColor(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function formatRgbString(rgb: RGB): string {
  return `${Math.round(rgb.r)} ${Math.round(rgb.g)} ${Math.round(rgb.b)}`;
}

function hexToHsl(hex: string): HSL {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    throw new ColorError("HEX'ten RGB'ye dönüşüm başarısız");
  }
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function hexToRgbString(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "";
  return `${rgb.r} ${rgb.g} ${rgb.b}`;
}

function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h, s, l };
}

function hslToHex({ h, s, l }: HSL): string {
  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  if (s === 0) {
    const rgb = Math.round(l * 255);
    return `#${rgb.toString(16).padStart(2, "0").repeat(3)}`;
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}
