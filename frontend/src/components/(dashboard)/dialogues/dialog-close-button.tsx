import { useDialog } from "@/providers/dialogue/use-dialogu";
import { X } from "lucide-react";

export const DialogCloseButton = () => {
  const { setDialog } = useDialog();

  return (
    <button
      onClick={() => setDialog("idle")}
      className="absolute right-4 top-4 rounded-full p-2 text-font transition-all duration-300 hover:bg-corner/5 hover:opacity-75 active:scale-95"
    >
      <X className="size-5" />
    </button>
  );
};
