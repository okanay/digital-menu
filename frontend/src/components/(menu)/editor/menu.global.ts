interface Menu {
  language: LanguageConfig;
  currency: CurrencyConfig;
  color: ColorConfig;
  font: FontConfig;
  sections: Sections[];
}

type TranslatedField = {
  [key in string]: string;
};

interface Sections {
  name: "categories";
  data: MenuCategory[];
}

interface MenuCategory {
  id: number;
  design: {
    selected: CategoryDesigns;
    customizations?: {
      background: {
        selected: BackgroundDesigns;
      };
    };
  };
  image: {
    isActive: boolean;
    url: string;
    description: string;
  };
  title: {
    texts: TranslatedField;
    style?: Style;
  };
  description: {
    texts: TranslatedField;
    style?: Style;
  };
  items: CategoryItem[];
}

interface CategoryItem {
  id: number;
  design: {
    selected: CategoryDesigns;
    customizations?: {
      background: {
        selected: BackgroundDesigns;
      };
    };
  };
  image: {
    isActive: boolean;
    url: string;
    description: string;
  };
  title: {
    texts: TranslatedField;
    style?: Style;
  };
  description: {
    texts: TranslatedField;
    style?: Style;
  };
  price: Price;
  allergens: number[];
}

interface Price {
  text: string;
  value: number;
  style?: Style;
  customPrices?: {
    isActive: boolean;
    values: {
      currency: Currency;
      language: Languages;
      text: string;
      value: number;
    }[];
  };
  discount?: {
    isActive: boolean;
    percentage: number;
    expiration?: {
      isActive: boolean;
      date: Date;
    };
  };
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
  current: Currency;
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
  isActive: boolean;
  light: string;
  dark: string;
};

type StyleOptions = {
  excludeClasses?: Array<keyof StyleAttr>;
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
  align?:
    | "Default"
    | "text-left"
    | "text-center"
    | "text-right"
    | "text-justify";
  wrap?:
    | "Default"
    | "text-wrap"
    | "text-nowrap"
    | "text-balance"
    | "text-pretty";
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
