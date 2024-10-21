import { EmptyMenuDesignData } from "@/constants/menu-arts-1";
import { createNewTranslatableItem } from "@/utils/create-translated-field";
import { locales } from "@/utils/locales";
import { useUndoRedo } from "@anandarizki/use-undo-redo";
import { useEffect } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface DataState {
  status: {
    update: StatusTypes;
    initial: StatusTypes;
  };
  setStatus: (update?: StatusTypes, initial?: StatusTypes) => void;
  menu: Menu;
  setMenu: (menu: Menu) => void;
  setInitialMenu: (initialJSON: string) => void;
  colors: {
    setActive: (isActive: boolean) => void;
    setCustomColors: (colors: { light: string; dark: string }) => void;
  };
  font: {
    setActive: (isActive: boolean) => void;
    setSansFont: (font: Sans) => void;
    setSerifFont: (font: Serif) => void;
    setMonoFont: (font: Mono) => void;
  };
  currency: {
    setCurrency: (currency: Currency) => void;
  };
  language: {
    setLanguage: (language: Languages) => void;
    addLanguage: (language: Languages) => void;
    removeLanguage: (language: Languages) => void;
    toggleLanguage: (language: Languages) => void;
    updateTranslatedField: (path: string[], value: string) => void;
  };
  category: {
    addCategory: () => void;
    orderCategory: (newList: MenuCategory[]) => void;
    deleteCategory: (id: number) => void;
    updateCategory: (category: MenuCategory) => void;
    item: {
      addItem: (categoryId: number) => void;
      orderItems: (categoryId: number, newItems: CategoryItem[]) => void;
      deleteItem: (categoryId: number, itemId: number) => void;
      updateItem: (categoryId: number, item: CategoryItem) => void;
    };
  };
}

type Set = (fn: (state: DataState) => void) => void;
type Get = () => DataState;

// statusSlice.ts
const createStatusSlice = (set: Set, get: Get) => ({
  status: {
    update: "idle" as StatusTypes,
    initial: "loading" as StatusTypes,
  },
  setStatus: (update?: StatusTypes, initial?: StatusTypes) => {
    set((state) => {
      state.status.update = update || state.status.update;
      state.status.initial = initial || state.status.initial;
    });
  },
});

// menuSlice.ts
const createMenuSlice = (set: Set) => ({
  menu: EmptyMenuDesignData,
  setMenu: (menu: Menu) =>
    set((state) => {
      state.menu = menu;
    }),
  setInitialMenu: (initialJSON: string) => {
    set((state) => {
      state.menu = JSON.parse(initialJSON);
      state.status = {
        initial: "success",
        update: "idle",
      };
    });
  },
});

// fontSlice.ts
const createFontSlice = (set: Set) => ({
  font: {
    setActive: (isActive: boolean) =>
      set((state) => {
        state.menu.font.isActive = isActive;
      }),
    setSansFont: (font: Sans) =>
      set((state) => {
        state.menu.font.fonts.sans.custom = font;
      }),
    setSerifFont: (font: Serif) =>
      set((state) => {
        state.menu.font.fonts.serif.custom = font;
      }),
    setMonoFont: (font: Mono) =>
      set((state) => {
        state.menu.font.fonts.mono.custom = font;
      }),
  },
});

// currencySlice.ts
const createCurrencySlice = (set: Set) => ({
  currency: {
    setCurrency: (currency: Currency) =>
      set((state) => {
        state.menu.currency.current = currency;
      }),
  },
});

// colorSlice.ts
const createColorSlice = (set: Set) => ({
  colors: {
    setActive: (isActive: boolean) =>
      set((state) => {
        state.menu.color.isActive = isActive;
      }),
    setCustomColors: (colors: { light: string; dark: string }) =>
      set((state) => {
        state.menu.color.colors = colors;
      }),
  },
});

