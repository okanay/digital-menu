import { Category } from "@/components/menu-arts-1/designs/category/3";
import { TitleDisplay } from "../title";
import { DescriptionDisplay } from "../description";

type CategoryDisplayDesignProps = {
  category: MenuCategory;
  locale: string;
};

const CategoryDisplay2: React.FC<CategoryDisplayDesignProps> = ({
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
    attributes={{
      url: category.image.url,
      description: category.image.description,
      locale,
    }}
  />
);

export default CategoryDisplay2;
