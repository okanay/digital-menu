import { Plus } from "lucide-react";
import { useMenuEditor } from "../use-menu-editor";

export const AddItemButton = ({ id }: { id: number }) => {
  const { category } = useMenuEditor();

  return (
    <button
      onClick={() => category.item.addItem(id)}
      className="group pointer-events-auto flex w-full items-center justify-center gap-2 rounded-b border border-corner/10 bg-blue-50/40 py-1 font-custom-mono text-sm tracking-wide transition-colors duration-300 hover:bg-blue-50 focus:rounded-none focus:rounded-b focus:rounded-t-none dark:border-blue-950/40 dark:bg-blue-950/40 dark:text-blue-50 dark:hover:bg-blue-950 dark:focus:bg-blue-950/50"
    >
      <span className="text-xs text-blue-950 dark:text-blue-50">Add Item</span>
      <Plus className="group size-5 rounded-full border border-corner/10 p-1 transition-colors duration-300 group-hover:bg-gray-50 group-hover:text-blue-600" />
    </button>
  );
};
