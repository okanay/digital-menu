import { CustomStyleWrapper } from "@/components/(menu)/helper/custom-style-wrapper";
import { TranslatedText } from "../../ui/translated-text";

type Props = {
  item: CategoryItem;
  locale: string;
};

export const DescriptionDisplay = ({ item, locale }: Props) => {
  return (
    <CustomStyleWrapper style={item.description.style}>
      <TranslatedText translations={item.description.texts} locale={locale} />
    </CustomStyleWrapper>
  );
};
