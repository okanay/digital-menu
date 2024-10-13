import { Telescope } from "lucide-react";

export const MenuNotFound = ({ id }: { id: string }) => {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center rounded-lg border border-corner/5 bg-fill px-4 py-16 text-center">
      <Telescope className="size-16 text-primary-400" />
      <p className="mt-4 text-lg font-semibold text-font-primary">
        Menu not found
      </p>
      <p className="mb-6 max-w-[320px] text-balance text-font-secondary">
        The menu with the ID{" "}
        <span className="font-custom-mono font-semibold text-primary-500/80 underline">
          {id}
        </span>{" "}
        does not exist. Please create a new menu.
      </p>
    </div>
  );
};
