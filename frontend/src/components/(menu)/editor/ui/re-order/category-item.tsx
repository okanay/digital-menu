import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { useMenuEditor } from "../../use-menu-editor";
import { Category } from "../category";
import { CategoryDeleteButton } from "../category/options/delete-button";
import { CategoryDesignChange } from "../category/options/design-change";
import { DragButton } from "./drag-button";

type Props = {
  category: MenuCategory;
};

export const CategoryReOrderItem: React.FC<Props> = ({ category }) => {
  const { menu } = useMenuEditor();
  const [isDragging, setIsDragging] = useState(false);
  const controls = useDragControls();

  return (
    <Reorder.Item
      layout
      as={"div"}
      key={category.id}
      dragListener={false}
      dragControls={controls}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      value={category}
      className="relative w-full flex-1"
      style={{
        zIndex: isDragging ? 99999 : "1",
      }}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { opacitiy: { duration: 0.2, delay: 0.1 } },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.25, delay: 0 },
      }}
    >
      <Category category={category} menu={menu} controls={controls} />
      <div className="absolute top-0 flex h-full w-full items-start justify-end gap-4 pr-2 pt-2">
        <div className="pointer-events-auto relative z-30 order-2 flex select-none flex-row items-center justify-end gap-3">
          <CategoryDesignChange category={category} />
          <DragButton onPointerDown={(event) => controls.start(event)} />
          <CategoryDeleteButton category={category} />
        </div>
      </div>
    </Reorder.Item>
  );
};
