import React from "react";
import { Category as BaseCategory0 } from "@/components/(menu)/sections/category/0";
import { TitleEdit } from "../title";
import { DescriptionEdit } from "../description";

type CategoryDesignProps = {
  category: MenuCategory;
};

const Category0: React.FC<CategoryDesignProps> = ({ category }) => (
  <BaseCategory0
    nodes={{
      Title: () => <TitleEdit category={category} />,
      Description: () => <DescriptionEdit category={category} />,
    }}
  />
);

export default Category0;
