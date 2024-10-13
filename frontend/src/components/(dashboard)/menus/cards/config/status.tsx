import { useMenus } from "../../use-menus";

type Props = {
  menu: MenuData;
};

export const UpdateMenuStatusButton = ({ menu }: Props) => {
  const { updateMenu } = useMenus();

  return (
    <button
      onClick={() =>
        updateMenu({
          uniqueId: menu.uniqueId,
          isActive: !menu.isActive,
        })
      }
      className="flex w-full items-center px-4 py-2 text-left transition-all duration-300 hover:bg-fill active:rounded-none dark:hover:bg-fill-primary"
    >
      {menu.isActive ? "Stop" : "Activate"}
    </button>
  );
};
