import { useMenuEditor } from "../hooks/use-menu-editor";
import { CustomFontSetter } from "../utils/custom-font-setter";
import { CustomThemeSetter } from "../utils/custom-theme-setter";
import { MenuEditorOptions } from "./options";
import { MenuArtsSections } from "./sections";

type Props = {
  locale: string;
  initialJSON: string;
};

export const MenuArts1: React.FC<Props> = ({ initialJSON }) => {
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
            <MenuArtsSections />
          </CustomThemeSetter>
        </CustomFontSetter>
      </div>
    </>
  );
};
