import { useMenus } from "../../use-menus";

type Props = {
  menu: MenuData;
};

export const DeleteMenuButton = ({ menu }: Props) => {
  const { deleteMenu } = useMenus();

  return (
    <button
      onClick={() => deleteMenu(menu.uniqueId)}
      className="flex w-full items-center px-4 py-2 text-left transition-all duration-300 hover:bg-fill active:rounded-none dark:hover:bg-fill-primary"
    >
      Delete
    </button>
  );
};
