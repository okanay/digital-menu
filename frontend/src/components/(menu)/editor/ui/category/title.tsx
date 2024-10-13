import React from "react";
import { CustomStyleWrapper } from "@/components/(menu)/render/custom-style-wrapper";
import { CustomStyle } from "../options/custom-style";
import { TranslatedInput } from "../translated-input";
import { useMenuEditor } from "../../use-menu-editor";

type Props = {
  category: MenuCategory;
};

export const CategoryTitleEditWrapper: React.FC<Props> = React.memo(
  ({ category }) => {
    const {
      category: { updateCategory },
    } = useMenuEditor();

    const handleUpdate = (newStyle: Style, applyToAll: boolean) => {
      updateCategory({
        ...category,
        title: {
          ...category.title,
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
        <CustomStyleWrapper style={category.title.style}>
          <TranslatedInput
            path={["categories", category.id.toString(), "title", "texts"]}
            translations={category.title.texts}
          />
        </CustomStyleWrapper>
        <CustomStyle
          updateFunction={handleUpdate}
          style={category.title.style}
        />
      </div>
    );
  },
);
