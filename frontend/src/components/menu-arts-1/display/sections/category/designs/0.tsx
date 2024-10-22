import { Category } from "@/components/menu-arts-1/designs/category/0";
import { TitleDisplay } from "../title";
import { DescriptionDisplay } from "../description";

type CategoryDisplayDesignProps = {
  category: MenuCategory;
  locale: string;
};

const CategoryDisplay0: React.FC<CategoryDisplayDesignProps> = ({
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
  />
);

export default CategoryDisplay0;
