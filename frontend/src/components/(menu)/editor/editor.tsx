"use client";

import { CategoryReOrderGroup } from "./ui/re-order/group";
import { useMenuEditor } from "./use-menu-editor";

export const MenuArtsEditor: React.FC = () => {
  const { menu, category } = useMenuEditor();
  const { orderCategory } = category;

  return (
    <CategoryReOrderGroup values={menu.categories} onReorder={orderCategory} />
  );
};
