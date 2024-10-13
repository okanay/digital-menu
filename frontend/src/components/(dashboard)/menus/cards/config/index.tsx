import useClickOutside from "@/hooks/use-click-outside";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { DeleteMenuButton } from "./delete";
import { UpdateMenuStatusButton } from "./status";

type Props = {
  menu: MenuData;
};

export const MenuConfig = ({ menu }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false), open);

  return (
    <div ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:bg-primary-100 focus:outline-none active:scale-[80%] dark:hover:bg-fill-primary"
      >
        <MoreVertical className="size-5 text-primary-500/90" />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-lg border border-corner/10 bg-white dark:bg-fill">
          <UpdateMenuStatusButton menu={menu} />
          <DeleteMenuButton menu={menu} />
        </div>
      )}
    </div>
  );
};
