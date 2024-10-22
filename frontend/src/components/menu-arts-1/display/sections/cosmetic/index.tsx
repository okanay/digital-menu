import CosmeticLoading from "@/components/menu-arts-1/designs/cosmetic/loading";
import React, { lazy, Suspense } from "react";

type Props = {
  item: CategoryItem;
};

// prettier-ignore
const designs: Record<number,React.LazyExoticComponent<React.ComponentType<any>>> = {
  0: lazy(() => import("./designs/0")),
  1: lazy(() => import("./designs/1")),
  2: lazy(() => import("./designs/2")),
  3: lazy(() => import("./designs/3")),
  4: lazy(() => import("./designs/4")),
  5: lazy(() => import("./designs/5")),
  6: lazy(() => import("./designs/6")),
  7: lazy(() => import("./designs/7")),
  8: lazy(() => import("./designs/8")),
  9: lazy(() => import("./designs/9")),
  10: lazy(() => import("./designs/10")),
  11: lazy(() => import("./designs/11")),
  12: lazy(() => import("./designs/12")),
  13: lazy(() => import("./designs/13")),
  14: lazy(() => import("./designs/14")),
};

export const CategoryCosmeticDisplay: React.FC<Props> = ({ item }) => {
  const SelectedDesign = designs[item.data.design.selected];

  if (!SelectedDesign) {
    return null;
  }

  return (
    <Suspense fallback={<CosmeticLoading />}>
      <SelectedDesign />
    </Suspense>
  );
};
