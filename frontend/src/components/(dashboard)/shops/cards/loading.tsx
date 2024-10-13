import { Loader2 } from "lucide-react";

export const ShopsLoading = () => {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center rounded-lg border border-corner/5 bg-fill px-4 py-16">
      <Loader2 className="size-16 animate-spin text-primary-500/90" />
      <div className="text-lg font-semibold text-font-primary">
        Loading your shops...
      </div>
    </div>
  );
};
