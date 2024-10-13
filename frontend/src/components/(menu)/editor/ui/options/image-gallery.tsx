import { ModalExplanation } from "@/components/ui/modal-explanation";
import { useDialog } from "@/providers/dialogue/use-dialogu";
import { Image } from "lucide-react";

export const MenuEditorImageGallery: React.FC = () => {
  const { setDialog } = useDialog();

  return (
    <div className="relative inline-block">
      <div className="group">
        <ModalExplanation>Image Gallery</ModalExplanation>
        <button
          onClick={() => setDialog("upload")}
          className="group inline-flex h-[2.5rem] items-center justify-center rounded-lg border border-corner/10 bg-fill px-4 py-2 text-sm transition-all duration-300 active:scale-95 disabled:cursor-not-allowed"
        >
          <Image className="size-5 text-black group-disabled:text-gray-300 dark:text-white dark:group-disabled:text-gray-600" />
        </button>
      </div>
    </div>
  );
};
