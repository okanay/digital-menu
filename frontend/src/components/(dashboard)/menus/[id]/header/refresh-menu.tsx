"use client";

import { ButtonSecondary } from "@/components/ui/buttons";
import { useMenu } from "../use-menu";
import { RefreshCw } from "lucide-react";

type Props = {
  children?: React.ReactNode;
};

export const RefreshMenuButton = ({ children }: Props) => {
  const { status, refreshMenu, menu } = useMenu();

  return (
    <ButtonSecondary
      disabled={status.fetch !== "success" || !menu}
      className="flex items-center gap-2 text-xs sm:text-base"
      onClick={() => refreshMenu(menu!.uniqueId)}
    >
      <RefreshCw className="block size-4 sm:hidden" />
      <span className="hidden sm:block">{children || "Refresh"}</span>
    </ButtonSecondary>
  );
};
