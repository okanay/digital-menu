import CategoryLoading from "@/components/menu-arts-1/designs/category/loading";
import { useMenuDisplay } from "@/components/menu-arts-1/hooks/use-menu-display";
import React, { lazy, Suspense } from "react";

type Props = {
  locale: string;
  item: CategoryItem;
  product: CategoryProduct;
};

// prettier-ignore
const designs: Record<CategoryProductDesigns,React.LazyExoticComponent<React.ComponentType<any>>> = {
  0: lazy(() => import("./designs/0")),
  1: lazy(() => import("./designs/1")),
  2: lazy(() => import("./designs/2")),
};

// prettier-ignore
export const CategoryItemDisplay: React.FC<Props> = ({ locale, item, product }) => {
  const SelectedDesign = designs[product.design.selected];

  if (!SelectedDesign) {
    return null;
  }
  const editor = useMenuDisplay();

  return (
    <Suspense fallback={<CategoryLoading />}>
      <SelectedDesign
        locale={locale}
        item={item}
        product={product}
        currency={editor.menu.currency.current}
      />
    </Suspense>
  );
};
