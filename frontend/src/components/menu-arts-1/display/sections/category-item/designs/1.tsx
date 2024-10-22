import React from "react";
import { CategoryItem1 as BaseCategory1 } from "@/components/menu-arts-1/designs/category-item/1";
import { TitleDisplay } from "../title";
import { DescriptionDisplay } from "../description";

type CategoryDesignProps = {
  item: CategoryItem;
  locale: string;
  currency: Currency;
  product: CategoryProduct;
};

const CategoryItem1: React.FC<CategoryDesignProps> = ({
  locale,
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
      Title: () => <TitleDisplay product={product} locale={locale} />,
      Description: () => (
        <DescriptionDisplay product={product} locale={locale} />
      ),
      Price: () => <span>{product.price.value}</span>,
    }}
  />
);

export default CategoryItem1;
