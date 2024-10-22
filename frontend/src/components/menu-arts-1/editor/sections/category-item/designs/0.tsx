import React from "react";
import { CategoryItem0 as BaseCategory0 } from "@/components/menu-arts-1/designs/category-item/0";
import { TitleEdit } from "../title";
import { DescriptionEdit } from "../description";
import { PriceEdit } from "../price";
import { ImageEdit } from "../image";

type CategoryDesignProps = {
  category: MenuCategory;
  item: CategoryItem;
  currency: Currency;
  product: CategoryProduct;
};

const CategoryItem0: React.FC<CategoryDesignProps> = ({
  category,
  item,
  currency,
  product,
}) => (
  <BaseCategory0
    attributes={{
      url: product.image.url,
      description: product.image.description,
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
      ImageWrapper: ({ className, children }) => (
        <ImageEdit
          category={category}
          item={item}
          product={product}
          className={className}
          children={children}
        />
      ),
    }}
  />
);

export default CategoryItem0;
