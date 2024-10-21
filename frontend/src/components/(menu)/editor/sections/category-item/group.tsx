import { Reorder } from "framer-motion";
import { useMenuEditor } from "../../use-menu-editor";
import { CategoryItemReOrderItem } from "./item";

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
      {category.items.map((item) => (
        <CategoryItemReOrderItem
          category={category}
          item={item}
          key={item.id}
        />
      ))}
    </Reorder.Group>
  );
};
