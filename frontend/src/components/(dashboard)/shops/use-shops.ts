import { ShopResponseValidate } from "@/validations/shop";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/shops";

interface DataState {
  status: FetchStatus;
  error: string | null;
  shops: Shop[];
  setShops: (shop: Shop[]) => void;
  setStatus: (status: FetchStatus) => void;
  fetchShops: () => Promise<void>;
  refreshShops: () => Promise<void>;
  createShop: (req: CreateShopReq) => Promise<CreateShopRes>;
  updateShop: (req: UpdateShopReq) => Promise<UpdateShopRes>;
  deleteShop: (id: string) => Promise<void>;
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

    shops: [],
    setShops: (shop: Shop[]) =>
      set((state) => {
        state.shops = shop;
        state.error = null;
      }),

    fetchShops: async () => {
      try {
        if (get().status === "success") {
          return;
        }

        if (!get().shops.length) {
          set((state) => {
            state.status = "loading";
            state.shops = [];
            state.error = null;
          });
        }

        const response = await fetch(`${API_URL}`, {
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

        if (!data?.shops || !Array.isArray(data.shops)) {
          throw new Error("Invalid response format");
        }

        const validRestaurants = data.shops
          .map((shop: unknown) => {
            const valid = ShopResponseValidate.safeParse(shop);
            return valid.success ? valid.data : null;
          })
          .filter((r: Shop) => r !== null);

        set((state) => {
          state.status = "success";
          state.shops = validRestaurants;
          state.error = null;
        });
      } catch (error) {
        set((state) => {
          state.status = "error";
          state.shops = [];
          state.error =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
        });
      }
    },

    refreshShops: async () => {
      try {
        set((state) => {
          state.status = "loading";
          state.shops = [];
          state.error = null;
        });

        await get().fetchShops();
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

    createShop: async (req: CreateShopReq) => {
      try {
        set((state) => {
          state.error = null;
        });

        const response = await fetch(`${API_URL}`, {
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

        if (!data?.shop) {
          throw new Error("Invalid response format");
        }

        const valid = ShopResponseValidate.safeParse(data.shop);
        if (!valid.success) {
          throw new Error("Invalid shop data received");
        }

        set((state) => {
          state.shops.push(valid.data);
          state.error = null;
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

    updateShop: async (req: UpdateShopReq) => {
      try {
        const response = await fetch(`${API_URL}/${req.uniqueId}`, {
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

        if (!data?.shop) {
          throw new Error("Invalid response format");
        }

        const valid = ShopResponseValidate.safeParse(data.shop);
        if (!valid.success) {
          throw new Error("Invalid shop data received");
        }

        set((state) => {
          state.shops = state.shops.map((r) =>
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

    deleteShop: async (id: string) => {
      try {
        set((state) => {
          state.status = "loading";
          state.error = null;
        });

        const response = await fetch(`${API_URL}/${id}`, {
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
          state.shops = state.shops.filter((shop) => shop.uniqueId !== id);

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

export const useShops = () => {
  const status = useStore((state) => state.status);
  const setStatus = useStore((state) => state.setStatus);
  const error = useStore((state) => state.error);
  const shops = useStore((state) => state.shops);
  const setShops = useStore((state) => state.setShops);
  const fetchShops = useStore((state) => state.fetchShops);
  const refreshShops = useStore((state) => state.refreshShops);
  const createShop = useStore((state) => state.createShop);
  const deleteShop = useStore((state) => state.deleteShop);
  const updateShop = useStore((state) => state.updateShop);

  return {
    status,
    setStatus,
    error,
    shops,
    setShops,
    fetchShops,
    refreshShops,
    createShop,
    deleteShop,
    updateShop,
  };
};
