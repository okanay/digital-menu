interface Menu {
  categories: MenuCategory[];
  language: LanguageConfig;
  currency: CurrencyConfig;
  color: ColorConfig;
  font: FontConfig;
}

interface FontConfig {
  isActive: boolean;
  fonts: {
    serif: {
      default: Serif;
      custom: Serif;
    };
    sans: {
      default: Sans;
      custom: Sans;
    };
    mono: {
      default: Mono;
      custom: Mono;
    };
  };
}

type Currency = "TRY" | "USD" | "EUR" | "GBP" | "JPY" | "CNY" | "RUB";
interface CurrencyConfig {
  isActive: boolean;
  default: Currency;
  current: Currency;
  currencies: Currency[];
}

interface LanguageConfig {
  isActive: boolean;
  default: Languages;
  current: Languages;
  active: Languages[];
}

interface ColorConfig {
  isActive: boolean;
  colors: {
    light: string;
    dark: string;
  };
}

type Font = Sans | Serif | Mono | "Default";

type Style = {
  isActive: boolean;
  attr: StyleAttr;
  font: Font;
  textColor: TextColor;
};

type TextColor = {
  light: string;
  dark: string;
};

type StyleAttr = {
  fontSize?:
    | "Default"
    | "text-xs"
    | "text-sm"
    | "text-base"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-3xl"
    | "text-4xl"
    | "text-5xl"
    | "text-6xl";
  fontWeight?:
    | "Default"
    | "font-thin"
    | "font-extralight"
    | "font-light"
    | "font-normal"
    | "font-medium"
    | "font-semibold"
    | "font-bold"
    | "font-extrabold"
    | "font-black";
  letterSpacing?:
    | "Default"
    | "tracking-tighter"
    | "tracking-tight"
    | "tracking-normal"
    | "tracking-wide"
    | "tracking-wider"
    | "tracking-widest";
  lineHeight?:
    | "Default"
    | "leading-none"
    | "leading-tight"
    | "leading-snug"
    | "leading-normal"
    | "leading-relaxed"
    | "leading-loose";
  opacity?:
    | "Default"
    | "opacity-0"
    | "opacity-10"
    | "opacity-20"
    | "opacity-30"
    | "opacity-40"
    | "opacity-50"
    | "opacity-60"
    | "opacity-70"
    | "opacity-80"
    | "opacity-90"
    | "opacity-100";
  hidden?: "Default" | "hidden";
};

type TranslatedField = {
  [key in string]: string;
};

interface MenuCategory {
  id: number;
  design: {
    selected: CategoryDesigns;
    customizations: any;
  };
  image: {
    isActive: boolean;
    url: string;
    description: string;
  };
  title: {
    texts: TranslatedField;
    style: Style;
  };
  description: {
    texts: TranslatedField;
    style: Style;
  };
  items: CategoryItem[];
}

interface CategoryItem {
  id: number;
  name: string;
  price: number;
  description: string;
  allergens: any[];
}
