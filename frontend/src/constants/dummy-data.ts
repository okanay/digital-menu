export const InitialMenuDesignData: Menu = {
  color: {
    isActive: false,
    colors: {
      light: "#f3f4f6",
      dark: "#1f2937",
    },
  },
  font: {
    isActive: false,
    fonts: {
      serif: {
        default: "Noto",
        custom: "Noto",
      },
      sans: {
        default: "Raleway",
        custom: "Raleway",
      },
      mono: {
        default: "Noto Mono",
        custom: "Noto Mono",
      },
    },
  },
  currency: {
    isActive: true,
    default: "USD",
    current: "USD",
    currencies: ["TRY", "USD", "EUR", "GBP", "JPY", "CNY", "RUB"],
  },
  language: {
    isActive: true,
    default: "en",
    current: "en",
    active: ["en", "tr"],
  },
  categories: [
    {
      id: 1,
      design: {
        selected: 0,
        customizations: undefined,
      },
      image: {
        isActive: true,
        url: "https://image.menuarts.com/starters-1.jpg",
        description: "starter image",
      },
      title: {
        texts: { en: "Breakfast", tr: "Kahvaltı" },
        style: {
          isActive: false,
          font: "Default",
          attr: {},
          textColor: {
            light: "#f3f4f6",
            dark: "#1f2937",
          },
        },
      },
      description: {
        texts: {
          en: "Start your day with our delicious breakfast options",
          tr: "Gününüze lezzetli kahvaltı seçeneklerimizle başlayın",
        },
        style: {
          isActive: false,
          font: "Default",
          attr: {},
          textColor: {
            light: "#f3f4f6",
            dark: "#ffffff",
          },
        },
      },
      items: [],
    },
  ],
};

export default InitialMenuDesignData;

export const TestMenuData: MenuData = {
  shopUniqueId: "test-shop-unique-id",
  uniqueId: "test-menu-unique-id",
  name: "Alacarte Menu",
  type: 1,
  json: JSON.stringify(InitialMenuDesignData),
  isActive: true,
  createdAt: "2024-11-10T00:00:00.000Z",
  updatedAt: "2024-11-10T00:00:00.000Z",
};
