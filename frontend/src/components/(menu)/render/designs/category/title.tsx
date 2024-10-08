import { CustomFontClassNameWrapper } from "@/components/(menu)/helper/custom-font-className-wrapper.tsx";

import { TranslatedText } from "../../translated-text";

type Props = {
  category: MenuCategory;
  locale: string;
};

export const CategoryTitleDisplay = ({ category, locale }: Props) => {
  return (
    <CustomFontClassNameWrapper style={category.title.style}>
      <TranslatedText
        data-style={category.title.style.isActive}
        style={
          category.title.style.isActive ? category.title.style.attr : undefined
        }
        translations={category.title.texts}
        locale={locale}
      />
    </CustomFontClassNameWrapper>
  );
};
