import { ChefHat } from "lucide-react";
import { NewMenuButton } from "./new-menu";
import { RefreshMenusButton } from "./refresh-menus";

export const MenusPageHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ChefHat className="size-6 text-primary-500" />
        <h1 className="font-custom-serif text-3xl">Your Menus</h1>
      </div>
      <div className="flex items-center gap-2">
        <RefreshMenusButton />
        <NewMenuButton />
      </div>
    </div>
  );
};
