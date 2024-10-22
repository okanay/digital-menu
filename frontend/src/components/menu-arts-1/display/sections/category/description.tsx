import { CustomStyleWrapper } from "@/components/menu-arts-1/utils/custom-style-wrapper";
import { TranslatedText } from "../utils/translated-text";

type Props = {
  category: MenuCategory;
  locale: string;
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
