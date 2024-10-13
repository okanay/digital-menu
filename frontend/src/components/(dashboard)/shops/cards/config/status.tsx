import { useShops } from "../../use-shops";

type Props = {
  shop: Shop;
};

export const UpdateShopStatusButton = ({ shop }: Props) => {
  const { updateShop } = useShops();

  return (
    <button
      onClick={() =>
        updateShop({
          uniqueId: shop.uniqueId,
          isActive: !shop.isActive,
        })
      }
      className="flex w-full items-center px-4 py-2 text-left transition-all duration-300 hover:bg-fill active:rounded-none dark:hover:bg-fill-primary"
    >
      {shop.isActive ? "Stop" : "Activate"}
    </button>
  );
};
