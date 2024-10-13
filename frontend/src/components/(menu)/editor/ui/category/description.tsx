import React from "react";
import { CustomStyleWrapper } from "@/components/(menu)/render/custom-style-wrapper";
import { useMenuEditor } from "../../use-menu-editor";
import { CustomStyle } from "../options/custom-style";
import { TranslatedInput } from "../translated-input";

type Props = {
  category: MenuCategory;
};

export const CategoryDescriptionEditWrapper: React.FC<Props> = React.memo(
  ({ category }) => {
    const {
      category: { updateCategory },
    } = useMenuEditor();

    const handleUpdate = (newStyle: Style, applyToAll: boolean) => {
      updateCategory({
        ...category,
        description: {
          ...category.description,
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
        <CustomStyleWrapper style={category.description.style}>
          <TranslatedInput
            path={[
              "categories",
              category.id.toString(),
              "description",
              "texts",
            ]}
            translations={category.description.texts}
          />
        </CustomStyleWrapper>
        <CustomStyle
          updateFunction={handleUpdate}
          style={category.description.style}
        />
      </div>
    );
  },
);
