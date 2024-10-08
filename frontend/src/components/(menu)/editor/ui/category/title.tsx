import React from "react";
import { TranslatedInput } from "../translated-input";
import { CustomFontClassNameWrapper } from "@/components/(menu)/helper/custom-font-className-wrapper.tsx";

type Props = {
  category: MenuCategory;
  className?: string;
};

export const CategoryTitleEditWrapper: React.FC<Props> = React.memo(
  ({ category }) => {
    return (
      <CustomFontClassNameWrapper style={category.title.style}>
        <TranslatedInput
          data-style={category.title.style.isActive}
          style={
            category.title.style.isActive
              ? category.title.style.attr
              : ({} as any)
          }
          path={["categories", category.id.toString(), "title", "texts"]}
          translations={category.title.texts}
        />
      </CustomFontClassNameWrapper>
    );
  },
);
