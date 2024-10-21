import React from "react";
import { CustomStyleWrapper } from "@/components/(menu)/helper/custom-style-wrapper";
import { useMenuEditor } from "../../use-menu-editor";
import { CustomStyle } from "../../options/custom-style";
import { TranslatedInput } from "../../ui/translated-input";

type Props = {
  category: MenuCategory;
};

export const DescriptionEdit: React.FC<Props> = React.memo(({ category }) => {
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
});
