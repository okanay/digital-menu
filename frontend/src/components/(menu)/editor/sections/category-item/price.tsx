import React from "react";
import { EditablePrice } from "../../ui/editable-price";

type Props = {
  category: MenuCategory;
  item: CategoryItem;
};

export const PriceEdit: React.FC<Props> = React.memo(({ category, item }) => {
  return (
    <EditablePrice initial={item.price.text} category={category} item={item} />
  );
});