// categorySlice.ts
const createCategorySlice = (set: Set) => ({
  category: {
    orderCategory: (newList: MenuCategory[]) => {
      set((state) => {
        state.menu.sections.find(
          (section) => section.name === "categories",
        )!.data = newList;
      });
    },
    addCategory: () => {
      set((state) => {
        const categoriesSection = state.menu.sections.find(
          (section) => section.name === "categories",
        );

        if (!categoriesSection) return;

        const existingCategory = categoriesSection.data[0];

        const newCategory = createNewTranslatableItem<MenuCategory>(
          locales.map((locale) => locale),
          {
            id: Date.now(),
            design: existingCategory
              ? { ...existingCategory.design }
              : {
                  selected: 0,
                  customizations: {
                    background: {
                      selected: 0,
                    },
                  },
                },
            image: existingCategory
              ? { ...existingCategory.image }
              : {
                  isActive: true,
                  url: "https://image.menuarts.com/starters-1.jpg",
                  description: "starter image",
                },
            title: {
              texts: { en: "" },
            },
            description: {
              texts: { en: "" },
            },
            items: [],
          },
        );

        categoriesSection.data.push(newCategory);
      });
    },
    updateCategory: (category: MenuCategory) => {
      set((state) => {
        const categoriesSection = state.menu.sections.find(
          (section) => section.name === "categories",
        );
        if (categoriesSection) {
          const index = categoriesSection.data.findIndex(
            (c) => c.id === category.id,
          );
          if (index !== -1) {
            categoriesSection.data[index] = category;
          }
        }
      });
    },
    deleteCategory: (id: number) => {
      set((state) => {
        const categoriesSection = state.menu.sections.find(
          (section) => section.name === "categories",
        );
        if (categoriesSection) {
          categoriesSection.data = categoriesSection.data.filter(
            (category) => category.id !== id,
          );
        }
      });
    },
    ...createItemSlice(set),
  },
});

// itemSlice.ts
const createItemSlice = (set: Set) => ({
  item: {
    orderItems: (categoryId: number, newItems: CategoryItem[]) => {
      set((state) => ({
        menu: {
          ...state.menu,
          sections: state.menu.sections.map((section) =>
            section.name === "categories"
              ? {
                  ...section,
                  data: section.data.map((cat) =>
                    cat.id === categoryId ? { ...cat, items: newItems } : cat,
                  ),
                }
              : section,
          ),
        },
      }));
    },
    addItem: (categoryId: number) => {
      set((state) => {
        const categoriesSection = state.menu.sections.find(
          (section) => section.name === "categories",
        );

        if (!categoriesSection) return;

        const category = categoriesSection.data.find(
          (c) => c.id === categoryId,
        );

        if (!category) return;

        const existingItem = category.items[0];

        const newItem = createNewTranslatableItem<CategoryItem>(
          locales.map((locale) => locale),
          {
            id: Date.now(),
            design: existingItem
              ? { ...existingItem.design }
              : {
                  selected: 0,
                  customizations: {
                    background: {
                      selected: 0,
                    },
                  },
                },
            image: existingItem
              ? { ...existingItem.image }
              : {
                  isActive: true,
                  url: "https://image.menuarts.com/starters-1.jpg",
                  description: "starter image",
                },
            title: {
              texts: { en: "" },
            },
            description: {
              texts: { en: "" },
            },
            price: {
              text: "10",
              value: 10,
            },
            allergens: [],
          },
        );

        category.items.push(newItem);
      });
    },
    deleteItem: (categoryId: number, itemId: number) => {
      set((state) => {
        const categoriesSection = state.menu.sections.find(
          (section) => section.name === "categories",
        );

        if (categoriesSection) {
          const category = categoriesSection.data.find(
            (c) => c.id === categoryId,
          );
          if (category) {
            category.items = category.items.filter(
              (item) => item.id !== itemId,
            );
          }
        }
      });
    },
    updateItem: (categoryId: number, item: CategoryItem) => {
      set((state) => {
        const categoriesSection = state.menu.sections.find(
          (section) => section.name === "categories",
        );

        if (categoriesSection) {
          const category = categoriesSection.data.find(
            (c) => c.id === categoryId,
          );
          if (category) {
            const index = category.items.findIndex((i) => i.id === item.id);
            if (index !== -1) {
              category.items[index] = item;
            }
          }
        }
      });
    },
  },
});

