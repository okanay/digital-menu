import { MenuResponseValidate } from "@/validations/menu";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface DataState {
  error: string | null;
  status: {
    fetch: StatusTypes;
    update: StatusTypes;
  };
  setStatus: (fetch?: StatusTypes, update?: StatusTypes) => void;
  menu: MenuData | null;
  setMenu: (menu: MenuData) => void;
  fetchMenu: (uniqueId: string) => Promise<void>;
  refreshMenu: (uniqueId: string) => Promise<void>;
  updateMenu: (req: UpdateMenuReq) => Promise<void>;
}

const useStore = create<DataState>()(
  immer((set, get) => ({
    error: null,

    status: {
      fetch: "initial",
      update: "idle",
    },
    setStatus: (fetch?: StatusTypes, update?: StatusTypes) => {
      set((state) => {
        state.status.fetch = fetch || state.status.fetch;
        state.status.update = update || state.status.update;
      });
    },

    menu: null,
    setMenu: (menu: MenuData) =>
      set((state) => {
        state.menu = menu;
        state.error = null;
      }),

    fetchMenu: async (uniqueId: string) => {
      try {
        set((state) => {
          state.status.fetch = "loading";
          state.error = null;
        });

        const response = await fetch(`${API_URL}/auth/menu/${uniqueId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          set((state) => {
            state.status.fetch = "not-found";
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
          state.menu = validMenu.data;
          state.status.fetch = "success";
          state.error = null;
        });
      } catch (error) {
        set((state) => {
          state.status.fetch = "error";
          state.error =
            error instanceof Error
              ? error.message
              : "Menü yüklenirken beklenmeyen bir hata oluştu";
        });
      }
    },

    refreshMenu: async (uniqueId: string) => {
      try {
        set((state) => {
          state.status.fetch = "loading";
          state.menu = null;
          state.error = null;
        });
        await get().fetchMenu(uniqueId);
      } catch (error) {
        set((state) => {
          state.status.fetch = "error";
          state.error =
            error instanceof Error
              ? error.message
              : "Menü yenilenirken beklenmeyen bir hata oluştu";
        });
      }
    },

    updateMenu: async (req: UpdateMenuReq) => {
      try {
        const { status } = get();
        if (status.update === "updating") return;

        set((state) => {
          state.status.update = "updating";
        });

        const response = await fetch(`${API_URL}/auth/menu/${req.uniqueId}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        });

        if (!response.ok) {
          throw new Error("Invalid response format");
        }

        const data = await response.json();
        if (!data?.menu) {
          throw new Error("Invalid response format");
        }

        const validMenu = MenuResponseValidate.safeParse(data.menu);
        if (!validMenu.success) {
          throw new Error("Invalid shop data received");
        }

        set((state) => {
          state.menu = validMenu.data;
          state.status.update = "success";
          state.error = null;
        });
      } catch (error) {
        set((state) => {
          state.status.update = "error";
          state.error =
            error instanceof Error
              ? error.message
              : "Menü güncellenirken beklenmeyen bir hata oluştu";
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

  return {
    status,
    setStatus,
    menu,
    setMenu,
    fetchMenu,
    refreshMenu,
    updateMenu,
  };
};
