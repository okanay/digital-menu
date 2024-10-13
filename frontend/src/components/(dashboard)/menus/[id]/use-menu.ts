import { MenuResponseValidate } from "@/validations/menu";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface DataState {
  error: string | null;
  status: FetchStatus;
  setStatus: (status: FetchStatus) => void;
  menu: MenuData | null;
  setMenu: (menu: MenuData) => void;
  fetchMenu: (uniqueId: string) => Promise<void>;
  refreshMenu: (uniqueId: string) => Promise<void>;
  updateMenu: (req: UpdateMenuReq) => Promise<UpdateMenuRes>;
  saveJSON: (json: string) => Promise<void>;
}

const useStore = create<DataState>()(
  immer((set, get) => ({
    error: null,
    status: "loading",
    setStatus: (status: FetchStatus) =>
      set((state) => {
        state.status = status;
        state.error = null;
      }),
    menu: null,
    setMenu: (menu: MenuData) =>
      set((state) => {
        state.menu = menu;
        state.error = null;
      }),

    fetchMenu: async (uniqueId: string) => {
      try {
        const response = await fetch(`${API_URL}/auth/menu/${uniqueId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          set((state) => {
            state.status = "not-found";
          });
          return;
        }

        const data = await response.json();

        if (!data?.menu) {
          throw new Error("Invalid response format");
        }

        const validMenu = MenuResponseValidate.safeParse(data.menu);

        if (!validMenu.success) {
          throw new Error("Invalid response format");
        }

        set((state) => {
          state.status = "success";
          state.menu = validMenu.data;
          state.error = null;
        });
      } catch (error) {
        set((state) => {
          state.status = "error";
          state.error =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
        });
      }
    },

    refreshMenu: async (uniqueId: string) => {
      try {
        set((state) => {
          state.status = "loading";
          state.menu = null;
          state.error = null;
        });

        await get().fetchMenu(uniqueId);
      } catch (error) {
        set((state) => {
          state.status = "error";
          state.error =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
        });
      }
    },

    updateMenu: async (req: UpdateMenuReq) => {
      try {
        const menu = get().menu;
        if (!menu) throw new Error("Menu data not found");

        const response = await fetch(`${API_URL}/auth/menu/${menu.uniqueId}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            `${data.error ?? `HTTP error! status: ${response.status}`}`,
          );
        }

        if (!data?.menu) {
          throw new Error("Invalid response format");
        }

        const valid = MenuResponseValidate.safeParse(data.menu);
        if (!valid.success) {
          throw new Error("Invalid shop data received");
        }

        set((state) => {
          state.menu = valid.data;
          state.status = "success";
          state.error = null;
        });

        return {
          status: "success",
          error: null,
        };
      } catch (error) {
        console.error(error);
        return {
          status: "error",
          error:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        };
      }
    },

    saveJSON: async (json: string) => {
      try {
        const menu = get().menu;
        if (!menu) throw new Error("Menu data not found");

        const response = await fetch(`${API_URL}/auth/menu/${menu.uniqueId}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ json }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            `${data.error ?? `HTTP error! status: ${response.status}`}`,
          );
        }

        if (!data?.menu) {
          throw new Error("Invalid response format");
        }

        const valid = MenuResponseValidate.safeParse(data.menu);
        if (!valid.success) {
          throw new Error("Invalid shop data received");
        }

        set((state) => {
          state.menu = valid.data;
          state.status = "success";
          state.error = null;
        });
      } catch (error) {
        console.error(error);
        set((state) => {
          state.status = "error";
          state.error =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
        });
      }
    },
  })),
);

export const useMenu = () => {
  const status = useStore((state) => state.status);
  const setStatus = useStore((state) => state.setStatus);
  const menu = useStore((state) => state.menu);
  const setMenu = useStore((state) => state.setMenu);
  const fetchMenu = useStore((state) => state.fetchMenu);
  const refreshMenu = useStore((state) => state.refreshMenu);
  const updateMenu = useStore((state) => state.updateMenu);
  const saveJSON = useStore((state) => state.saveJSON);

  return {
    status,
    setStatus,
    menu,
    setMenu,
    fetchMenu,
    refreshMenu,
    updateMenu,
    saveJSON,
  };
};
