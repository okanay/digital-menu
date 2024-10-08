export const dummyData: Menu = {
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
          isActive: true,
          attr: {
            color: "red",
            opacity: "0.5",
            fontSize: "2rem",
            fontWeight: "600",
            letterSpacing: "0.04em",
            "--font-custom-light": "30 190 240",
            "--font-custom-dark": "50 40 240",
          },
          font: "Raleway",
        },
      },
      description: {
        texts: {
          en: "Start your day with our delicious breakfast options",
          tr: "Gününüze lezzetli kahvaltı seçeneklerimizle başlayın",
        },
        style: {
          isActive: false,
          attr: {},
          font: undefined,
        },
      },
      items: [],
    },
  ],
};

export default dummyData;
