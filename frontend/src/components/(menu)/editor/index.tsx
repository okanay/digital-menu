"use client";

import { DialogueHandler } from "../dialogues";
import { MenuArtsEditor } from "./editor";
import { MenuEditorOptions } from "./options";
import { CustomFontWrapper } from "./wrappers/custom-font-variable-wrapper";
import { CustomThemeWrapper } from "./wrappers/custom-theme-setter";
import { CustomDirectionWrapper } from "./wrappers/custon-direction-wrapper";

type Props = {
  locale: string;
};

export const MenuArts1: React.FC<Props> = ({ locale }) => {
  return (
    <>
      <DialogueHandler />
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
};
