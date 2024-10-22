import { CustomStyleWrapper } from "@/components/menu-arts-1/utils/custom-style-wrapper";
import { TranslatedText } from "../utils/translated-text";

type Props = {
  category: MenuCategory;
  locale: string;
};

export const TitleDisplay = ({ category, locale }: Props) => {
  return (
    <CustomStyleWrapper style={category.title.style}>
      <TranslatedText translations={category.title.texts} locale={locale} />
    </CustomStyleWrapper>
  );
};
