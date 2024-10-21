export const EmptyStyle: Style = {
  isActive: false,
  attr: {},
  font: "Default",
  textColor: {
    isActive: false,
    light: "#000000",
    dark: "#ffffff",
  },
};

export const InitialMenuDesignData: Menu = {
  color: {
    isActive: true,
    colors: {
      light: "#f3f4f6",
      dark: "#f3f4f6",
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
    current: "USD",
  },
  language: {
    isActive: true,
    default: "en",
    current: "en",
    active: ["en"],
  },
  sections: [
    {
      name: "categories",
      data: [
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
            texts: { en: "Breakfast" },
            style: {
              isActive: false,
              font: "Default",
              attr: {},
              textColor: {
                isActive: false,
                light: "#000000",
                dark: "#ffffff",
              },
            },
          },
          description: {
            texts: {
              en: "Start your day with our delicious breakfast options",
            },
            style: {
              isActive: false,
              font: "Default",
              attr: {},
              textColor: {
                isActive: false,
                light: "#000000",
                dark: "#ffffff",
              },
            },
          },
          items: [],
        },
      ],
    },
  ],
};

export const EmptyMenuDesignData: Menu = {
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
    current: "USD",
  },
  language: {
    isActive: true,
    default: "en",
    current: "en",
    active: ["en"],
  },
  sections: [
    {
      name: "categories",
      data: [],
    },
  ],
};

export const TestMenuData: MenuData = {
  shopUniqueId: "test-shop-unique-id",
  uniqueId: "test-menu-unique-id",
  name: "Alacarte Menu",
  type: 1,
  json: JSON.stringify(InitialMenuDesignData),
  isActive: true,
  createdAt: "2024-11-10T00:00:00.000Z",
  updatedAt: "2024-11-10T00:00:00.000Z",
  isTestData: true,
};
