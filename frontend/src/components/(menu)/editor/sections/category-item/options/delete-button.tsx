import { Trash } from "lucide-react";
import { useMenuEditor } from "../../../use-menu-editor";
import { ModalExplanation } from "@/components/ui/modal-explanation";

type Props = {
  categoryId: number;
  itemId: number;
};

export const CategoryItemDeleteButton: React.FC<Props> = ({
  categoryId,
  itemId,
}) => {
  // prettier-ignore
  const { category} = useMenuEditor();

  return (
    <div className="group relative inline-block flex-1">
      <ModalExplanation>Delete Item</ModalExplanation>
      <button
        onClick={() => category.item.deleteItem(categoryId, itemId)}
        className="group/delete relative flex size-7 items-center justify-center rounded-lg border border-corner/20 bg-fill px-1"
      >
        <Trash className="size-full text-rose-500 opacity-40 transition-all duration-300 group-hover/delete:opacity-100" />
      </button>
    </div>
  );
};
