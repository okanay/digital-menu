import { useMenuEditor } from "../../use-menu-editor";
import { Reorder } from "framer-motion";
import { CategoryReOrderItem } from "./item";
import { AnimateChangeInHeight } from "@/components/ui/animate-change-in-height";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const CategoryReOrderGroup: React.FC<Props> = () => {
  const { menu, category: func } = useMenuEditor();

  const categories: MenuCategory[] =
    menu.sections.find((s) => s.name === "categories")?.data || [];

  return (
    <Reorder.Group axis="y" values={categories} onReorder={func.orderCategory}>
      <AnimateChangeInHeight>
        {categories.map((category) => (
          <CategoryReOrderItem key={category.id} category={category} />
        ))}
      </AnimateChangeInHeight>
    </Reorder.Group>
  );
};
