"use client";

import { ButtonSecondary } from "@/components/ui/buttons";
import { useShops } from "../use-shops";

type Props = {
  children?: React.ReactNode;
};

export const RefreshShopsButton = ({ children }: Props) => {
  const { status, refreshShops } = useShops();

  return (
    <ButtonSecondary
      disabled={status !== "success"}
      className="flex items-center gap-2"
      onClick={refreshShops}
    >
      {children || "Refresh"}
    </ButtonSecondary>
  );
};
