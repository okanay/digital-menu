import React from "react";
import { TranslatedInput } from "../translated-input";
import { CustomFontClassNameWrapper } from "@/components/(menu)/helper/custom-font-className-wrapper.tsx";

type Props = {
  category: MenuCategory;
};

export const CategoryDescriptionEditWrapper: React.FC<Props> = React.memo(
  ({ category }) => {
    return (
      <CustomFontClassNameWrapper style={category.description.style}>
        <TranslatedInput
          path={["categories", category.id.toString(), "description", "texts"]}
          translations={category.description.texts}
        />
      </CustomFontClassNameWrapper>
    );
  },
);
