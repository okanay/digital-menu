import { Trash } from "lucide-react";
import { useMenuEditor } from "../../../use-menu-editor";
import { ModalExplanation } from "@/components/ui/modal-explanation";

type Props = {
  category: MenuCategory;
};

export const CategoryDeleteButton: React.FC<Props> = ({ category }) => {
  // prettier-ignore
  const { category: { deleteCategory }} = useMenuEditor();

  return (
    <div className="group relative inline-block flex-1">
      <ModalExplanation>Delete Category</ModalExplanation>
      <button
        onClick={() => deleteCategory(category.id)}
        className="group/delete relative flex size-7 items-center justify-center rounded-lg border border-corner/20 bg-fill/60 px-1"
      >
        <Trash className="size-full text-rose-500 opacity-40 transition-all duration-300 group-hover/delete:opacity-100" />
      </button>
    </div>
  );
};
