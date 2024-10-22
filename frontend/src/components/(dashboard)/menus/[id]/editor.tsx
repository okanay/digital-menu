import { MenuArts1 } from "@/components/menu-arts-1/editor";
import { MenuPageHeader } from "./header";
import { MenuUpdating } from "./updating";

interface Props {
  menu: MenuData;
  locale: string;
  updateStatus: StatusTypes;
}

export const MenuEditor: React.FC<Props> = ({ menu, locale, updateStatus }) => {
  return (
    <div className="relative h-[80vh] min-h-fit text-font-primary">
      <MenuPageHeader menu={menu} />
      <MenuArts1 locale={locale} initialJSON={menu.json} />
      {updateStatus === "updating" ? <MenuUpdating /> : null}
    </div>
  );
};
