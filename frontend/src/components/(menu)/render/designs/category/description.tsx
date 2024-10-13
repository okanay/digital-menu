import { CustomStyleWrapper } from "../../custom-style-wrapper";
import { TranslatedText } from "../../translated-text";

type Props = {
  category: MenuCategory;
  locale: string;
};
export const CategoryDescriptionDisplay = ({ category, locale }: Props) => {
  return (
    <CustomStyleWrapper style={category.description.style}>
      <TranslatedText
        data-style={category.description.style.isActive}
        translations={category.description.texts}
        locale={locale}
      />
    </CustomStyleWrapper>
  );
};
