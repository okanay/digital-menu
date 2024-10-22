import { CustomFontSetter } from "../../utils/custom-font-setter";
import { CustomThemeSetter } from "../../utils/custom-theme-setter";
import { CategoryGroup } from "./category/group";

interface Props {
  locale: string;
  menu: Menu;
}

export const RenderDisplayContent: React.FC<Props> = ({ locale, menu }) => {
  return (
    <div
      id="menu-display"
      className="relative mx-auto w-full max-w-xl overflow-auto sm:block sm:overflow-visible"
      style={{
        direction: locale === "sa" ? "rtl" : "ltr",
      }}
    >
      <CustomFontSetter menu={menu}>
        <CustomThemeSetter target="menu-display" menu={menu}>
          <CategoryGroup locale={locale} />
        </CustomThemeSetter>
      </CustomFontSetter>
    </div>
  );
};
