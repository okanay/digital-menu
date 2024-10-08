import { Reorder, useDragControls } from "framer-motion";
import { Category } from "../category";
import { useState } from "react";
import { useMenuEditor } from "../../use-menu-editor";

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
      className="relative flex-shrink-0"
      style={{
        zIndex: isDragging ? 100 : "auto",
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
    </Reorder.Item>
  );
};
