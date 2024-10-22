import React from "react";
import { CategoryItem0 as BaseCategory0 } from "@/components/menu-arts-1/designs/category-item/0";
import { TitleDisplay } from "../title";
import { DescriptionDisplay } from "../description";

type CategoryDesignProps = {
  item: CategoryItem;
  locale: string;
  currency: Currency;
  product: CategoryProduct;
};

const CategoryItem0: React.FC<CategoryDesignProps> = ({
  locale,
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
      Title: () => <TitleDisplay product={product} locale={locale} />,
      Description: () => (
        <DescriptionDisplay product={product} locale={locale} />
      ),
      Price: () => <span>{product.price.value}</span>,
    }}
  />
);

export default CategoryItem0;