// languageSlice.ts
const createLanguageSlice = (set: Set, get: Get) => ({
  language: {
    setLanguage: (language: Languages) =>
      set((state) => {
        if (
          state.menu.language.active.includes(language) &&
          language !== state.menu.language.current
        ) {
          state.menu.language.current = language;
        }
      }),
    addLanguage: (language: Languages) => {
      set((state) => {
        state.menu.language.active.push(language);
        state.menu.language.current = language;
      });
    },
    removeLanguage: (language: Languages) => {
      set((state) => {
        if (state.menu.language.active.length === 1) return;
        state.menu.language.active = state.menu.language.active.filter(
          (lang) => lang !== language,
        );

        if (state.menu.language.current === language) {
          state.menu.language.current = state.menu.language.active[0];
        }
      });
    },
    toggleLanguage: (language: Languages) =>
      set((state) => {
        if (state.menu.language.active.includes(language)) {
          get().language.removeLanguage(language);
        } else {
          get().language.addLanguage(language);
        }
      }),
    updateTranslatedField: (path: string[], value: string) =>
      set((state) => {
        let current: any = state.menu.sections;
        const activeLanguage = state.menu.language.current;

        const sectionName = path[0];
        const section = current.find(
          (section: Sections) => section.name === sectionName,
        );
        if (!section) return state;

        current = section.data;

        for (let i = 1; i < path.length - 1; i++) {
          if (Array.isArray(current)) {
            const index = current.findIndex(
              (item: any) => item.id.toString() === path[i],
            );
            if (index === -1) return state;
            current = current[index];
          } else {
            current = current[path[i]];
          }

          if (!current) return state;
        }

        const lastKey = path[path.length - 1];
        if (current[lastKey] && typeof current[lastKey].texts === "object") {
          current[lastKey].texts = {
            ...current[lastKey].texts,
            [activeLanguage]: value,
          };
        }

        return state;
      }),
  },
});

// store.ts
export const useStore = create<DataState>()(
  immer((set, get) => ({
    ...createStatusSlice(set, get),
    ...createMenuSlice(set),
    ...createFontSlice(set),
    ...createCurrencySlice(set),
    ...createColorSlice(set),
    ...createCategorySlice(set),
    ...createLanguageSlice(set, get),
  })),
);

export const useMenuEditor = (initialJSON?: string) => {
  const status = useStore((state) => state.status);
  const setStatus = useStore((state) => state.setStatus);
  const menu = useStore((state) => state.menu);
  const setMenu = useStore((state) => state.setMenu);
  const setInitialMenu = useStore((state) => state.setInitialMenu);
  const colors = useStore((state) => state.colors);
  const font = useStore((state) => state.font);
  const currency = useStore((state) => state.currency);
  const language = useStore((state) => state.language);
  const category = useStore((state) => state.category);

  const [undo, redo, { canUndo, canRedo, jumpTo, history, pointer, reset }] =
    useUndoRedo([menu, setMenu], {
      debounce: 400,
      capacity: 20,
    });

  useEffect(() => {
    if (initialJSON) {
      setInitialMenu(initialJSON);
    }
  }, []);

  return {
    status,
    setStatus,
    menu,
    setMenu,
    colors,
    font,
    currency,
    language,
    category,
    undoRedo: {
      undo,
      redo,
      canUndo,
      canRedo,
      jumpTo,
      history,
      pointer,
      reset,
    },
  };
};
