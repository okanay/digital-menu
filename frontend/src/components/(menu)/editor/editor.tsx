"use client";

import { MenuArts1Display } from "../render";
import { CategoryReOrderGroup } from "./ui/re-order/group";
import { useMenuEditor } from "./use-menu-editor";

export const MenuArtsEditor: React.FC = () => {
  const { menu, category } = useMenuEditor();
  const { orderCategory } = category;

  return (
    <div className="w-full">
      <CategoryReOrderGroup
        values={menu.categories}
        onReorder={orderCategory}
      />
    </div>
  );
};
