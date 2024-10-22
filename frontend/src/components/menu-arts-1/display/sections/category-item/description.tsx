import { CustomStyleWrapper } from "@/components/menu-arts-1/utils/custom-style-wrapper";
import { TranslatedText } from "../utils/translated-text";

type Props = {
  product: CategoryProduct;
  locale: string;
};

export const DescriptionDisplay = ({ product, locale }: Props) => {
  return (
    <CustomStyleWrapper style={product.description.style}>
      <TranslatedText
        translations={product.description.texts}
        locale={locale}
      />
    </CustomStyleWrapper>
  );
};
