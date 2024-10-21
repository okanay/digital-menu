import { CustomStyleWrapper } from "@/components/(menu)/helper/custom-style-wrapper";
import { TranslatedText } from "../../ui/translated-text";

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

export const TitleDisplay = ({ category, locale }: Props) => {
  return (
    <CustomStyleWrapper style={category.title.style}>
      <TranslatedText translations={category.title.texts} locale={locale} />
    </CustomStyleWrapper>
  );
};
