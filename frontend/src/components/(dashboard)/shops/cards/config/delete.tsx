import { useShops } from "../../use-shops";

type Props = {
  shop: Shop;
};

export const DeleteShopButton = ({ shop }: Props) => {
  const { deleteShop } = useShops();

  return (
    <button
      onClick={() => deleteShop(shop.uniqueId)}
      className="flex w-full items-center px-4 py-2 text-left transition-all duration-300 hover:bg-fill active:rounded-none dark:hover:bg-fill-primary"
    >
      Delete
    </button>
  );
};
