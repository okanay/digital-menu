import { Telescope } from "lucide-react";
import { NewMenuButton } from "../header/new-menu";

export const MenusNotFound = () => {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center rounded-lg border border-corner/5 bg-fill px-4 py-16">
      <Telescope className="size-16 text-primary-400" />
      <p className="mt-4 text-lg font-semibold text-font-primary">
        You don't have any menus yet
      </p>
      <p className="mb-6 text-[rgb(var(--font-secondary))]">
        Begin by creating your first menu to share with your customers.
      </p>
      <NewMenuButton icon={false}>Create Menu</NewMenuButton>
    </div>
  );
};
