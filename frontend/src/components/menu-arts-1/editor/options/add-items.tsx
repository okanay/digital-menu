import { useMenuEditor } from "../../hooks/use-menu-editor";

export const AddItemButton = ({ id }: { id: number }) => {
  const { category } = useMenuEditor();

  return (
    <div className="flex w-full flex-row">
      <button
        onClick={() => category.item.addProduct(id)}
        className="group pointer-events-auto flex w-1/2 items-center justify-center gap-2 rounded-b border border-corner/10 bg-blue-50/40 py-1 font-custom-mono text-sm tracking-wide transition-colors duration-300 hover:bg-blue-50 focus:rounded-none focus:rounded-b focus:rounded-t-none dark:border-blue-950/40 dark:bg-blue-950/40 dark:text-blue-50 dark:hover:bg-blue-950 dark:focus:bg-blue-950/50"
      >
        <span className="text-xs text-blue-950 dark:text-blue-50">Product</span>
      </button>
      <button
        onClick={() => category.item.addCosmetic(id)}
        className="group pointer-events-auto flex w-1/2 items-center justify-center gap-2 rounded-b border border-corner/10 bg-blue-50/40 py-1 font-custom-mono text-sm tracking-wide transition-colors duration-300 hover:bg-blue-50 focus:rounded-none focus:rounded-b focus:rounded-t-none dark:border-blue-950/40 dark:bg-blue-950/40 dark:text-blue-50 dark:hover:bg-blue-950 dark:focus:bg-blue-950/50"
      >
        <span className="text-xs text-blue-950 dark:text-blue-50">
          Cosmetic
        </span>
      </button>
    </div>
  );
};
