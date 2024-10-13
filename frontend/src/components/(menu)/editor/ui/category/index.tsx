import { CategoryDesign0 } from "./designs/0";
import { CategoryDesign1 } from "./designs/1";
import { DragButton } from "../re-order/drag-button";
import { CategoryDeleteButton } from "./options/delete-button";
import { CategoryDesignChange } from "./options/design-change";
import { DragControls } from "framer-motion";

type Props = {
  menu: Menu;
  category: MenuCategory;
  controls: DragControls;
};

export const Category: React.FC<Props> = ({ category, menu, controls }) => {
  const handleDesign = () => {
    switch (category.design.selected) {
      case 0:
        return <CategoryDesign0 menu={menu} category={category} />;
      default:
        return <CategoryDesign1 menu={menu} category={category} />;
    }
  };

  return <>{handleDesign()}</>;
};
