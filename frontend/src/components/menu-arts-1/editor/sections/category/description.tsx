import { useMenuEditor } from "@/components/menu-arts-1/hooks/use-menu-editor";
import { CustomStyleWrapper } from "@/components/menu-arts-1/utils/custom-style-wrapper";
import React from "react";
import { CustomStyle } from "../../options/custom-style";
import { TranslatedInput } from "../utils/translated-input";

type Props = {
  category: MenuCategory;
};

export const DescriptionEdit: React.FC<Props> = ({ category }) => {
  const editor = useMenuEditor();

  const handleUpdate = (newStyle: Style, applyToAll: boolean) => {
    editor.category.updateCategory({
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
          path={["categories", category.id.toString(), "description"]}
          translations={category.description.texts}
        />
      </CustomStyleWrapper>
      <CustomStyle
        updateFunction={handleUpdate}
        style={category.description.style}
      />
    </div>
  );
};
