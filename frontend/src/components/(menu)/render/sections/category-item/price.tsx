import { memo } from "react";

type Props = {
  item: CategoryItem;
};

export const PriceDisplay: React.FC<Props> = memo(({ item }) => {
  return <span> {item.price.text} </span>;
});
