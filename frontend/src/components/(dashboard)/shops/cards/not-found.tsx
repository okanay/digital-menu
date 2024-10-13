import { Telescope } from "lucide-react";
import { NewShopButton } from "../header/new-shop";

export const ShopsNotFound = () => {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center rounded-lg border border-corner/5 bg-fill px-4 py-16">
      <Telescope className="size-16 text-primary-400" />
      <p className="mt-4 text-lg font-semibold text-font-primary">
        You don't have any shops yet!
      </p>
      <p className="mb-6 text-[rgb(var(--font-secondary))]">
        Begin by creating your first shop and link your digital menus to it.
      </p>
      <NewShopButton icon={false}>Start Now</NewShopButton>
    </div>
  );
};
