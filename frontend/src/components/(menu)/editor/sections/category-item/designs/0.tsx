import React from "react";
import { CategoryItem0 as BaseCategory0 } from "@/components/(menu)/sections/category-item/0";
import { TitleEdit } from "../title";
import { DescriptionEdit } from "../description";
import { PriceEdit } from "../price";
import { ImageEdit } from "../image";

type CategoryDesignProps = {
  category: MenuCategory;
  item: CategoryItem;
  currency: Currency;
};

const CategoryItem0: React.FC<CategoryDesignProps> = ({
  category,
  item,
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
      Title: () => <TitleEdit category={category} item={item} />,
      Description: () => <DescriptionEdit category={category} item={item} />,
      Price: () => <PriceEdit category={category} item={item} />,
      ImageWrapper: ({ className, children }) => (
        <ImageEdit
          category={category}
          item={item}
          className={className}
          children={children}
        />
      ),
    }}
  />
);

export default CategoryItem0;
