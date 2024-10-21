import React from "react";
import { CategoryItem1 as BaseCategory1 } from "@/components/(menu)/sections/category-item/1";
import { TitleDisplay } from "../title";
import { DescriptionDisplay } from "../description";

type CategoryDesignProps = {
  item: CategoryItem;
  locale: string;
  currency: Currency;
};

const CategoryItem1: React.FC<CategoryDesignProps> = ({
  item,
  locale,
  currency,
}) => (
  <BaseCategory1
    attributes={{
      allergens: item.allergens,
      currency: currency,
      price: item.price,
    }}
    nodes={{
      Title: () => <TitleDisplay item={item} locale={locale} />,
      Description: () => <DescriptionDisplay item={item} locale={locale} />,
      Price: () => <span>{item.price.value}</span>,
    }}
  />
);

export default CategoryItem1;
