import { CustomStyleWrapper } from "@/components/(menu)/helper/custom-style-wrapper";
import { TranslatedText } from "../../ui/translated-text";

type Props = {
  item: CategoryItem;
  locale: string;
};

export const TitleDisplay = ({ item, locale }: Props) => {
  return (
    <CustomStyleWrapper style={item.title.style}>
      <TranslatedText translations={item.title.texts} locale={locale} />
    </CustomStyleWrapper>
  );
};
