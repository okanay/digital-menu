import { CategoryDescriptionEditWrapper } from "../description";
import { CategoryTitleEditWrapper } from "../title";

type Props = {
  category: MenuCategory;
  menu: Menu;
};

export const CategoryDesign1 = ({ category, menu }: Props) => {
  return (
    <div className="relative z-30 px-8">
      <CategoryTitleEditWrapper category={category} />
      <CategoryDescriptionEditWrapper category={category} />
    </div>
  );
};
