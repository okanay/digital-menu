import { TranslatedText } from "../../translated-text";
import { CustomStyleWrapper } from "../../custom-style-wrapper";

type Props = {
  category: MenuCategory;
  locale: string;
};

export const CategoryTitleDisplay = ({ category, locale }: Props) => {
  return (
    <CustomStyleWrapper style={category.title.style}>
      <TranslatedText translations={category.title.texts} locale={locale} />
    </CustomStyleWrapper>
  );
};
