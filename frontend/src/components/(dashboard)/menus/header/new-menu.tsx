"use client";

import { ButtonSecondary } from "@/components/ui/buttons";
import { Plus } from "lucide-react";
import { useDialog } from "@/providers/dialogue/use-dialogu";

type Props = {
  children?: React.ReactNode;
  icon?: boolean;
};

export const NewMenuButton = ({ children, icon = true }: Props) => {
  const { setDialog } = useDialog();

  return (
    <ButtonSecondary
      onClick={() => setDialog("create-menu")}
      className="flex items-center gap-2"
    >
      {icon && <Plus className="size-5" />}
      {children || "New Menu"}
    </ButtonSecondary>
  );
};
