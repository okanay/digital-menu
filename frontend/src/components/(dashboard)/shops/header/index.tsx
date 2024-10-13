import { Store } from "lucide-react";
import { RefreshShopsButton } from "./refresh-shops";
import { NewShopButton } from "./new-shop";

export const ShopsPageHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Store className="size-6 text-primary-500" />
        <h1 className="font-custom-serif text-3xl">Your Shops</h1>
      </div>
      <div className="flex items-center gap-2">
        <RefreshShopsButton />
        <NewShopButton />
      </div>
    </div>
  );
};
