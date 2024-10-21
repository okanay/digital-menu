import { create } from "zustand";

export type DialogType =
  | "idle"
  | "gallery"
  | "global"
  | "upload"
  | "crop-image"
  | "create-shop"
  | "update-shop"
  | "delete-shop"
  | "create-menu"
  | "update-menu"
  | "delete-menu"
  | "custom-style"
  | "allergens-options"
  | "discount-options";

interface DialogStore {
  dialog: DialogType;
  setDialog: (dialog: DialogType, value?: any) => void;
  closeDialog: () => void;
  value?: any;
}

const useDialogStore = create<DialogStore>((set) => ({
  dialog: "idle",
  setDialog: (dialog, value) => {
    set(() => ({ dialog, value }));
  },
  closeDialog: () => {
    set(() => ({ dialog: "idle" }));
  },
}));

export const useDialog = () => {
  return useDialogStore();
};
