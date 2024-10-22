import React from "react";
import { CategoryItem1 as BaseCategory1 } from "@/components/menu-arts-1/designs/category-item/1";
import { TitleEdit } from "../title";
import { DescriptionEdit } from "../description";
import { PriceEdit } from "../price";

type CategoryDesignProps = {
  category: MenuCategory;
  item: CategoryItem;
  currency: Currency;
  product: CategoryProduct;
};

const CategoryItem1: React.FC<CategoryDesignProps> = ({
  category,
  item,
  currency,
  product,
}) => (
  <BaseCategory1
    attributes={{
      allergens: product.allergens,
      currency: currency,
      price: product.price,
    }}
    nodes={{
      Title: () => (
        <TitleEdit category={category} item={item} product={product} />
      ),
      Description: () => (
        <DescriptionEdit category={category} item={item} product={product} />
      ),
      Price: () => (
        <PriceEdit category={category} item={item} product={product} />
      ),
    }}
  />
);

export default CategoryItem1;
