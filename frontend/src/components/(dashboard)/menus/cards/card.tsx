import { ChefHat, CalendarArrowUp, Edit2, Eye } from "lucide-react";
import { FormatDate } from "@/utils/form-date";
import { Link } from "@/providers/i18n/routing";
import { MenuConfig } from "./config";
import { MenuStatus } from "./ui/status";

interface Props {
  menu: MenuData;
}

export const MenuCard: React.FC<Props> = ({ menu }) => {
  return (
    <div className="group relative overflow-hidden rounded border border-corner/10 shadow transition-all duration-300">
      <div className="relative px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-custom-serif text-2xl uppercase tracking-tight text-primary-500/80 transition-colors duration-300">
              {menu.name}
            </h2>
            <p className="mt-1 font-custom-mono text-xs uppercase text-font-secondary">
              {menu.uniqueId}
            </p>
          </div>
          <div className="flex gap-2 text-xs tracking-wide">
            <MenuStatus isActive={menu.isActive} />
            <MenuConfig menu={menu} />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 font-custom-mono text-sm">
          <div className="flex items-center gap-2 text-font-secondary">
            <ChefHat className="size-5 text-primary-500" />
            <span>Menu Type: {menu.type}</span>
          </div>
          <div className="flex items-center gap-2 text-font-secondary">
            <CalendarArrowUp className="size-5 text-primary-500" />
            <span>{FormatDate(menu.updatedAt)}</span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-start gap-4 border-t border-corner/10 pt-4">
          <Link
            href={`/menus/${menu.uniqueId}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 transition-all duration-300 hover:text-primary-600 active:scale-95"
          >
            <Edit2 className="size-4" />
            Edit
          </Link>
          <Link
            href={`/menus/?id=${menu.uniqueId}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-font-primary transition-all duration-300 hover:text-primary-500 active:scale-95"
          >
            <Eye className="size-4" />
            Preview
          </Link>
        </div>
      </div>
    </div>
  );
};
