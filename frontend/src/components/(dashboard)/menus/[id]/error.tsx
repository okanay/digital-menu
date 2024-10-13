import { FileWarning } from "lucide-react";

export const MenuError = () => {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center rounded-lg border border-corner/5 bg-fill px-4 py-16">
      <FileWarning className="size-16 text-primary-400" />
      <p className="mt-4 text-lg font-semibold text-font-primary">
        An error has occurred.
      </p>
      <p className="mb-6 text-[rgb(var(--font-secondary))]">
        Please try again later.
      </p>
    </div>
  );
};
