import { Plus } from "lucide-react";
import { ModalExplanation } from "@/components/ui/modal-explanation";
import { useMenuEditor } from "../../hooks/use-menu-editor";

export const MenuEditorAddCategory: React.FC = () => {
  const {
    category: { addCategory },
  } = useMenuEditor();

  return (
    <div className="relative inline-block">
      <div className="group">
        <ModalExplanation>Add Category</ModalExplanation>
        <button
          onClick={addCategory}
          className="group inline-flex h-[2.5rem] items-center justify-center rounded-lg border border-corner/10 bg-fill px-4 py-2 text-sm transition-all duration-300 active:scale-95 disabled:cursor-not-allowed"
        >
          <Plus className="size-5 text-black group-disabled:text-gray-300 dark:text-white dark:group-disabled:text-gray-600" />
        </button>
      </div>
    </div>
  );
};
