"use client";

import { ButtonSecondary } from "@/components/ui/buttons";
import { useMenu } from "../use-menu";

type Props = {
  children?: React.ReactNode;
};

export const RefreshMenuButton = ({ children }: Props) => {
  const { status, refreshMenu, menu } = useMenu();

  return (
    <ButtonSecondary
      disabled={status !== "success" || !menu}
      className="flex items-center gap-2"
      onClick={() => refreshMenu(menu!.uniqueId)}
    >
      {children || "Refresh"}
    </ButtonSecondary>
  );
};
