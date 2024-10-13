import InitialMenuDesignData from "@/constants/dummy-data";
import { createNewTranslatableItem } from "@/utils/create-translated-field";
import { locales } from "@/utils/locales";
import { useUndoRedo } from "@anandarizki/use-undo-redo";
import { useEffect } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Status = "idle" | "loading" | "success" | "error";

interface DataState {
  status: Status;
  setStatus: (status: Status) => void;
  menu: Menu;
  setMenu: (menu: Menu) => void;
  save: () => void;
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
  };
}

export const useStore = create<DataState>()(
  immer((set, get) => ({
    status: "loading",
    setStatus: (status: "idle" | "loading" | "success" | "error") => {
      set((state) => {
        state.status = status;
      });
    },
    menu: InitialMenuDesignData,
    setMenu: (menu: Menu) =>
      set((state) => {
        state.menu = menu;
        state.status = "success";
      }),

    save: () => {
      set((state) => {
        state.status = "loading";
      });

      return get().menu;
    },
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
    currency: {
      setCurrency: (currency: Currency) =>
        set((state) => {
          state.menu.currency.current = currency;
        }),
    },
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
    category: {
      orderCategory: (newList: MenuCategory[]) => {
        set((state) => {
          state.menu.categories = newList;
        });
      },
      addCategory: () =>
        set((state) => {
          const newCategory = createNewTranslatableItem<MenuCategory>(
            locales.map((locale) => locale),
            {
              id: Date.now(),
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
                texts: { defaultText: "" },
                style: {
                  isActive: false,
                  font: "Default",
                  attr: {},
                  textColor: {
                    light: "#000000",
                    dark: "#ffffff",
                  },
                },
              },
              description: {
                texts: { defaultText: "" },
                style: {
                  isActive: false,
                  font: "Default",
                  attr: {},
                  textColor: {
                    light: "#000000",
                    dark: "#ffffff",
                  },
                },
              },
              items: [],
            },
          );
          state.menu.categories.push(newCategory);
        }),
      updateCategory: (category: MenuCategory) => {
        set((state) => {
          const index = state.menu.categories.findIndex(
            (c) => c.id === category.id,
          );
          state.menu.categories[index] = category;
        });
      },
      deleteCategory: (id: number) => {
        set((state) => {
          state.menu.categories = state.menu.categories.filter(
            (category) => category.id !== id,
          );
        });
      },
    },
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
          let current: any = state.menu;
          const activeLanguage = state.menu.language.current;

          // Son elemana kadar ilerle
          for (let i = 0; i < path.length - 1; i++) {
            if (Array.isArray(current)) {
              // Array ise index ile ilerle
              const index = current.findIndex(
                (item: any) => item.id.toString() === path[i],
              );
              if (index === -1) return;
              current = current[index];
            } else {
              // Object ise key ile ilerle
              current = current[path[i]];
            }
            if (!current) return;
          }

          // Son elemanı güncelle
          const lastKey = path[path.length - 1];
          if (current[lastKey] && typeof current[lastKey] === "object") {
            current[lastKey] = {
              ...current[lastKey],
              [activeLanguage]: value,
            };
          }
        }),
    },
  })),
);

export const useMenuEditor = (initial?: MenuData) => {
  const status = useStore((state) => state.status);
  const setStatus = useStore((state) => state.setStatus);
  const menu = useStore((state) => state.menu);
  const setMenu = useStore((state) => state.setMenu);
  const save = useStore((state) => state.save);
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
    if (initial) {
      setStatus("loading");
      setMenu(JSON.parse(initial.json));
    }
  }, [initial]);

  return {
    status,
    setStatus,
    menu,
    setMenu,
    save,
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
