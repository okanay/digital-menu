import { ArrowUp } from "lucide-react";
import { useMenuEditor } from "../../../use-menu-editor";
import { ModalExplanation } from "@/components/ui/modal-explanation";

type Props = {
  category: MenuCategory;
  item: CategoryItem;
};

declare global {
  type CategoryItemDesigns = 0 | 1 | 2;
}

export const CategoryItemDesignChange: React.FC<Props> = ({
  category,
  item,
}) => {
  const editor = useMenuEditor();
  const designs: CategoryItemDesigns[] = [0, 1, 2];

  const handleDesignUp = () => {
    const newIndex =
      item.design.selected === designs.length - 1
        ? 0
        : item.design.selected + 1;

    editor.category.item.updateItem(category.id, {
      ...item,
      design: {
        ...item.design,
        selected: designs[newIndex],
      },
    });
  };

  return (
    <div className="group relative inline-block">
      <ModalExplanation>Change Design</ModalExplanation>

      <div className="flex items-center gap-2.5">
        <button
          onClick={handleDesignUp}
          className="group/up relative flex size-6 items-center justify-center rounded-lg border border-corner/20 bg-fill p-0.5"
        >
          <ArrowUp className="size-full text-font opacity-30 transition-all duration-300 group-hover/up:opacity-100" />
        </button>
      </div>
    </div>
  );
};
