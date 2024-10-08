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

  return (
    <>
      <div className="pointer-events-none absolute left-0 top-0 z-40 flex h-fit w-full justify-end gap-4 px-2">
        <div className="group/editor pointer-events-auto relative flex items-center gap-4">
          <CategoryDesignChange category={category} />
          <DragButton onPointerDown={(event) => controls.start(event)} />
          <CategoryDeleteButton category={category} />
        </div>
      </div>
      {handleDesign()}
    </>
  );
};
