import React from "react";
import { Category } from "@/components/(menu)/sections/category/1";
import { TitleDisplay } from "../title";
import { DescriptionDisplay } from "../description";

type CategoryDisplayDesignProps = {
  category: MenuCategory;
  locale: string;
};

const CategoryDisplay1: React.FC<CategoryDisplayDesignProps> = ({
  category,
  locale,
}) => (
  <Category
    nodes={{
      Title: () => <TitleDisplay category={category} locale={locale} />,
      Description: () => (
        <DescriptionDisplay category={category} locale={locale} />
      ),
    }}
    attributes={{
      url: category.image.url,
      description: category.image.description,
      locale,
    }}
  />
);

export default CategoryDisplay1;
