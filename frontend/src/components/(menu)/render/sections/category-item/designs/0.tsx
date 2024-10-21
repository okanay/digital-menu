import React from "react";
import { CategoryItem0 as BaseCategory0 } from "@/components/(menu)/sections/category-item/0";
import { TitleDisplay } from "../title";
import { DescriptionDisplay } from "../description";

type CategoryDesignProps = {
  item: CategoryItem;
  locale: string;
  currency: Currency;
};

const CategoryItem0: React.FC<CategoryDesignProps> = ({
  item,
  locale,
  currency,
}) => (
  <BaseCategory0
    attributes={{
      url: item.image.url,
      description: item.image.description,
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

export default CategoryItem0;
