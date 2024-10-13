import { useDialog } from "@/providers/dialogue/use-dialogu";

type Props = {
  shop: Shop;
};

export const UpdateShopNameButton = ({ shop }: Props) => {
  const { setDialog } = useDialog();

  return (
    <button
      onClick={() => setDialog("update-shop", { shop })}
      className="flex w-full items-center px-4 py-2 text-left transition-all duration-300 hover:bg-fill active:rounded-none dark:hover:bg-fill-primary"
    >
      Update Name
    </button>
  );
};
