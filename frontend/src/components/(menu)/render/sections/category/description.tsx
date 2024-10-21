import { CustomStyleWrapper } from "@/components/(menu)/helper/custom-style-wrapper";
import { TranslatedText } from "../../ui/translated-text";

type Props = {
  category: MenuCategory;
  locale: string;
};
export const CategoryDescriptionDisplay = ({ category, locale }: Props) => {
  return (
    <CustomStyleWrapper style={category.description.style}>
      <TranslatedText
        translations={category.description.texts}
        locale={locale}
      />
    </CustomStyleWrapper>
  );
};

export const DescriptionDisplay = ({ category, locale }: Props) => {
  return (
    <CustomStyleWrapper style={category.description.style}>
      <TranslatedText
        translations={category.description.texts}
        locale={locale}
      />
    </CustomStyleWrapper>
  );
};
