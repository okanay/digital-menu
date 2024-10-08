import { Category0Display } from "./0";

type Props = {
  locale: string;
  category: MenuCategory;
};

export const CategoryDisplay: React.FC<Props> = ({ category, locale }) => {
  switch (category.design.selected) {
    case 0:
      return <Category0Display category={category} locale={locale} />;
    default:
      return <></>;
  }
};
