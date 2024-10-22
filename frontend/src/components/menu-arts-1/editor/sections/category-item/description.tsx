import React from "react";
import { CustomStyle } from "../../options/custom-style";
import { useMenuEditor } from "@/components/menu-arts-1/hooks/use-menu-editor";
import { CustomStyleWrapper } from "@/components/menu-arts-1/utils/custom-style-wrapper";
import { TranslatedInput } from "../utils/translated-input";

type Props = {
  category: MenuCategory;
  item: CategoryItem;
  product: CategoryProduct;
};

export const DescriptionEdit: React.FC<Props> = ({
  category,
  item,
  product,
}) => {
  const editor = useMenuEditor();

  const handleUpdate = (newStyle: Style) => {
    const data: CategoryProduct = {
      ...product,
      description: {
        ...product.description,
        style: {
          isActive: newStyle.isActive,
          attr: newStyle.attr,
          font: newStyle.font,
          textColor: newStyle.textColor,
        },
      },
    };

    editor.category.item.updateItem(category.id, {
      ...item,
      data: { ...data },
    });
  };

  return (
    <div className="relative">
      <CustomStyleWrapper style={product.description.style}>
        <TranslatedInput
          path={[
            "categories",
            category.id.toString(),
            "items",
            item.id.toString(),
            "data",
            "description",
          ]}
          translations={product.description.texts}
        />
      </CustomStyleWrapper>
      <CustomStyle
        updateFunction={handleUpdate}
        style={product.description.style}
      />
    </div>
  );
};
