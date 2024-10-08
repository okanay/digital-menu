import { create } from "zustand";

declare global {
  type Dialog = "gallery" | "global" | "upload" | "idle" | "crop-image";
}

type Store = {
  dialog: Dialog;
  setDialog: (dialog: Dialog) => void;
};

const useDialogStore = create<Store>((set) => ({
  dialog: "idle",
  setDialog: (dialog) => set({ dialog }),
}));

export const useDialog = () => {
  const { dialog, setDialog } = useDialogStore();

  return { dialog, setDialog };
};
