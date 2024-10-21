import React from "react";
import { CategoryItem2 as BaseCategory2 } from "@/components/(menu)/sections/category-item/2";
import { TitleDisplay } from "../title";
import { DescriptionDisplay } from "../description";

type CategoryDesignProps = {
  item: CategoryItem;
  locale: string;
  currency: Currency;
};

const CategoryItem2: React.FC<CategoryDesignProps> = ({
  item,
  locale,
  currency,
}) => (
  <BaseCategory2
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

export default CategoryItem2;
