import { PaintBucket } from "lucide-react";
import { useMenuEditor } from "../../../use-menu-editor";
import { ModalExplanation } from "@/components/ui/modal-explanation";
import { bgDesigns } from "../../background";

type Props = {
  category: MenuCategory;
};

export const BackgroundDesignChange: React.FC<Props> = ({ category }) => {
  const { category: categoryFunctions } = useMenuEditor();
  const { updateCategory } = categoryFunctions;

  const handleDesignUp = () => {
    const currentDesign =
      category.design.customizations?.background.selected || 0;
    const nextDesign =
      currentDesign + 1 >= bgDesigns.length ? 0 : currentDesign + 1;

    updateCategory({
      ...category,
      design: {
        ...category.design,
        customizations: {
          background: {
            selected: bgDesigns[nextDesign],
          },
        },
      },
    });
  };

  return (
    <div className="group relative inline-block">
      <ModalExplanation>Change Background</ModalExplanation>

      <div className="flex items-center gap-2.5">
        <button
          onClick={handleDesignUp}
          className="group/down relative flex size-6 items-center justify-center rounded-lg border border-corner/20 bg-fill p-0.5"
        >
          <PaintBucket className="size-full text-font opacity-30 transition-all duration-300 group-hover/down:opacity-100" />
        </button>
      </div>
    </div>
  );
};
