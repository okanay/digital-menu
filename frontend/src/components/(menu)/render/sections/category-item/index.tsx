import CategoryLoading from "@/components/(menu)/sections/category/loading";
import React, { lazy, Suspense } from "react";
import { useMenuDisplay } from "../../use-menu-display";

type Props = {
  locale: string;
  item: CategoryItem;
};

const CategoryItemDisplayDesigns: Record<
  CategoryItemDesigns,
  React.LazyExoticComponent<React.ComponentType<any>>
> = {
  0: lazy(() => import("./designs/0")),
  1: lazy(() => import("./designs/1")),
  2: lazy(() => import("./designs/2")),
};

export const CategoryItemDisplay: React.FC<Props> = React.memo(
  ({ locale, item }) => {
    const SelectedDesign =
      CategoryItemDisplayDesigns[item.design.selected as CategoryItemDesigns];

    if (!SelectedDesign) {
      return null;
    }
    const editor = useMenuDisplay();

    return (
      <Suspense fallback={<CategoryLoading />}>
        <SelectedDesign
          locale={locale}
          item={item}
          currency={editor.menu.currency.current}
        />
      </Suspense>
    );
  },
);
