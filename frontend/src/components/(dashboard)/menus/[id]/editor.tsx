import { MenuArts1 } from "@/components/(menu)/editor";
import { MenuPageHeader } from "./header";

interface Props {
  menu: MenuData;
  locale: string;
}

export const MenuEditor: React.FC<Props> = ({ menu, locale }) => {
  return (
    <div className="h-[80vh] min-h-fit text-font-primary">
      <MenuPageHeader menu={menu} />
      <MenuArts1 locale={locale} initialData={menu} />
    </div>
  );
};
