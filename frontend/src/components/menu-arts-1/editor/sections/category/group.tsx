import { AnimatePresence, Reorder } from "framer-motion";
import { CategoryReOrderItem } from "./item";
import { useMenuEditor } from "@/components/menu-arts-1/hooks/use-menu-editor";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const CategoryReOrderGroup: React.FC<Props> = () => {
  const { menu, category: func } = useMenuEditor();

  const categories: MenuCategory[] =
    menu.sections.find((s) => s.name === "categories")?.data || [];

  return (
    <Reorder.Group axis="y" values={categories} onReorder={func.orderCategory}>
      <AnimatePresence>
        {categories.map((category) => (
          <CategoryReOrderItem key={category.id} category={category} />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
