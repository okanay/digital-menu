import { ArrowUp, ArrowDown } from "lucide-react";
import { useMenuEditor } from "../../../use-menu-editor";

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
    <div className="flex flex-col gap-0.5">
      <button
        onClick={handleDesignUp}
        className="relative z-40 flex size-6 items-center justify-center rounded-lg border border-corner/20 bg-fill/40 p-1 transition-all duration-300 hover:bg-fill"
      >
        <ArrowUp className="size-4 text-font opacity-40 transition-all duration-300 group-hover/editor:opacity-100" />
      </button>
      <button
        onClick={handleDesignDown}
        className="relative z-40 flex size-6 items-center justify-center rounded-lg border border-corner/20 bg-fill/40 p-1 transition-all duration-300 hover:bg-fill"
      >
        <ArrowDown className="size-4 text-font opacity-40 transition-all duration-300 group-hover/editor:opacity-100" />
      </button>
    </div>
  );
};
