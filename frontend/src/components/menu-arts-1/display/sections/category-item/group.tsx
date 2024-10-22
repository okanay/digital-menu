import { CategoryItemDisplay } from ".";
import { CategoryCosmeticDisplay } from "../cosmetic";

type Props = {
  locale: string;
  items: CategoryItem[];
};

export const CategoryItemGroup: React.FC<Props> = ({ locale, items }) => {
  return (
    <div className="flex w-full flex-col">
      {items.map((item) => (
        <div key={item.id}>
          {item.type === "product" && (
            <CategoryItemDisplay
              item={item}
              locale={locale}
              product={item.data as CategoryProduct}
            />
          )}

          {item.type === "cosmetics" && <CategoryCosmeticDisplay item={item} />}
        </div>
      ))}
    </div>
  );
};
