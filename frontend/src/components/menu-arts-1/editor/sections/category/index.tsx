import CategoryLoading from "@/components/menu-arts-1/designs/category/loading";
import React, { lazy, Suspense } from "react";

type Props = {
  menu: Menu;
  category: MenuCategory;
};

// prettier-ignore
const designs: Record<CategoryDesigns, React.LazyExoticComponent<React.ComponentType<any>>> = {
  0: lazy(() => import("./designs/0")),
  1: lazy(() => import("./designs/1")),
  2: lazy(() => import("./designs/2")),
  3: lazy(() => import("./designs/3")),
  4: lazy(() => import("./designs/4")),
};

export const Category: React.FC<Props> = ({ category, menu }) => {
  const SelectedDesign = designs[category.design.selected];

  if (!SelectedDesign) {
    return null;
  }

  return (
    <Suspense fallback={<CategoryLoading />}>
      <SelectedDesign category={category} locale={menu.language.current} />
    </Suspense>
  );
};
