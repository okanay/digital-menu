import { twMerge } from "tailwind-merge";
import { CategoryDescriptionEditWrapper } from "../description";
import { CategoryTitleEditWrapper } from "../title";
import { CategoryImage } from "../image";
import { CategoryImageEditWrapper } from "../options/image";

type Props = {
  category: MenuCategory;
  menu: Menu;
};

export const CategoryDesign0 = ({ category, menu }: Props) => {
  const isArabic = menu.language.current === "sa";
  const imageBorderRadius = isArabic ? "rounded-br-full" : "rounded-bl-full";
  const imagePosition = isArabic ? "left-0" : "right-0";
  const gradientDirection = isArabic
    ? "bg-gradient-to-tl"
    : "bg-gradient-to-tr";

  return (
    <div className="relative overflow-hidden border-b border-primary-50 dark:border-primary-950">
      {/* Image */}
      <div className={twMerge("absolute top-0 h-full w-1/2", imagePosition)}>
        <CategoryImageEditWrapper
          category={category}
          imageBorderRadius={imageBorderRadius}
        >
          <CategoryImage
            category={category}
            imageBorderRadius={imageBorderRadius}
          />
        </CategoryImageEditWrapper>
      </div>

      {/* Gradient Effect */}
      <div
        className={twMerge(
          "absolute right-0 top-0 h-full w-full from-primary-100/80 via-primary-50/10 to-primary-50/0 dark:from-primary-900/80 dark:via-primary-950/20 dark:to-primary-950/0",
          gradientDirection,
        )}
      />

      {/* Title, Description */}
      <div className="relative px-5 py-4">
        <div className="w-1/2 rounded-t-lg px-2 py-1 font-custom-serif text-5xl font-semibold text-primary-950 dark:text-primary-50">
          <CategoryTitleEditWrapper category={category} />
        </div>
        <div className="w-1/2 text-balance rounded-b-lg px-2 py-1 font-custom-sans text-sm tracking-wider text-primary-950/70 dark:text-primary-50/60">
          <CategoryDescriptionEditWrapper category={category} />
        </div>
      </div>
    </div>
  );
};
