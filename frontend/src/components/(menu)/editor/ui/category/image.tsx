import React from "react";
import Image from "next/image";

type Props = {
  category: MenuCategory;
  imageBorderRadius?: string;
};

export const CategoryImage: React.FC<Props> = React.memo(
  ({ category, imageBorderRadius }) => {
    return (
      <Image
        src={category.image.url}
        alt={category.image.description}
        className={imageBorderRadius}
        fill
        sizes="50vw"
        priority
        style={{ objectFit: "cover" }}
      />
    );
  },
);
