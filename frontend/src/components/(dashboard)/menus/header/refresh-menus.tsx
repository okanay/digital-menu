"use client";

import { ButtonSecondary } from "@/components/ui/buttons";
import { useMenus } from "../use-menus";

type Props = {
  children?: React.ReactNode;
};

export const RefreshMenusButton = ({ children }: Props) => {
  const { status, refreshMenus } = useMenus();

  return (
    <ButtonSecondary
      disabled={status !== "success"}
      className="flex items-center gap-2"
      onClick={refreshMenus}
    >
      {children || "Refresh"}
    </ButtonSecondary>
  );
};
