import React from "react";
import { CustomStyleWrapper } from "@/components/(menu)/helper/custom-style-wrapper";
import { useMenuEditor } from "../../use-menu-editor";
import { CustomStyle } from "../../options/custom-style";
import { TranslatedInput } from "../../ui/translated-input";

type Props = {
  category: MenuCategory;
  item: CategoryItem;
};

export const DescriptionEdit: React.FC<Props> = React.memo(
  ({ category, item }) => {
    const editor = useMenuEditor();

    const handleUpdate = (newStyle: Style, applyToAll: boolean) => {
      editor.category.item.updateItem(category.id, {
        ...item,
        description: {
          ...item.description,
          style: {
            isActive: newStyle.isActive,
            attr: newStyle.attr,
            font: newStyle.font,
            textColor: newStyle.textColor,
          },
        },
      });
    };

    return (
      <div className="relative">
        <CustomStyleWrapper style={item.description.style}>
          <TranslatedInput
            path={[
              "categories",
              category.id.toString(),
              "items",
              item.id.toString(),
              "description",
            ]}
            translations={item.description.texts}
          />
        </CustomStyleWrapper>
        <CustomStyle
          updateFunction={handleUpdate}
          style={item.description.style}
        />
      </div>
    );
  },
);
