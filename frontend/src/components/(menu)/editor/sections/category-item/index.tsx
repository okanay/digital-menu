import CategoryLoading from "@/components/(menu)/sections/category/loading";
import React, { lazy, Suspense } from "react";
import { useMenuEditor } from "../../use-menu-editor";

type Props = {
  category: MenuCategory;
  item: CategoryItem;
};

const CategoryItemDesigns: Record<
  CategoryItemDesigns,
  React.LazyExoticComponent<React.ComponentType<any>>
> = {
  0: lazy(() => import("./designs/0")),
  1: lazy(() => import("./designs/1")),
  2: lazy(() => import("./designs/2")),
};

export const CategoryItem: React.FC<Props> = ({ category, item }) => {
  const SelectedDesign =
    CategoryItemDesigns[item.design.selected as CategoryItemDesigns];

  if (!SelectedDesign) {
    return null;
  }

  const editor = useMenuEditor();

  return (
    <Suspense fallback={<CategoryLoading />}>
      <SelectedDesign
        category={category}
        item={item}
        currency={editor.menu.currency.current}
      />
    </Suspense>
  );
};
