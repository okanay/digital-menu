import React from "react";
import { CategoryItem2 as BaseCategory2 } from "@/components/(menu)/sections/category-item/2";
import { TitleEdit } from "../title";
import { DescriptionEdit } from "../description";
import { PriceEdit } from "../price";
import { ImageEdit } from "../image";

type CategoryDesignProps = {
  category: MenuCategory;
  item: CategoryItem;
  currency: Currency;
};

const CategoryItem2: React.FC<CategoryDesignProps> = ({
  category,
  item,
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

export default CategoryItem2;
