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

type Font = Sans | Serif | Mono | undefined;
type Style = {
  isActive: boolean;
  attr: StyleAttr;
  font: Font;
};

type StyleAttr =
  | React.CSSProperties
  | {
      "--font-custom-light": string;
      "--font-custom-dark": string;
    }
  | {};

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
