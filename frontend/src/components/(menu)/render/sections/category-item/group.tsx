import { CategoryItemDisplay } from ".";

type Props = {
  locale: string;
  items: CategoryItem[];
};

export const CategoryItemGroup: React.FC<Props> = ({ locale, items }) => {
  return (
    <div className="flex w-full flex-col">
      {items.map((item) => (
        <div key={item.id}>
          <CategoryItemDisplay item={item} locale={locale} />
        </div>
      ))}
    </div>
  );
};
