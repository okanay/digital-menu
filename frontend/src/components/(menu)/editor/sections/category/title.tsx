import React from "react";
import { useMenuEditor } from "../../use-menu-editor";
import { CustomStyle } from "../../options/custom-style";
import { TranslatedInput } from "../../ui/translated-input";
import { CustomStyleWrapper } from "@/components/(menu)/helper/custom-style-wrapper";

type Props = {
  category: MenuCategory;
};

export const TitleEdit: React.FC<Props> = React.memo(({ category }) => {
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
          path={["categories", category.id.toString(), "title"]}
          translations={category.title.texts}
        />
      </CustomStyleWrapper>
      <CustomStyle updateFunction={handleUpdate} style={category.title.style} />
    </div>
  );
});
