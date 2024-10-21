"use client";

import { Loader2 } from "lucide-react";

export const MenuUpdating = () => {
  return (
    <div className="fixed left-0 top-0 z-[99] flex h-fit min-h-screen w-full items-center justify-center bg-fill/50 backdrop-blur-sm">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <Loader2 className="size-16 animate-spin text-primary-500/90" />
        <div className="text-lg font-semibold text-font-primary">
          Editor changes are syncing...
        </div>
      </div>
    </div>
  );
};
