import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMenuEditor } from "../../../use-menu-editor";
import { ModalExplanation } from "@/components/ui/modal-explanation";

type Props = {
  category: MenuCategory;
};

declare global {
  type CategoryDesigns = 0 | 1;
}

export const categoryDesigns: CategoryDesigns[] = [0, 1];

export const CategoryDesignChange: React.FC<Props> = ({ category }) => {
  // prettier-ignore
  const { category: { updateCategory }} = useMenuEditor();

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
    <div className="group relative z-[31] inline-block">
      <ModalExplanation>Change Design</ModalExplanation>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleDesignUp}
          className="group/up relative z-40 flex size-5 items-center justify-center rounded-lg border border-corner/20 bg-fill/60 p-0.5"
        >
          <ArrowLeft className="size-full text-font opacity-30 transition-all duration-300 group-hover/up:opacity-100" />
        </button>
        <button
          onClick={handleDesignDown}
          className="group/down relative z-40 flex size-5 items-center justify-center rounded-lg border border-corner/20 bg-fill/60 p-0.5"
        >
          <ArrowRight className="size-full text-font opacity-30 transition-all duration-300 group-hover/down:opacity-100" />
        </button>
      </div>
    </div>
  );
};
