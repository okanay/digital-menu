import React from "react";
import { EditablePrice } from "../utils/editable-price";

type Props = {
  category: MenuCategory;
  item: CategoryItem;
  product: CategoryProduct;
};

export const PriceEdit: React.FC<Props> = React.memo(
  ({ category, item, product }) => {
    return (
      <EditablePrice
        initial={product.price.text}
        category={category}
        item={item}
        product={product}
      />
    );
  },
);
