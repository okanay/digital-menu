import CategoryLoading from "@/components/menu-arts-1/designs/category/loading";
import React, { lazy, Suspense } from "react";

type Props = {
  locale: string;
  category: MenuCategory;
};

const CategoryDisplayDesigns: Record<
  CategoryDesigns,
  React.LazyExoticComponent<React.ComponentType<any>>
> = {
  0: lazy(() => import("./designs/0")),
  1: lazy(() => import("./designs/1")),
  2: lazy(() => import("./designs/2")),
  3: lazy(() => import("./designs/3")),
  4: lazy(() => import("./designs/4")),
};

export const CategoryDisplay: React.FC<Props> = React.memo(
  ({ category, locale }) => {
    const SelectedDesign = CategoryDisplayDesigns[category.design.selected];

    if (!SelectedDesign) {
      return null;
    }

    return (
      <Suspense fallback={<CategoryLoading />}>
        <SelectedDesign category={category} locale={locale} />
      </Suspense>
    );
  },
);
