"use client";

import { CustomFontSetter } from "../helper/custom-font-setter";
import { CustomThemeSetter } from "../helper/custom-theme-setter";
import { MenuArtsEditor } from "./editor";
import { MenuEditorOptions } from "./options";
import { useMenuEditor } from "./use-menu-editor";

type Props = {
  locale: string;
  initialJSON: string;
};

export const MenuArts1: React.FC<Props> = ({ initialJSON }) => {
  console.log("render");
  const editor = useMenuEditor(initialJSON);

  return (
    <>
      <MenuEditorOptions />
      <div
        id="menu-editor"
        className="relative mx-auto w-full max-w-xl overflow-auto py-8 sm:block sm:overflow-visible sm:py-0"
        style={{
          direction: editor.menu.language.current === "sa" ? "rtl" : "ltr",
        }}
      >
        <CustomFontSetter menu={editor.menu}>
          <CustomThemeSetter target="menu-editor" menu={editor.menu}>
            <MenuArtsEditor />
          </CustomThemeSetter>
        </CustomFontSetter>
      </div>
    </>
  );
};
