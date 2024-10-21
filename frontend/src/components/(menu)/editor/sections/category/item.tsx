import { Reorder, useDragControls } from "framer-motion";
import { useMenuEditor } from "../../use-menu-editor";
import { DragButton } from "../drag-button";
import { Category } from ".";
import { CategoryDeleteButton } from "./options/delete-button";
import { CategoryDesignChange } from "./options/design-change";
import { AddItemButton } from "../add-item";
import { CategoryItemReOrderGroup } from "../category-item/group";

type Props = {
  category: MenuCategory;
};

export const CategoryReOrderItem: React.FC<Props> = ({ category }) => {
  const { menu } = useMenuEditor();
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={category}
      drag
      dragListener={false}
      dragControls={controls}
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
    >
      <div className="relative">
        <Category category={category} menu={menu} />
        <div className="pointer-events-none absolute right-0 top-0 flex h-full w-full items-start justify-end gap-4 pr-8 pt-2">
          <div className="pointer-events-auto order-2 flex select-none flex-row items-center justify-end gap-3">
            <CategoryDesignChange category={category} />
            <DragButton onPointerDown={(event) => controls.start(event)} />
            <CategoryDeleteButton category={category} />
          </div>
        </div>
      </div>
      <AddItemButton id={category.id} />
      <CategoryItemReOrderGroup category={category} />
    </Reorder.Item>
  );
};
