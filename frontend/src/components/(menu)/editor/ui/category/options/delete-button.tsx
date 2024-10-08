import { Trash } from "lucide-react";
import { useMenuEditor } from "../../../use-menu-editor";

type Props = {
  category: MenuCategory;
};

export const CategoryDeleteButton: React.FC<Props> = ({ category }) => {
  // prettier-ignore
  const { category: { deleteCategory }} = useMenuEditor();

  return (
    <button
      onClick={() => deleteCategory(category.id)}
      className="relative z-40 flex size-8 items-center justify-center rounded-lg border border-corner/20 bg-fill/40 px-1 transition-all duration-300 hover:bg-fill"
    >
      <Trash className="size-full text-rose-500 opacity-40 transition-all duration-300 group-hover/editor:opacity-100" />
    </button>
  );
};
