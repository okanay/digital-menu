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
  | "delete-menu";

interface DialogStore {
  dialog: DialogType;
  setDialog: (dialog: DialogType, value?: any) => void;
  value?: any;
}

const useDialogStore = create<DialogStore>((set) => ({
  dialog: "idle",
  setDialog: (dialog, value) => {
    set(() => ({ dialog, value }));
  },
}));

export const useDialog = () => {
  return useDialogStore();
};
