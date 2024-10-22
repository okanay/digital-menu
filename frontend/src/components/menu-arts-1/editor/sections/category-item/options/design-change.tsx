import { ArrowUp } from "lucide-react";
import { ModalExplanation } from "@/components/ui/modal-explanation";
import { useMenuEditor } from "@/components/menu-arts-1/hooks/use-menu-editor";

type Props = {
  category: MenuCategory;
  item: CategoryItem;
};

declare global {
  type CategoryProductDesigns = 0 | 1 | 2;
  type CategoryCosmeticsDesigns = number[];
}

export const CategoryItemDesignChange: React.FC<Props> = ({
  category,
  item,
}) => {
  const products: CategoryProductDesigns[] = [0, 1, 2];
  const cosmetics = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const editor = useMenuEditor();

  const handleDesignUp = () => {
    let newIndex = 0;
    const current = item.data.design.selected;

    if (item.type === "product") {
      newIndex =
        current === products.length - 1 ? 0 : item.data.design.selected + 1;
    }

    if (item.type === "cosmetics") {
      newIndex =
        current === cosmetics.length - 1 ? 0 : item.data.design.selected + 1;
    }

    editor.category.item.updateItem(category.id, {
      ...item,
      data: {
        ...item.data,
        design: {
          ...item.data.design,
          selected: newIndex,
        },
      } as CategoryProduct,
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
