import { MenuResponseValidate } from "@/validations/menu";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
interface DataState {
  error: string | null;
  status: FetchStatus;
  setStatus: (status: FetchStatus) => void;
  menus: MenuData[];
  getMenus: () => MenuData[];
  setMenus: (menu: MenuData[]) => void;
  fetchMenus: () => Promise<void>;
  refreshMenus: () => Promise<void>;
  createMenu: (data: CreateMenuReq) => Promise<CreateShopRes>;
  updateMenu: (req: UpdateMenuReq) => Promise<UpdateMenuRes>;
  deleteMenu: (uniqueId: string) => Promise<void>;
}

const useStore = create<DataState>()(
  immer((set, get) => ({
    error: null,
    status: "initial",
    setStatus: (status: FetchStatus) =>
      set((state) => {
        state.status = status;
        state.error = null;
      }),
    menus: [],
    getMenus: () => get().menus,
    setMenus: (menu: MenuData[]) =>
      set((state) => {
        state.menus = menu;
        state.error = null;
      }),

    fetchMenus: async () => {
      try {
        if (get().status === "success") {
          return;
        }

        if (!get().menus.length) {
          set((state) => {
            state.status = "loading";
            state.menus = [];
            state.error = null;
          });
        }
        const response = await fetch(`${API_URL}/auth/menus/all`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data?.menus || !Array.isArray(data.menus)) {
          throw new Error("Invalid response format");
        }

        const validMenus = data.menus
          .map((shop: unknown) => {
            const valid = MenuResponseValidate.safeParse(shop);
            return valid.success ? valid.data : null;
          })
          .filter((r: MenuData) => r !== null);

        set((state) => {
          state.status = "success";
          state.menus = validMenus;
          state.error = null;
        });
      } catch (error) {
        set((state) => {
          state.status = "error";
          state.menus = [];
          state.error =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
        });
      }
    },

    refreshMenus: async () => {
      try {
        set((state) => {
          state.status = "loading";
          state.menus = [];
          state.error = null;
        });

        await get().fetchMenus();
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

    createMenu: async (req: CreateMenuReq) => {
      try {
        set((state) => {
          state.error = null;
        });

        const response = await fetch(`${API_URL}/auth/menu`, {
          method: "POST",
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

        const validMenu = MenuResponseValidate.safeParse(data.menu);
        if (!validMenu.success) {
          throw new Error("Invalid response format");
        }

        set((state) => {
          state.menus.push(validMenu.data);
        });

        return {
          status: "success",
          error: null,
        };
      } catch (error) {
        return {
          status: "error",
          error:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        };
      }
    },

    deleteMenu: async (uniqueId: string) => {
      try {
        set((state) => {
          state.status = "loading";
          state.error = null;
        });

        const response = await fetch(`${API_URL}/auth/menu/${uniqueId}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        set((state) => {
          state.menus = state.menus.filter(
            (shop) => shop.uniqueId !== uniqueId,
          );

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

    updateMenu: async (req: UpdateMenuReq) => {
      try {
        const response = await fetch(`${API_URL}/auth/menu/${req.uniqueId}`, {
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
          state.menus = state.menus.map((r) =>
            r.uniqueId === valid.data.uniqueId ? valid.data : r,
          );
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
  })),
);

export const useMenus = () => {
  const status = useStore((state) => state.status);
  const setStatus = useStore((state) => state.setStatus);
  const error = useStore((state) => state.error);

  const menus = useStore((state) => state.menus);
  const getMenus = useStore((state) => state.menus);
  const setMenus = useStore((state) => state.setMenus);
  const fetchMenus = useStore((state) => state.fetchMenus);
  const refreshMenus = useStore((state) => state.refreshMenus);
  const createMenu = useStore((state) => state.createMenu);
  const updateMenu = useStore((state) => state.updateMenu);
  const deleteMenu = useStore((state) => state.deleteMenu);

  return {
    status,
    setStatus,
    menus,
    getMenus,
    setMenus,
    fetchMenus,
    refreshMenus,
    error,
    createMenu,
    updateMenu,
    deleteMenu,
  };
};
