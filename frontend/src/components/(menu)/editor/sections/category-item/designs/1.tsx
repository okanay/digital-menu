import React from "react";
import { CategoryItem1 as BaseCategory1 } from "@/components/(menu)/sections/category-item/1";
import { TitleEdit } from "../title";
import { DescriptionEdit } from "../description";
import { PriceEdit } from "../price";

type CategoryDesignProps = {
  category: MenuCategory;
  item: CategoryItem;
  currency: Currency;
};

const CategoryItem1: React.FC<CategoryDesignProps> = ({
  category,
  item,
  currency,
}) => (
  <BaseCategory1
    attributes={{
      allergens: item.allergens,
      currency: currency,
      price: item.price,
    }}
    nodes={{
      Title: () => <TitleEdit category={category} item={item} />,
      Description: () => <DescriptionEdit category={category} item={item} />,
      Price: () => <PriceEdit category={category} item={item} />,
    }}
  />
);

export default CategoryItem1;
