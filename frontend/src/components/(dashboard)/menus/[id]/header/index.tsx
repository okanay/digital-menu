import { Hash } from "lucide-react";
import { RefreshMenuButton } from "./refresh-menu";
import { ReturnMenusButton } from "./return-menus";

export const MenuPageHeader = ({ menu }: { menu: MenuData }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Hash className="size-6 text-primary-500/80" />
        <h1 className="font-custom-serif text-lg sm:text-3xl">
          {menu?.uniqueId}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <ReturnMenusButton />
        <RefreshMenuButton />
      </div>
    </div>
  );
};
