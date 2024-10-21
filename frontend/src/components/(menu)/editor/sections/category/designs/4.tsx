import React from "react";
import { Category as BaseCategory4 } from "@/components/(menu)/sections/category/4";
import { TitleEdit } from "../title";
import { DescriptionEdit } from "../description";
import { ImageEdit } from "../image";

type CategoryDesignProps = {
  category: MenuCategory;
  locale: string;
};

const Category4: React.FC<CategoryDesignProps> = ({ category, locale }) => (
  <BaseCategory4
    nodes={{
      Title: () => <TitleEdit category={category} />,
      Description: () => <DescriptionEdit category={category} />,
      ImageWrapper: ({ className, children }) => (
        <ImageEdit
          category={category}
          className={className}
          children={children}
        />
      ),
    }}
    attributes={{
      url: category.image.url,
      description: category.image.description,
      locale,
    }}
  />
);

export default Category4;
