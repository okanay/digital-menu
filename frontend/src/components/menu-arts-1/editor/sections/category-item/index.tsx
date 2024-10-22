import CategoryLoading from "@/components/menu-arts-1/designs/category/loading";
import { useMenuEditor } from "@/components/menu-arts-1/hooks/use-menu-editor";
import React, { lazy, Suspense } from "react";

type Props = {
  category: MenuCategory;
  item: CategoryItem;
  product: CategoryProduct;
};

// prettier-ignore
const designs: Record<CategoryProductDesigns,React.LazyExoticComponent<React.ComponentType<any>>> = {
  0: lazy(() => import("./designs/0")),
  1: lazy(() => import("./designs/1")),
  2: lazy(() => import("./designs/2")),
};

export const CategoryItem: React.FC<Props> = ({ category, item, product }) => {
  const SelectedDesign = designs[product.design.selected];

  if (!SelectedDesign) {
    return null;
  }

  const editor = useMenuEditor();

  return (
    <Suspense fallback={<CategoryLoading />}>
      <SelectedDesign
        category={category}
        item={item}
        product={product}
        currency={editor.menu.currency.current}
      />
    </Suspense>
  );
};
