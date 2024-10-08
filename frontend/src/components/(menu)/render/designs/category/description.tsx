import { CustomFontClassNameWrapper } from "@/components/(menu)/helper/custom-font-className-wrapper.tsx";
import { TranslatedText } from "../../translated-text";

type Props = {
  category: MenuCategory;
  locale: string;
};
export const CategoryDescriptionDisplay = ({ category, locale }: Props) => {
  return (
    <CustomFontClassNameWrapper style={category.description.style}>
      <TranslatedText
        data-style={category.description.style.isActive}
        style={
          category.description.style.isActive
            ? category.description.style.attr
            : undefined
        }
        translations={category.description.texts}
        locale={locale}
      />
    </CustomFontClassNameWrapper>
  );
};
