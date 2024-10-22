import { AnimatePresence, Reorder } from "framer-motion";
import { CategoryItemReOrderItem } from "./item";
import { useMenuEditor } from "@/components/menu-arts-1/hooks/use-menu-editor";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  category: MenuCategory;
}

export const CategoryItemReOrderGroup: React.FC<Props> = ({ category }) => {
  const editor = useMenuEditor();

  return (
    <Reorder.Group
      axis="y"
      values={category.items}
      onReorder={(newItems) =>
        editor.category.item.orderItems(category.id, newItems)
      }
    >
      <AnimatePresence mode="sync">
        {category.items.map((item) => (
          <CategoryItemReOrderItem
            category={category}
            item={item}
            key={item.id}
          />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
