import React from "react";
import { CategoryItem2 as BaseCategory2 } from "@/components/menu-arts-1/designs/category-item/2";
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

const CategoryItem2: React.FC<CategoryDesignProps> = ({
  category,
  item,
  currency,
  product,
}) => (
  <BaseCategory2
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
      // prettier-ignore
      ImageWrapper: ({ className, children } : {className : string, children : React.ReactNode}) => (
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

export default CategoryItem2;
