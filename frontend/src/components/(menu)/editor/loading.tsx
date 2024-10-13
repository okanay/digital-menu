"use client";

import { Loader2 } from "lucide-react";
import { useMenuEditor } from "./use-menu-editor";

export const EditorLoading = () => {
  const { status } = useMenuEditor();

  if (status === "loading") {
    return (
      <div className="absolute inset-0 top-0 z-[99] flex items-center justify-center bg-fill/50 backdrop-blur-sm">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Loader2 className="size-16 animate-spin text-primary-500/90" />
          <div className="text-lg font-semibold text-font-primary">
            Editor changes are syncing...
          </div>
        </div>
      </div>
    );
  }

  return null;
};
