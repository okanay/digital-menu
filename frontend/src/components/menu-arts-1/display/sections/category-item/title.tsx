import { CustomStyleWrapper } from "@/components/menu-arts-1/utils/custom-style-wrapper";
import { TranslatedText } from "../utils/translated-text";

type Props = {
  product: CategoryProduct;
  locale: string;
};

export const TitleDisplay = ({ product, locale }: Props) => {
  return (
    <CustomStyleWrapper style={product.title.style}>
      <TranslatedText translations={product.title.texts} locale={locale} />
    </CustomStyleWrapper>
  );
};
