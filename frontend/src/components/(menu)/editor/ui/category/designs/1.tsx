import { CategoryDescriptionEditWrapper } from "../description";
import { CategoryTitleEditWrapper } from "../title";

type Props = {
  category: MenuCategory;
  menu: Menu;
};

export const CategoryDesign1 = ({ category, menu }: Props) => {
  return (
    <div className="relative z-30 px-8">
      <div className="w-fit min-w-[15%] max-w-[50%] rounded-t-lg px-2 py-1 font-custom-serif text-5xl font-semibold text-primary-950 dark:text-primary-50">
        <CategoryTitleEditWrapper category={category} />
      </div>
      <div className="w-fit min-w-[15%] max-w-[50%] text-balance rounded-b-lg px-2 py-1 font-custom-sans text-sm tracking-wider text-primary-950/70 dark:text-primary-50/60">
        <CategoryDescriptionEditWrapper category={category} />
      </div>
    </div>
  );
};
