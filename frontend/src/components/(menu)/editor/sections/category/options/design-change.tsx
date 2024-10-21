import { ArrowUp } from "lucide-react";
import { useMenuEditor } from "../../../use-menu-editor";
import { ModalExplanation } from "@/components/ui/modal-explanation";

type Props = {
  category: MenuCategory;
};

declare global {
  type CategoryDesigns = 0 | 1 | 2 | 3 | 4;
}

export const CategoryDesignChange: React.FC<Props> = ({ category }) => {
  const { category: categoryFunctions } = useMenuEditor();
  const { updateCategory } = categoryFunctions;

  const categoryDesigns: CategoryDesigns[] = [0, 1, 2, 3, 4];

  const handleDesignUp = () => {
    const newIndex =
      category.design.selected === categoryDesigns.length - 1
        ? 0
        : category.design.selected + 1;

    updateCategory({
      ...category,
      design: {
        ...category.design,
        selected: categoryDesigns[newIndex],
      },
    });
  };

  const handleDesignDown = () => {
    const newIndex =
      category.design.selected === 0
        ? categoryDesigns.length - 1
        : category.design.selected - 1;

    updateCategory({
      ...category,
      design: {
        ...category.design,
        selected: categoryDesigns[newIndex],
      },
    });
  };

  return (
    <div className="group relative inline-block">
      <ModalExplanation>Change Design</ModalExplanation>

      <div className="flex items-center gap-2.5">
        <button
          onClick={handleDesignDown}
          className="group/down relative flex size-6 items-center justify-center rounded-lg border border-corner/20 bg-fill p-0.5"
        >
          <ArrowUp className="size-full text-font opacity-30 transition-all duration-300 group-hover/down:opacity-100" />
        </button>
      </div>
    </div>
  );
};
