import { EmptyMenuDesignData } from "@/constants/menu-arts-1";
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
}

export const useStore = create<DataState>()(
  immer((set) => ({
    status: {
      update: "idle",
      initial: "loading",
    },
    setStatus: (update?: StatusTypes, initial?: StatusTypes) => {
      set((state) => {
        state.status.update = update || state.status.update;
        state.status.initial = initial || state.status.initial;
      });
    },
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
  })),
);

export const useMenuDisplay = () => {
  const status = useStore((state) => state.status);
  const setStatus = useStore((state) => state.setStatus);
  const menu = useStore((state) => state.menu);
  const setMenu = useStore((state) => state.setMenu);
  const setInitialMenu = useStore((state) => state.setInitialMenu);

  return {
    status,
    setStatus,
    setInitialMenu,
    menu,
    setMenu,
  };
};
