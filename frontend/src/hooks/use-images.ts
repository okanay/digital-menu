import { create } from "zustand";
import { useEffect } from "react";

// --- Global Types ---
declare global {
  type ImageProps = {
    id: number;
    userId: number;
    size: number;
    type: string;
    name: string;
    uniqueName: string;
    url: string;
    description: string;
    publicAccess: boolean;
    createdAt: string;
    updatedAt: string;
  };

  type ImageFetchStatus = "idle" | "loading" | "success" | "error";
}

// --- Constants ---
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// --- Helper Functions ---
const fetchImages = async (): Promise<ImageProps[]> => {
  try {
    const res = await fetch(`${API_URL}/auth/image/all`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Response is not OK");
    return await res.json();
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

const deleteImage = async (uniqueName: string): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/auth/image/delete`, {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({ uniqueName }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.ok;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
};

// --- Zustand Store ---
type ImageStore = {
  images: ImageProps[];
  setImages: (images: ImageProps[]) => void;

  fetchStatus: ImageFetchStatus;
  setFetchStatus: (status: ImageFetchStatus) => void;

  handleRefresh: () => Promise<void>;
  handleDeleteRequest: (uniqueName: string) => Promise<void>;

  galleryImageClickHandler: ((image: ImageProps) => void) | null;
  setGalleryImageClickHandler: (handler: (image: ImageProps) => void) => void;
  clearGalleryImageClickHandler: () => void;
};

export const useImageStore = create<ImageStore>((set, get) => ({
  images: [],
  setImages: (images) => set({ images }),

  fetchStatus: "loading",
  setFetchStatus: (status) => set({ fetchStatus: status }),

  handleRefresh: async () => {
    set({ images: [], fetchStatus: "loading" });
    const images = await fetchImages();
    if (images.length > 0) {
      set({ images, fetchStatus: "success" });
    } else {
      set({ fetchStatus: "idle" });
    }
  },

  handleDeleteRequest: async (uniqueName: string) => {
    const success = await deleteImage(uniqueName);
    if (success) {
      set({
        images: get().images.filter((image) => image.uniqueName !== uniqueName),
      });
    }
  },

  galleryImageClickHandler: null,
  setGalleryImageClickHandler: (handler) =>
    set({ galleryImageClickHandler: handler }),
  clearGalleryImageClickHandler: () => set({ galleryImageClickHandler: null }),
}));

// --- Custom Hook to Initialize Images ---
export const useImages = () => {
  const {
    images,
    setImages,
    fetchStatus,
    setFetchStatus,
    handleRefresh,
    handleDeleteRequest,
    galleryImageClickHandler,
    setGalleryImageClickHandler,
    clearGalleryImageClickHandler,
  } = useImageStore();

  useEffect(() => {
    if (fetchStatus === "loading") {
      handleRefresh();
      setFetchStatus("idle");
    }
  }, []);

  return {
    images,
    imageFetchStatus: fetchStatus,
    handleRefresh,
    handleDeleteRequest,
    setGalleryImageClickHandler,
    galleryImageClickHandler,
    clearGalleryImageClickHandler,
  };
};
