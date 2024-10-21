import { useMenuDisplay } from "../../use-menu-display";
import { CategoryDisplay } from ".";
import { CategoryItemGroup } from "../category-item/group";

type Props = {
  locale: string;
};

export const CategoryGroup: React.FC<Props> = ({ locale }) => {
  const { menu } = useMenuDisplay();

  const categories: MenuCategory[] =
    menu.sections.find((s) => s.name === "categories")?.data || [];

  return (
    <div className="flex w-full flex-col">
      {categories.map((category) => (
        <div key={category.id}>
          <CategoryDisplay category={category} locale={locale} />
          <CategoryItemGroup items={category.items} locale={locale} />
        </div>
      ))}
    </div>
  );
};
