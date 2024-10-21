import React from "react";
import { CustomStyleWrapper } from "@/components/(menu)/helper/custom-style-wrapper";
import { useMenuEditor } from "../../use-menu-editor";
import { TranslatedInput } from "../../ui/translated-input";
import { CustomStyle } from "../../options/custom-style";

type Props = {
  category: MenuCategory;
  item: CategoryItem;
};

export const TitleEdit: React.FC<Props> = React.memo(({ category, item }) => {
  const editor = useMenuEditor();

  const handleUpdate = (newStyle: Style, applyToAll: boolean) => {
    editor.category.item.updateItem(category.id, {
      ...item,
      title: {
        ...item.title,
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
      <CustomStyleWrapper style={item.title.style}>
        <TranslatedInput
          path={[
            "categories",
            category.id.toString(),
            "items",
            item.id.toString(),
            "title",
          ]}
          translations={item.title.texts}
        />
      </CustomStyleWrapper>
      <CustomStyle updateFunction={handleUpdate} style={item.title.style} />
    </div>
  );
});
