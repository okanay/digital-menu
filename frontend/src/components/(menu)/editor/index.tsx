"use client";

import { MenuArtsEditor } from "./editor";
import { EditorLoading } from "./loading";
import { MenuEditorOptions } from "./options";
import { useMenuEditor } from "./use-menu-editor";
import { CustomFontWrapper } from "./wrappers/custom-font-variable";
import { CustomThemeWrapper } from "./wrappers/custom-theme-setter";
import { CustomDirectionWrapper } from "./wrappers/custon-direction";

type Props = {
  locale: string;
  initialData: MenuData;
};

export const MenuArts1: React.FC<Props> = ({ initialData }) => {
  const { status } = useMenuEditor(initialData);

  if (status === "loading") {
    return <EditorLoading />;
  }

  if (status === "success") {
    return (
      <>
        <MenuEditorOptions />
        <article id="menu-editor" className={`mx-auto max-w-xl`}>
          <CustomThemeWrapper target="menu-editor">
            <CustomFontWrapper>
              <CustomDirectionWrapper>
                <MenuArtsEditor />
              </CustomDirectionWrapper>
            </CustomFontWrapper>
          </CustomThemeWrapper>
        </article>
      </>
    );
  }
};
